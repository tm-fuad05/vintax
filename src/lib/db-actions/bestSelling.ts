"use server";

import { prisma } from "../prisma";

export interface BestSellingProduct {
  id: string;
  category: string;
  colors: string[];
  description: string;
  image: string;
  name: string;
  price: number;
  sizes: string[];
}

export async function getBestSellingProducts(): Promise<{
  success: boolean;
  data?: BestSellingProduct[];
  error?: string;
}> {
  try {
    const products = await prisma.bestSelling.findMany({
      // টিপ: ই-কমার্সের জন্য সবসময় একটা লিমিট রাখা ভালো, যেন একবারে হাজারটা ডাটা এসে সার্ভার স্লো না করে
      take: 10,
    });

    return {
      success: true,
      data: products,
    };
  } catch (error) {
    console.error("Failed to fetch best-selling products:", error);

    return {
      success: false,
      error: `Failed to fetch best-selling products ${error}`,
    };
  }
}
