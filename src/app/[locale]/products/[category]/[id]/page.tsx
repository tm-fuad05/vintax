"use client";

import React, { use, useState } from "react";
import Image from "next/image";
import { ChevronRight, ShoppingCart, ShieldCheck, Truck } from "lucide-react";
import { useParams } from "next/navigation";
import { getBestSellingProducts } from "@/lib/db-actions/bestSelling";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  fabric: string;
  images: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
}

const product: Product = {
  id: "vh-001",
  name: "Oversized Heavyweight Hoodie",
  price: 120.0,
  description:
    "Experience absolute comfort with our premium oversized hoodie. Designed for a boxy, modern silhouette with dropped shoulders.",
  fabric: "450GSM French Terry Cotton, garment dyed for a vintage look.",
  images: [
    "https://res.cloudinary.com/djdzuwgqr/image/upload/q_auto/f_auto/v1779719788/pant_d71zgh.webp", // Placeholder Front
    "https://res.cloudinary.com/djdzuwgqr/image/upload/q_auto/f_auto/v1779719790/wpant_tipa1l.jpg", // Placeholder Side
    "https://res.cloudinary.com/djdzuwgqr/image/upload/q_auto/f_auto/v1779719790/blouse_vyovtc.jpg", // Placeholder Detail
  ],
  sizes: ["S", "M", "L", "XL", "XXL"],
  colors: [
    { name: "Vintage Black", hex: "#1A1A1A" },
    { name: "Cypress", hex: "#2D3B2D" },
    { name: "Greyhound", hex: "#8E8E8E" },
  ],
};

export default function ProductDetail() {
  const { id } = useParams();
  console.log(id);

  //   const [activeImage, setActiveImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  return (
    <div className="w-11/12 mx-auto px-6 py-40 grid grid-cols-1 lg:grid-cols-12 gap-12 font-sans antialiased text-slate-900">
      {/* Left: Image Gallery (5/12 columns) */}
      <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
        {/* Thumbnails */}
        {/* <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible">
          {product.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(img)}
              className={`relative w-20 h-24 border-2 transition-all overflow-hidden bg-slate-50 ${
                activeImage === img ? "border-slate-900" : "border-transparent"
              }`}
            >
              <img src={img} alt="Thumbnail" className="object-cover" />
            </button>
          ))}
        </div> */}

        {/* Main Image */}
        <div className="relative flex-1 aspect-[3/4] bg-slate-50 overflow-hidden border border-slate-100">
          {/* <img src={activeImage} alt={product.name} className="object-cover" /> */}
        </div>
      </div>

      {/* Right: Product Details (7/12 columns) */}
      <div className="lg:col-span-5 flex flex-col">
        <nav className="flex items-center text-xs uppercase tracking-widest text-slate-400 mb-6">
          <span>Home</span> <ChevronRight size={12} className="mx-2" />
          <span>Apparel</span> <ChevronRight size={12} className="mx-2" />
          <span className="text-slate-900">Hoodies</span>
        </nav>

        <h1 className="text-4xl font-bold tracking-tight mb-2">
          {product.name}
        </h1>
        <p className="text-2xl font-medium text-slate-600 mb-8">
          ${product.price.toFixed(2)}
        </p>

        <div className="space-y-8 mb-10 pb-8 border-b border-slate-100">
          <p className="text-slate-600 leading-relaxed">
            {product.description}
          </p>
          <div className="bg-slate-50 p-4 border-l-4 border-slate-900">
            <p className="text-sm font-semibold mb-1">Fabric & Fit:</p>
            <p className="text-sm text-slate-500">{product.fabric}</p>
          </div>
        </div>

        {/* Color Picker */}
        <div className="mb-8">
          <label className="text-sm font-bold uppercase tracking-wider mb-4 block">
            Color:{" "}
            <span className="text-slate-400 font-normal">
              {selectedColor.name}
            </span>
          </label>
          <div className="flex gap-3">
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-full border-2 transition-all p-0.5 ${
                  selectedColor.name === color.name
                    ? "border-slate-900"
                    : "border-transparent"
                }`}
              >
                <div
                  className="w-full h-full rounded-full"
                  style={{ backgroundColor: color.hex }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Size Picker */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <label className="text-sm font-bold uppercase tracking-wider">
              Select Size
            </label>
            <button className="text-xs font-semibold underline text-slate-400 hover:text-slate-900">
              Size Guide
            </button>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`py-3 text-sm font-semibold border transition-all ${
                  selectedSize === size
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-900 border-slate-200 hover:border-slate-900"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button className="w-full bg-slate-900 text-white py-5 font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-800 transition-all active:scale-[0.98]">
            <ShoppingCart size={18} /> Add to Cart
          </button>
          <button className="w-full bg-white text-slate-900 border border-slate-900 py-5 font-bold text-sm uppercase tracking-widest hover:bg-slate-50 transition-all">
            Buy It Now
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
            <Truck size={20} className="text-slate-400" />
            <div className="text-xs">
              <p className="font-bold">Fast Delivery</p>
              <p className="text-slate-500">2-3 Business Days</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
            <ShieldCheck size={20} className="text-slate-400" />
            <div className="text-xs">
              <p className="font-bold">2 Year Warranty</p>
              <p className="text-slate-500">Free Replacement</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
