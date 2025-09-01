import { ICreatePersonUseCase } from "#core/use-cases/people.js";
import {
  IChangeTeacherDataUseCase,
  ICreateTeacherUseCase,
  IDeleteTeacherUseCase,
  IGetTeacherUseCase,
} from "#core/use-cases/teacher.js";
import {
  createTeacherSchema,
  createTeacherWithNewPersonSchema,
  paramsIdentifySchema,
  teacherUpdateSchema,
} from "#infra/validators/teacher-validators.js";
import { SucessResponse } from "#utils/sucess-response.js";
import { NextFunction, Request, Response } from "express";

export class TeachersController {
  constructor(
    private readonly createPerson: ICreatePersonUseCase,
    private readonly createTeacher: ICreateTeacherUseCase,
    private readonly getTeacher: IGetTeacherUseCase,
    private readonly changeTeacherData: IChangeTeacherDataUseCase,
    private readonly deleteTeacherUseCase: IDeleteTeacherUseCase
  ) {}

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const bodyData = createTeacherSchema.parse(req.body);

      const aTeacher = await this.createTeacher.execute({
        ...bodyData,
      });

      SucessResponse.created(res, aTeacher);
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
      const { bi, position, name, trainingYear, phone } =
        createTeacherWithNewPersonSchema.parse(req.body);

      const aPerson = await this.createPerson.execute({
        name,
        bi,
        phone,
      });

      const aTeacher = await this.createTeacher.execute({
        personId: aPerson.personId,
        position,
        trainingYear,
      });

      SucessResponse.created(res, aTeacher);
    } catch (error) {
      next(error);
    }
  }

  public async getTeacherData(req: Request, res: Response, next: NextFunction) {
    try {
      const { teacherId } = paramsIdentifySchema.parse(req.query);

      const aCustomer = await this.getTeacher.execute(teacherId);

      SucessResponse.ok(res, aCustomer);
    } catch (error) {
      next(error);
    }
  }

  public async updateTeacherData(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { teacherId } = paramsIdentifySchema.parse(req.query);
      const data = teacherUpdateSchema.parse(req.body);

      const response = await this.changeTeacherData.execute(teacherId, {
        ...(data ? data : {}),
      });

      SucessResponse.ok(res, response);
    } catch (error) {
      next(error);
    }
  }

  public async deleteTeacher(req: Request, res: Response, next: NextFunction) {
    try {
      const { teacherId } = paramsIdentifySchema.parse(req.query);

      const response = await this.deleteTeacherUseCase.execute(teacherId);

      SucessResponse.ok(res, response);
    } catch (error) {
      next(error);
    }
  }
}
