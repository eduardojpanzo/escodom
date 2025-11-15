import { Router } from "express";
import { usersController } from "../controllers/users/index.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import { peopleController } from "../controllers/people/index.js";
import { requestContextMiddleware } from "../middlewares/request-context-middleware.js";
import { PermissionsMiddleware } from "../middlewares/permissions.middleware.js";
import { PERMISSIONSMAP } from "#infra/config/permissions-map.js";

const usersRouter = Router();

usersRouter.post("/create", requestContextMiddleware, (req, res, next) =>
  usersController.createWithCode(req, res, next)
);

usersRouter.post("/singin", (req, res, next) =>
  usersController.authenticate(req, res, next)
);

usersRouter.post(
  "/create-from-person",
  AuthMiddleware.authenticate,
  PermissionsMiddleware.authorize([
    PERMISSIONSMAP.PEOPLE_MANAGE,
    PERMISSIONSMAP.USER_MANAGE,
  ]),
  requestContextMiddleware,
  (req, res, next) => usersController.create(req, res, next)
);

usersRouter.get("/profile", AuthMiddleware.authenticate, (req, res, next) =>
  peopleController.getProfileData(req, res, next)
);

usersRouter.get(
  "/:userId",
  AuthMiddleware.authenticate,
  PermissionsMiddleware.authorize([PERMISSIONSMAP.USER_VIEW]),
  (req, res, next) => usersController.getUserData(req, res, next)
);

usersRouter.put(
  "/change-password",
  AuthMiddleware.authenticate,
  PermissionsMiddleware.authorize([PERMISSIONSMAP.USER_MANAGE]),
  requestContextMiddleware,
  (req, res, next) => usersController.changePassword(req, res, next)
);

usersRouter.put(
  "/:userId",
  AuthMiddleware.authenticate,
  PermissionsMiddleware.authorize([PERMISSIONSMAP.USER_MANAGE]),
  (req, res, next) => usersController.updateUserData(req, res, next)
);

usersRouter.delete(
  "/:userId",
  AuthMiddleware.authenticate,
  PermissionsMiddleware.authorize([PERMISSIONSMAP.USER_MANAGE]),
  (req, res, next) => usersController.deleteUser(req, res, next)
);

export { usersRouter };
