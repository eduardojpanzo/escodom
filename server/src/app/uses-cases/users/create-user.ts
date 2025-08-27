import { UsersRepository } from "#core/repositories/users-repo.js";
import { PasswordHasherService } from "#core/services/password_hasher.js";
import { CreateUserInputDto } from "#app/dtos/users/create-user-dto.js";
import { Users } from "#core/entities/users.js";
import { BusinessError } from "#core/errors/business_error.js";
import { ValidationError } from "#core/errors/validation_error.js";
import { ICreateUserUseCase } from "#core/use-cases/users.js";

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private usersRepo: UsersRepository,
    private hasher: PasswordHasherService
  ) {}

  async execute(input: CreateUserInputDto) {
    const existingUser = await this.usersRepo.findByEmail(input.email);

    if (existingUser) {
      throw new BusinessError("O e-mail informado já está em uso");
    }

    if (input.password.length <= 6) {
      throw new ValidationError([
        {
          message: "A senha deve ter pelo menos 6 caracteres",
          field: "password",
        },
      ]);
    }

    const hashedPassword = await this.hasher.hash(input.password);

    const newUser = Users.create({
      ...input,
      password: hashedPassword,
    });

    await this.usersRepo.save(newUser);

    return { message: "usuário criado com sucesso" };
  }
}
