import { NextRequest, NextResponse } from "next/server";
import { humanizeText } from "@/lib/services/humanizer";
import { checkRateLimit } from "@/lib/utils/rateLimit";
import { CHAR_LIMIT, RATE_LIMIT_PER_MINUTE, RATE_LIMIT_WINDOW_MS } from "@/lib/constants/limits";
import type { HumanizeMode } from "@/lib/constants/modes";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";

  if (!checkRateLimit(`humanize:${ip}`, RATE_LIMIT_PER_MINUTE, RATE_LIMIT_WINDOW_MS)) {
    return NextResponse.json({ error: "Too many requests. Please wait a moment." }, { status: 429 });
  }

  try {
    const body = await req.json();
    const text = typeof body.text === "string" ? body.text.trim() : "";
    const mode = (body.mode || "natural") as HumanizeMode;

    if (!text) return NextResponse.json({ error: "Text is required." }, { status: 400 });
    if (text.length > CHAR_LIMIT) {
      return NextResponse.json({ error: `Text too long. Max ${CHAR_LIMIT} characters.` }, { status: 400 });
    }

    const result = await humanizeText({ text, mode });
    return NextResponse.json(result);
  } catch (err) {
    console.error("/api/humanize error:", err);
    return NextResponse.json({ error: "Failed to process text." }, { status: 500 });
  }
}
