import {
  IChangeClassDataUseCase,
  ICreateClassUseCase,
  IDeleteClassUseCase,
  IGetAllClassesUseCase,
  IGetClassUseCase,
} from "#core/use-cases/class.js";
import {
  classUpdateSchema,
  createClassSchema,
  paramsIdentifySchema,
  queryparamsClassesSchema,
} from "#infra/validators/class-validators.js";
import { SucessResponse } from "#utils/sucess-response.js";
import { NextFunction, Request, Response } from "express";

export class ClassesController {
  constructor(
    private readonly createClass: ICreateClassUseCase,
    private readonly getClass: IGetClassUseCase,
    private readonly getAllClasses: IGetAllClassesUseCase,
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

      const aClass = await this.getClass.execute(classId);

      SucessResponse.ok(res, aClass);
    } catch (error) {
      next(error);
    }
  }

  public async listAll(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        pageNumber = 1,
        pageSize = 10,
        orderBy,
        levelId,
        name,
      } = queryparamsClassesSchema.parse(req.query);

      const result = await this.getAllClasses.execute({
        pageNumber: Number(pageNumber),
        pageSize: Number(pageSize),
        levelId,
        name,
        orderBy,
      });

      SucessResponse.paginatedOk(res, result);
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

      const aClass = await this.changeClassData.execute(classId, {
        ...(data ? data : {}),
      });

      SucessResponse.ok(res, aClass);
    } catch (error) {
      next(error);
    }
  }

  public async deleteClass(req: Request, res: Response, next: NextFunction) {
    try {
      const { classId } = paramsIdentifySchema.parse(req.params);

      const aClass = await this.deleteClassUseCase.execute(classId);

      SucessResponse.ok(res, aClass);
    } catch (error) {
      next(error);
    }
  }
}
