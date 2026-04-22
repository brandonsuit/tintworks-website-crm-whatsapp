/**
 * In-memory token bucket rate limiter, keyed by an arbitrary string.
 *
 * Single-instance only — fine for v1 on Railway's single web service.
 * When we horizontally scale, swap this for Upstash Redis or a database
 * counter; the consumer API (`limit(key)`) stays the same.
 *
 * Returns `{ ok, retryAfterSeconds }`. When `ok` is false, the API route
 * should 429 with a Retry-After header set from `retryAfterSeconds`.
 */

type Bucket = {
  count: number;
  // UNIX ms at which the bucket resets.
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

type LimitOptions = {
  windowMs: number;
  max: number;
};

export function rateLimit(
  key: string,
  { windowMs, max }: LimitOptions,
): { ok: true } | { ok: false; retryAfterSeconds: number } {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }

  if (existing.count < max) {
    existing.count += 1;
    return { ok: true };
  }

  const retryAfterSeconds = Math.max(
    1,
    Math.ceil((existing.resetAt - now) / 1000),
  );
  return { ok: false, retryAfterSeconds };
}

/**
 * Pull a stable-enough client IP out of a request's standard headers.
 * Behind Railway's proxy, `x-forwarded-for` carries the client IP.
 */
export function clientIpFromHeaders(headers: Headers): string {
  const xff = headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return (
    headers.get("x-real-ip") ??
    headers.get("cf-connecting-ip") ??
    "unknown"
  );
}
