import {
  IChangeLevelDataUseCase,
  ICreateLevelUseCase,
  IDeleteLevelUseCase,
  IGetAllLevelsUseCase,
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
    private readonly getAllLevels: IGetAllLevelsUseCase,
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

      const aLevel = await this.getLevel.execute(levelId);

      SucessResponse.ok(res, aLevel);
    } catch (error) {
      next(error);
    }
  }

  public async listAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.getAllLevels.execute();

      SucessResponse.ok(res, result);
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

      const aLevel = await this.changeLevelData.execute(levelId, {
        ...(data ? data : {}),
      });

      SucessResponse.ok(res, aLevel);
    } catch (error) {
      next(error);
    }
  }

  public async deleteLevel(req: Request, res: Response, next: NextFunction) {
    try {
      const { levelId } = paramsIdentifySchema.parse(req.params);

      const aLevel = await this.deleteLevelUseCase.execute(levelId);

      SucessResponse.ok(res, aLevel);
    } catch (error) {
      next(error);
    }
  }
}
