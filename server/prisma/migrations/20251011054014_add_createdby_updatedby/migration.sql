-- AlterTable
ALTER TABLE "ebd"."attendances" ADD COLUMN     "created_by" UUID,
ADD COLUMN     "updated_by" UUID;

-- AlterTable
ALTER TABLE "ebd"."classes" ADD COLUMN     "created_by" UUID,
ADD COLUMN     "updated_by" UUID;

-- AlterTable
ALTER TABLE "ebd"."levels" ADD COLUMN     "created_by" UUID,
ADD COLUMN     "updated_by" UUID;

-- AlterTable
ALTER TABLE "ebd"."schedules" ADD COLUMN     "created_by" UUID,
ADD COLUMN     "updated_by" UUID;

-- AlterTable
ALTER TABLE "ebd"."teacher_evaluations" ADD COLUMN     "created_by" UUID,
ADD COLUMN     "updated_by" UUID;

-- AddForeignKey
ALTER TABLE "ebd"."attendances" ADD CONSTRAINT "attendances_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "ebd"."people"("person_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ebd"."attendances" ADD CONSTRAINT "attendances_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "ebd"."people"("person_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ebd"."classes" ADD CONSTRAINT "classes_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "ebd"."people"("person_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ebd"."classes" ADD CONSTRAINT "classes_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "ebd"."people"("person_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ebd"."levels" ADD CONSTRAINT "levels_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "ebd"."people"("person_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ebd"."levels" ADD CONSTRAINT "levels_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "ebd"."people"("person_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ebd"."schedules" ADD CONSTRAINT "schedules_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "ebd"."people"("person_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ebd"."schedules" ADD CONSTRAINT "schedules_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "ebd"."people"("person_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ebd"."teacher_evaluations" ADD CONSTRAINT "teacher_evaluations_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "ebd"."people"("person_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ebd"."teacher_evaluations" ADD CONSTRAINT "teacher_evaluations_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "ebd"."people"("person_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
