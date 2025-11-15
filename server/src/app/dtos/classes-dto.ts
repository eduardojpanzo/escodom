import { ClassesProps } from "#core/entities/classes.js";
import { GetLevelOutputDto } from "./levels-dto.js";

export type CreateClassInputDto = Omit<
  ClassesProps,
  "classId" | "createdAt" | "updatedAt"
>;

export type GetClassOutputDto = ClassesProps & {
  levels: GetLevelOutputDto;
};
