import { categories } from "../../src/data/categoryData";
import { prisma } from "../../src/lib/prisma";

export async function seedCategory() {
  console.log("Seeding categories.......");

  const categoriesData = await prisma.category.createMany({
    data: categories,
    skipDuplicates: true,
  });
  console.log("Categories", categoriesData);
}
