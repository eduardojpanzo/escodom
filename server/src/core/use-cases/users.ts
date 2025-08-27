import { Users, UsersProps } from "#core/entities/users.js";

export interface ICreateUserUseCase {
  execute(
    data: Pick<UsersProps, "email" | "password" | "role">
  ): Promise<{ message: string }>;
}

export interface ISignInUserUseCase {
  execute(email: string, password: string): Promise<{ token: string }>;
}

export interface IGetUserUseCase {
  execute(userId: string): Promise<Users>;
}

export interface IchangePasswordUseCase {
  execute(props: {
    userId: string;
    password: string;
    newPassword: string;
  }): Promise<{ token: string }>;
}

export interface IchangeUserDataUseCase {
  execute(userId: string, data: Partial<Users>): Promise<{ token: string }>;
}
