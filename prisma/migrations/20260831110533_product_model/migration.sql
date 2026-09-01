-- AlterTable
ALTER TABLE "verification" ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL DEFAULT 'Image',
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL DEFAULT 500,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
