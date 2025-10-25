import { SchedulesProps } from "#core/entities/schedules.js";
import { GetClassRoomOutputDto } from "./classrooms-dto.js";
import { GetTeacherOutputDto } from "./teachers-dto.js";

export type CreateScheduleInputDto = Omit<
  SchedulesProps,
  "scheduleId" | "createdAt" | "updatedAt"
>;

export type GetScheduleOutputDto = SchedulesProps & {
  classrooms: GetClassRoomOutputDto;
  teachers: GetTeacherOutputDto;
};
