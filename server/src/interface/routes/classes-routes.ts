import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import { classesController } from "../controllers/classes/index.js";
import { requestContextMiddleware } from "../middlewares/request-context-middleware.js";
import { PermissionsMiddleware } from "../middlewares/permissions.middleware.js";
import { PERMISSIONSMAP } from "#infra/config/permissions-map.js";

const classesRouter = Router();

classesRouter.post(
  "/create",
  AuthMiddleware.authenticate,
  PermissionsMiddleware.authorize([PERMISSIONSMAP.CLASS_MANAGE]),
  requestContextMiddleware,
  (req, res, next) => classesController.create(req, res, next)
);

classesRouter.get(
  "/search",
  AuthMiddleware.authenticate,
  PermissionsMiddleware.authorize([PERMISSIONSMAP.CLASS_VIEW]),
  (req, res, next) => classesController.listAll(req, res, next)
);

classesRouter.get(
  "/:classId",
  AuthMiddleware.authenticate,
  PermissionsMiddleware.authorize([PERMISSIONSMAP.CLASS_VIEW]),
  (req, res, next) => classesController.getClassData(req, res, next)
);

classesRouter.put(
  "/:classId",
  AuthMiddleware.authenticate,
  PermissionsMiddleware.authorize([PERMISSIONSMAP.CLASS_MANAGE]),
  requestContextMiddleware,
  (req, res, next) => classesController.updateClassData(req, res, next)
);

classesRouter.delete(
  "/:classId",
  AuthMiddleware.authenticate,
  PermissionsMiddleware.authorize([PERMISSIONSMAP.CLASS_MANAGE]),
  (req, res, next) => classesController.deleteClass(req, res, next)
);

export { classesRouter };
