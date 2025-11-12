-- AlterTable
ALTER TABLE "ebd"."people" ALTER COLUMN "created_by" DROP NOT NULL,
ALTER COLUMN "updated_by" DROP NOT NULL;
