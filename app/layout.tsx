import ConditionalLayout from "@/components/ConditionalLayout";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/contexts/CartContext";
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
  title: "Ženske Čarape Bg",
  description:
    "Kvalitetne ženske čarape, hulahopke i štikle. Širok asortiman prozirnih, neprozirnih i šarenih čarapa. Besplatna dostava za porudžbine preko 3000 RSD.",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  keywords: [
    "ženske čarape",
    "hulahopke",
    "štikle",
    "samostojeće čarape",
    "prozirne čarape",
    "neprozirne čarape",
    "šarene čarape",
    "čarape online",
    "kupovina čarapa",
    "elegantne čarape",
    "termalne čarape",
    "denier čarape",
  ],
  alternates: {
    canonical: "https://zenskecarapebg.rs/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-muted-foreground bg-muted  text-base md:text-xl`}
      >
        <CartProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
