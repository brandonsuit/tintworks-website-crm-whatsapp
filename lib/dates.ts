/**
 * UK date/time helpers. Always Europe/London, always DD/MM/YYYY.
 * Use these instead of `toLocaleString()` sprinkled across the codebase.
 */

const TZ = "Europe/London";
const LOCALE = "en-GB";

export function formatDate(date: Date | string | number): string {
  const d = new Date(date);
  return d.toLocaleDateString(LOCALE, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: TZ,
  });
}

export function formatDateTime(date: Date | string | number): string {
  const d = new Date(date);
  return d.toLocaleString(LOCALE, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: TZ,
  });
}
