import { prisma } from "@/lib/prisma";
import { Category, Prisma } from "../src/generated/prisma/client";
import { createId } from "@paralleldrive/cuid2";

type BestSellingInput = Omit<Prisma.BestSellingCreateInput, "id">;

const bestSellingProducts: BestSellingInput[] = [
  {
    name: "Casual Oversized T-Shirt",
    category: Category.Men,
    price: 29.99,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Beige", "Olive"],
    image: "https://images.unsplash.com/photo-1618354691438-25bc04584c23",
    description: "Soft cotton oversized t-shirt designed for everyday comfort.",
  },
  {
    name: "High-Waist Wide Leg Pants",
    category: Category.Women,
    price: 54.0,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Cream", "Black"],
    image:
      "https://res.cloudinary.com/djdzuwgqr/image/upload/q_auto/f_auto/v1779719790/wpant_tipa1l.jpg",
    description:
      "Chic high-waist wide leg pants with breathable fabric and relaxed fit.",
  },
  {
    name: "Slim Fit Chino Pants",
    category: Category.Men,
    price: 59.99,
    sizes: ["30", "32", "34", "36"],
    colors: ["Navy", "Khaki"],
    image:
      "https://res.cloudinary.com/djdzuwgqr/image/upload/q_auto/f_auto/v1779719788/pant_d71zgh.webp",
    description:
      "Modern slim-fit chino pants suitable for both office and casual wear.",
  },
  {
    name: "Minimalist White Blouse",
    category: Category.Women,
    price: 39.99,
    sizes: ["XS", "S", "M", "L"],
    colors: ["White"],
    image:
      "https://res.cloudinary.com/djdzuwgqr/image/upload/q_auto/f_auto/v1779719790/blouse_vyovtc.jpg",
    description:
      "Elegant minimalist white blouse made from premium soft fabric.",
  },
];

async function main(): Promise<void> {
  console.log("⏳ Seeding BestSelling products...");

  const productsWithCuid: Prisma.BestSellingCreateManyInput[] =
    bestSellingProducts.map((product) => ({
      id: createId(),
      ...product,
    }));

  await prisma.bestSelling.deleteMany();

  const result = await prisma.bestSelling.createMany({
    data: productsWithCuid,
    skipDuplicates: true,
  });

  console.log(`✅ ${result.count} BestSelling products seeded successfully!`);
}

main()
  .catch((e: unknown) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
