import { DomainError } from "./domain_error.js";

export class NotFoundError extends DomainError {
  statusCode = 404;

  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
