import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import { classesController } from "../controllers/classes/index.js";

const classesRouter = Router();

classesRouter.post("/create", AuthMiddleware.authenticate, (req, res, next) =>
  classesController.create(req, res, next)
);

classesRouter.get("/get", AuthMiddleware.authenticate, (req, res, next) =>
  classesController.getClassData(req, res, next)
);

classesRouter.put(
  "/update/{classId}",
  AuthMiddleware.authenticate,
  (req, res, next) => classesController.updateClassData(req, res, next)
);

classesRouter.delete("/delete", AuthMiddleware.authenticate, (req, res, next) =>
  classesController.deleteClass(req, res, next)
);

export { classesRouter };
