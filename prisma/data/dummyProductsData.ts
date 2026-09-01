import { createId } from "@paralleldrive/cuid2";
import { Prisma } from "../../src/generated/prisma/client";

type Product = Prisma.ProductUncheckedCreateInput;

const dummyProducts: Product[] = [
  {
    title: "OVERSIZED ARCHIVAL HOODIE",
    slug: "oversized-archival-hoodie",
    description:
      "High-end heavyweight oversized archival hoodie with custom luxury finish.",
    price: 380.0,
    discountPrice: 450.0,
    images: [
      "https://res.cloudinary.com/djdzuwgqr/image/upload/v1788186446/photo-1556905055-8f358a7a47b2_a0mpr7.avif",
    ],
    stock: 25,
    totalSold: 120,
    isFlashSale: false,
    flashSaleEndsAt: null,
    isFeatured: true,
    categoryId: "cat-men",
  },
  {
    title: "TAILORED WOOL TRENCH",
    slug: "tailored-wool-trench",
    description:
      "Premium tailored wool trench coat engineered for winter warmth and sophisticated silhouette.",
    price: 1250.0,
    discountPrice: null,
    images: [
      "https://res.cloudinary.com/djdzuwgqr/image/upload/v1788186450/photo-1539571696357-5a69c17a67c6_wdecz4.avif",
    ],
    stock: 15,
    totalSold: 85,
    isFlashSale: false,
    flashSaleEndsAt: null,
    isFeatured: true,
    categoryId: "cat-accessories",
  },
  {
    title: "ATELIER LEATHER CHELSEA",
    slug: "atelier-leather-chelsea",
    description:
      "Handcrafted atelier leather chelsea boots with durable lug sole.",
    price: 640.0,
    discountPrice: 780.0,
    images: [
      "https://res.cloudinary.com/djdzuwgqr/image/upload/v1788186454/photo-1608256246200-53e635b5b65f_ptvlp1.avif",
    ],
    stock: 30,
    totalSold: 64,
    isFlashSale: false,
    flashSaleEndsAt: null,
    isFeatured: true,
    categoryId: "cat-sneakers",
  },
  {
    title: "SIGNATURE MONOGRAM TOTE",
    slug: "signature-monogram-tote",
    description:
      "Iconic signature monogram tote bag crafted with genuine full-grain leather.",
    price: 890.0,
    discountPrice: null,
    images: [
      "https://res.cloudinary.com/djdzuwgqr/image/upload/v1788186452/photo-1590874103328-eac38a683ce7_rwdnvn.avif",
    ],
    stock: 10,
    totalSold: 140,
    isFlashSale: false,
    flashSaleEndsAt: null,
    isFeatured: true,
    categoryId: "cat-accessories",
  },
  {
    title: "MINIMAL SUEDE LOW-TOP",
    slug: "minimal-suede-low-top",
    description:
      "Clean aesthetic minimal suede low-top sneakers for everyday luxury.",
    price: 490.0,
    discountPrice: null,
    images: [
      "https://res.cloudinary.com/djdzuwgqr/image/upload/v1788186446/photo-1549298916-b41d501d3772_ifluyz.avif",
    ],
    stock: 40,
    totalSold: 95,
    isFlashSale: false,
    flashSaleEndsAt: null,
    isFeatured: false,
    categoryId: "cat-sneakers",
  },
  {
    title: "CHRONO VINTAGE TIMEPIECE",
    slug: "chrono-vintage-timepiece",
    description:
      "Precision engineered chronograph timepiece with vintage leather strap.",
    price: 950.0,
    discountPrice: 1200.0,
    images: [
      "https://res.cloudinary.com/djdzuwgqr/image/upload/v1788186448/photo-1522335789203-aabd1fc54bc9_hacefv.avif",
    ],
    stock: 8,
    totalSold: 210,
    isFlashSale: false,
    flashSaleEndsAt: null,
    isFeatured: true,
    categoryId: "cat-accessories",
  },
  {
    title: "STRUCTURED DENIM JACKET",
    slug: "structured-denim-jacket",
    description:
      "Heavyweight raw denim jacket with structured shoulders and custom brass hardware.",
    price: 520.0,
    discountPrice: null,
    images: [
      "https://res.cloudinary.com/djdzuwgqr/image/upload/v1788186451/photo-1576995853123-5a10305d93c0_nnycep.avif",
    ],
    stock: 20,
    totalSold: 45,
    isFlashSale: false,
    flashSaleEndsAt: null,
    isFeatured: false,
    categoryId: "cat-men",
  },
  {
    title: "SCULPTURAL ACETATE SHADES",
    slug: "sculptural-acetate-shades",
    description:
      "Hand-polished Italian acetate sunglasses with 100% UV protection lenses.",
    price: 310.0,
    discountPrice: null,
    images: [
      "https://res.cloudinary.com/djdzuwgqr/image/upload/v1788186447/photo-1511499767150-a48a237f0083_sgxulc.avif",
    ],
    stock: 50,
    totalSold: 180,
    isFlashSale: false,
    flashSaleEndsAt: null,
    isFeatured: true,
    categoryId: "cat-accessories",
  },

  // Products from FlashDeals.tsx
  {
    title: "ARCHIVAL LEATHER TRENCH",
    slug: "archival-leather-trench",
    description:
      "Limited drop archival lambskin leather trench coat with tailored fitting.",
    price: 1450.0,
    discountPrice: 895.0,
    images: [
      "https://res.cloudinary.com/djdzuwgqr/image/upload/v1788186446/photo-1548883354-7622d03aca27_nayppu.avif",
    ],
    stock: 3,
    totalSold: 16,
    isFlashSale: true,
    flashSaleEndsAt: new Date(Date.now() + 14 * 60 * 60 * 1000),
    isFeatured: true,
    categoryId: "cat-men",
  },
  {
    title: "CHRONO VINTAGE TIMEPIECE FLASH",
    slug: "chrono-vintage-timepiece-flash",
    description: "Limited edition flash sale chronograph vintage timepiece.",
    price: 890.0,
    discountPrice: 490.0,
    images: [
      "https://res.cloudinary.com/djdzuwgqr/image/upload/v1788186449/photo-1523275335684-37898b6baf30_waoelh.avif",
    ],
    stock: 2,
    totalSold: 23,
    isFlashSale: true,
    flashSaleEndsAt: new Date(Date.now() + 14 * 60 * 60 * 1000),
    isFeatured: true,
    categoryId: "cat-accessories",
  },
  {
    title: "ATELIER SUEDE RUNNER",
    slug: "atelier-suede-runner",
    description:
      "Luxury suede runner sneaker with ergonomic cushioned footbed.",
    price: 620.0,
    discountPrice: 375.0,
    images: [
      "https://res.cloudinary.com/djdzuwgqr/image/upload/v1788186447/photo-1560769629-975ec94e6a86_fr4giq.avif",
    ],
    stock: 5,
    totalSold: 16,
    isFlashSale: true,
    flashSaleEndsAt: new Date(Date.now() + 14 * 60 * 60 * 1000),
    isFeatured: false,
    categoryId: "cat-sneakers",
  },
  {
    title: "MONOGRAM TRAVEL BAG",
    slug: "monogram-travel-bag",
    description:
      "Spacious weekender travel bag with monogram coated canvas and leather trim.",
    price: 1120.0,
    discountPrice: 670.0,
    images: [
      "https://res.cloudinary.com/djdzuwgqr/image/upload/v1788186447/photo-1560769629-975ec94e6a86_fr4giq.avif",
    ],
    stock: 7,
    totalSold: 15,
    isFlashSale: true,
    flashSaleEndsAt: new Date(Date.now() + 14 * 60 * 60 * 1000),
    isFeatured: true,
    categoryId: "cat-accessories",
  },
];

export const dummyProductsWithId: Product[] = dummyProducts?.map((product) => ({
  id: createId(),
  ...product,
}));
