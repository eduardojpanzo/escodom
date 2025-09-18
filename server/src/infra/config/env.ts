import "dotenv/config";

function getEnvVar(key: string, required = true): string {
  const value = process.env[key];
  if (!value && required) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value as string;
}

export const env = {
  //   nodeEnv: getEnvVar("NODE_ENV"),
  port: Number(getEnvVar("PORT")),
  //   databaseUrl: getEnvVar("DATABASE_URL"),
  jwtSecret: getEnvVar("JWT_SECRET"),
  adminName: getEnvVar("ADMIN_NOME"),
  adminBirth: getEnvVar("ADMIN_BIRTH"),
  adminEmail: getEnvVar("ADMIN_EMAIL"),
  adminPassword: getEnvVar("ADMIN_PASSWORD"),
};
