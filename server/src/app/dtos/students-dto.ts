import { GetClassOutputDto } from "./classes-dto.js";
import { GetPersonOutputDto } from "./people-dto.js";

export type CreateStudentInputDto = {
  classId: string;
  personId: string;
};

export type GetStudentOutputDto = {
  accessKey: string;
  classId: string;
  class: GetClassOutputDto;
  personId: string;
  person: GetPersonOutputDto;
};
