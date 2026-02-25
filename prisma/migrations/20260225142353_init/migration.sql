-- CreateEnum
CREATE TYPE "Category" AS ENUM ('Men', 'Women');

-- CreateTable
CREATE TABLE "BestSelling" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "price" INTEGER NOT NULL,
    "sizes" TEXT[],
    "colors" TEXT[],
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "BestSelling_pkey" PRIMARY KEY ("id")
);
