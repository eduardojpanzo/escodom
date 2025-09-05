import { z } from "zod";
import { Z } from "#utils/zod-validations.js";

export const createTeacherSchema = z.object({
  personId: Z.requiredString("personId"),
  position: Z.requiredString("position"),
  trainingYear: Z.requiredDate("trainingYear"),
});

export const createTeacherWithNewPersonSchema = z.object({
  name: Z.requiredString("name"),
  bi: Z.requiredString("bi"),
  phone: Z.optionalString("phone"),
  position: Z.requiredString("position"),
  trainingYear: Z.requiredDate("trainingYear"),
});

export const paramsIdentifySchema = z.object({
  teacherId: Z.requiredString("teacherId"),
});

export const teacherUpdateSchema = z.object({
  position: Z.optionalString("position"),
  trainingYear: Z.optionalDate("trainingYear"),
});
