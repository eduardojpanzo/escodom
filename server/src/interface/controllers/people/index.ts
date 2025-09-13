import { ChangePersonDataUseCase } from "#app/uses-cases/people/change-person-data.js";
import { CreatePersonUseCase } from "#app/uses-cases/people/create-person.js";
import { GetPersonUseCase } from "#app/uses-cases/people/get-person.js";
import { prisma } from "#infra/db/prima.js";
import { PrismaPeopleRepository } from "#infra/repositories/prisma-people-repo.js";
import { CodeGeneratorImplementation } from "#infra/services/code-generator.js";
import { PeopleController } from "./person-controller.js";

const peopleRepo = PrismaPeopleRepository.build(prisma);
const codeGenerator = new CodeGeneratorImplementation(peopleRepo);

const createPerson = new CreatePersonUseCase(peopleRepo, codeGenerator);
const getPerson = new GetPersonUseCase(peopleRepo);
const changePersonData = new ChangePersonDataUseCase(peopleRepo);

const peopleController = new PeopleController(
  createPerson,
  getPerson,
  changePersonData
);

export { peopleController };
