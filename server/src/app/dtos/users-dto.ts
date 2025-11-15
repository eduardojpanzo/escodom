import { UsersProps } from "#core/entities/users.js";
import { GetPersonOutputDto } from "./people-dto.js";

export type CreateUserInputDto = Omit<
  UsersProps,
  "userId" | "createdAt" | "updatedAt"
>;

export type ChangePasswordInputDto = {
  userId: string;
  password: string;
  newPassword: string;
};

export type GetUserOutputDto = Omit<UsersProps, "password"> & {
  people: GetPersonOutputDto;
};

export type JWTPayload = {
  personId: string;
  role?: "teacher" | "student" | undefined;
  permissions: string[];
};
