import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import { classroomsController } from "../controllers/classrooms/index.js";
import { requestContextMiddleware } from "../middlewares/request-context-middleware.js";
import { PermissionsMiddleware } from "../middlewares/permissions.middleware.js";
import { PERMISSIONSMAP } from "#infra/config/permissions-map.js";

const classroomsRouter = Router();

classroomsRouter.post(
  "/create",
  AuthMiddleware.authenticate,
  PermissionsMiddleware.authorize([PERMISSIONSMAP.CLASSROOM_MANAGE]),
  requestContextMiddleware,
  (req, res, next) => classroomsController.create(req, res, next)
);

classroomsRouter.get(
  "/search",
  AuthMiddleware.authenticate,
  PermissionsMiddleware.authorize([PERMISSIONSMAP.CLASSROOM_VIEW]),
  (req, res, next) => classroomsController.listAll(req, res, next)
);

classroomsRouter.get(
  "/:classroomId",
  AuthMiddleware.authenticate,
  PermissionsMiddleware.authorize([PERMISSIONSMAP.CLASSROOM_VIEW]),
  (req, res, next) => classroomsController.getClassroomData(req, res, next)
);

classroomsRouter.put(
  "/:classroomId",
  AuthMiddleware.authenticate,
  PermissionsMiddleware.authorize([PERMISSIONSMAP.CLASSROOM_MANAGE]),
  requestContextMiddleware,
  (req, res, next) => classroomsController.updateClassroomData(req, res, next)
);

classroomsRouter.delete(
  "/:classroomId",
  AuthMiddleware.authenticate,
  PermissionsMiddleware.authorize([PERMISSIONSMAP.CLASSROOM_MANAGE]),
  (req, res, next) => classroomsController.deleteClassroom(req, res, next)
);

export { classroomsRouter };
