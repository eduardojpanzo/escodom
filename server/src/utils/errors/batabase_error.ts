import { DomainError } from "#core/errors/domain_error.js";
import { Prisma } from "#generated/prisma/index.js";

export class DatabaseError extends DomainError {
  statusCode = 500;

  constructor(error: unknown) {
    let message = "A operação no banco de dados falhou";

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case "P2002":
          message = `Restrição exclusiva falhou no campo: ${error.meta?.target}`;
          break;
        case "P2025":
          message = "Registo não encontrado";
          break;
      }
    }

    super(message);
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
