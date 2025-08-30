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
