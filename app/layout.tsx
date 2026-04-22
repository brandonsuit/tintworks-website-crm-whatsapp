import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Space_Grotesk } from "next/font/google";

import { business } from "@/lib/business";
import { publicEnv } from "@/lib/env";

import "./globals.css";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fontDisplay = Space_Grotesk({
  subsets: ["latin"],
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
    "Professional car window tinting in Leeds. In-studio ceramic and carbon vehicle tints at our Holbeck workshop. Bring your car to us.",
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
      "In-studio car window tinting in Holbeck, Leeds. Bring your vehicle to our workshop.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${business.name} — Car Window Tinting Leeds`,
    description:
      "In-studio car window tinting in Holbeck, Leeds. Bring your vehicle to our workshop.",
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
  themeColor: "#121317",
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
      "Professional car window tinting in Leeds. In-studio ceramic and carbon tints at our Holbeck workshop.",
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
    areaServed: {
      "@type": "City",
      name: "Leeds",
    },
    sameAs: [],
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
