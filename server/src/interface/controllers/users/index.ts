import { CreateUserUseCase } from "#app/uses-cases/users/create-user.js";
import { prisma } from "#infra/db/prima.js";
import { PrismaUsersRepository } from "#infra/repositories/prisma-users-repo.js";
import { BcryptPasswordHasher } from "#infra/services/bcrypt-hasher.js";
import { UsersController } from "./user-controller.js";

const usersRepo = PrismaUsersRepository.build(prisma);
const hasher = new BcryptPasswordHasher();

const createUser = new CreateUserUseCase(usersRepo, hasher);

const usersController = new UsersController(createUser);

export { usersController };
