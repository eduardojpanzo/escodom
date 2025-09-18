import { ICreatePersonUseCase } from "#core/use-cases/people.js";
import {
  IChangeTeacherDataUseCase,
  ICreateTeacherUseCase,
  IDeleteTeacherUseCase,
  IGetAllTeachersUseCase,
  IGetTeacherUseCase,
} from "#core/use-cases/teacher.js";
import {
  createTeacherSchema,
  createTeacherWithNewPersonSchema,
  paramsIdentifySchema,
  queryparamsTeacherSchema,
  teacherUpdateSchema,
} from "#infra/validators/teacher-validators.js";
import { SucessResponse } from "#utils/sucess-response.js";
import { NextFunction, Request, Response } from "express";

export class TeachersController {
  constructor(
    private readonly createPerson: ICreatePersonUseCase,
    private readonly createTeacher: ICreateTeacherUseCase,
    private readonly getTeacher: IGetTeacherUseCase,
    private readonly getAllTeachers: IGetAllTeachersUseCase,
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
      const {
        position,
        name,
        baptized,
        birthDate,
        profession,
        trainingYear,
        phone,
      } = createTeacherWithNewPersonSchema.parse(req.body);

      const aPerson = await this.createPerson.execute({
        name,
        phone,
        baptized,
        birthDate,
        profession,
        type: "monitor",
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

  public async listAll(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        pageNumber = 1,
        pageSize = 10,
        orderBy,
        position,
        trainingYear,
      } = queryparamsTeacherSchema.parse(req.query);

      const result = await this.getAllTeachers.execute({
        pageNumber: Number(pageNumber),
        pageSize: Number(pageSize),
        position,
        trainingYear,
        orderBy,
      });

      SucessResponse.paginatedOk(res, result);
    } catch (error) {
      next(error);
    }
  }

  public async getTeacherData(req: Request, res: Response, next: NextFunction) {
    try {
      const { teacherId } = paramsIdentifySchema.parse(req.params);

      const aTeacher = await this.getTeacher.execute(teacherId);

      SucessResponse.ok(res, aTeacher);
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
      const { teacherId } = paramsIdentifySchema.parse(req.params);
      const data = teacherUpdateSchema.parse(req.body);

      const aTeacher = await this.changeTeacherData.execute(teacherId, {
        ...(data ? data : {}),
      });

      SucessResponse.ok(res, aTeacher);
    } catch (error) {
      next(error);
    }
  }

  public async deleteTeacher(req: Request, res: Response, next: NextFunction) {
    try {
      const { teacherId } = paramsIdentifySchema.parse(req.params);

      const aTeacher = await this.deleteTeacherUseCase.execute(teacherId);

      SucessResponse.ok(res, aTeacher);
    } catch (error) {
      next(error);
    }
  }
}
