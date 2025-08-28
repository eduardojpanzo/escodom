import { ChangePasswordInputDto } from "#app/dtos/users-dto.js";
import { BusinessError } from "#core/errors/business_error.js";
import { NotFoundError } from "#core/errors/notfound_error.js";
import { ServerError } from "#core/errors/server_error.js";
import { ValidationError } from "#core/errors/validation_error.js";
import { UsersRepository } from "#core/repositories/users-repo.js";
import { PasswordHasherService } from "#core/services/password_hasher.js";
import { IChangePasswordUseCase } from "#core/use-cases/users.js";

export class ChangePasswordUseCase implements IChangePasswordUseCase {
  constructor(
    private usersRepo: UsersRepository,
    private hasher: PasswordHasherService
  ) {}
  async execute(props: ChangePasswordInputDto) {
    const existingUser = await this.usersRepo.findById(props.userId);

    if (!existingUser || !existingUser.password || !existingUser.email) {
      throw new NotFoundError("O Usuário não foi encotrado");
    }

    const isValid = await this.hasher.compare(
      props.password,
      existingUser.password
    );

    if (!isValid) {
      throw new BusinessError("A senha atual não confere");
    }

    if (props.newPassword.length <= 6) {
      throw new ValidationError([
        {
          message: "A senha deve ter pelo menos 6 caracteres",
          field: "newPassword",
        },
      ]);
    }

    const hashedPassword = await this.hasher.hash(props.newPassword);

    const aUser = await this.usersRepo.update(props.userId, {
      password: hashedPassword,
    });

    if (!aUser?.userId) {
      throw new ServerError("Erro ao criar o usuário");
    }

    return {
      userId: aUser.userId,
    };
  }
}
