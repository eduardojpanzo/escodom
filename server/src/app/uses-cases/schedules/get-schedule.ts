import { NotFoundError } from "#core/errors/notfound_error.js";
import { SchedulesRepository } from "#core/repositories/schedules-repo.js";
import { IGetScheduleUseCase } from "#core/use-cases/schedules.js";

export class GetScheduleUseCase implements IGetScheduleUseCase {
  constructor(private schedulesRepo: SchedulesRepository) {}
  async execute(scheduleId: string) {
    const aSchedule = await this.schedulesRepo.findById(scheduleId);

    if (!aSchedule) {
      throw new NotFoundError("A Escala não foi encotrado");
    }

    return aSchedule;
  }
}
