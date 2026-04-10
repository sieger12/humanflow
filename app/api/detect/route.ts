import { NextRequest, NextResponse } from "next/server";
import { detectAiPatterns } from "@/lib/services/detector";
import { checkRateLimit } from "@/lib/utils/rateLimit";
import { CHAR_LIMIT, RATE_LIMIT_PER_MINUTE, RATE_LIMIT_WINDOW_MS } from "@/lib/constants/limits";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";

  if (!checkRateLimit(`detect:${ip}`, RATE_LIMIT_PER_MINUTE, RATE_LIMIT_WINDOW_MS)) {
    return NextResponse.json({ error: "Too many requests. Please wait a moment." }, { status: 429 });
  }

  try {
    const body = await req.json();
    const text = typeof body.text === "string" ? body.text.trim() : "";

    if (!text) return NextResponse.json({ error: "Text is required." }, { status: 400 });
    if (text.length > CHAR_LIMIT) {
      return NextResponse.json(
        { error: `Text too long. Max ${CHAR_LIMIT} characters.` },
        { status: 400 },
      );
    }

    const result = await detectAiPatterns(text);
    return NextResponse.json(result);
  } catch (err) {
    console.error("/api/detect error:", err);
    return NextResponse.json({ error: "Detection failed." }, { status: 500 });
  }
}
