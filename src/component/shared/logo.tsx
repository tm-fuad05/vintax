"use client";

import Link from "next/link";
import { FaTshirt } from "react-icons/fa";

export default function Logo() {
  return (
    <div>
      <Link href="/" className="flex items-center gap-1 group px-2">
        <FaTshirt className="text-primary rotate-10 text-xl md:text-2xl lg:text-[32px]" />
        <h2 className="text-2xl md:text-3xl font-black text-title italic">
          VANTIX
        </h2>
      </Link>
    </div>
  );
}
