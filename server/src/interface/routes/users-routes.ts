import { Router } from "express";
import { usersController } from "../controllers/users/index.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import { peopleController } from "../controllers/people/index.js";

const usersRouter = Router();

usersRouter.post("/create", (req, res, next) =>
  usersController.createWithCode(req, res, next)
);

usersRouter.post("/singin", (req, res, next) =>
  usersController.authenticate(req, res, next)
);

usersRouter.post(
  "/create-from-person",
  AuthMiddleware.authenticate,
  (req, res, next) => usersController.create(req, res, next)
);

usersRouter.get("/profile", AuthMiddleware.authenticate, (req, res, next) =>
  peopleController.getPersonData(req, res, next)
);

usersRouter.get("/{userId}", AuthMiddleware.authenticate, (req, res, next) =>
  usersController.getUserData(req, res, next)
);

usersRouter.put(
  "/change-password",
  AuthMiddleware.authenticate,
  (req, res, next) => usersController.changePassword(req, res, next)
);

usersRouter.put(
  "/change-users",
  AuthMiddleware.authenticate,
  (req, res, next) => usersController.updateUserData(req, res, next)
);

usersRouter.delete("/{userId}", AuthMiddleware.authenticate, (req, res, next) =>
  usersController.deleteUser(req, res, next)
);

export { usersRouter };
