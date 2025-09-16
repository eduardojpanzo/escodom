import { GetPersonUseCase } from "#app/uses-cases/people/get-person.js";
import { AuthenticateUserUseCase } from "#app/uses-cases/users/authenticate-user.js";
import { ChangePasswordUseCase } from "#app/uses-cases/users/change-password.js";
import { ChangeUserDataUseCase } from "#app/uses-cases/users/change-user-data.js";
import { CreateUserUseCase } from "#app/uses-cases/users/create-user.js";
import { DeleteUserUseCase } from "#app/uses-cases/users/delete-user.js";
import { GetUserUseCase } from "#app/uses-cases/users/get-user.js";
import { env } from "#infra/config/env.js";
import { prisma } from "#infra/db/prima.js";
import { PrismaPeopleRepository } from "#infra/repositories/prisma-people-repo.js";
import { PrismaUsersRepository } from "#infra/repositories/prisma-users-repo.js";
import { BcryptPasswordHasher } from "#infra/services/bcrypt-hasher.js";
import { JwtTokenGenerator } from "#infra/services/token-generator.js";
import { UsersController } from "./user-controller.js";

const usersRepo = PrismaUsersRepository.build(prisma);
const peopleRepo = PrismaPeopleRepository.build(prisma);

const hasher = new BcryptPasswordHasher();
const tokenGenerator = new JwtTokenGenerator(env.jwtSecret);

const getPerson = new GetPersonUseCase(peopleRepo);
const createUserUseCase = new CreateUserUseCase(usersRepo, hasher, peopleRepo);
const authenticateUseCase = new AuthenticateUserUseCase(
  usersRepo,
  hasher,
  tokenGenerator
);
const getUserUseCase = new GetUserUseCase(usersRepo);
const changePasswordUserCase = new ChangePasswordUseCase(usersRepo, hasher);
const changeUserDataUseCase = new ChangeUserDataUseCase(usersRepo);
const deleteUserDataUseCase = new DeleteUserUseCase(usersRepo);

const usersController = new UsersController(
  getPerson,
  createUserUseCase,
  authenticateUseCase,
  getUserUseCase,
  changePasswordUserCase,
  changeUserDataUseCase,
  deleteUserDataUseCase
);

export { usersController };
