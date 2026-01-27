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
  // Organization Schema for global SEO
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Ženske Čarape Bg",
    url: "https://zenskecarapebg.rs",
    logo: "https://zenskecarapebg.rs/logo.png",
    description:
      "Kvalitetne ženske čarape, hulahopke i štikle. Širok asortiman prozirnih, neprozirnih i šarenih čarapa.",
    sameAs: ["https://www.instagram.com/zenske_carape_bg"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["Serbian"],
    },
  };

  // WebSite Schema with search capability
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ženske Čarape Bg",
    url: "https://zenskecarapebg.rs",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://zenskecarapebg.rs/proizvodi?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="sr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-muted-foreground bg-muted  text-base md:text-xl`}
      >
        {/* Global JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />

        <CartProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
