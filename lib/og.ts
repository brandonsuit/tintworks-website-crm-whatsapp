/**
 * Helper to build OG image URLs for `metadata.openGraph.images`.
 * Kept as a thin wrapper so pages don't have to remember the exact path
 * or the encoding rules.
 */
export function ogImage(title: string): { url: string; width: number; height: number; alt: string } {
  return {
    url: `/og?title=${encodeURIComponent(title)}`,
    width: 1200,
    height: 630,
    alt: title,
  };
}
