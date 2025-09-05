import { LevelsProps } from "#core/entities/levels.js";

export interface ICreateLevelUseCase {
  execute(
    data: Pick<LevelsProps, "name" | "description">
  ): Promise<{ levelId: string }>;
}

export interface IGetLevelUseCase {
  execute(levelId: string): Promise<LevelsProps>;
}

export interface IDeleteLevelUseCase {
  execute(levelId: string): Promise<{ levelId: string }>;
}

export interface IChangeLevelDataUseCase {
  execute(
    levelId: string,
    data: Partial<LevelsProps>
  ): Promise<{ levelId: string }>;
}
