import { ICreatePersonUseCase } from "#core/use-cases/people.js";
import {
  IAuthenticateUserUseCase,
  IChangePasswordUseCase,
  IChangeUserDataUseCase,
  ICreateUserUseCase,
  IGetUserUseCase,
} from "#core/use-cases/users.js";
import {
  authenticateSchema,
  authIdentify,
  changePasswordSchema,
  createSchema,
  createUserWithNewPersonSchema,
  userUpdateSchema,
} from "#infra/validators/user-validators.js";
import { SucessResponse } from "#utils/sucess-response.js";
import { NextFunction, Request, Response } from "express";

export class UsersController {
  constructor(
    private readonly createPerson: ICreatePersonUseCase,
    private readonly createUser: ICreateUserUseCase,
    private readonly authenticateUser: IAuthenticateUserUseCase,
    private readonly getUser: IGetUserUseCase,
    private readonly changeUserPassword: IChangePasswordUseCase,
    private readonly changeUserData: IChangeUserDataUseCase
  ) {}

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const bodyData = createSchema.parse(req.body);

      const aUser = await this.createUser.execute({
        ...bodyData,
      });

      SucessResponse.created(res, aUser);
    } catch (error) {
      next(error);
    }
  }

  public async createWithNewPerson(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { bi, email, name, password, phone, role } =
        createUserWithNewPersonSchema.parse(req.body);

      const aPerson = await this.createPerson.execute({
        name,
        bi,
        phone,
      });

      const aUser = await this.createUser.execute({
        email,
        password,
        personId: aPerson.personId,
        role,
      });

      SucessResponse.created(res, aUser);
    } catch (error) {
      next(error);
    }
  }

  public async authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = authenticateSchema.parse(req.body);
      const aCustomer = await this.authenticateUser.execute(email, password);

      SucessResponse.ok(res, aCustomer);
    } catch (error) {
      next(error);
    }
  }

  public async getUserData(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = authIdentify.parse(req.query);

      const aCustomer = await this.getUser.execute(userId);

      SucessResponse.ok(res, aCustomer);
    } catch (error) {
      next(error);
    }
  }

  public async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = authIdentify.parse(req.query);
      const { password, newPassword } = changePasswordSchema.parse(req.body);

      const response = await this.changeUserPassword.execute({
        newPassword,
        password,
        userId,
      });

      SucessResponse.ok(res, response);
    } catch (error) {
      next(error);
    }
  }

  public async updateUserData(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = authIdentify.parse(req.query);
      const data = userUpdateSchema.parse(req.body);

      const response = await this.changeUserData.execute(userId, {
        ...(data ? data : {}),
      });

      SucessResponse.ok(res, response);
    } catch (error) {
      next(error);
    }
  }
}
