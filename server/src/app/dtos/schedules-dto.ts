import { SchedulesProps } from "#core/entities/schedules.js";
import { GetClassOutputDto } from "./classes-dto.js";
import { GetTeacherOutputDto } from "./teachers-dto.js";

export type CreateScheduleInputDto = Omit<
  SchedulesProps,
  "scheduleId" | "createdAt" | "updatedAt"
>;

export type GetScheduleOutputDto = SchedulesProps & {
  class: GetClassOutputDto;
  teacher: GetTeacherOutputDto;
};
