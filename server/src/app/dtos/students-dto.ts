import { StudentsProps } from "#core/entities/students.js";
import { GetClassOutputDto } from "./classes-dto.js";
import { GetPersonOutputDto } from "./people-dto.js";

export type CreateStudentInputDto = Omit<
  StudentsProps,
  "studentId" | "accessKey" | "createdAt" | "updatedAt"
>;

export type GetStudentOutputDto = StudentsProps & {
  people: GetPersonOutputDto;
};
