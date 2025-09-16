import { ICreatePersonUseCase } from "#core/use-cases/people.js";
import {
  IChangeStudentDataUseCase,
  ICreateStudentUseCase,
  IDeleteStudentUseCase,
  IGetAllStudentsUseCase,
  IGetStudentByKeyUseCase,
  IGetStudentUseCase,
} from "#core/use-cases/stundet.js";
import {
  createStudentSchema,
  createStudentWithNewPersonSchema,
  paramsIdentifySchema,
  paramsKeySchema,
  queryparamsStudentsSchema,
  StudentUpdateSchema,
} from "#infra/validators/student-validators.js";
import { SucessResponse } from "#utils/sucess-response.js";
import { NextFunction, Request, Response } from "express";

export class StudentsController {
  constructor(
    private readonly createPerson: ICreatePersonUseCase,
    private readonly createStudent: ICreateStudentUseCase,
    private readonly getStudent: IGetStudentUseCase,
    private readonly getAllStudents: IGetAllStudentsUseCase,
    private readonly getStudentByKey: IGetStudentByKeyUseCase,
    private readonly changeStudentData: IChangeStudentDataUseCase,
    private readonly deleteStudentUseCase: IDeleteStudentUseCase
  ) {}

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const bodyData = createStudentSchema.parse(req.body);

      const aStudent = await this.createStudent.execute({
        ...bodyData,
      });

      SucessResponse.created(res, aStudent);
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
      const { name, phone, baptized, profession, birthDate, classId } =
        createStudentWithNewPersonSchema.parse(req.body);

      const aPerson = await this.createPerson.execute({
        name,
        phone,
        baptized,
        birthDate,
        profession,
        type: "aluno",
      });

      const aStudent = await this.createStudent.execute({
        personId: aPerson.personId,
        classId,
      });

      SucessResponse.created(res, aStudent);
    } catch (error) {
      next(error);
    }
  }

  public async getStudentData(req: Request, res: Response, next: NextFunction) {
    try {
      const { studentId } = paramsIdentifySchema.parse(req.params);

      const aStudent = await this.getStudent.execute(studentId);

      SucessResponse.ok(res, aStudent);
    } catch (error) {
      next(error);
    }
  }

  public async getStudentByKeyData(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { accessKey } = paramsKeySchema.parse(req.params);

      const aStudent = await this.getStudentByKey.execute(accessKey);

      SucessResponse.ok(res, aStudent);
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
        classId,
        levelId,
        name,
      } = queryparamsStudentsSchema.parse(req.query);

      const result = await this.getAllStudents.execute({
        pageNumber: Number(pageNumber),
        pageSize: Number(pageSize),
        classId,
        levelId,
        name,
        orderBy,
      });

      SucessResponse.paginatedOk(res, result);
    } catch (error) {
      next(error);
    }
  }

  public async updateStudentData(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { studentId } = paramsIdentifySchema.parse(req.params);
      const data = StudentUpdateSchema.parse(req.body);

      const aStudent = await this.changeStudentData.execute(studentId, {
        ...(data ? data : {}),
      });

      SucessResponse.ok(res, aStudent);
    } catch (error) {
      next(error);
    }
  }

  public async deleteStudent(req: Request, res: Response, next: NextFunction) {
    try {
      const { studentId } = paramsIdentifySchema.parse(req.params);

      const aStudent = await this.deleteStudentUseCase.execute(studentId);

      SucessResponse.ok(res, aStudent);
    } catch (error) {
      next(error);
    }
  }
}
