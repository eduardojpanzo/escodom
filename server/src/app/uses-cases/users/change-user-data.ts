import { UsersProps } from "#core/entities/users.js";
import { NotFoundError } from "#core/errors/notfound_error.js";
import { ServerError } from "#core/errors/server_error.js";
import { UsersRepository } from "#core/repositories/users-repo.js";
import { IChangeUserDataUseCase } from "#core/use-cases/users.js";

export class ChangeUserDataUseCase implements IChangeUserDataUseCase {
  constructor(private usersRepo: UsersRepository) {}
  async execute(userId: string, data: Partial<UsersProps>) {
    const existingUser = await this.usersRepo.findById(userId);

    if (
      !existingUser?.userId ||
      !existingUser.password ||
      !existingUser.email
    ) {
      throw new NotFoundError("O Usuário não foi encotrado");
    }

    const aUser = await this.usersRepo.update(existingUser.userId, {
      ...data,
    });

    if (!aUser?.userId) {
      throw new ServerError("Erro ao atualizar os dados do usuário");
    }

    return {
      userId: aUser.userId,
    };
  }
}
