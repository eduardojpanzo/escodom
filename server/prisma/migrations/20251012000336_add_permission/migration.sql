-- AlterTable
ALTER TABLE "ebd"."users" ADD COLUMN     "permissions" TEXT[] DEFAULT ARRAY[]::TEXT[];
