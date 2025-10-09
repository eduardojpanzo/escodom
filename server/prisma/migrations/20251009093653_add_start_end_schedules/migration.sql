/*
  Warnings:

  - You are about to drop the column `date` on the `schedules` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[class_id,startDate,teacher_id,endDate]` on the table `schedules` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `endDate` to the `schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `schedules` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ebd"."idx_schedules_date_class_id";

-- DropIndex
DROP INDEX "ebd"."schedules_class_id_date_key";

-- AlterTable
ALTER TABLE "ebd"."schedules" DROP COLUMN "date",
ADD COLUMN     "endDate" DATE NOT NULL,
ADD COLUMN     "startDate" DATE NOT NULL;

-- CreateIndex
CREATE INDEX "idx_schedules_start_end_date_class_id" ON "ebd"."schedules"("startDate", "endDate", "class_id");

-- CreateIndex
CREATE INDEX "idx_schedules_start_end_date_teacher_id" ON "ebd"."schedules"("startDate", "endDate", "teacher_id");

-- CreateIndex
CREATE UNIQUE INDEX "schedules_class_id_startDate_teacher_id_endDate_key" ON "ebd"."schedules"("class_id", "startDate", "teacher_id", "endDate");
