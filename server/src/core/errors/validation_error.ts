import { DomainError } from "./domain_error.js";

export class ValidationError extends DomainError {
  statusCode = 400;

  constructor(public errors: { message: string; field?: string }[]) {
    super("Problema de validação");
    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  serializeErrors() {
    return this.errors;
  }
}
