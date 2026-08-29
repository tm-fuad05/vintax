"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Sparkles,
  Package,
  TrendingUp,
  ShieldCheck,
  Gem,
  Star,
  Grid,
  List,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  originalPrice?: number;
  stock: number;
  status: "In Stock" | "Low Stock" | "Exclusive";
  rating: number;
  sales: number;
  image: string;
  material: string;
  badge?: string;
}

const luxuryProducts: Product[] = [
  {
    id: "PRD-LX01",
    name: "Vintax Royal Diamond Chronograph 44mm",
    sku: "VTX-WCH-001",
    category: "Timepieces & Horology",
    price: 345000,
    originalPrice: 380000,
    stock: 3,
    status: "Exclusive",
    rating: 4.9,
    sales: 14,
    material: "18k Rose Gold & Baguette Diamond",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
    badge: "Limited Edition",
  },
  {
    id: "PRD-LX02",
    name: "Atelier Hand-Crafted Alligator Leather Briefcase",
    sku: "VTX-LTH-004",
    category: "Leather Goods",
    price: 185000,
    stock: 5,
    status: "In Stock",
    rating: 4.8,
    sales: 28,
    material: "Genuine Alligator Skin & 24k Gold Hardware",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80",
    badge: "Bestseller",
  },
  {
    id: "PRD-LX03",
    name: "Noir Velvet Tailored Tuxedo Jacket",
    sku: "VTX-CLT-012",
    category: "Couture Apparel",
    price: 95000,
    stock: 8,
    status: "In Stock",
    rating: 4.7,
    sales: 42,
    material: "Italian Silk-Blend Velvet & Satin Lapel",
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "PRD-LX04",
    name: "Monogram Heritage Silk Trench Coat",
    sku: "VTX-CLT-019",
    category: "Couture Apparel",
    price: 140000,
    originalPrice: 160000,
    stock: 2,
    status: "Low Stock",
    rating: 5.0,
    sales: 19,
    material: "100% Pure Mulberry Silk",
    image:
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&auto=format&fit=crop&q=80",
    badge: "Vault Item",
  },
  {
    id: "PRD-LX05",
    name: "Grand Complication Skeleton Automatic Watch",
    sku: "VTX-WCH-009",
    category: "Timepieces & Horology",
    price: 490000,
    stock: 1,
    status: "Exclusive",
    rating: 5.0,
    sales: 6,
    material: "Grade 5 Titanium & Sapphire Crystal",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80",
    badge: "Masterpiece",
  },
  {
    id: "PRD-LX06",
    name: "Emerald Cut Solitaire Diamond Cufflinks",
    sku: "VTX-JWL-003",
    category: "High Jewelry",
    price: 125000,
    stock: 4,
    status: "In Stock",
    rating: 4.9,
    sales: 31,
    material: "Platinum & VVS1 Diamonds",
    image:
      "https://images.unsplash.com/photo-1611591475281-b1e99e457962?w=600&auto=format&fit=crop&q=80",
  },
];

