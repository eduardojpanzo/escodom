import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import { peopleController } from "../controllers/people/index.js";
import { PermissionsMiddleware } from "../middlewares/permissions.middleware.js";
import { PERMISSIONSMAP } from "#infra/config/permissions-map.js";

const peopleRouter = Router();

peopleRouter.get(
  "/get",
  AuthMiddleware.authenticate,
  PermissionsMiddleware.authorize([PERMISSIONSMAP.PEOPLE_VIEW]),
  (req, res, next) => peopleController.getProfileData(req, res, next)
);

peopleRouter.get(
  "/:personId",
  AuthMiddleware.authenticate,
  PermissionsMiddleware.authorize([PERMISSIONSMAP.PEOPLE_VIEW]),
  (req, res, next) => peopleController.getPersonData(req, res, next)
);

peopleRouter.put(
  "/:personId",
  AuthMiddleware.authenticate,
  PermissionsMiddleware.authorize([PERMISSIONSMAP.PEOPLE_MANAGE]),
  (req, res, next) => peopleController.updateUserData(req, res, next)
);

export { peopleRouter };
