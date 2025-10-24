import { Router } from "express";
import { schedulesController } from "../controllers/schedules/index.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import { requestContextMiddleware } from "../middlewares/request-context-middleware.js";
import { PermissionsMiddleware } from "../middlewares/permissions.middleware.js";
import { PERMISSIONSMAP } from "#infra/config/permissions-map.js";

const schedulesRouter = Router();

schedulesRouter.post(
  "/create",
  AuthMiddleware.authenticate,
  PermissionsMiddleware.authorize([PERMISSIONSMAP.SCHEDULE_MANAGE]),
  requestContextMiddleware,
  (req, res, next) => schedulesController.create(req, res, next)
);

schedulesRouter.get(
  "/search",
  AuthMiddleware.authenticate,
  PermissionsMiddleware.authorize([PERMISSIONSMAP.SCHEDULE_VIEW]),
  (req, res, next) => schedulesController.listAll(req, res, next)
);

schedulesRouter.get(
  "/:scheduleId",
  AuthMiddleware.authenticate,
  PermissionsMiddleware.authorize([PERMISSIONSMAP.SCHEDULE_VIEW]),
  (req, res, next) => schedulesController.getscheduleData(req, res, next)
);

schedulesRouter.put(
  "/:scheduleId",
  AuthMiddleware.authenticate,
  PermissionsMiddleware.authorize([PERMISSIONSMAP.SCHEDULE_MANAGE]),
  requestContextMiddleware,
  (req, res, next) => schedulesController.updatescheduleData(req, res, next)
);

schedulesRouter.delete(
  "/:scheduleId",
  AuthMiddleware.authenticate,
  PermissionsMiddleware.authorize([PERMISSIONSMAP.SCHEDULE_MANAGE]),
  (req, res, next) => schedulesController.deleteschedule(req, res, next)
);

export { schedulesRouter };
