import { Router } from "express";
import { usersController } from "../controllers/users/index.js";

const usersRouter = Router();

usersRouter.post("/create", (req, res, next) =>
  usersController.create(req, res, next)
);

export { usersRouter };
