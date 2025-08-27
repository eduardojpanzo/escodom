export type CreateUserInputDto = {
  email: string;
  password: string;
  role?: "teacher" | "student";
};
