"use client";

import { useState, useMemo } from "react";
import { ShopHeader } from "./components/ShopHeader";
import { ShopSidebar, FilterState } from "./components/ShopSidebar";
import { ProductGrid } from "./components/ProductGrid";
import { ShopProduct } from "./components/ShopCard";
import { toast } from "sonner";

export default function ShopPage() {
  const initialFilters: FilterState = {
    searchQuery: "",
    category: "ALL",
    minPrice: 0,
    maxPrice: 5000,
    size: "ALL",
    color: "ALL",
  };

  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [sortBy, setSortBy] = useState("newest");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Archival Fashion Mock Dataset
  const allProducts: ShopProduct[] = [
    {
      id: "shop-1",
      name: "OVERSIZED ARCHIVAL HOODIE",
      category: "STREETWEAR",
      price: 380,
      originalPrice: 450,
      badge: "NEW DROP",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop",
      size: "L",
      color: "Onyx Black",
      dateAdded: "2026-02-01",
    },
    {
      id: "shop-2",
      name: "TAILORED WOOL TRENCH",
      category: "OUTERWEAR",
      price: 1250,
      badge: "BEST SELLER",
      rating: 5.0,
      image:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop",
      size: "XL",
      color: "Slate Gray",
      dateAdded: "2026-01-15",
    },
    {
      id: "shop-3",
      name: "ATELIER LEATHER CHELSEA",
      category: "FOOTWEAR",
      price: 640,
      originalPrice: 780,
      badge: "LIMITED",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=1000&auto=format&fit=crop",
      size: "M",
      color: "Onyx Black",
      dateAdded: "2026-02-03",
    },
    {
      id: "shop-4",
      name: "SIGNATURE MONOGRAM TOTE",
      category: "ACCESSORIES",
      price: 890,
      badge: "EXCLUSIVE",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop",
      size: "ALL",
      color: "Metallic Gold",
      dateAdded: "2026-01-20",
    },
    {
      id: "shop-5",
      name: "MINIMAL SUEDE LOW-TOP",
      category: "FOOTWEAR",
      price: 490,
      badge: "BEST SELLER",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000&auto=format&fit=crop",
      size: "S",
      color: "Chalk White",
      dateAdded: "2026-01-10",
    },
    {
      id: "shop-6",
      name: "CHRONO VINTAGE TIMEPIECE",
      category: "ACCESSORIES",
      price: 950,
      originalPrice: 1200,
      badge: "EXCLUSIVE",
      rating: 5.0,
      image:
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop",
      size: "ALL",
      color: "Metallic Gold",
      dateAdded: "2026-01-05",
    },
    {
      id: "shop-7",
      name: "STRUCTURED DENIM JACKET",
      category: "OUTERWEAR",
      price: 520,
      badge: "NEW DROP",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1000&auto=format&fit=crop",
      size: "L",
      color: "Slate Gray",
      dateAdded: "2026-02-02",
    },
    {
      id: "shop-8",
      name: "SCULPTURAL ACETATE SHADES",
      category: "EYEWEAR",
      price: 310,
      badge: "BEST SELLER",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1000&auto=format&fit=crop",
      size: "ALL",
      color: "Onyx Black",
      dateAdded: "2026-01-25",
    },
    {
      id: "shop-9",
      name: "DOUBLE BREASTED SUIT BLAZER",
      category: "TAILORED SUITS",
      price: 1450,
      originalPrice: 1680,
      badge: "HAUTE COUTURE",
      rating: 5.0,
      image:
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop",
      size: "XL",
      color: "Onyx Black",
      dateAdded: "2026-01-28",
    },
    {
      id: "shop-10",
      name: "ARCHIVAL BOMBER JACKET",
      category: "OUTERWEAR",
      price: 780,
      badge: "LIMITED",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1000&auto=format&fit=crop",
      size: "M",
      color: "Slate Gray",
      dateAdded: "2026-02-04",
    },
  ];

  // Dynamic Category Counts
  const categoriesList = useMemo(() => {
    const counts: Record<string, number> = {
      ALL: allProducts.length,
      STREETWEAR: 0,
      OUTERWEAR: 0,
      FOOTWEAR: 0,
      ACCESSORIES: 0,
      EYEWEAR: 0,
      "TAILORED SUITS": 0,
    };

    allProducts.forEach((p) => {
      if (counts[p.category] !== undefined) {
        counts[p.category] += 1;
      }
    });

    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, [allProducts]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((product) => {
        // Search Filter
        if (
          filters.searchQuery &&
          !product.name
            .toLowerCase()
            .includes(filters.searchQuery.toLowerCase()) &&
          !product.category
            .toLowerCase()
            .includes(filters.searchQuery.toLowerCase())
        ) {
          return false;
        }

        // Category Filter
        if (
          filters.category !== "ALL" &&
          product.category !== filters.category
        ) {
          return false;
        }

        // Price Filter
        if (
          product.price < filters.minPrice ||
          product.price > filters.maxPrice
        ) {
          return false;
        }

        // Size Filter
        if (
          filters.size !== "ALL" &&
          product.size !== "ALL" &&
          product.size !== filters.size
        ) {
          return false;
        }

        // Color Filter
        if (filters.color !== "ALL" && product.color !== filters.color) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return (
          new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
        );
      });
  }, [allProducts, filters, sortBy]);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
    toast.info("All catalog filters have been reset.");
  };

  const handleAddToCart = (product: ShopProduct) => {
    toast.success(`Added ${product.name} to your bag`);
  };

  return (
    <div className="min-h-screen bg-background text-title pb-28">
      {/* 1. Header Banner */}
      <ShopHeader
        totalItems={filteredProducts.length}
        activeCategory={filters.category}
        onToggleMobileFilter={() => setIsMobileFilterOpen(true)}
      />

      {/* 2. Main Layout Container - Enforcing w-11/12 mx-auto */}
      <div className="w-11/12 mx-auto pt-12 flex gap-10">
        {/* Sidebar Filters */}
        <ShopSidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          categories={categoriesList}
          isMobileOpen={isMobileFilterOpen}
          onCloseMobile={() => setIsMobileFilterOpen(false)}
        />

        {/* Catalog Grid */}
        <ProductGrid
          products={filteredProducts}
          totalProductsCount={allProducts.length}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onResetFilters={handleResetFilters}
          onAddToCart={handleAddToCart}
        />
      </div>
    </div>
  );
}