export default function AdminProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const categories = [
    "All",
    "Timepieces & Horology",
    "Leather Goods",
    "Couture Apparel",
    "High Jewelry",
  ];

  const filteredProducts = luxuryProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalCatalogValue = luxuryProducts.reduce(
    (acc, item) => acc + item.price * item.stock,
    0,
  );

  return (
    <div className="space-y-8">
      {/* Top Banner / Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-title text-white p-6 md:p-8 rounded-2xl relative overflow-hidden shadow-xl border border-secondary/20">
        <div className="absolute right-0 top-0 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl pointer-events-none" />
        <div className="space-y-1 relative z-10">
          <div className="flex items-center gap-2">
            <Gem className="w-4 h-4 text-secondary animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-secondary font-bold">
              Luxury Vault & Inventory
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            High-End Products Management
          </h1>
          <p className="text-xs text-white/70 font-mono">
            Manage your exclusive collection of premium timepieces, apparel, and
            bespoke goods.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-secondary text-title font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-white transition-colors duration-200 shadow-md">
            <Plus size={16} />
            Add New Product
          </button>
        </div>
      </div>

      {/* Quick Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-surface border border-border/70 p-5 rounded-xl space-y-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              Total Catalog Value
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <TrendingUp size={16} />
            </div>
          </div>
          <h3 className="text-2xl font-extrabold text-foreground tracking-tight font-mono">
            ৳ {totalCatalogValue.toLocaleString()}
          </h3>
          <p className="text-[11px] font-mono text-emerald-600 font-semibold">
            +18% luxury valuation increase
          </p>
        </div>

        <div className="bg-surface border border-border/70 p-5 rounded-xl space-y-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              Active Items
            </span>
            <div className="w-8 h-8 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
              <Package size={16} />
            </div>
          </div>
          <h3 className="text-2xl font-extrabold text-foreground tracking-tight font-mono">
            {luxuryProducts.length} Exclusive SKU
          </h3>
          <p className="text-[11px] font-mono text-muted-foreground">
            Across 4 luxury categories
          </p>
        </div>

        <div className="bg-surface border border-border/70 p-5 rounded-xl space-y-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              Average Item Price
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Sparkles size={16} />
            </div>
          </div>
          <h3 className="text-2xl font-extrabold text-foreground tracking-tight font-mono">
            ৳{" "}
            {Math.round(
              totalCatalogValue / luxuryProducts.length,
            ).toLocaleString()}
          </h3>
          <p className="text-[11px] font-mono text-amber-600 font-semibold">
            High tier clientele focus
          </p>
        </div>

        <div className="bg-surface border border-border/70 p-5 rounded-xl space-y-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              Vault Status
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <ShieldCheck size={16} />
            </div>
          </div>
          <h3 className="text-2xl font-extrabold text-foreground tracking-tight font-mono">
            100% Authenticated
          </h3>
          <p className="text-[11px] font-mono text-blue-600 font-semibold">
            Certificate of Origin verified
          </p>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-surface border border-border/70 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Search luxury products, SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-background border border-border/70 rounded-lg pl-9 pr-4 py-2 text-xs font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-secondary transition-colors"
          />
        </div>

        {/* Categories Tabs & View Modes */}
        <div className="flex flex-wrap items-center justify-between md:justify-end w-full md:w-auto gap-3">
          <div className="flex items-center bg-background p-1 rounded-lg border border-border/70 gap-1 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-md text-[11px] font-mono whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? "bg-title text-white font-bold shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center bg-background p-1 rounded-lg border border-border/70">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === "grid"
                  ? "bg-secondary text-title"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="Grid View"
            >
              <Grid size={15} />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === "table"
                  ? "bg-secondary text-title"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="Table View"
            >
              <List size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Product Display Area */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="bg-surface border border-border/70 hover:border-secondary/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between"
            >
              {/* Product Image Header */}
              <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 justify-between">
                  <span className="text-[10px] font-mono text-white/90 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md">
                    SKU: {product.sku}
                  </span>
                  <div className="flex items-center gap-2">
                    <button className="w-8 h-8 rounded-full bg-white text-title flex items-center justify-center hover:bg-secondary transition-colors shadow-lg">
                      <Eye size={14} />
                    </button>
                    <button className="w-8 h-8 rounded-full bg-white text-title flex items-center justify-center hover:bg-secondary transition-colors shadow-lg">
                      <Edit size={14} />
                    </button>
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  {product.badge && (
                    <span className="px-2.5 py-1 bg-title/90 backdrop-blur-md text-secondary border border-secondary/30 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider shadow-md">
                      {product.badge}
                    </span>
                  )}
                </div>

                <div className="absolute top-3 right-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold backdrop-blur-md shadow-md ${
                      product.status === "Exclusive"
                        ? "bg-purple-500/20 text-purple-200 border border-purple-400/30"
                        : product.status === "Low Stock"
                          ? "bg-amber-500/20 text-amber-200 border border-amber-400/30"
                          : "bg-emerald-500/20 text-emerald-200 border border-emerald-400/30"
                    }`}
                  >
                    {product.status}
                  </span>
                </div>
              </div>

              {/* Product Body Details */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                    <span className="text-secondary font-semibold uppercase tracking-wider">
                      {product.category}
                    </span>
                    <span className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star size={12} className="fill-amber-500" />{" "}
                      {product.rating}
                    </span>
                  </div>

                  <h3 className="font-bold text-foreground text-base group-hover:text-secondary transition-colors line-clamp-1">
                    {product.name}
                  </h3>

                  <p className="text-xs text-muted-foreground font-mono line-clamp-1">
                    ✨ {product.material}
                  </p>
                </div>

                {/* Price & Stock Stats */}
                <div className="pt-3 border-t border-border/60 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-muted-foreground block uppercase">
                      Retail Price
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-extrabold font-mono text-foreground">
                        ৳ {product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs font-mono text-muted-foreground line-through">
                          ৳ {product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right font-mono">
                    <span className="text-[10px] text-muted-foreground block uppercase">
                      Stock Remaining
                    </span>
                    <span className="text-xs font-bold text-foreground">
                      {product.stock} units
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-surface border border-border/70 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="bg-background/80 border-b border-border/70 text-muted-foreground uppercase text-[10px] tracking-wider">
                  <th className="py-4 px-4">Item Details</th>
                  <th className="py-4 px-4">Category</th>
                  <th className="py-4 px-4">Price</th>
                  <th className="py-4 px-4">Stock</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-background/50 transition-colors"
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover border border-border"
                        />
                        <div>
                          <div className="font-bold text-foreground text-sm">
                            {product.name}
                          </div>
                          <div className="text-[10px] text-muted-foreground">
                            SKU: {product.sku}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-muted-foreground">
                      {product.category}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-foreground">
                      ৳ {product.price.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4">{product.stock} units</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          product.status === "Exclusive"
                            ? "bg-purple-500/10 text-purple-600 border border-purple-500/30"
                            : product.status === "Low Stock"
                              ? "bg-amber-500/10 text-amber-600 border border-amber-500/30"
                              : "bg-emerald-500/10 text-emerald-600 border border-emerald-500/30"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 rounded-md hover:bg-background text-muted-foreground hover:text-foreground transition-colors">
                          <Eye size={14} />
                        </button>
                        <button className="p-1.5 rounded-md hover:bg-background text-muted-foreground hover:text-foreground transition-colors">
                          <Edit size={14} />
                        </button>
                        <button className="p-1.5 rounded-md hover:bg-background text-rose-500 hover:bg-rose-500/10 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
