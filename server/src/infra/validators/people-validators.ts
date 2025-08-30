import { z } from "zod";
import { Z } from "#utils/zod-validations.js";

export const createPersonSchema = z.object({
  name: Z.requiredString("name"),
  bi: Z.requiredString("bi"),
  phone: Z.optionalString("name"),
});

export const paramsIdentifySchema = z.object({
  personId: Z.requiredString("personId"),
});

export const personUpdateSchema = z.object({
  name: Z.optionalString("name"),
  bi: Z.optionalString("bi"),
  phone: Z.optionalString("name"),
});
