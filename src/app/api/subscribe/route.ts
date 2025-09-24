// src/app/api/subscribe/route.ts
import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== "string" || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email" },
        { status: 400 }
      );
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const ua = req.headers.get("user-agent") || "unknown";
    const now = new Date().toISOString();

    const stmt = db.prepare(`
      INSERT INTO subscribers (email, ip, user_agent, created_at)
      VALUES (?, ?, ?, ?)
    `);

    try {
      stmt.run(email.toLowerCase(), ip, ua, now);
    } catch (e: unknown) {
      const code =
        typeof e === "object" && e !== null && "code" in e
          ? String((e as { code?: unknown }).code)
          : "";

      if (code.includes("SQLITE_CONSTRAINT")) {
        return NextResponse.json({ ok: true, already: true }, { status: 409 });
      }
      throw e;
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("subscribe error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
