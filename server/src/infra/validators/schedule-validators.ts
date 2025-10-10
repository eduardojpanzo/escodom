import { z } from "zod";
import { Z } from "#utils/zod-validations.js";

export const createScheduleSchema = z.object({
  teacherId: Z.requiredString("teacherId"),
  startDate: Z.requiredDate("startDate"),
  endDate: Z.requiredDate("endDate"),
  classId: Z.requiredString("classId"),
});

export const queryparamsSchedulesSchema = z.object({
  teacherId: Z.optionalString("teacherId"),
  classId: Z.optionalString("classId"),
  startDate: Z.optionalDate("startDate"),
  endDate: Z.optionalDate("endDate"),
  active: Z.optionalBoolean("active"),
  pageNumber: Z.optionalNumber("pageNumber"),
  pageSize: Z.optionalNumber("pageSize"),
  orderBy: z.array(Z.requiredString("orderBy")).optional(),
});

export const paramsIdentifySchema = z.object({
  scheduleId: Z.requiredString("scheduleId"),
});

export const ScheduleUpdateSchema = z.object({
  teacherId: Z.optionalString("teacherId"),
  classId: Z.optionalString("classId"),
  startDate: Z.optionalDate("startDate"),
  endDate: Z.optionalDate("endDate"),
});
