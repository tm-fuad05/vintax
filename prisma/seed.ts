import { prisma } from "../src/lib/prisma";
import { seedCategory } from "./seeders/category.seed";
import { seedProducts } from "./seeders/product.seed";

export default async function main() {
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await seedCategory();
  await seedProducts();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
