import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const raw = (body as Record<string, unknown>)?.email;
  const email = typeof raw === "string" ? raw.trim().toLowerCase() : "";

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  // Fallback: always log so nothing is lost if DB is unavailable
  console.log(`[waitlist] signup email="${email}" at=${new Date().toISOString()}`);

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (url && key) {
    try {
      const supabase = createClient(url, key, {
        auth: { persistSession: false, autoRefreshToken: false },
      });

      const { error } = await supabase.from("waitlist").insert({ email });

      if (error) {
        if (error.code === "23505") {
          // Already on the list — treat as success from the user's perspective
          return NextResponse.json({ ok: true });
        }
        console.error(`[waitlist] DB error code=${error.code} msg=${error.message}`);
      }
    } catch (err) {
      console.error("[waitlist] unexpected error:", err);
    }
  } else {
    console.warn("[waitlist] SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not set — logged only.");
  }

  return NextResponse.json({ ok: true });
}
