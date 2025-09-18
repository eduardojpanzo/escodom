import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import { peopleController } from "../controllers/people/index.js";

const peopleRouter = Router();

peopleRouter.get("/get", AuthMiddleware.authenticate, (req, res, next) =>
  peopleController.getPersonData(req, res, next)
);

peopleRouter.put("/{personId}", AuthMiddleware.authenticate, (req, res, next) =>
  peopleController.updateUserData(req, res, next)
);

export { peopleRouter };
