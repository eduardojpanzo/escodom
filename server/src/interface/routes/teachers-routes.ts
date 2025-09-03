import { Router } from "express";
import { teachersController } from "../controllers/teachers/index.js";

const teachersRouter = Router();

teachersRouter.post("/create", (req, res, next) =>
  teachersController.createWithNewPerson(req, res, next)
);

teachersRouter.get("/get", (req, res, next) =>
  teachersController.getTeacherData(req, res, next)
);

teachersRouter.put("/update/{teacherId}", (req, res, next) =>
  teachersController.updateTeacherData(req, res, next)
);

teachersRouter.delete("/delete", (req, res, next) =>
  teachersController.deleteTeacher(req, res, next)
);

export { teachersRouter };
