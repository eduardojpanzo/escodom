import { z } from "zod";
import { Z } from "#utils/zod-validations.js";

export const createClassSchema = z.object({
  name: Z.requiredString("name"),
  levelId: Z.requiredString("levelId"),
  description: Z.optionalString("description"),
});

export const paramsIdentifySchema = z.object({
  classId: Z.requiredString("classId"),
});

export const queryparamsClassesSchema = z.object({
  levelId: Z.optionalString("levelId"),
  name: Z.optionalString("name"),
  pageNumber: Z.optionalNumber("pageNumber"),
  pageSize: Z.optionalNumber("pageSize"),
  orderBy: z.array(Z.requiredString("orderBy")).optional(),
});

export const classUpdateSchema = z.object({
  name: Z.optionalString("name"),
  levelId: Z.optionalString("levelId"),
  description: Z.optionalString("description"),
});
