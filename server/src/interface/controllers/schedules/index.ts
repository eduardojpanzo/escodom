import { ChangeScheduleDataUseCase } from "#app/uses-cases/schedules/change-schedule-data.js";
import { CreateScheduleUseCase } from "#app/uses-cases/schedules/create-schedule.js";
import { DeleteScheduleUseCase } from "#app/uses-cases/schedules/delete-schedule.js";
import { GetAllSchedulesUseCase } from "#app/uses-cases/schedules/get-all-schedules.js";
import { GetScheduleUseCase } from "#app/uses-cases/schedules/get-schedule.js";
import { prisma } from "#infra/db/prima.js";
import { PrismaSchedulesRepository } from "#infra/repositories/prisma-schedules-repo.js";
import { SchedulesController } from "./schedule-controller.js";

const schedulesRepo = PrismaSchedulesRepository.build(prisma);

const createscheduleUseCase = new CreateScheduleUseCase(schedulesRepo);
const getscheduleUseCase = new GetScheduleUseCase(schedulesRepo);
const getAllschedules = new GetAllSchedulesUseCase(schedulesRepo);
const changescheduleDataUseCase = new ChangeScheduleDataUseCase(schedulesRepo);
const deletescheduleDataUseCase = new DeleteScheduleUseCase(schedulesRepo);

const schedulesController = new SchedulesController(
  createscheduleUseCase,
  getscheduleUseCase,
  getAllschedules,
  changescheduleDataUseCase,
  deletescheduleDataUseCase
);

export { schedulesController };
