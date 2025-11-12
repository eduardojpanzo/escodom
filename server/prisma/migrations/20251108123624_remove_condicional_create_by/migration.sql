/*
  Warnings:

  - Made the column `created_by` on table `attendances` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_by` on table `attendances` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_by` on table `classes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_by` on table `classes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_by` on table `classrooms` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_by` on table `classrooms` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_by` on table `levels` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_by` on table `levels` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_by` on table `people` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_by` on table `people` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_by` on table `schedules` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_by` on table `schedules` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_by` on table `teacher_evaluations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_by` on table `teacher_evaluations` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ebd"."attendances" ALTER COLUMN "created_by" SET NOT NULL,
ALTER COLUMN "updated_by" SET NOT NULL;

-- AlterTable
ALTER TABLE "ebd"."classes" ALTER COLUMN "created_by" SET NOT NULL,
ALTER COLUMN "updated_by" SET NOT NULL;

-- AlterTable
ALTER TABLE "ebd"."classrooms" ALTER COLUMN "created_by" SET NOT NULL,
ALTER COLUMN "updated_by" SET NOT NULL;

-- AlterTable
ALTER TABLE "ebd"."levels" ALTER COLUMN "created_by" SET NOT NULL,
ALTER COLUMN "updated_by" SET NOT NULL;

-- AlterTable
ALTER TABLE "ebd"."people" ALTER COLUMN "created_by" SET NOT NULL,
ALTER COLUMN "updated_by" SET NOT NULL;

-- AlterTable
ALTER TABLE "ebd"."schedules" ALTER COLUMN "created_by" SET NOT NULL,
ALTER COLUMN "updated_by" SET NOT NULL;

-- AlterTable
ALTER TABLE "ebd"."teacher_evaluations" ALTER COLUMN "created_by" SET NOT NULL,
ALTER COLUMN "updated_by" SET NOT NULL;
