import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

// The six supported Migrationsverket processes for Sweden V1
const SWEDEN_PROCESSES = `
- work_permit: Work Permit (Arbetstillstånd) — for people offered employment in Sweden
- student_permit: Student Permit (Uppehållstillstånd för studier) — for people admitted to study at a Swedish university or school
- residence_permit: Residence Permit (Uppehållstillstånd) — general permit to live in Sweden, including renewal
- family_reunification: Family Reunification (Anhöriginvandring) — to join a family member already living in Sweden
- citizenship: Swedish Citizenship (Medborgarskap) — applying to become a Swedish citizen
- asylum: Asylum (Asyl) — seeking protection in Sweden
`.trim();

export interface ProcessMatch {
  id: string;
  name: string;
  description: string;
  confidence: number; // 0–1
}

export interface IdentifyProcessResponse {
  matches: ProcessMatch[];
  needs_clarification: boolean;
  clarification_question: string | null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { description, clarification_answer } = body as {
      description?: string;
      clarification_answer?: string;
    };

    if (!description || typeof description !== "string") {
      return NextResponse.json({ error: "description is required" }, { status: 400 });
    }

    const clarificationLine = clarification_answer
      ? `\nThe user also answered a follow-up clarification question: "${clarification_answer}"`
      : "";

    const prompt = `You are a calm, plain-language assistant helping people understand Swedish immigration processes offered by Migrationsverket.

The ONLY processes you can match are:
${SWEDEN_PROCESSES}

User description: "${description}"${clarificationLine}

Your task:
1. Identify which of the six processes above best match what the user is describing.
2. If the description is clear enough, return 1–3 matches ranked by confidence.
3. If the description is ambiguous or could apply to more than one process with similar likelihood, set needs_clarification to true and provide a SHORT, friendly single clarification question (not a yes/no — give them 2–3 concrete answer options where possible).
4. Only ask for clarification ONCE. If a clarification_answer was already provided, do not ask again — just return your best matches.
5. If the user's situation clearly does not match any of the six processes, return a single low-confidence match for the closest one and surface your uncertainty.

Tone rules:
- Plain language. No legal jargon.
- Never promise outcomes or imply migraDOCS makes decisions.
- Always surface uncertainty.
- Keep descriptions short (1–2 sentences).

Return ONLY valid JSON — no markdown, no explanation:
{
  "matches": [
    { "id": "<process_id>", "name": "<formal Swedish process name>", "description": "<1–2 sentence plain-language description>", "confidence": <0.0–1.0> }
  ],
  "needs_clarification": <true|false>,
  "clarification_question": "<question string or null>"
}`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 512,
      messages: [{ role: "user", content: prompt }],
    });

    const block = message.content[0];
    if (block.type !== "text") {
      return NextResponse.json({ error: "Unexpected model response" }, { status: 500 });
    }

    const cleaned = block.text
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const result: IdentifyProcessResponse = JSON.parse(cleaned);
    return NextResponse.json(result);
  } catch (err) {
    console.error("[identify-process]", err);
    return NextResponse.json({ error: "Failed to identify process" }, { status: 500 });
  }
}
