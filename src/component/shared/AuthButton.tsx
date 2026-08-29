"use client";
import { ArrowUpRight } from "lucide-react";
import React from "react";

export default function AuthButton({
  children,
  loading,
}: {
  children: React.ReactNode;
  loading: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full py-4 mt-3 bg-title hover:bg-secondary text-white hover:text-title border border-title hover:border-secondary font-extrabold text-xs uppercase tracking-[0.25em] flex items-center justify-center gap-2 transition-all duration-300 shadow-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group/btn"
    >
      <span>{loading ? <div className="loader" /> : children}</span>
      {!loading && (
        <ArrowUpRight
          size={16}
          className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300"
        />
      )}
    </button>
  );
}
