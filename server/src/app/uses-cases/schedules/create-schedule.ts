import { CreateScheduleInputDto } from "#app/dtos/schedules-dto.js";
import { Schedules } from "#core/entities/schedules.js";
import { ServerError } from "#core/errors/server_error.js";
import { SchedulesRepository } from "#core/repositories/schedules-repo.js";
import { ICreateScheduleUseCase } from "#core/use-cases/schedules.js";

export class CreateScheduleUseCase implements ICreateScheduleUseCase {
  constructor(private schedulesRepo: SchedulesRepository) {}

  async execute(input: CreateScheduleInputDto) {
    const newSchedule = Schedules.create({
      classId: input.classId,
      endDate: input.endDate,
      startDate: input.startDate,
      teacherId: input.teacherId,
    });

    const aSchedule = await this.schedulesRepo.save(newSchedule.props);

    if (!aSchedule?.scheduleId) {
      throw new ServerError("Erro ao criar a Escala");
    }

    return { scheduleId: aSchedule.scheduleId };
  }
}
