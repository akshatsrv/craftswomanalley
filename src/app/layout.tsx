import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Craftswoman Alley | Elevated Craft for the Physical Soul",
  description: "Premium artisan marketplace for handcrafted paper goods, memory books, and eternal blooms.",
  icons: {
    icon: "/images/logo-transparent.png",
    shortcut: "/images/logo-transparent.png",
    apple: "/images/logo-transparent.png",
  },
};

import { CartProvider } from "@/context/CartContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        {/* Preload hero and critical above-the-fold images */}
        <link rel="preload" as="image" href="/images/products/B0G4H47NVJ/img_2.jpg" />
        <link rel="preload" as="image" href="/images/products/B0H2HGTNSM/img_1.jpg" />
        <link rel="preload" as="image" href="/images/personalised-journal/journal_cover.jpg" />
        {/* Preconnect to external image CDNs for faster DNS + TLS */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://i.pinimg.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://i.pinimg.com" />
      </head>
      <body className="antialiased font-sans text-foreground bg-background selection:bg-secondary selection:text-white">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
