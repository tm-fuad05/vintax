import { Prisma } from "@/generated/prisma/client";

type CategoryInput = Prisma.CategoryCreateInput;

export const categories: CategoryInput[] = [
  {
    id: "cat-men",
    name: "Men",
    slug: "men",
    image:
      "https://res.cloudinary.com/djdzuwgqr/image/upload/v1788186447/photo-1506794778202-cad84cf45f1d_uz5a2a.avif",
  },
  {
    id: "cat-women",
    name: "Women",
    slug: "women",
    image:
      "https://res.cloudinary.com/djdzuwgqr/image/upload/v1788186448/photo-1515886657613-9f3515b0c78f_s33gnx.avif",
  },
  {
    id: "cat-sneakers",
    name: "Sneakers",
    slug: "sneakers",
    image:
      "https://res.cloudinary.com/djdzuwgqr/image/upload/v1788186454/photo-1595950653106-6c9ebd614d3a_ifxlau.avif",
  },
  {
    id: "cat-accessories",
    name: "Accessories",
    slug: "accessories",
    image:
      "https://res.cloudinary.com/djdzuwgqr/image/upload/v1788186451/photo-1584917865442-de89df76afd3_yeoasq.avif",
  },
];
