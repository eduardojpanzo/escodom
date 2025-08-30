import { UsersRepository } from "#core/repositories/users-repo.js";
import { PasswordHasherService } from "#core/services/password_hasher.js";
import { BusinessError } from "#core/errors/business_error.js";
import { IAuthenticateUserUseCase } from "#core/use-cases/users.js";
import { NotFoundError } from "#core/errors/notfound_error.js";
import { TokenGeneratorService } from "#core/services/token-generator.js";

export class AuthenticateUserUseCase implements IAuthenticateUserUseCase {
  constructor(
    private usersRepo: UsersRepository,
    private hasher: PasswordHasherService,
    private tokenGenerator: TokenGeneratorService
  ) {}

  async execute(email: string, password: string) {
    const existingUser = await this.usersRepo.findByEmail(email);

    if (
      !existingUser?.userId ||
      !existingUser.password ||
      !existingUser.email
    ) {
      throw new NotFoundError("O Usuário não foi encotrado");
    }

    const isValid = await this.hasher.compare(password, existingUser.password);

    if (!isValid) {
      throw new BusinessError("O e-mail ou senha estão incorretos");
    }

    return {
      token: await this.tokenGenerator.token({
        userId: existingUser.userId,
      }),
    };
  }
}
