import { NotFoundError } from "#core/errors/notfound_error.js";
import { ServerError } from "#core/errors/server_error.js";
import { SchedulesRepository } from "#core/repositories/schedules-repo.js";
import { IDeleteScheduleUseCase } from "#core/use-cases/schedules.js";

export class DeleteScheduleUseCase implements IDeleteScheduleUseCase {
  constructor(private schedulesRepo: SchedulesRepository) {}
  async execute(scheduleId: string) {
    const existingSchedule = await this.schedulesRepo.findById(scheduleId);

    if (
      !existingSchedule?.classId ||
      !existingSchedule.scheduleId ||
      !existingSchedule.teacherId
    ) {
      throw new NotFoundError("A Escala não foi encotrado");
    }

    const aSchedule = await this.schedulesRepo.delete(scheduleId);

    if (!aSchedule?.scheduleId) {
      throw new ServerError("Erro ao Eliminar a Escala");
    }

    return {
      scheduleId: aSchedule.scheduleId,
    };
  }
}
