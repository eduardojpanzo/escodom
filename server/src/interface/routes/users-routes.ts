import { Router } from "express";
import { usersController } from "../controllers/users/index.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";

const usersRouter = Router();

usersRouter.post("/create", (req, res, next) =>
  usersController.createWithBi(req, res, next)
);

usersRouter.post(
  "/create-from-person",
  AuthMiddleware.authenticate,
  (req, res, next) => usersController.create(req, res, next)
);

usersRouter.get("/get", AuthMiddleware.authenticate, (req, res, next) =>
  usersController.getUserData(req, res, next)
);

usersRouter.get("/delete", AuthMiddleware.authenticate, (req, res, next) =>
  usersController.deleteUser(req, res, next)
);

export { usersRouter };
