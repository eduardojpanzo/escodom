import { PaginatedResult, PaginationParams } from "#core/common/pagination.js";
import { SchedulesProps } from "#core/entities/schedules.js";

export interface ScheduleFilterParams extends PaginationParams {
  teacherId?: string;
  classroomId?: string;
  startDate?: Date;
  endDate?: Date;
  active?: boolean;
}

export interface ICreateScheduleUseCase {
  execute(
    data: Omit<SchedulesProps, "scheduleId" | "createdAt" | "updatedAt">
  ): Promise<{ scheduleId: string }>;
}

export interface IGetAllSchedulesUseCase {
  execute(
    filters: ScheduleFilterParams
  ): Promise<PaginatedResult<SchedulesProps>>;
}

export interface IGetScheduleUseCase {
  execute(scheduleId: string): Promise<SchedulesProps>;
}

export interface IDeleteScheduleUseCase {
  execute(scheduleId: string): Promise<{ scheduleId: string }>;
}

export interface IChangeScheduleDataUseCase {
  execute(
    scheduleId: string,
    data: Partial<SchedulesProps>
  ): Promise<{ scheduleId: string }>;
}
