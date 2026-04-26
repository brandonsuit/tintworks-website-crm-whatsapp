/**
 * Quote wizard pricing config. OWNER: fill in the real numbers below before
 * shipping the wizard to production — everything is £0 until you do.
 *
 * Calculation model (see `calculateQuote`):
 *   base            = vehicleType[type]
 *   windows total   = sum(windows[w]) for each selected window set
 *   shade factor    = shadeMultiplier[shade]   (multiplies windows subtotal)
 *   extras total    = sum(extras[e]) for each selected extra
 *   total           = base + (windows total × shade factor) + extras total
 *
 * All prices are GBP, exclusive of any deposit/surcharge logic. If you need
 * a min-order floor, add it in `calculateQuote` below — keep the config
 * purely numeric so it stays easy to edit without touching the math.
 */

// ── Vehicle body types ───────────────────────────────────────────────────────
export const VEHICLE_TYPES = [
  "hatchback",
  "saloon",
  "estate",
  "coupe",
  "suv",
  "fourByFour",
  "van",
  "other",
] as const;
export type VehicleType = (typeof VEHICLE_TYPES)[number];

export const vehicleTypeLabels: Record<VehicleType, string> = {
  hatchback: "Hatchback",
  saloon: "Saloon",
  estate: "Estate",
  coupe: "Coupé",
  suv: "SUV",
  fourByFour: "4x4",
  van: "Van",
  other: "Other",
};

// ── Window sets ──────────────────────────────────────────────────────────────
export const WINDOW_SETS = [
  "frontPair",
  "rearPair",
  "rearWindscreen",
  "fullRear",
  "fullCar",
  "sunStrip",
] as const;
export type WindowSet = (typeof WINDOW_SETS)[number];

export const windowSetLabels: Record<WindowSet, string> = {
  frontPair: "Front two windows",
  rearPair: "Rear two windows",
  rearWindscreen: "Rear windscreen",
  fullRear: "Full rear set (rear sides + windscreen)",
  fullCar: "Full car (excluding front — UK law)",
  sunStrip: "Windscreen sun strip",
};

// ── Tint shades (VLT — Visible Light Transmission %) ─────────────────────────
export const TINT_SHADES = ["5", "20", "35", "50", "70"] as const;
export type TintShade = (typeof TINT_SHADES)[number];

export const tintShadeLabels: Record<TintShade, string> = {
  "5": "5% — Limo",
  "20": "20% — Dark",
  "35": "35% — Medium",
  "50": "50% — Light",
  "70": "70% — Very light",
};

// ── Extras ───────────────────────────────────────────────────────────────────
// NOTE: Mobile service is deliberately absent — Tintworks is studio-only.
export const EXTRAS = ["ceramic", "heatRejection", "privacy"] as const;
export type ExtraKey = (typeof EXTRAS)[number];

export const extraLabels: Record<ExtraKey, string> = {
  ceramic: "Ceramic film upgrade",
  heatRejection: "Heat rejection film",
  privacy: "Privacy film",
};

// ── Pricing data — TODO: fill in real prices ─────────────────────────────────
export const pricingData = {
  // TODO: Fill in actual prices (base fee added once per quote, per body type)
  vehicleType: {
    hatchback: 0,
    saloon: 0,
    estate: 0,
    coupe: 0,
    suv: 0,
    fourByFour: 0,
    van: 0,
    other: 0,
  } satisfies Record<VehicleType, number>,

  // TODO: Fill in per-window-set prices (added once per selected set)
  windows: {
    frontPair: 0,
    rearPair: 0,
    rearWindscreen: 0,
    fullRear: 0,
    fullCar: 0,
    sunStrip: 0,
  } satisfies Record<WindowSet, number>,

  // Shade multipliers — multiplies the windows subtotal. Darker = more film,
  // more care. 1.0 = no premium. TODO: tune once you have real numbers.
  shadeMultiplier: {
    "5": 1,
    "20": 1,
    "35": 1,
    "50": 1,
    "70": 1,
  } satisfies Record<TintShade, number>,

  // TODO: Fill in extras pricing (flat fees, added once each)
  extras: {
    ceramic: 0,
    heatRejection: 0,
    privacy: 0,
  } satisfies Record<ExtraKey, number>,
} as const;

// ─────────────────────────────────────────────────────────────────────────────

export type QuoteSelection = {
  vehicleType: VehicleType | null;
  windows: WindowSet[];
  shade: TintShade | null;
  extras: ExtraKey[];
};

export type QuoteBreakdown = {
  base: number;
  windowsSubtotal: number;
  shadeFactor: number;
  windowsWithShade: number;
  extrasSubtotal: number;
  total: number;
  priced: boolean; // false while pricingData is still all zeros
};

export function calculateQuote(sel: QuoteSelection): QuoteBreakdown {
  const base = sel.vehicleType ? pricingData.vehicleType[sel.vehicleType] : 0;

  const windowsSubtotal = sel.windows.reduce(
    (acc, w) => acc + pricingData.windows[w],
    0,
  );

  const shadeFactor = sel.shade ? pricingData.shadeMultiplier[sel.shade] : 1;
  const windowsWithShade = Math.round(windowsSubtotal * shadeFactor);

  const extrasSubtotal = sel.extras.reduce(
    (acc, e) => acc + pricingData.extras[e],
    0,
  );

  const total = base + windowsWithShade + extrasSubtotal;

  // Heuristic: if every component is zero, assume the owner hasn't filled the
  // config yet — the wizard UI uses this to render "Price on request" instead
  // of "£0" so nobody books expecting a freebie.
  const priced =
    base > 0 ||
    windowsSubtotal > 0 ||
    extrasSubtotal > 0 ||
    (sel.vehicleType !== null && sel.windows.length > 0);

  return {
    base,
    windowsSubtotal,
    shadeFactor,
    windowsWithShade,
    extrasSubtotal,
    total,
    priced: priced && total > 0,
  };
}

export function formatGbp(pennies: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(pennies);
}
