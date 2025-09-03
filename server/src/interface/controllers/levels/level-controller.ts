import {
  IChangeLevelDataUseCase,
  ICreateLevelUseCase,
  IDeleteLevelUseCase,
  IGetLevelUseCase,
} from "#core/use-cases/level.js";
import {
  createLevelSchema,
  LevelUpdateSchema,
  paramsIdentifySchema,
} from "#infra/validators/level-validators.js";
import { SucessResponse } from "#utils/sucess-response.js";
import { NextFunction, Request, Response } from "express";

export class LevelsController {
  constructor(
    private readonly createLevel: ICreateLevelUseCase,
    private readonly getLevel: IGetLevelUseCase,
    private readonly changeLevelData: IChangeLevelDataUseCase,
    private readonly deleteLevelUseCase: IDeleteLevelUseCase
  ) {}

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const bodyData = createLevelSchema.parse(req.body);

      const aLevel = await this.createLevel.execute({
        ...bodyData,
      });

      SucessResponse.created(res, aLevel);
    } catch (error) {
      next(error);
    }
  }

  public async getLevelData(req: Request, res: Response, next: NextFunction) {
    try {
      const { levelId } = paramsIdentifySchema.parse(req.params);

      const aCustomer = await this.getLevel.execute(levelId);

      SucessResponse.ok(res, aCustomer);
    } catch (error) {
      next(error);
    }
  }

  public async updateLevelData(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { levelId } = paramsIdentifySchema.parse(req.params);
      const data = LevelUpdateSchema.parse(req.body);

      const response = await this.changeLevelData.execute(levelId, {
        ...(data ? data : {}),
      });

      SucessResponse.ok(res, response);
    } catch (error) {
      next(error);
    }
  }

  public async deleteLevel(req: Request, res: Response, next: NextFunction) {
    try {
      const { levelId } = paramsIdentifySchema.parse(req.params);

      const response = await this.deleteLevelUseCase.execute(levelId);

      SucessResponse.ok(res, response);
    } catch (error) {
      next(error);
    }
  }
}
