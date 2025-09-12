import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import { levelsController } from "../controllers/levels/index.js";

const levelsRouter = Router();

levelsRouter.post("/create", AuthMiddleware.authenticate, (req, res, next) =>
  levelsController.create(req, res, next)
);

levelsRouter.get("/get", AuthMiddleware.authenticate, (req, res, next) =>
  levelsController.getLevelData(req, res, next)
);

levelsRouter.put(
  "/update/{levelId}",
  AuthMiddleware.authenticate,
  (req, res, next) => levelsController.updateLevelData(req, res, next)
);

levelsRouter.delete("/delete", AuthMiddleware.authenticate, (req, res, next) =>
  levelsController.deleteLevel(req, res, next)
);

export { levelsRouter };
