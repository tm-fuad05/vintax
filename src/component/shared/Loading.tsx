"use client";

import Logo from "./logo";

interface LoadingProps {
  fullScreen?: boolean;
  message?: string;
}

export default function Loading({
  fullScreen = true,
  message = "LOADING ATELIER ACCESS...",
}: LoadingProps) {
  const content = (
    <div className="flex flex-col items-center justify-center space-y-6 text-center">
      {/* Brand Logo with Glow */}
      <div className="relative group">
        <div className="absolute inset-0 bg-secondary/20 rounded-full blur-xl animate-pulse pointer-events-none" />
        <Logo isDark={false} />
      </div>

      {/* Luxury Metallic Spinner */}
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-border border-t-secondary animate-spin" />
        <div className="absolute w-8 h-8 rounded-full border border-secondary/30 animate-ping opacity-25" />
      </div>

      {/* Loading Message */}
      {message && (
        <p className="text-[10px] uppercase font-extrabold tracking-[0.3em] text-secondary animate-pulse">
          {message}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-6">
        {content}
      </div>
    );
  }

  return (
    <div className="py-12 flex items-center justify-center">{content}</div>
  );
}
