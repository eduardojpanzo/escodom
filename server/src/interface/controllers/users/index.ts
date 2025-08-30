import { AuthenticateUserUseCase } from "#app/uses-cases/users/authenticate-user.js";
import { ChangePasswordUseCase } from "#app/uses-cases/users/change-password.js";
import { ChangeUserDataUseCase } from "#app/uses-cases/users/change-user-data.js";
import { CreateUserUseCase } from "#app/uses-cases/users/create-user.js";
import { GetUserUseCase } from "#app/uses-cases/users/get-user.js";
import { prisma } from "#infra/db/prima.js";
import { PrismaUsersRepository } from "#infra/repositories/prisma-users-repo.js";
import { BcryptPasswordHasher } from "#infra/services/bcrypt-hasher.js";
import { JwtTokenGenerator } from "#infra/services/token-generator.js";
import { UsersController } from "./user-controller.js";

const usersRepo = PrismaUsersRepository.build(prisma);
const hasher = new BcryptPasswordHasher();
const tokenGenerator = new JwtTokenGenerator();

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
  createUserUseCase,
  authenticateUseCase,
  getUserUseCase,
  changePasswordUserCase,
  changeUserDataUseCase
);

export { usersController };
