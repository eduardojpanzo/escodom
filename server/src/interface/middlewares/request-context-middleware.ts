import { Request, Response, NextFunction } from "express";
import { runWithRequestContext } from "#infra/context/request-context.js";
import { authIdentifySchema } from "#infra/validators/people-validators.js";

export function requestContextMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { personId } = authIdentifySchema.parse(req.query);
  runWithRequestContext({ personId }, () => {
    next();
  });
}
