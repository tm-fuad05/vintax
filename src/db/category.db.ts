import "server-only";
import { prisma } from "../lib/prisma";

export async function getCategories() {
  try {
    return await prisma.category.findMany();
  } catch (error: any) {
    console.log("Categories find error:", error);
    return [];
  }
}
