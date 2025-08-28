import { DomainError } from "./domain_error.js";

export class ServerError extends DomainError {
  statusCode = 500;

  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, ServerError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
