import { serverEnv, publicEnv } from "@/lib/env";
import { formatUkDisplay } from "@/lib/phone";

/**
 * Single source of truth for business-profile values used across the site
 * (header, footer, contact page, JSON-LD, email sender name, etc.).
 *
 * Consumed server-side only — never imported from client components. Client
 * code should receive the pieces it needs via props.
 */

export const business = {
  name: serverEnv.BUSINESS_NAME,
  email: serverEnv.BUSINESS_EMAIL,
  address: serverEnv.BUSINESS_ADDRESS,
  phoneE164: serverEnv.BUSINESS_PHONE_E164,
  phoneDisplay: formatUkDisplay(serverEnv.BUSINESS_PHONE_E164),
  phoneTel: `+${serverEnv.BUSINESS_PHONE_E164}`,
  siteUrl: publicEnv.NEXT_PUBLIC_SITE_URL,
  // {# TODO: confirm hours #}
  openingHours: {
    display: "Mon–Fri 9–6, Sat 10–4, Sun closed",
    // Schema.org openingHours format, used in JSON-LD.
    schema: [
      "Mo-Fr 09:00-18:00",
      "Sa 10:00-16:00",
    ],
  },
  // Verified Google Maps coordinates for Brown Place, Holbeck, Leeds LS11.
  geo: {
    latitude: 53.7822579,
    longitude: -1.5698939,
  },
  locality: "Leeds",
  region: "West Yorkshire",
  postcode: "LS11",
  country: "GB",
} as const;
