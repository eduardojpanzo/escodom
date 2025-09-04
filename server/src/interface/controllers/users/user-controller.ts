import { IGetPersonUseCase } from "#core/use-cases/people.js";
import {
  IAuthenticateUserUseCase,
  IChangePasswordUseCase,
  IChangeUserDataUseCase,
  ICreateUserUseCase,
  IDeleteUserUseCase,
  IGetUserUseCase,
} from "#core/use-cases/users.js";
import {
  authenticateSchema,
  authIdentify,
  changePasswordSchema,
  createSchema,
  createUserWithBiSchema,
  userUpdateSchema,
} from "#infra/validators/user-validators.js";
import { SucessResponse } from "#utils/sucess-response.js";
import { NextFunction, Request, Response } from "express";

export class UsersController {
  constructor(
    private readonly getPerson: IGetPersonUseCase,
    private readonly createUser: ICreateUserUseCase,
    private readonly authenticateUser: IAuthenticateUserUseCase,
    private readonly getUser: IGetUserUseCase,
    private readonly changeUserPassword: IChangePasswordUseCase,
    private readonly changeUserData: IChangeUserDataUseCase,
    private readonly deleteUserUseCase: IDeleteUserUseCase
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

  public async createWithBi(req: Request, res: Response, next: NextFunction) {
    try {
      const { bi, email, password, role } = createUserWithBiSchema.parse(
        req.body
      );

      const aPerson = await this.getPerson.execute({ bi });

      const aUser = await this.createUser.execute({
        email,
        password,
        personId: aPerson.personId!,
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

  public async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = authIdentify.parse(req.params);

      const response = await this.deleteUserUseCase.execute(userId);

      SucessResponse.ok(res, response);
    } catch (error) {
      next(error);
    }
  }
}
