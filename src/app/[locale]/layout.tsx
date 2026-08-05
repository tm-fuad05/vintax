import type { Metadata } from "next";
import { Inter, Hind_Siliguri } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";

import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "@/app/globals.css";
import { Toaster } from "sonner";
import { ReactLenis } from "lenis/react";
import TanstackQueryProvider from "@/providers/TanstackQueryProvider";
import { AnimationProvider } from "@/providers/AnimationProvider";
import ScrollToTop from "@/utils/ScrollToTop";

const interFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const hindFont = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind",
});

export const metadata: Metadata = {
  title: "Vintax",
  description: "...",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`
                ${interFont.variable} 
                ${hindFont.variable} 
                antialiased
                `}
      >
        <TanstackQueryProvider>
          <NextIntlClientProvider>
            <AnimationProvider>
              <ReactLenis root options={{ lerp: 0.1, duration: 1.5 }}>
                {children}
                <Toaster
                  position="top-right"
                  duration={3000}
                  toastOptions={{
                    style: {
                      background: "black",
                      color: "white",
                    },
                  }}
                />
                <ScrollToTop />
              </ReactLenis>
            </AnimationProvider>
          </NextIntlClientProvider>
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
