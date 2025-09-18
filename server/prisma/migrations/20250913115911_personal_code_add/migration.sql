/*
  Warnings:

  - You are about to drop the column `bi` on the `people` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[personal_code]` on the table `people` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `personal_code` to the `people` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ebd"."people_bi_key";

-- AlterTable
ALTER TABLE "ebd"."people" DROP COLUMN "bi",
ADD COLUMN     "personal_code" VARCHAR(100) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "people_personal_code_key" ON "ebd"."people"("personal_code");
