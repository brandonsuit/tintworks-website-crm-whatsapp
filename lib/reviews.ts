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
  isPlaceholder: false,
};

export const reviews: Review[] = [
  {
    author: "Holly Butler",
    rating: 5,
    date: "2026-03-01",
    text: "I recently had my car windows tinted at Tintworks, and I couldn't be happier with the experience. Stephen did a great job, super professional, friendly, and clearly knows what he's doing. The whole process was quicker than I expected, but the quality wasn't rushed. If you're thinking about getting your windows tinted, I'd definitely recommend Tintworks.",
    source: "google",
  },
  {
    author: "Leighton Redshaw",
    rating: 5,
    date: "2026-02-01",
    text: "Good tints did a good job had a issue with one window but was fast to sort it with no issues highly recommended.",
    source: "google",
  },
  {
    author: "Wayne Roberts",
    rating: 5,
    date: "2025-11-01",
    text: "We had a sun visor tints on my Peugeot 3008, excellent tints, good quality tints fantastic job, easy access into the unit work done under cover. We would recommend if you need tints this is to go for. Well pleased with my results THANK YOU.",
    source: "google",
  },
  {
    author: "Kristens Krumins",
    rating: 5,
    date: "2025-08-01",
    text: "Had all my windows tinted including a blue chameleon with a sunstrip, he did a great job and tinted my car just how I wanted it. I would definitely recommend and will be coming back here in the future if I need any tints doing.",
    source: "google",
  },
  {
    author: "Andy Sheard",
    rating: 5,
    date: "2025-06-01",
    text: "I had Steve tint the windows on my Cooper S yesterday, he also did a blue chameleon tint and sun strip on the windscreen and it looks absolutely mint, I couldn't be happier with his work. He gave me plenty of information before and after he did the work and provided a very professional and quick service with a great price, I'll have no problem recommending him to anyone else.",
    source: "google",
  },
];
