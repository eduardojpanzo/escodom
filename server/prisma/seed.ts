import "dotenv/config";
import { CreateUserUseCase } from "#app/uses-cases/users/create-user.js";
import { CreatePersonUseCase } from "#app/uses-cases/people/create-person.js";
import { PrismaUsersRepository } from "#infra/repositories/prisma-users-repo.js";
import { PrismaPeopleRepository } from "#infra/repositories/prisma-people-repo.js";
import { BcryptPasswordHasher } from "#infra/services/bcrypt-hasher.js";
import { prisma } from "#infra/db/prima.js";

async function main() {
  const peopleRepo = PrismaPeopleRepository.build(prisma);
  const usersRepo = PrismaUsersRepository.build(prisma);
  const hasher = new BcryptPasswordHasher();

  const createPerson = new CreatePersonUseCase(peopleRepo);
  const createUserUseCase = new CreateUserUseCase(
    usersRepo,
    hasher,
    peopleRepo
  );

  const countUsers = await usersRepo.count();
  const countPeople = await peopleRepo.count();
  if (countUsers === 0 && countPeople === 0) {
    const aPerson = await createPerson.execute({
      name: process.env.ADMIN_NOME || "",
      bi: process.env.ADMIN_BI || "",
      birthDate: new Date(process.env.ADMIN_BIRTH || ""),
      baptized: "yes",
    });

    const aUser = await createUserUseCase.execute({
      email: process.env.ADMIN_EMAIL || "admin@system.com",
      password: process.env.ADMIN_PASSWORD || "admin123",
      personId: aPerson.personId!,
      role: "teacher",
    });

    console.log("✅ Usuário inicial criado!");
  }
}

main().catch(console.error);
