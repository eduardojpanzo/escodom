import { Router } from "express";
import { studentsController } from "../controllers/students/index.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";

const studentsRouter = Router();

studentsRouter.post("/create", (req, res, next) =>
  studentsController.createWithNewPerson(req, res, next)
);

studentsRouter.get("/get/{accessKey}", (req, res, next) =>
  studentsController.getStudentByKeyData(req, res, next)
);

studentsRouter.get("/get", AuthMiddleware.authenticate, (req, res, next) =>
  studentsController.getStudentData(req, res, next)
);

studentsRouter.put(
  "/update/{studentId}",
  AuthMiddleware.authenticate,
  (req, res, next) => studentsController.updateStudentData(req, res, next)
);

studentsRouter.delete(
  "/delete",
  AuthMiddleware.authenticate,
  (req, res, next) => studentsController.deleteStudent(req, res, next)
);

export { studentsRouter };
