import {
  IChangeClassDataUseCase,
  ICreateClassUseCase,
  IDeleteClassUseCase,
  IGetClassUseCase,
} from "#core/use-cases/class.js";
import {
  classUpdateSchema,
  createClassSchema,
  paramsIdentifySchema,
} from "#infra/validators/class-validators.js";
import { SucessResponse } from "#utils/sucess-response.js";
import { NextFunction, Request, Response } from "express";

export class ClassesController {
  constructor(
    private readonly createClass: ICreateClassUseCase,
    private readonly getClass: IGetClassUseCase,
    private readonly changeClassData: IChangeClassDataUseCase,
    private readonly deleteClassUseCase: IDeleteClassUseCase
  ) {}

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const bodyData = createClassSchema.parse(req.body);

      const aClass = await this.createClass.execute({
        ...bodyData,
      });

      SucessResponse.created(res, aClass);
    } catch (error) {
      next(error);
    }
  }

  public async getClassData(req: Request, res: Response, next: NextFunction) {
    try {
      const { classId } = paramsIdentifySchema.parse(req.params);

      const aCustomer = await this.getClass.execute(classId);

      SucessResponse.ok(res, aCustomer);
    } catch (error) {
      next(error);
    }
  }

  public async updateClassData(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { classId } = paramsIdentifySchema.parse(req.params);
      const data = classUpdateSchema.parse(req.body);

      const response = await this.changeClassData.execute(classId, {
        ...(data ? data : {}),
      });

      SucessResponse.ok(res, response);
    } catch (error) {
      next(error);
    }
  }

  public async deleteClass(req: Request, res: Response, next: NextFunction) {
    try {
      const { classId } = paramsIdentifySchema.parse(req.params);

      const response = await this.deleteClassUseCase.execute(classId);

      SucessResponse.ok(res, response);
    } catch (error) {
      next(error);
    }
  }
}
