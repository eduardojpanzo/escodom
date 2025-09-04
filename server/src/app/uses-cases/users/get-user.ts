import { NotFoundError } from "#core/errors/notfound_error.js";
import { UsersRepository } from "#core/repositories/users-repo.js";
import { IGetUserUseCase } from "#core/use-cases/users.js";

export class GetUserUseCase implements IGetUserUseCase {
  constructor(private usersRepo: UsersRepository) {}
  async execute(userId: string) {
    const aUser = await this.usersRepo.findById(userId);

    if (!aUser) {
      throw new NotFoundError("O Usuário não foi encotrado");
    }

    return aUser;
  }
}
