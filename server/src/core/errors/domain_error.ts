export abstract class DomainError extends Error {
  abstract statusCode: number;
  abstract serializeErrors(): { message: string; field?: string }[];

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, DomainError.prototype);
  }
}
