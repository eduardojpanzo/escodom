import { GetLevelOutputDto } from "./levels-dto.js";

export type CreateClassInputDto = {
  name: string;
  description: string;
  levelId: string;
};

export type GetClassOutputDto = {
  name: string;
  description: string;
  levelId: string;
  level: GetLevelOutputDto;
};
