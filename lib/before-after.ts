/**
 * Before/after showcase projects for the top of the gallery page.
 *
 * Each entry pairs a matching untinted and tinted shot of the same car,
 * framed identically. The slider component handles the reveal.
 *
 * TODO(owner): swap picsum seeds for real pairs in /public/gallery/before-after/.
 * Suggested naming:  <make-model-short>-before.jpg / <make-model-short>-after.jpg
 */

import type { TintType } from "@/gallery.config";

export type BeforeAfter = {
  id: string;
  title: string;
  vehicle: string;
  shade: string;
  tintType: TintType;
  before: string;
  after: string;
  alt: string;
};

export const beforeAfterItems: BeforeAfter[] = [
  {
    id: "bmw-m140i",
    title: "Ceramic rear set",
    vehicle: "BMW M140i",
    shade: "20% VLT",
    tintType: "ceramic",
    before: "https://picsum.photos/seed/tintworks-ba-01a/1600/1200",
    after: "https://picsum.photos/seed/tintworks-ba-01b/1600/1200",
    alt: "BMW M140i before and after ceramic 20% rear tint",
  },
  {
    id: "audi-rs3",
    title: "Full ceramic",
    vehicle: "Audi RS3",
    shade: "20% rear / 70% front",
    tintType: "ceramic",
    before: "https://picsum.photos/seed/tintworks-ba-02a/1600/1200",
    after: "https://picsum.photos/seed/tintworks-ba-02b/1600/1200",
    alt: "Audi RS3 before and after full ceramic tint",
  },
  {
    id: "vw-transporter",
    title: "Limo-black privacy",
    vehicle: "VW Transporter",
    shade: "5% rear",
    tintType: "limo-black",
    before: "https://picsum.photos/seed/tintworks-ba-03a/1600/1200",
    after: "https://picsum.photos/seed/tintworks-ba-03b/1600/1200",
    alt: "VW Transporter before and after 5% limo rear tint",
  },
];
