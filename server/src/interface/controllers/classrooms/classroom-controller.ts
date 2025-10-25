import {
  IChangeClassroomDataUseCase,
  ICreateClassroomUseCase,
  IDeleteClassroomUseCase,
  IGetAllClassroomsUseCase,
  IGetClassroomUseCase,
} from "#core/use-cases/classroom.js";
import {
  classroomUpdateSchema,
  createClassroomSchema,
  paramsIdentifySchema,
  queryparamsClassroomsSchema,
} from "#infra/validators/classroom-validators.js";
import { SucessResponse } from "#utils/sucess-response.js";
import { NextFunction, Request, Response } from "express";

export class ClassroomsController {
  constructor(
    private readonly createClassroom: ICreateClassroomUseCase,
    private readonly getClassroom: IGetClassroomUseCase,
    private readonly getAllClassrooms: IGetAllClassroomsUseCase,
    private readonly changeClassroomData: IChangeClassroomDataUseCase,
    private readonly deleteClassroomUseCase: IDeleteClassroomUseCase
  ) {}

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const bodyData = createClassroomSchema.parse(req.body);

      const aClassroom = await this.createClassroom.execute({
        ...bodyData,
      });

      SucessResponse.created(res, aClassroom);
    } catch (error) {
      next(error);
    }
  }

  public async getClassroomData(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { classroomId } = paramsIdentifySchema.parse(req.params);

      const aClassroom = await this.getClassroom.execute(classroomId);

      SucessResponse.ok(res, aClassroom);
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
        classId,
        name,
      } = queryparamsClassroomsSchema.parse(req.query);

      const result = await this.getAllClassrooms.execute({
        pageNumber: Number(pageNumber),
        pageSize: Number(pageSize),
        levelId,
        name,
        classId,
        orderBy,
      });

      SucessResponse.paginatedOk(res, result);
    } catch (error) {
      next(error);
    }
  }

  public async updateClassroomData(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { classroomId } = paramsIdentifySchema.parse(req.params);
      const data = classroomUpdateSchema.parse(req.body);

      const aClassroom = await this.changeClassroomData.execute(classroomId, {
        ...(data ? data : {}),
      });

      SucessResponse.ok(res, aClassroom);
    } catch (error) {
      next(error);
    }
  }

  public async deleteClassroom(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { classroomId } = paramsIdentifySchema.parse(req.params);

      const aClassroom = await this.deleteClassroomUseCase.execute(classroomId);

      SucessResponse.ok(res, aClassroom);
    } catch (error) {
      next(error);
    }
  }
}
