import { Request, Response, NextFunction } from "express";
import { Prisma } from "#generated/prisma/index.js";
import { ZodError } from "zod";
import { DomainError } from "#core/errors/domain_error.js";
import { AuthError } from "#core/errors/auth_error.js";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof DomainError) {
    res.status(err.statusCode).json({
      success: false,
      errors: err.serializeErrors(),
    });
    return;
  }

  if (err instanceof ZodError) {
    const zodErrors = err.errors.map((e: any) => ({
      message: e.message,
      field: e.path.join("."),
    }));

    res.status(400).json({
      success: false,
      errors: zodErrors,
    });
    return;
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    res.status(400).json({
      success: false,
      errors: [{ message: "Falha no banco de dados", details: err.meta }],
    });
    return;
  }

  if (err instanceof SyntaxError && "body" in err) {
    res.status(400).json({
      success: false,
      errors: [{ message: "JSON inválido" }],
    });
    return;
  }

  if (err instanceof AuthError) {
    res.status(err.statusCode).json({
      success: false,
      errors: err.serializeErrors(),
    });
    return;
  }

  console.error("[Unhandled Error]", err);
  res.status(500).json({
    success: false,
    errors: [{ message: "Algum erro inesperado aconteceu" }],
  });
};
