import { AuthError } from "#core/errors/auth_error.js";
import { Request, Response, NextFunction } from "express";
import { jwtVerify } from "jose";

export class AuthMiddleware {
  static async authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        throw new AuthError("dados de acesso não fornecido", "MISSING_TOKEN");
      }

      const [bearer, token] = authHeader.split(" ");
      if (bearer !== "Bearer" || !token) {
        throw new AuthError("dados de acesso não fornecido", "MISSING_TOKEN");
      }

      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET!)
      );

      if (!payload.personId || typeof payload.personId !== "string") {
        throw new AuthError("Não foi possivel identificar o usuário");
      }

      req.query = req.query
        ? { ...req.query, personId: payload.personId }
        : { personId: payload.personId };

      next();
    } catch (error: any) {
      if (error.code === "ERR_JWT_EXPIRED") {
        return next(
          new AuthError(
            "autenticação expirada ou inválida",
            "TOKEN_EXPIRED",
            401,
            {
              expiredAt: new Date(error.payload.exp * 1000).toISOString(),
            }
          )
        );
      }

      next(
        new AuthError(
          "Falha na autenticação ou acesso inválida",
          "INVALID_TOKEN"
        )
      );
    }
  }
}
