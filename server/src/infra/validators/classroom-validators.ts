import { z } from "zod";
import { Z } from "#utils/zod-validations.js";

export const createClassroomSchema = z.object({
  name: Z.requiredString("name"),
  classId: Z.requiredString("classId"),
  description: Z.optionalString("description"),
});

export const paramsIdentifySchema = z.object({
  classroomId: Z.requiredString("classroomId"),
});

export const queryparamsClassroomsSchema = z.object({
  classId: Z.optionalString("classId"),
  levelId: Z.optionalString("levelId"),
  name: Z.optionalString("name"),
  pageNumber: Z.optionalString("pageNumber"),
  pageSize: Z.optionalString("pageSize"),
  orderBy: z.array(Z.requiredString("orderBy")).optional(),
});

export const classroomUpdateSchema = z.object({
  name: Z.optionalString("name"),
  classId: Z.optionalString("classId"),
  description: Z.optionalString("description"),
});
