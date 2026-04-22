import { NextResponse } from "next/server";

/**
 * Railway healthcheck endpoint. Returns 200 with a current timestamp.
 * No DB yet — when v2 adds Prisma, add a thin `prisma.$queryRaw` ping
 * here so an unreachable database fails the healthcheck.
 */
export function GET() {
  return NextResponse.json({ ok: true, ts: new Date().toISOString() });
}
