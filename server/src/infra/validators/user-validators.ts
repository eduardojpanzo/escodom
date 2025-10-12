import { z } from "zod";
import { Z } from "#utils/zod-validations.js";
// import permissions from "#infra/config/permissions.json";

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
  permissions: z.array(Z.requiredString("permissions")),
});

export const createUserWithCodeSchema = z.object({
  personalCode: Z.requiredString("personalCode"),
  email: Z.email(),
  password: Z.password(),
  permissions: z.array(Z.requiredString("permissions")),
});

export const authenticateSchema = z.object({
  email: Z.email(),
  password: Z.password(),
});

export const authIdentify = z.object({
  userId: Z.requiredString("userId"),
});

export const changePasswordSchema = z.object({
  userId: Z.password(),
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

// const PermissionSchema = z.enum(
//   permissions.map((p) => p.value) as [string, ...string[]]
// );

// export const UserPermissionsSchema = z.array(PermissionSchema);
