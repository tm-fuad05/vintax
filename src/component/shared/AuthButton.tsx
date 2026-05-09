"use client";
import { ArrowRight } from "lucide-react";

export default function AuthButton({
  children,
  loading,
}: {
  children: React.ReactNode;
  loading: boolean;
}) {
  return (
    <button
      disabled={loading}
      className="text-white bg-primary py-3 rounded-xl w-full mt-2 text-sm flex items-center justify-center gap-2 group hover:bg-blue-700 duration-200 cursor-pointer disabled:bg-gray-600 disabled:cursor-not-allowed"
    >
      <span>{loading ? <div className="loader" /> : children}</span>
      {!loading && (
        <ArrowRight className="group-hover:translate-x-2 duration-200" />
      )}
    </button>
  );
}
