import { z } from "zod";
import { Z } from "#utils/zod-validations.js";

export const createStudentSchema = z.object({
  personId: Z.requiredString("personId"),
  accessKey: Z.requiredString("accessKey"),
  classId: Z.requiredString("classId"),
  birthDate: Z.requiredDate("birthDate"),
});

export const createStudentWithNewPersonSchema = z.object({
  name: Z.requiredString("name"),
  bi: Z.requiredString("bi"),
  phone: Z.optionalString("name"),
  accessKey: Z.requiredString("accessKey"),
  classId: Z.requiredString("classId"),
  birthDate: Z.requiredDate("birthDate"),
});

export const paramsIdentifySchema = z.object({
  studentId: Z.requiredString("studentId"),
});

export const paramsKeySchema = z.object({
  accessKey: Z.requiredString("accessKey"),
});

export const StudentUpdateSchema = z.object({
  classId: Z.optionalString("classId"),
  birthDate: Z.optionalDate("birthDate"),
});
