import { NotFoundError } from "#core/errors/notfound_error.js";
import { ServerError } from "#core/errors/server_error.js";
import { UsersRepository } from "#core/repositories/users-repo.js";
import { IDeleteUserUseCase } from "#core/use-cases/users.js";

export class DeleteUserUseCase implements IDeleteUserUseCase {
  constructor(private usersRepo: UsersRepository) {}
  async execute(userId: string) {
    const existingUser = await this.usersRepo.findById(userId);

    if (
      !existingUser?.userId ||
      !existingUser.password ||
      !existingUser.email
    ) {
      throw new NotFoundError("O Usuário não foi encotrado");
    }

    const aUser = await this.usersRepo.delete(existingUser.userId);

    if (!aUser?.userId) {
      throw new ServerError("Erro ao Eliminar o usuário");
    }

    return {
      userId: aUser.userId,
    };
  }
}
