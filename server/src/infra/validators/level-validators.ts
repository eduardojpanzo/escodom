import { z } from "zod";
import { Z } from "#utils/zod-validations.js";

export const createLevelSchema = z.object({
  name: Z.requiredString("name"),
  description: Z.optionalString("description"),
});

export const paramsIdentifySchema = z.object({
  levelId: Z.requiredString("levelId"),
});

export const LevelUpdateSchema = z.object({
  name: Z.optionalString("name"),
  description: Z.optionalString("description"),
});
