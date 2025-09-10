import { CreatePersonUseCase } from "#app/uses-cases/people/create-person.js";
import { ChangeStudentDataUseCase } from "#app/uses-cases/students/change-studet-data.js";
import { CreateStudentUseCase } from "#app/uses-cases/students/create-student.js";
import { DeleteStudentUseCase } from "#app/uses-cases/students/delete-student.js";
import {
  GetStudentByKeyUseCase,
  GetStudentUseCase,
} from "#app/uses-cases/students/get-stundet.js";
import { prisma } from "#infra/db/prima.js";
import { PrismaPeopleRepository } from "#infra/repositories/prisma-people-repo.js";
import { PrismaStudentsRepository } from "#infra/repositories/prisma-students-repo.js";
import { StudentsController } from "./student-controller.js";

const peopleRepo = PrismaPeopleRepository.build(prisma);
const studentsRepo = PrismaStudentsRepository.build(prisma);

const createPerson = new CreatePersonUseCase(peopleRepo);
const createStudentUseCase = new CreateStudentUseCase(studentsRepo, peopleRepo);
const getStudentUseCase = new GetStudentUseCase(studentsRepo);
const getStudentByKeyData = new GetStudentByKeyUseCase(studentsRepo);
const changeStudentDataUseCase = new ChangeStudentDataUseCase(studentsRepo);
const deleteStudentDataUseCase = new DeleteStudentUseCase(studentsRepo);

const studentsController = new StudentsController(
  createPerson,
  createStudentUseCase,
  getStudentUseCase,
  getStudentByKeyData,
  changeStudentDataUseCase,
  deleteStudentDataUseCase
);

export { studentsController };
