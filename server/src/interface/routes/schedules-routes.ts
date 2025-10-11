import { Router } from "express";
import { schedulesController } from "../controllers/schedules/index.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import { requestContextMiddleware } from "../middlewares/request-context-middleware.js";

const schedulesRouter = Router();

schedulesRouter.post(
  "/create",
  AuthMiddleware.authenticate,
  requestContextMiddleware,
  (req, res, next) => schedulesController.create(req, res, next)
);

schedulesRouter.get("/search", AuthMiddleware.authenticate, (req, res, next) =>
  schedulesController.listAll(req, res, next)
);

schedulesRouter.get(
  "/:scheduleId",
  AuthMiddleware.authenticate,
  (req, res, next) => schedulesController.getscheduleData(req, res, next)
);

schedulesRouter.put(
  "/:scheduleId",
  AuthMiddleware.authenticate,
  requestContextMiddleware,
  (req, res, next) => schedulesController.updatescheduleData(req, res, next)
);

schedulesRouter.delete(
  "/:scheduleId",
  AuthMiddleware.authenticate,
  (req, res, next) => schedulesController.deleteschedule(req, res, next)
);

export { schedulesRouter };
