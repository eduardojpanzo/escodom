import { LevelsProps } from "#core/entities/levels.js";

export type CreateLevelInputDto = Omit<
  LevelsProps,
  "levelId" | "createdAt" | "updatedAt"
>;

export type GetLevelOutputDto = LevelsProps;
