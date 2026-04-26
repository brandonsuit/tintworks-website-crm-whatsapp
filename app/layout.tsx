import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Bebas_Neue } from "next/font/google";

import { business } from "@/lib/business";
import { publicEnv } from "@/lib/env";
import { socials } from "@/lib/social";

import "./globals.css";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fontDisplay = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const siteUrl = publicEnv.NEXT_PUBLIC_SITE_URL;
const plausibleDomain = publicEnv.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${business.name} — Car Window Tinting Leeds`,
    template: `%s | ${business.name}`,
  },
  description:
    "Studio-fitted ceramic, carbon and chameleon car window tinting in Holbeck, Leeds (LS11). 200+ five-star Google reviews, two-year fitting warranty.",
  applicationName: business.name,
  keywords: [
    "car window tinting Leeds",
    "vehicle window tinting Leeds",
    "ceramic car tint Leeds",
    "window tinting Leeds",
    "Holbeck window tinting",
    "car tint Holbeck",
    "Tintworks Leeds",
  ],
  authors: [{ name: business.name }],
  creator: business.name,
  publisher: business.name,
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: business.name,
    url: siteUrl,
    title: `${business.name} — Car Window Tinting Leeds`,
    description:
      "Ceramic, carbon and chameleon car window tinting, fitted in our Holbeck bay. Two-year fitting warranty, 200+ five-star Google reviews.",
    images: [
      {
        url: `/og?title=${encodeURIComponent(
          "Car Window Tinting Leeds — Tintworks",
        )}`,
        width: 1200,
        height: 630,
        alt: "Tintworks — Car window tinting in Holbeck, Leeds",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${business.name} — Car Window Tinting Leeds`,
    description:
      "Ceramic, carbon and chameleon car window tinting, fitted in our Holbeck bay. Two-year fitting warranty, 200+ five-star Google reviews.",
    images: [
      `/og?title=${encodeURIComponent("Car Window Tinting Leeds — Tintworks")}`,
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    // AutomotiveBusiness is a subtype of LocalBusiness; single type keeps
    // the category signal tight for Google's local pack.
    "@type": "AutomotiveBusiness",
    name: business.name,
    description:
      "Studio-fitted ceramic, carbon and chameleon car window tinting in Holbeck, Leeds. Two-year fitting warranty.",
    image: `${siteUrl}/og-default.png`,
    url: siteUrl,
    telephone: business.phoneTel,
    email: business.email,
    priceRange: "££",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Brown Place, Holbeck",
      addressLocality: business.locality,
      addressRegion: business.region,
      postalCode: business.postcode,
      addressCountry: business.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    // Appointment-only business — openingHoursSpecification omitted
    // deliberately so Google doesn't surface incorrect "open now" state.
    areaServed: [
      { "@type": "City", name: "Leeds" },
      { "@type": "Place", name: "Holbeck, Leeds" },
      { "@type": "Place", name: "Beeston, Leeds" },
      { "@type": "Place", name: "Hunslet, Leeds" },
      { "@type": "Place", name: "Morley, Leeds" },
      { "@type": "Place", name: "Pudsey, Leeds" },
      { "@type": "Place", name: "Rothwell, Leeds" },
      { "@type": "Place", name: "Wetherby, Leeds" },
      { "@type": "City", name: "Wakefield" },
      { "@type": "City", name: "Bradford" },
    ],
    // Aggregate rating drawn from the 200+ Google reviews.
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "200",
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: socials.map((s) => s.href),
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify safely escapes the payload; no user input flows here.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={`${fontSans.variable} ${fontDisplay.variable}`}>
      <head>
        <LocalBusinessJsonLd />
        {plausibleDomain ? (
          <Script
            strategy="afterInteractive"
            src="https://plausible.io/js/script.js"
            data-domain={plausibleDomain}
          />
        ) : null}
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
