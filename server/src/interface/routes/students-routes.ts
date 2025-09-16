import { Router } from "express";
import { studentsController } from "../controllers/students/index.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";

const studentsRouter = Router();

studentsRouter.get("/get/{accessKey}", (req, res, next) =>
  studentsController.getStudentByKeyData(req, res, next)
);

studentsRouter.post("/create", AuthMiddleware.authenticate, (req, res, next) =>
  studentsController.createWithNewPerson(req, res, next)
);

studentsRouter.get("/search", AuthMiddleware.authenticate, (req, res, next) =>
  studentsController.listAll(req, res, next)
);

studentsRouter.get(
  "/{studentId}",
  AuthMiddleware.authenticate,
  (req, res, next) => studentsController.getStudentData(req, res, next)
);

studentsRouter.put(
  "/{studentId}",
  AuthMiddleware.authenticate,
  (req, res, next) => studentsController.updateStudentData(req, res, next)
);

studentsRouter.delete(
  "/{studentId}",
  AuthMiddleware.authenticate,
  (req, res, next) => studentsController.deleteStudent(req, res, next)
);

export { studentsRouter };
