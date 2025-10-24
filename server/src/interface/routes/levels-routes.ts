import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import { levelsController } from "../controllers/levels/index.js";
import { requestContextMiddleware } from "../middlewares/request-context-middleware.js";
import { PermissionsMiddleware } from "../middlewares/permissions.middleware.js";
import { PERMISSIONSMAP } from "#infra/config/permissions-map.js";

const levelsRouter = Router();

levelsRouter.post(
  "/create",
  AuthMiddleware.authenticate,
  PermissionsMiddleware.authorize([PERMISSIONSMAP.LEVEL_MANAGE]),
  requestContextMiddleware,
  (req, res, next) => levelsController.create(req, res, next)
);

levelsRouter.get(
  "/search",
  AuthMiddleware.authenticate,
  PermissionsMiddleware.authorize([PERMISSIONSMAP.LEVEL_VIEW]),
  (req, res, next) => levelsController.listAll(req, res, next)
);

levelsRouter.get(
  "/:levelId",
  AuthMiddleware.authenticate,
  PermissionsMiddleware.authorize([PERMISSIONSMAP.LEVEL_VIEW]),
  (req, res, next) => levelsController.getLevelData(req, res, next)
);

levelsRouter.put(
  "/:levelId",
  AuthMiddleware.authenticate,
  PermissionsMiddleware.authorize([PERMISSIONSMAP.LEVEL_MANAGE]),
  requestContextMiddleware,
  (req, res, next) => levelsController.updateLevelData(req, res, next)
);

levelsRouter.delete(
  "/:levelId",
  AuthMiddleware.authenticate,
  PermissionsMiddleware.authorize([PERMISSIONSMAP.LEVEL_MANAGE]),
  (req, res, next) => levelsController.deleteLevel(req, res, next)
);

export { levelsRouter };
