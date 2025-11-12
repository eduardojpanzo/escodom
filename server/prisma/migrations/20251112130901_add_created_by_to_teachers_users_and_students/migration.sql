/*
  Warnings:

  - Added the required column `created_by` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_by` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `teachers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_by` to the `teachers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_by` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ebd"."students" ADD COLUMN     "created_by" UUID NOT NULL,
ADD COLUMN     "updated_by" UUID NOT NULL;

-- AlterTable
ALTER TABLE "ebd"."teachers" ADD COLUMN     "created_by" UUID NOT NULL,
ADD COLUMN     "updated_by" UUID NOT NULL;

-- AlterTable
ALTER TABLE "ebd"."users" ADD COLUMN     "created_by" UUID NOT NULL,
ADD COLUMN     "updated_by" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "ebd"."students" ADD CONSTRAINT "students_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "ebd"."people"("person_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ebd"."students" ADD CONSTRAINT "students_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "ebd"."people"("person_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ebd"."teachers" ADD CONSTRAINT "teachers_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "ebd"."people"("person_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ebd"."teachers" ADD CONSTRAINT "teachers_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "ebd"."people"("person_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ebd"."users" ADD CONSTRAINT "users_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "ebd"."people"("person_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ebd"."users" ADD CONSTRAINT "users_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "ebd"."people"("person_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
