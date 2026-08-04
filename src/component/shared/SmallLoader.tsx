"use client";

import { Loader2 } from "lucide-react";

interface SmallLoaderProps {
  size?: number;
  className?: string;
  color?: string;
}

export default function SmallLoader({
  size = 18,
  className = "",
  color = "text-secondary",
}: SmallLoaderProps) {
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <Loader2 size={size} className={`animate-spin ${color}`} />
    </div>
  );
}
