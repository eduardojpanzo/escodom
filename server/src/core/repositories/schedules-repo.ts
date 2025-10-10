import { SchedulesProps } from "#core/entities/schedules.js";
import { ScheduleFilterParams } from "#core/use-cases/schedules.js";

export interface SchedulesRepository {
  save(schedule: SchedulesProps): Promise<SchedulesProps | null>;
  findAll(
    filters: ScheduleFilterParams
  ): Promise<{ data: SchedulesProps[]; totalCount: number }>;
  findById(id: string): Promise<SchedulesProps | null>;
  update(
    id: string,
    schedule: Partial<SchedulesProps>
  ): Promise<SchedulesProps | null>;
  delete(id: string): Promise<SchedulesProps | null>;
  count(): Promise<number | null>;
}
