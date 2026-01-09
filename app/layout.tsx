import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Product Explorer Dashboard | Discover Amazing Products",
  description: "Explore our comprehensive product dashboard featuring the latest and greatest products. Find detailed information, compare features, and make informed decisions.",
  keywords: ["product dashboard", "product explorer", "product catalog", "product comparison", "e-commerce"],
  authors: [{ name: "Product Explorer Team" }],
  openGraph: {
    title: "Product Explorer Dashboard",
    description: "Discover and explore amazing products with our comprehensive dashboard",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Explorer Dashboard",
    description: "Discover and explore amazing products with our comprehensive dashboard",
  },
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
