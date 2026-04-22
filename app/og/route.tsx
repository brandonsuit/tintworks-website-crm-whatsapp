import { ImageResponse } from "next/og";

/**
 * Dynamic Open Graph / Twitter card image.
 *
 *   /og?title=<url-encoded title>
 *
 * Composes a dark card with the Tintworks wordmark + accent strip on the
 * left, and the page-specific title on the right. Called from every page's
 * `metadata.openGraph.images`, so tweaking the template here updates the
 * OG card everywhere.
 *
 * Runtime: Next's `ImageResponse` renders on either edge or nodejs; we
 * pick nodejs to avoid surprises with env-var access + Resend (edge would
 * bundle separately). 1200×630 is the canonical OG/Twitter size.
 */

export const runtime = "nodejs";

const DEFAULT_TITLE = "Car Window Tinting Leeds — Tintworks";
const MAX_TITLE_LENGTH = 120;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const raw = searchParams.get("title") ?? DEFAULT_TITLE;
  const title = raw.slice(0, MAX_TITLE_LENGTH);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          background: "#121417",
          color: "#ffffff",
          padding: 72,
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
          position: "relative",
        }}
      >
        {/* accent strip */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: 16,
            background: "hsl(210, 100%, 56%)",
          }}
        />

        {/* accent glow bottom-right */}
        <div
          style={{
            position: "absolute",
            right: -200,
            bottom: -200,
            width: 600,
            height: 600,
            background:
              "radial-gradient(circle, rgba(32,124,255,0.35), transparent 60%)",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            width: "100%",
          }}
        >
          {/* wordmark */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 6,
                height: 40,
                background: "hsl(210, 100%, 56%)",
                borderRadius: 2,
              }}
            />
            <div
              style={{
                fontSize: 44,
                fontWeight: 800,
                letterSpacing: "-0.02em",
              }}
            >
              Tintworks
            </div>
          </div>

          {/* title */}
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: 960,
            }}
          >
            {title}
          </div>

          {/* meta line */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              fontSize: 22,
              color: "#94a3b8",
            }}
          >
            <span>Car window tinting · Holbeck, Leeds LS11</span>
            <span style={{ color: "hsl(210, 100%, 70%)" }}>
              tintworks
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
