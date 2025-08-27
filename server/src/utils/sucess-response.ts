import { Response } from "express";

export class SucessResponse {
  static ok<T>(res: Response, data: T, statusCode = 200) {
    res.status(statusCode).json({
      success: true,
      data,
    });
  }

  static created<T>(res: Response, data: T) {
    res.status(201).json({
      success: true,
      data,
    });
  }

  static noContent(res: Response) {
    res.status(204).end();
  }
}
