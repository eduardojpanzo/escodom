import { paginate, PaginatedResult } from "#core/common/pagination.js";
import { UsersProps } from "#core/entities/users.js";
import { NotFoundError } from "#core/errors/notfound_error.js";
import { UsersRepository } from "#core/repositories/users-repo.js";
import {
  IGetAllUsersUseCase,
  UserFilterParams,
} from "#core/use-cases/users.js";
import { omit } from "#utils/functions.js";

export class GetAllUserUseCase implements IGetAllUsersUseCase {
  constructor(private usersRepo: UsersRepository) {}
  async execute(
    filters: UserFilterParams
  ): Promise<PaginatedResult<Omit<UsersProps, "password">>> {
    const { data, totalCount } = await this.usersRepo.findAll(filters);

    if (!data.length) {
      throw new NotFoundError("Nenhum usuário foi encontrado");
    }

    return paginate(
      data.map((user) => omit(user, ["password"])),
      totalCount,
      filters.pageNumber,
      filters.pageSize
    );
  }
}
