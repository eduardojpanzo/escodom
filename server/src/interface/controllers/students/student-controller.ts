import { ICreatePersonUseCase } from "#core/use-cases/people.js";
import {
  IChangeStudentDataUseCase,
  ICreateStudentUseCase,
  IDeleteStudentUseCase,
  IGetStudentUseCase,
} from "#core/use-cases/stundet.js";
import {
  createStudentSchema,
  createStudentWithNewPersonSchema,
  paramsIdentifySchema,
  StudentUpdateSchema,
} from "#infra/validators/student-validators.js";
import { SucessResponse } from "#utils/sucess-response.js";
import { NextFunction, Request, Response } from "express";

export class StudentsController {
  constructor(
    private readonly createPerson: ICreatePersonUseCase,
    private readonly createStudent: ICreateStudentUseCase,
    private readonly getStudent: IGetStudentUseCase,
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
      const { bi, name, phone, accessKey, birthDate, classId } =
        createStudentWithNewPersonSchema.parse(req.body);

      const aPerson = await this.createPerson.execute({
        name,
        bi,
        phone,
      });

      const aStudent = await this.createStudent.execute({
        personId: aPerson.personId,
        accessKey,
        birthDate,
        classId,
      });

      SucessResponse.created(res, aStudent);
    } catch (error) {
      next(error);
    }
  }

  public async getStudentData(req: Request, res: Response, next: NextFunction) {
    try {
      const { studentId } = paramsIdentifySchema.parse(req.query);

      const aCustomer = await this.getStudent.execute(studentId);

      SucessResponse.ok(res, aCustomer);
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
      const { studentId } = paramsIdentifySchema.parse(req.query);
      const data = StudentUpdateSchema.parse(req.body);

      const response = await this.changeStudentData.execute(studentId, {
        ...(data ? data : {}),
      });

      SucessResponse.ok(res, response);
    } catch (error) {
      next(error);
    }
  }

  public async deleteStudent(req: Request, res: Response, next: NextFunction) {
    try {
      const { studentId } = paramsIdentifySchema.parse(req.query);

      const response = await this.deleteStudentUseCase.execute(studentId);

      SucessResponse.ok(res, response);
    } catch (error) {
      next(error);
    }
  }
}
