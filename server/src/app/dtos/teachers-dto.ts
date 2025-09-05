import { GetPersonOutputDto } from "./people-dto.js";

export type CreateTeacherInputDto = {
  personId: string;
  position: string;
  trainingYear: Date;
};

export type GetTeacherOutputDto = {
  position: string;
  trainingYear: Date;
  personId: string;
  person: GetPersonOutputDto;
};
