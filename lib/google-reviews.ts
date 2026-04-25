import type { Review } from "./reviews";

type PlacesReview = {
  rating: number;
  publishTime: string;
  text?: { text: string; languageCode: string };
  authorAttribution: { displayName: string };
};

/**
 * Fetches the 5 most-relevant reviews from the Google Places API (New).
 * Cached for 24 h via Next.js ISR — zero cost for a low-traffic site.
 * Returns [] if env vars are absent (falls back to static reviews in the page).
 */
export async function fetchGoogleReviews(): Promise<Review[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) return [];

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "reviews",
        },
        next: { revalidate: 86400 },
        signal: AbortSignal.timeout(5000),
      },
    );

    if (!res.ok) return [];

    const data = await res.json();
    const raw: PlacesReview[] = data.reviews ?? [];

    return raw
      .filter((r) => r.text?.text)
      .map((r) => ({
        author: r.authorAttribution.displayName,
        rating: (Math.min(5, Math.max(1, Math.round(r.rating))) as 1 | 2 | 3 | 4 | 5),
        date: r.publishTime.split("T")[0],
        text: r.text!.text,
        source: "google" as const,
      }));
  } catch {
    return [];
  }
}
