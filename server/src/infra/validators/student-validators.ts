import { z } from "zod";
import { Z } from "#utils/zod-validations.js";

export const createStudentSchema = z.object({
  personId: Z.requiredString("personId"),
  classId: Z.requiredString("classId"),
});

export const createStudentWithNewPersonSchema = z.object({
  classId: Z.requiredString("classId"),
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

export const paramsIdentifySchema = z.object({
  studentId: Z.requiredString("studentId"),
});

export const paramsKeySchema = z.object({
  accessKey: Z.requiredString("accessKey"),
});

export const StudentUpdateSchema = z.object({
  classId: Z.optionalString("classId"),
});
