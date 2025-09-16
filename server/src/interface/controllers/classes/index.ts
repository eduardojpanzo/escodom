import { ChangeClassDataUseCase } from "#app/uses-cases/classes/change-class-data.js";
import { CreateClassUseCase } from "#app/uses-cases/classes/create-class.js";
import { DeleteClassUseCase } from "#app/uses-cases/classes/delete-class.js";
import { GetAllClassesUseCase } from "#app/uses-cases/classes/get-all-classes.js";
import { GetClassUseCase } from "#app/uses-cases/classes/get-class.js";
import { prisma } from "#infra/db/prima.js";
import { PrismaClassesRepository } from "#infra/repositories/prisma-classes-repo.js";
import { ClassesController } from "./class-controller.js";

const classesRepo = PrismaClassesRepository.build(prisma);

const createClassUseCase = new CreateClassUseCase(classesRepo);
const getClassUseCase = new GetClassUseCase(classesRepo);
const getAllClassesUseCase = new GetAllClassesUseCase(classesRepo);
const changeClassDataUseCase = new ChangeClassDataUseCase(classesRepo);
const deleteClassDataUseCase = new DeleteClassUseCase(classesRepo);

const classesController = new ClassesController(
  createClassUseCase,
  getClassUseCase,
  getAllClassesUseCase,
  changeClassDataUseCase,
  deleteClassDataUseCase
);

export { classesController };
