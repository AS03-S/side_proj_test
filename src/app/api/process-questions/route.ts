import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export interface ProcessQuestion {
  question: string;
  type: "text" | "date" | "choice";
  options?: string[];
}

export async function POST(req: NextRequest) {
  try {
    const { processId, processName } = await req.json() as {
      processId?: string;
      processName?: string;
    };

    if (!processId || !processName) {
      return NextResponse.json(
        { error: "processId and processName are required" },
        { status: 400 }
      );
    }

    const prompt = `You are a calm, plain-language assistant helping people track a Swedish immigration process with Migrationsverket.

The user has confirmed they are starting a "${processName}" process (id: ${processId}).

Generate 2–4 short follow-up questions that will help them track and understand this specific process. Questions should be:
- Specific to "${processName}" (not generic)
- Practical and useful for tracking progress
- Friendly, not bureaucratic
- Answerable in a few words or a date

For question type:
- "text": free text input
- "date": a date picker (e.g. course start date, employment start date)
- "choice": show 2–4 option buttons (provide them in "options")

Examples of what to ask by process:
- student_permit: which university/school, when does the course start, have you received an admission letter
- work_permit: employer name, planned start date, type of employment (full-time/part-time)
- family_reunification: relationship to the person in Sweden (spouse/child/parent/other), where is the applying family member now
- residence_permit: is this a renewal or new application, current permit type
- citizenship: how many years have you been living in Sweden, do you have a permanent residence permit
- asylum: country of origin (optional and sensitive — only ask if comfortable), have you registered with Migrationsverket yet

Return ONLY valid JSON — no markdown, no explanation:
[
  { "question": "<question text>", "type": "text" | "date" | "choice", "options": ["opt1", "opt2"] }
]
(options field is only required when type is "choice")`;

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

    const questions: ProcessQuestion[] = JSON.parse(cleaned);
    return NextResponse.json({ questions });
  } catch (err) {
    console.error("[process-questions]", err);
    return NextResponse.json({ error: "Failed to generate questions" }, { status: 500 });
  }
}
