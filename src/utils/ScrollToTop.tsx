"use client";
import { useEffect } from "react";
import { useLenis } from "lenis/react";
import { usePathname } from "@/i18n/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, lenis]);

  return null;
}
