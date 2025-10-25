import { ChangeClassroomDataUseCase } from "#app/uses-cases/classrooms/change-classroom-data.js";
import { CreateClassroomUseCase } from "#app/uses-cases/classrooms/create-classroom.js";
import { DeleteClassroomUseCase } from "#app/uses-cases/classrooms/delete-classroom.js";
import { GetAllClassroomsUseCase } from "#app/uses-cases/classrooms/get-all-classrooms.js";
import { GetClassroomUseCase } from "#app/uses-cases/classrooms/get-classroom.js";
import { prisma } from "#infra/db/prima.js";
import { PrismaClassroomsRepository } from "#infra/repositories/prisma-classrooms-repo.js";
import { ClassroomsController } from "./classroom-controller.js";

const classroomsRepo = PrismaClassroomsRepository.build(prisma);

const createClassroomUseCase = new CreateClassroomUseCase(classroomsRepo);
const getClassroomUseCase = new GetClassroomUseCase(classroomsRepo);
const getAllClassroomsUseCase = new GetAllClassroomsUseCase(classroomsRepo);
const changeClassroomDataUseCase = new ChangeClassroomDataUseCase(
  classroomsRepo
);
const deleteClassroomDataUseCase = new DeleteClassroomUseCase(classroomsRepo);

const classroomsController = new ClassroomsController(
  createClassroomUseCase,
  getClassroomUseCase,
  getAllClassroomsUseCase,
  changeClassroomDataUseCase,
  deleteClassroomDataUseCase
);

export { classroomsController };
