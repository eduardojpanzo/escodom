import { CreatePersonUseCase } from "#app/uses-cases/people/create-person.js";
import { ChangeTeacherDataUseCase } from "#app/uses-cases/teachers/change-teacher-data.js";
import { CreateTeacherUseCase } from "#app/uses-cases/teachers/create-teacher.js";
import { DeleteTeacherUseCase } from "#app/uses-cases/teachers/delete-teacher.js";
import { GetteacherUseCase } from "#app/uses-cases/teachers/get-teacher.js";
import { prisma } from "#infra/db/prima.js";
import { PrismaPeopleRepository } from "#infra/repositories/prisma-people-repo.js";
import { PrismaTeachersRepository } from "#infra/repositories/prisma-teachers-repo.js";
import { CodeGeneratorImplementation } from "#infra/services/code-generator.js";
import { TeachersController } from "./teacher-controller.js";

const peopleRepo = PrismaPeopleRepository.build(prisma);
const teachersRepo = PrismaTeachersRepository.build(prisma);
const codeGenerator = new CodeGeneratorImplementation(peopleRepo);

const createPerson = new CreatePersonUseCase(peopleRepo, codeGenerator);
const createTeacherUseCase = new CreateTeacherUseCase(teachersRepo, peopleRepo);
const getTeacherUseCase = new GetteacherUseCase(teachersRepo);
const changeTeacherDataUseCase = new ChangeTeacherDataUseCase(teachersRepo);
const deleteTeacherDataUseCase = new DeleteTeacherUseCase(teachersRepo);

const teachersController = new TeachersController(
  createPerson,
  createTeacherUseCase,
  getTeacherUseCase,
  changeTeacherDataUseCase,
  deleteTeacherDataUseCase
);

export { teachersController };
