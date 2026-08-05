"use client";

import { Link } from "@/i18n/navigation";

export default function MobileLogo() {
  return (
    <Link
      href="/"
      className={`inline-flex items-center group select-none cursor-pointer`}
    >
      {/* Haute Couture Insignia Crest */}
      <div className="relative flex items-center justify-center w-11 h-11 bg-title border border-secondary/50 shadow-2xl group-hover:border-secondary transition-all duration-500 overflow-hidden">
        {/* Metallic Shimmer Sweep Light Animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

        {/* Outer Fine Border Notch Overlay */}
        <div className="absolute inset-0.5 border border-secondary/20 group-hover:border-secondary/40 transition-colors pointer-events-none" />

        {/* Bespoke Interlocking V & X Emblem SVG */}
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 transform group-hover:scale-105 transition-transform duration-500"
        >
          {/* Background Diamond Motif */}
          <polygon
            points="20,2 38,20 20,38 2,20"
            stroke="currentColor"
            strokeWidth="0.75"
            className="text-secondary/40"
          />

          {/* V Shape */}
          <path
            d="M8 10L20 30L32 10H27L20 22L13 10H8Z"
            fill="url(#goldGradient)"
          />

          {/* X Interlocking Diagonal */}
          <path
            d="M11 28L29 12"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="text-white opacity-90"
          />

          <defs>
            <linearGradient
              id="goldGradient"
              x1="8"
              y1="10"
              x2="32"
              y2="30"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#F59E0B" />
              <stop offset="0.5" stopColor="#D97706" />
              <stop offset="1" stopColor="#B45309" />
            </linearGradient>
          </defs>
        </svg>

        {/* Gold Corner Accent Dots */}
        <span className="absolute top-1 left-1 w-0.5 h-0.5 bg-secondary" />
        <span className="absolute bottom-1 right-1 w-0.5 h-0.5 bg-secondary" />
      </div>
    </Link>
  );
}
