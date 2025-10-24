import { Router } from "express";
import { teachersController } from "../controllers/teachers/index.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import { requestContextMiddleware } from "../middlewares/request-context-middleware.js";
import { PermissionsMiddleware } from "../middlewares/permissions.middleware.js";
import { PERMISSIONSMAP } from "#infra/config/permissions-map.js";

const teachersRouter = Router();

teachersRouter.post(
  "/create",
  AuthMiddleware.authenticate,
  PermissionsMiddleware.authorize([
    PERMISSIONSMAP.TEACHER_MANAGE,
    PERMISSIONSMAP.PEOPLE_MANAGE,
  ]),
  requestContextMiddleware,
  (req, res, next) => teachersController.createWithNewPerson(req, res, next)
);

teachersRouter.get(
  "/search",
  AuthMiddleware.authenticate,
  PermissionsMiddleware.authorize([PERMISSIONSMAP.TEACHER_VIEW]),
  (req, res, next) => teachersController.listAll(req, res, next)
);

teachersRouter.get(
  "/:teacherId",
  AuthMiddleware.authenticate,
  PermissionsMiddleware.authorize([PERMISSIONSMAP.TEACHER_VIEW]),
  (req, res, next) => teachersController.getTeacherData(req, res, next)
);

teachersRouter.put(
  "/:teacherId",
  AuthMiddleware.authenticate,
  PermissionsMiddleware.authorize([PERMISSIONSMAP.TEACHER_MANAGE]),
  requestContextMiddleware,
  (req, res, next) => teachersController.updateTeacherData(req, res, next)
);

teachersRouter.delete(
  "/:teacherId",
  AuthMiddleware.authenticate,
  PermissionsMiddleware.authorize([PERMISSIONSMAP.TEACHER_MANAGE]),
  (req, res, next) => teachersController.deleteTeacher(req, res, next)
);

export { teachersRouter };
