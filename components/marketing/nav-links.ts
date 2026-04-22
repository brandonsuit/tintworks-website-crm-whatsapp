/**
 * Single source of truth for primary navigation. Header + mobile sheet +
 * footer all render from this list.
 */

export type NavLink = {
  href: string;
  label: string;
};

export const primaryNav: NavLink[] = [
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/quote", label: "Quote" },
  { href: "/contact", label: "Contact" },
];
