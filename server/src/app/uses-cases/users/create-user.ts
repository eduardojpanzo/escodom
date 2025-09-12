import { UsersRepository } from "#core/repositories/users-repo.js";
import { PasswordHasherService } from "#core/services/password_hasher.js";
import { CreateUserInputDto } from "#app/dtos/users-dto.js";
import { Users } from "#core/entities/users.js";
import { BusinessError } from "#core/errors/business_error.js";
import { ValidationError } from "#core/errors/validation_error.js";
import { ICreateUserUseCase } from "#core/use-cases/users.js";
import { ServerError } from "#core/errors/server_error.js";
import { PeopleRepository } from "#core/repositories/people-repo.js";

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private usersRepo: UsersRepository,
    private hasher: PasswordHasherService,
    private peopleRepo: PeopleRepository
  ) {}

  async execute(input: CreateUserInputDto) {
    const existingPerson = await this.peopleRepo.findById(input.personId);

    if (!existingPerson) {
      throw new BusinessError("Não Existe um cadastro prévio desse Usuário");
    }

    const existingUserPerson = await this.usersRepo.findByPersonId(
      input.personId
    );

    if (existingUserPerson) {
      throw new BusinessError(
        "Verifique as informações, já existe esse usúario"
      );
    }

    const existingUser = await this.usersRepo.findByEmail(input.email);

    if (existingUser) {
      throw new BusinessError(
        "Verifique as informações, já existe esse usúario"
      );
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

    const aUser = await this.usersRepo.save(newUser.props);

    if (!aUser?.userId) {
      throw new ServerError("Erro ao criar o usuário");
    }

    return { userId: aUser.userId };
  }
}
