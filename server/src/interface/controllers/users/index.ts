import { CreatePersonUseCase } from "#app/uses-cases/people/create-person.js";
import { AuthenticateUserUseCase } from "#app/uses-cases/users/authenticate-user.js";
import { ChangePasswordUseCase } from "#app/uses-cases/users/change-password.js";
import { ChangeUserDataUseCase } from "#app/uses-cases/users/change-user-data.js";
import { CreateUserUseCase } from "#app/uses-cases/users/create-user.js";
import { GetUserUseCase } from "#app/uses-cases/users/get-user.js";
import { prisma } from "#infra/db/prima.js";
import { PrismaPeopleRepository } from "#infra/repositories/prisma-people-repo.js";
import { PrismaUsersRepository } from "#infra/repositories/prisma-users-repo.js";
import { BcryptPasswordHasher } from "#infra/services/bcrypt-hasher.js";
import { JwtTokenGenerator } from "#infra/services/token-generator.js";
import { UsersController } from "./user-controller.js";

const usersRepo = PrismaUsersRepository.build(prisma);
const peopleRepo = PrismaPeopleRepository.build(prisma);

const hasher = new BcryptPasswordHasher();
const tokenGenerator = new JwtTokenGenerator();

const createPerson = new CreatePersonUseCase(peopleRepo);
const createUserUseCase = new CreateUserUseCase(usersRepo, hasher);
const authenticateUseCase = new AuthenticateUserUseCase(
  usersRepo,
  hasher,
  tokenGenerator
);
const getUserUseCase = new GetUserUseCase(usersRepo);
const changePasswordUserCase = new ChangePasswordUseCase(usersRepo, hasher);
const changeUserDataUseCase = new ChangeUserDataUseCase(usersRepo);

const usersController = new UsersController(
  createPerson,
  createUserUseCase,
  authenticateUseCase,
  getUserUseCase,
  changePasswordUserCase,
  changeUserDataUseCase
);

export { usersController };
