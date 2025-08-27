import { z } from "zod";
import { Z } from "#utils/zod-validations.js";

export const registerSchema = z.object({
  email: Z.email(),
  password: Z.password(),
});

export const loginSchema = z.object({
  email: Z.email(),
  password: Z.password(),
});

export const authIdentify = z.object({
  id: Z.requiredString("id"),
});

export const changePasswordSchema = z.object({
  password: Z.password(),
  newPassword: Z.password(),
});

export const customerUpdateSchema = z.object({
  name: Z.optionalString("name"),
  email: Z.optionalString("email"),
  avatar: Z.optionalString("avatar"),
  phone: Z.optionalString("phone"),
  gender: Z.optionalString("gender"),
  birthday: Z.optionalDate("birthday"),
  summary: Z.optionalString("summary"),
  nickname: Z.optionalString("nickname"),
  state: Z.optionalBoolean("state"),
});
