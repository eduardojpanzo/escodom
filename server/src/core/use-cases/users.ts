import { PaginatedResult, PaginationParams } from "#core/common/pagination.js";
import { UsersProps } from "#core/entities/users.js";

export interface UserFilterParams extends PaginationParams {
  name?: string;
}

export interface ICreateUserUseCase {
  execute(
    data: Pick<UsersProps, "email" | "password" | "role" | "personId">
  ): Promise<{ userId: string }>;
}

export interface IGetAllUsersUseCase {
  execute(
    filters: UserFilterParams
  ): Promise<PaginatedResult<Omit<UsersProps, "password">>>;
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
