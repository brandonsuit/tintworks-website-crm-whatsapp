import { business } from "@/lib/business";

/**
 * Google Maps iframe pinned to the studio address. Uses the embed URL
 * that does not require an API key. `output=embed` keeps the interactive
 * marker. Loaded with `loading="lazy"` to keep it out of the critical path.
 *
 * The encompassing <figure> carries a fallback link for anyone blocking
 * iframes so the address + Maps link are still reachable.
 */
export function GoogleMap() {
  const { latitude, longitude } = business.geo;
  const src = `https://maps.google.com/maps?q=${latitude},${longitude}&hl=en&z=17&output=embed`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  return (
    <figure className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="relative aspect-[16/10] w-full">
        <iframe
          src={src}
          title={`Map showing ${business.name} at ${business.address}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
      <figcaption className="flex flex-col gap-1 p-4 text-sm md:flex-row md:items-center md:justify-between">
        <span className="text-muted-foreground">
          {business.address}
        </span>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline-offset-4 hover:underline"
        >
          Open in Google Maps
        </a>
      </figcaption>
    </figure>
  );
}
