import { z } from "zod";
import { Z } from "#utils/zod-validations.js";

export const createTeacherSchema = z.object({
  personId: Z.requiredString("personId"),
  position: Z.requiredString("position"),
  trainingYear: Z.requiredDate("trainingYear"),
});

export const createTeacherWithNewPersonSchema = z.object({
  position: Z.requiredString("position"),
  trainingYear: Z.requiredDate("trainingYear"),
  name: Z.requiredString("name"),
  // bi: Z.requiredString("bi"),
  birthDate: Z.requiredDate("birthDate"),
  baptized: z.enum(["no", "yes"], {
    required_error: `role é obrigatório`,
    invalid_type_error: `role tem que ser "no" ou "yes"}`,
  }),
  phone: Z.optionalString("phone"),
  profession: Z.optionalString("profession"),
});

export const queryparamsTeacherSchema = z.object({
  position: Z.optionalString("position"),
  trainingYear: Z.optionalDate("trainingYear"),
  pageNumber: Z.optionalNumber("pageNumber"),
  pageSize: Z.optionalNumber("pageSize"),
  orderBy: z.array(Z.requiredString("orderBy")).optional(),
});

export const paramsIdentifySchema = z.object({
  teacherId: Z.requiredString("teacherId"),
});

export const teacherUpdateSchema = z.object({
  position: Z.optionalString("position"),
  trainingYear: Z.optionalDate("trainingYear"),
});
