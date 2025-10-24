import { GetPersonOutputDto } from "./people-dto.js";

export type CreateUserInputDto = {
  email: string;
  password: string;
  personId: string;
  permissions: string[];
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
  permissions: string[];
  person: GetPersonOutputDto;
  role?: "teacher" | "student";
};

export type JWTPayload = {
  personId: string;
  role?: "teacher" | "student" | undefined;
  permissions: string[];
};
