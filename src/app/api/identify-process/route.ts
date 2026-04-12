import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export interface ProcessTypeOption {
  id: string;
  name: string;
  country: string;
  description: string;
  typicalDuration: string;
  complexity: "straightforward" | "moderate" | "complex";
  note?: string;
}

export async function POST(req: NextRequest) {
  try {
    const { description } = await req.json();

    if (!description || typeof description !== "string") {
      return NextResponse.json({ error: "description is required" }, { status: 400 });
    }

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `You are an immigration process classification assistant. Identify 2–5 specific immigration processes that best match this user description.

User description: "${description}"

Return a JSON array only — no markdown fences, no explanation, no other text. Each element:
{
  "id": "snake_case_short_identifier",
  "name": "Formal process name",
  "country": "Country name (infer from description if mentioned, otherwise 'Not specified')",
  "description": "1–2 sentences explaining what this process involves and who it is for",
  "typicalDuration": "e.g. '3–6 months' or '4–8 weeks'",
  "complexity": "straightforward" | "moderate" | "complex",
  "note": "Optional: one sentence of important caveat or uncertainty (omit if not needed)"
}`,
        },
      ],
    });

    const block = message.content[0];
    if (block.type !== "text") {
      return NextResponse.json({ error: "Unexpected model response" }, { status: 500 });
    }

    // Strip any accidental markdown fences
    const cleaned = block.text
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const processTypes: ProcessTypeOption[] = JSON.parse(cleaned);
    return NextResponse.json({ processTypes });
  } catch (err) {
    console.error("[identify-process]", err);
    return NextResponse.json({ error: "Failed to identify process types" }, { status: 500 });
  }
}
