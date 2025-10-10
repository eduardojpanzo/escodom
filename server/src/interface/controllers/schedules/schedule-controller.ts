import {
  IChangeScheduleDataUseCase,
  ICreateScheduleUseCase,
  IDeleteScheduleUseCase,
  IGetAllSchedulesUseCase,
  IGetScheduleUseCase,
} from "#core/use-cases/schedules.js";
import {
  createScheduleSchema,
  paramsIdentifySchema,
  queryparamsSchedulesSchema,
  ScheduleUpdateSchema,
} from "#infra/validators/schedule-validators.js";
import { SucessResponse } from "#utils/sucess-response.js";
import { NextFunction, Request, Response } from "express";

export class SchedulesController {
  constructor(
    private readonly createschedule: ICreateScheduleUseCase,
    private readonly getschedule: IGetScheduleUseCase,
    private readonly getAllschedules: IGetAllSchedulesUseCase,
    private readonly changescheduleData: IChangeScheduleDataUseCase,
    private readonly deletescheduleUseCase: IDeleteScheduleUseCase
  ) {}

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const bodyData = createScheduleSchema.parse(req.body);

      const aschedule = await this.createschedule.execute({
        ...bodyData,
      });

      SucessResponse.created(res, aschedule);
    } catch (error) {
      next(error);
    }
  }

  public async getscheduleData(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { scheduleId } = paramsIdentifySchema.parse(req.params);

      const aschedule = await this.getschedule.execute(scheduleId);

      SucessResponse.ok(res, aschedule);
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
        teacherId,
        active,
        endDate,
        startDate,
      } = queryparamsSchedulesSchema.parse(req.query);

      const result = await this.getAllschedules.execute({
        pageNumber: Number(pageNumber),
        pageSize: Number(pageSize),
        classId,
        teacherId,
        endDate,
        startDate,
        active,
        orderBy,
      });

      SucessResponse.paginatedOk(res, result);
    } catch (error) {
      next(error);
    }
  }

  public async updatescheduleData(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { scheduleId } = paramsIdentifySchema.parse(req.params);
      const data = ScheduleUpdateSchema.parse(req.body);

      const aschedule = await this.changescheduleData.execute(scheduleId, {
        ...(data ? data : {}),
      });

      SucessResponse.ok(res, aschedule);
    } catch (error) {
      next(error);
    }
  }

  public async deleteschedule(req: Request, res: Response, next: NextFunction) {
    try {
      const { scheduleId } = paramsIdentifySchema.parse(req.params);

      const aschedule = await this.deletescheduleUseCase.execute(scheduleId);

      SucessResponse.ok(res, aschedule);
    } catch (error) {
      next(error);
    }
  }
}
