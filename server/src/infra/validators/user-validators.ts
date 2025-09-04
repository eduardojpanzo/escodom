import { z } from "zod";
import { Z } from "#utils/zod-validations.js";

export const createSchema = z.object({
  personId: Z.requiredString("personId"),
  email: Z.email(),
  password: Z.password(),
  role: z
    .enum(["teacher", "student"], {
      required_error: `role é obrigatório`,
      invalid_type_error: `role tem que ser "teacher" ou "student"}`,
    })
    .optional(),
});

export const createUserWithBiSchema = z.object({
  bi: Z.requiredString("bi"),
  email: Z.email(),
  password: Z.password(),
  role: z
    .enum(["teacher", "student"], {
      required_error: `role é obrigatório`,
      invalid_type_error: `role tem que ser "teacher" ou "student"}`,
    })
    .optional(),
});

export const authenticateSchema = z.object({
  email: Z.email(),
  password: Z.password(),
});

export const authIdentify = z.object({
  userId: Z.requiredString("userId"),
});

export const changePasswordSchema = z.object({
  password: Z.password(),
  newPassword: Z.password(),
});

export const userUpdateSchema = z.object({
  role: z
    .enum(["teacher", "student"], {
      required_error: `role é obrigatório`,
      invalid_type_error: `role tem que ser "teacher" ou "student"}`,
    })
    .optional(),
  email: Z.optionalEmail(),
});
