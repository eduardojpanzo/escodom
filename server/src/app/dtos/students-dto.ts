import { GetClassOutputDto } from "./classes-dto.js";
import { GetPersonOutputDto } from "./people-dto.js";

export type CreateStudentInputDto = {
  accessKey: string;
  birthDate: Date;
  classId: string;
  personId: string;
};

export type GetStudentOutputDto = {
  accessKey: string;
  birthDate: Date;
  classId: string;
  class: GetClassOutputDto;
  personId: string;
  person: GetPersonOutputDto;
};
