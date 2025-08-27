import { DomainError } from "./domain_error.js";

export class AuthError extends DomainError {
  constructor(
    public message: string,
    public code: string = "AUTH_ERROR",
    public statusCode: number = 401,
    public payload?: Record<string, any>
  ) {
    super(message);
    Object.setPrototypeOf(this, AuthError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.message,
        code: this.code,
        ...(this.payload && { details: this.payload }),
      },
    ];
  }
}
