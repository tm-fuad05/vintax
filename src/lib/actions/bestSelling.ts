"use server";

import { prisma } from "../prisma";

export async function getBestSellingProducts() {
  return await prisma.bestSelling.findMany();
}
