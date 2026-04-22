/**
 * Single source of truth for primary navigation. Header + mobile sheet +
 * footer all render from this list.
 */

export type NavLink = {
  href: string;
  label: string;
};

export const primaryNav: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export const serviceSubNav: NavLink[] = [
  { href: "/services/automotive", label: "Car tinting" },
  { href: "/services/residential", label: "Residential tinting" },
  { href: "/services/commercial", label: "Commercial tinting" },
];
