/**
 * Testimonials shown on the home page reviews carousel.
 *
 * Structure mirrors the Google Places "review" shape so this array can be
 * swapped for a live feed (Places API, or a nightly ingestion that writes
 * into a JSON/DB) without touching the UI.
 *
 * TODO(owner): replace the seed entries with real Google reviews before
 * launch. Keep rating an integer 1–5 and date in ISO format (YYYY-MM-DD).
 */

export type Review = {
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  date: string;
  text: string;
  source?: "google" | "facebook" | "instagram" | "direct";
};

export const googleReviewsProfileUrl =
  "https://www.google.com/search?q=Tint+Works+Leeds#sv=CAESzQEKuQEStgEKd0FNbjMteVFwSU5NWmVnV3I4QTg5LVpUOEloWjE2YXdneGhKRWdWUlhUeTBBRmVBM0RISkszQndjQ3AzU2FXMHhOaGpTakQ5dFF6NEtHNnFhYVlMSGp4c2xFekVGaTZWdmN4MVNOMVl3dk8tcVhGV0ZMU3V0WHZJEhdNQjdwYVlLOEU4cTR3UEFQcDVDenlRWRoiQUpLTEZtSktGLXRMZEM5VHUxQVQxUlpFWFFWS1h2S1poURIEODA1MRoBMyoAMAA4AUAAGAAgjv2l9ghKAhAC";

export const reviewStats = {
  count: 200,
  averageRating: 5,
  // Flip to `true` once real reviews are imported.
  isPlaceholder: true,
};

export const reviews: Review[] = [
  {
    author: "Jordan P.",
    rating: 5,
    date: "2025-11-14",
    text: "Proper clean finish. Booked in for a full rear set on my M140i and you can't tell it hasn't come out the factory. Gave honest advice on the shade — wouldn't have picked it without them.",
    source: "google",
  },
  {
    author: "Sarah M.",
    rating: 5,
    date: "2025-10-02",
    text: "Dropped my Golf off first thing, collected same day. The quote I got over WhatsApp was exactly what I paid — no sneaky add-ons. Heat rejection has been a game changer on the school run.",
    source: "google",
  },
  {
    author: "Dan K.",
    rating: 5,
    date: "2025-09-20",
    text: "Top tier. Ceramic tints all round on the RS3 — zero bubbles, zero dust, zero excuses. Explained the UK law on the front windows which saved me a MOT headache.",
    source: "google",
  },
  {
    author: "Aisha R.",
    rating: 5,
    date: "2025-08-15",
    text: "Honestly the best customer service I've had for any car work in Leeds. Replied on WhatsApp within minutes, booking was painless, and the finish is spotless.",
    source: "google",
  },
  {
    author: "Mike T.",
    rating: 5,
    date: "2025-07-30",
    text: "Had the whole rear of my Transporter done for a build I'm doing. Sharp work, sharp pricing, and they took the time to talk me through privacy vs heat rejection film.",
    source: "google",
  },
];
