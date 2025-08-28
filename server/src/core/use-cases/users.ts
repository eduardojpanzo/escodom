import { UsersProps } from "#core/entities/users.js";

export interface ICreateUserUseCase {
  execute(
    data: Pick<UsersProps, "email" | "password" | "role">
  ): Promise<{ userId: string }>;
}

export interface IAuthenticateUserUseCase {
  execute(email: string, password: string): Promise<{ token: string }>;
}

export interface IGetUserUseCase {
  execute(userId: string): Promise<Omit<UsersProps, "password">>;
}

export interface IDeleteUserUseCase {
  execute(userId: string): Promise<{ userId: string }>;
}

export interface IChangePasswordUseCase {
  execute(props: {
    userId: string;
    password: string;
    newPassword: string;
  }): Promise<{ userId: string }>;
}

export interface IChangeUserDataUseCase {
  execute(
    userId: string,
    data: Partial<UsersProps>
  ): Promise<{ userId: string }>;
}
