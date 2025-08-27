import { ICreateUserUseCase } from "#core/use-cases/users.js";
import { registerSchema } from "#infra/validators/user-validators.js";
import { SucessResponse } from "#utils/sucess-response.js";
import { NextFunction, Request, Response } from "express";

export class UsersController {
  constructor(private readonly createUser: ICreateUserUseCase) {}

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = registerSchema.parse(req.body);

      const aCustomer = await this.createUser.execute({
        email,
        password,
      });

      SucessResponse.created(res, aCustomer);
    } catch (error) {
      next(error);
    }
  }
}
