/*
  Warnings:

  - The `status` column on the `attendances` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ebd"."status" AS ENUM ('present', 'absent');

-- CreateEnum
CREATE TYPE "ebd"."role" AS ENUM ('teacher', 'student');

-- AlterTable
ALTER TABLE "ebd"."attendances" DROP COLUMN "status",
ADD COLUMN     "status" "ebd"."status" NOT NULL DEFAULT 'absent';

-- AlterTable
ALTER TABLE "ebd"."users" DROP COLUMN "role",
ADD COLUMN     "role" "ebd"."role" NOT NULL DEFAULT 'teacher';

-- DropEnum
DROP TYPE "ebd"."Role";

-- DropEnum
DROP TYPE "ebd"."Status";
