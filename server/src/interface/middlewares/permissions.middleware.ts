import { AuthError } from "#core/errors/auth_error.js";
import { Response, Request, NextFunction } from "express";

export class PermissionsMiddleware {
  static authorize(requiredPermissions: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const userPermissions = (req as any).query?.permissions;

        if (!userPermissions) {
          throw new AuthError("Permissões do usuário não encontradas");
        }

        const hasPermission = requiredPermissions.every((p) =>
          userPermissions.includes(p)
        );

        if (!hasPermission) {
          throw new AuthError("Acesso negado", "FORBIDDEN", 403);
        }

        next();
      } catch (err) {
        next(err);
      }
    };
  }
}
