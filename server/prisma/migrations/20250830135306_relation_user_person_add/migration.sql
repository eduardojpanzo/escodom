/*
  Warnings:

  - You are about to drop the column `user_id` on the `students` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[person_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `person_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ebd"."students" DROP CONSTRAINT "students_user_id_fkey";

-- DropForeignKey
ALTER TABLE "ebd"."teachers" DROP CONSTRAINT "teachers_user_id_fkey";

-- DropIndex
DROP INDEX "ebd"."students_user_id_key";

-- AlterTable
ALTER TABLE "ebd"."students" DROP COLUMN "user_id";

-- AlterTable
ALTER TABLE "ebd"."users" ADD COLUMN     "person_id" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_person_id_key" ON "ebd"."users"("person_id");

-- AddForeignKey
ALTER TABLE "ebd"."users" ADD CONSTRAINT "users_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "ebd"."people"("person_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
