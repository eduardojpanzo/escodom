-- AlterTable
ALTER TABLE "ebd"."people" ADD COLUMN     "created_by" UUID,
ADD COLUMN     "updated_by" UUID;

-- AddForeignKey
ALTER TABLE "ebd"."people" ADD CONSTRAINT "people_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "ebd"."people"("person_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ebd"."people" ADD CONSTRAINT "people_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "ebd"."people"("person_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
