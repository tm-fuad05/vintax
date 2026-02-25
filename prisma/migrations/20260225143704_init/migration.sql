/*
  Warnings:

  - The primary key for the `BestSelling` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "BestSelling" DROP CONSTRAINT "BestSelling_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "BestSelling_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "BestSelling_id_seq";
