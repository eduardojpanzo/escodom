import { Router } from "express";
import { teachersController } from "../controllers/teachers/index.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";

const teachersRouter = Router();

teachersRouter.post("/create", (req, res, next) =>
  teachersController.createWithNewPerson(req, res, next)
);

teachersRouter.get("/get", AuthMiddleware.authenticate, (req, res, next) =>
  teachersController.getTeacherData(req, res, next)
);

teachersRouter.put(
  "/update/{teacherId}",
  AuthMiddleware.authenticate,
  (req, res, next) => teachersController.updateTeacherData(req, res, next)
);

teachersRouter.delete(
  "/delete",
  AuthMiddleware.authenticate,
  (req, res, next) => teachersController.deleteTeacher(req, res, next)
);

export { teachersRouter };
