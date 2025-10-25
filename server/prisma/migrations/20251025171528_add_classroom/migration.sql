/*
  Warnings:

  - You are about to drop the column `class_id` on the `attendances` table. All the data in the column will be lost.
  - You are about to drop the column `class_id` on the `schedules` table. All the data in the column will be lost.
  - You are about to drop the column `class_id` on the `students` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[classroom_id,startDate,teacher_id,endDate]` on the table `schedules` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `classroom_id` to the `attendances` table without a default value. This is not possible if the table is not empty.
  - Added the required column `classroom_id` to the `schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `classroom_id` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ebd"."attendances" DROP CONSTRAINT "attendances_class_id_fkey";

-- DropForeignKey
ALTER TABLE "ebd"."schedules" DROP CONSTRAINT "schedules_class_id_fkey";

-- DropForeignKey
ALTER TABLE "ebd"."students" DROP CONSTRAINT "students_class_id_fkey";

-- DropIndex
DROP INDEX "ebd"."idx_attendances_date_class_id";

-- DropIndex
DROP INDEX "ebd"."idx_schedules_start_end_date_class_id";

-- DropIndex
DROP INDEX "ebd"."schedules_class_id_startDate_teacher_id_endDate_key";

-- DropIndex
DROP INDEX "ebd"."idx_students_class_id";

-- AlterTable
ALTER TABLE "ebd"."attendances" DROP COLUMN "class_id",
ADD COLUMN     "classroom_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "ebd"."schedules" DROP COLUMN "class_id",
ADD COLUMN     "classroom_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "ebd"."students" DROP COLUMN "class_id",
ADD COLUMN     "classroom_id" UUID NOT NULL;

-- CreateTable
CREATE TABLE "ebd"."classrooms" (
    "classroom_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "class_id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID,
    "updated_by" UUID,

    CONSTRAINT "classrooms_pkey" PRIMARY KEY ("classroom_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "classrooms_name_key" ON "ebd"."classrooms"("name");

-- CreateIndex
CREATE INDEX "idx_classrooms_level_id" ON "ebd"."classrooms"("class_id");

-- CreateIndex
CREATE UNIQUE INDEX "classrooms_class_id_name_key" ON "ebd"."classrooms"("class_id", "name");

-- CreateIndex
CREATE INDEX "idx_attendances_date_classroom_id" ON "ebd"."attendances"("date", "classroom_id");

-- CreateIndex
CREATE INDEX "idx_schedules_start_end_date_classroom_id" ON "ebd"."schedules"("startDate", "endDate", "classroom_id");

-- CreateIndex
CREATE UNIQUE INDEX "schedules_classroom_id_startDate_teacher_id_endDate_key" ON "ebd"."schedules"("classroom_id", "startDate", "teacher_id", "endDate");

-- CreateIndex
CREATE INDEX "idx_students_classroom_id" ON "ebd"."students"("classroom_id");

-- AddForeignKey
ALTER TABLE "ebd"."attendances" ADD CONSTRAINT "attendances_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "ebd"."classrooms"("classroom_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ebd"."classrooms" ADD CONSTRAINT "classrooms_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "ebd"."people"("person_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ebd"."classrooms" ADD CONSTRAINT "classrooms_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "ebd"."people"("person_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ebd"."classrooms" ADD CONSTRAINT "classrooms_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "ebd"."classes"("class_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ebd"."schedules" ADD CONSTRAINT "schedules_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "ebd"."classrooms"("classroom_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ebd"."students" ADD CONSTRAINT "students_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "ebd"."classrooms"("classroom_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
