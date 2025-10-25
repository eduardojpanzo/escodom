import { GetClassOutputDto } from "./classes-dto.js";
import { GetPersonOutputDto } from "./people-dto.js";

export type CreateStudentInputDto = {
  classroomId: string;
  personId: string;
};

export type GetStudentOutputDto = {
  accessKey: string;
  classroomId: string;
  classrooms: GetClassOutputDto;
  personId: string;
  people: GetPersonOutputDto;
};
