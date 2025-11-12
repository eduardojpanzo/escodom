import { z } from "zod";
import { Z } from "#utils/zod-validations.js";

export const createStudentSchema = z.object({
  personId: Z.requiredString("personId"),
  classroomId: Z.requiredString("classroomId"),
});

export const createStudentWithNewPersonSchema = z.object({
  classroomId: Z.requiredString("classroomId"),
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

export const queryparamsStudentsSchema = z.object({
  classroomId: Z.optionalString("classroomId"),
  levelId: Z.optionalString("levelId"),
  name: Z.optionalString("name"),
  pageNumber: Z.optionalString("pageNumber"),
  pageSize: Z.optionalString("pageSize"),
  orderBy: z.array(Z.requiredString("orderBy")).optional(),
});

export const paramsIdentifySchema = z.object({
  studentId: Z.requiredString("studentId"),
});

export const paramsKeySchema = z.object({
  accessKey: Z.requiredString("accessKey"),
});

export const StudentUpdateSchema = z.object({
  classroomId: Z.optionalString("classroomId"),
});
