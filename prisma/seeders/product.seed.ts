import { dummyProductsWithId } from "../data/dummyProductsData";
import { prisma } from "../../src/lib/prisma";

export async function seedProducts() {
  console.log("Seeding productss.......");

  const products = await prisma.product.createMany({
    data: dummyProductsWithId,
    skipDuplicates: true,
  });

  console.log("Products", products);
}
