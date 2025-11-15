import { TeachersProps } from "#core/entities/teachers.js";
import { GetPersonOutputDto } from "./people-dto.js";

export type CreateTeacherInputDto = Omit<
  TeachersProps,
  "teacherId" | "createdAt" | "updatedAt"
>;

export type GetTeacherOutputDto = TeachersProps & {
  people: GetPersonOutputDto;
};
