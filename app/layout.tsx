import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter_Tight, Oswald } from "next/font/google";
import "./globals.css";
import { brand } from "@/config/site";
import { UIProvider } from "@/components/layout/UIProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HowItWorks } from "@/components/layout/HowItWorks";

// Variable fonts, Latin subset only (it covers Icelandic: þ ð æ ö á é í ó ú ý).
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald", display: "swap" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: { default: `${brand.name} — Private luxury journeys in Iceland`, template: `%s · ${brand.name}` },
  description: brand.description,
  applicationName: brand.name,
  openGraph: {
    siteName: brand.name,
    type: "website",
    locale: "en_GB",
    images: [{ url: "/images/aurora-green.jpg", width: 2200, height: 1469, alt: "Aurora over Iceland" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0b0d10",
  width: "device-width",
  initialScale: 1,
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: brand.name,
  slogan: brand.tagline,
  description: brand.description,
  url: brand.url,
  areaServed: "Iceland",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${oswald.variable} ${cormorant.variable} ${interTight.variable}`}>
      <body>
        <UIProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <HowItWorks />
        </UIProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </body>
    </html>
  );
}
