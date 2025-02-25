import express from "express";
import { S3Client } from "@aws-sdk/client-s3";
import { fromSSO } from "@aws-sdk/credential-provider-sso";

import { storeFileValidator } from "@/schemas/storeFile.js";

import { createStoreFileS3Controller } from "@/controllers/storeFileS3.js";
import { protectedRoute } from "@/middleware/authBasic/jwt.js";

import { response } from "@/utils/response.js";

const s3Client = new S3Client({
  credentials: fromSSO({ profile: "your-sso-profile" }),
});

const storeFileController = createStoreFileS3Controller(s3Client);
const router = express.Router();

router.post("/upload/:fileName", protectedRoute, async (req, res, next) => {
  const { fileName } = req.params;
  const { userId } = req.user!;

  await storeFileValidator()
    .validateGetFile({ fileName, userId })
    .then((val) =>
      storeFileController.uploadFile({ req, fileName: val.fileName, userId })
    )
    .then((result) => res.json(response(result)))
    .catch(next);
});

router
  .route("/files")
  .get(protectedRoute, async (req, res, next) => {
    const pageToken = req.query.pageToken as string;
    const { userId } = req.user!;

    await storeFileValidator()
      .validateListFiles({ pageToken, userId })
      .then(storeFileController.getFileList)
      .then((result) => res.json(response(result)))
      .catch(next);
  })
  .delete(protectedRoute, async (req, res, next) => {
    const payload = req.body;
    const { userId } = req.user!;

    await storeFileValidator()
      .validateDeleteFiles({ ...payload, userId })
      .then(storeFileController.deleteFiles)
      .then((result) => res.json(response(result)))
      .catch(next);
  });

router
  .route("/:fileKey")
  .get(protectedRoute, async (req, res, next) => {
    const fileName = req.params.fileKey;
    const { userId } = req.user!;

    await storeFileValidator()
      .validateGetFile({ fileName, userId })
      .then(storeFileController.downloadFile)
      .then(async (result) => {
        res.setHeader(
          "Content-Type",
          result.ContentType || "application/octet-stream"
        );
        res.setHeader(
          "Content-Disposition",
          `attachment; filename="${fileName}"`
        );

        const body = await result.Body?.transformToByteArray()
        res.write(body);
        res.end();
      })
      .catch(next);
  })
  .delete(protectedRoute, async (req, res, next) => {
    const fileName = req.params.fileKey;
    const { userId } = req.user!;

    await storeFileValidator()
      .validateDeleteFiles({ files: [fileName], userId })
      .then(storeFileController.deleteFiles)
      .then((result) => res.json(response(result)))
      .catch(next);
  });

export { router as storeFileS3Router };
