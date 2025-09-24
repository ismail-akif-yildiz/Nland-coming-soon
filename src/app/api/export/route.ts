// src/app/api/export/route.ts
import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

type Row = {
  email: string;
  created_at: string;
  ip: string | null;
  user_agent: string | null;
};

const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;

export async function GET(req: NextRequest) {
  // Token: Bearer veya ?token=
  const auth = req.headers.get("authorization");
  const bearer = auth?.toLowerCase().startsWith("bearer ")
    ? auth.slice(7).trim()
    : null;
  const token = bearer || req.nextUrl.searchParams.get("token");

  if (!token || token !== process.env.EXPORT_TOKEN) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const format = (
    req.nextUrl.searchParams.get("format") || "csv"
  ).toLowerCase();

  const rows = db
    .prepare(
      `SELECT email, created_at, ip, user_agent
       FROM subscribers
       ORDER BY created_at DESC`
    )
    .all() as Row[];

  if (format === "json") {
    return NextResponse.json(rows, { status: 200 });
  }

  const header = "email,created_at,ip,user_agent";
  const csv = [
    header,
    ...rows.map((r) =>
      [r.email, r.created_at, r.ip, r.user_agent].map(esc).join(",")
    ),
  ].join("\n");

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="subscribers.csv"',
      "Cache-Control": "no-store",
    },
  });
}
