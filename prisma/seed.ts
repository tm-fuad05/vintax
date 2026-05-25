import { prisma } from "@/lib/prisma";
import { Category, Prisma } from "../src/generated/prisma/client";

// ফাইলের ভেতরে গ্লোবাল prisma ভ্যারিয়েবলের বদলে নতুন ইনস্ট্যান্স তৈরি করুন

import { createId } from "@paralleldrive/cuid2";

// ১. প্রিজমার জেনারেটেড টাইপ থেকে ইনপুট টাইপ ডিফাইন করা (id ছাড়া বাকি সব)
type BestSellingInput = Omit<Prisma.BestSellingCreateInput, "id">;

const bestSellingProducts: BestSellingInput[] = [
  {
    name: "Casual Oversized T-Shirt",
    category: Category.Men, // স্কিমার Enum ব্যবহার করা হয়েছে
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

  // ২. প্রতিটি প্রোডাক্টের সাথে টাইপ-সেফ উপায়ে CUID যুক্ত করা
  const productsWithCuid: Prisma.BestSellingCreateManyInput[] =
    bestSellingProducts.map((product) => ({
      id: createId(), // @paralleldrive/cuid2 থেকে ইউনিক আইডি জেনারেট হচ্ছে
      ...product,
    }));

  // আগের কোনো ডামি ডেটা থাকলে তা টেবিল থেকে মুছে ফেলা
  await prisma.bestSelling.deleteMany();

  // ৩. বাল্ক ইনসার্ট (একটি মাত্র কোয়েরিতে সব ডেটা ইনসার্ট)
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
