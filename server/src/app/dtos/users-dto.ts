import { GetPersonOutputDto } from "./people-dto.js";

export type CreateUserInputDto = {
  email: string;
  password: string;
  personId: string;
  role?: "teacher" | "student";
};

export type ChangePasswordInputDto = {
  userId: string;
  password: string;
  newPassword: string;
};

export type GetUserOutputDto = {
  email: string;
  personId: string;
  person: GetPersonOutputDto;
  role?: "teacher" | "student";
};
