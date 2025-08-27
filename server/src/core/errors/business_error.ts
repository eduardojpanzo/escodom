import { DomainError } from "./domain_error.js";

export class BusinessError extends DomainError {
  statusCode = 409;

  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, BusinessError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
