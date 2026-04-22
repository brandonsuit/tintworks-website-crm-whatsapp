/**
 * Social profiles. Rendered in the footer, JSON-LD `sameAs`, and share CTAs.
 * Add new platforms by appending here — order is the render order.
 */

export type SocialPlatform = "instagram" | "facebook" | "google";

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  href: string;
  handle?: string;
};

export const socials: SocialLink[] = [
  {
    platform: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/tintworks_/",
    handle: "@tintworks_",
  },
  {
    platform: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/people/Tint-Works/100070263492202/",
  },
];
