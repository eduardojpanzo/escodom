import { z } from "zod";
import { Z } from "#utils/zod-validations.js";

export const createPersonSchema = z.object({
  name: Z.requiredString("name"),
  bi: Z.requiredString("bi"),
  birthDate: Z.requiredDate("birthDate"),
  baptized: z.enum(["no", "yes"], {
    required_error: `role é obrigatório`,
    invalid_type_error: `role tem que ser "no" ou "yes"}`,
  }),
  phone: Z.optionalString("phone"),
  profession: Z.optionalString("profession"),
});

export const authIdentifySchema = z.object({
  personId: Z.requiredString("personId"),
});

export const personUpdateSchema = z.object({
  name: Z.optionalString("name"),
  bi: Z.optionalString("bi"),
  birthDate: Z.optionalDate("birthDate"),
  baptized: z
    .enum(["no", "yes"], {
      required_error: `role é obrigatório`,
      invalid_type_error: `role tem que ser "no" ou "yes"}`,
    })
    .optional(),
  phone: Z.optionalString("phone"),
  profession: Z.optionalString("profession"),
});
