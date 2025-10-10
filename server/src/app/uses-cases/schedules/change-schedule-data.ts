import { SchedulesProps } from "#core/entities/schedules.js";
import { NotFoundError } from "#core/errors/notfound_error.js";
import { ServerError } from "#core/errors/server_error.js";
import { SchedulesRepository } from "#core/repositories/schedules-repo.js";
import { IChangeScheduleDataUseCase } from "#core/use-cases/schedules.js";

export class ChangeScheduleDataUseCase implements IChangeScheduleDataUseCase {
  constructor(private schedulesRepo: SchedulesRepository) {}
  async execute(ScheduleId: string, data: Partial<SchedulesProps>) {
    const existingSchedule = await this.schedulesRepo.findById(ScheduleId);

    if (
      !existingSchedule?.scheduleId ||
      !existingSchedule.teacherId ||
      !existingSchedule.classId
    ) {
      throw new NotFoundError("A Escala não foi encotrado");
    }

    const aSchedule = await this.schedulesRepo.update(
      existingSchedule.scheduleId,
      {
        ...data,
      }
    );

    if (!aSchedule?.scheduleId) {
      throw new ServerError("Erro ao atualizar os dados da escala");
    }

    return {
      scheduleId: aSchedule.scheduleId,
    };
  }
}
