import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const ALLOWED_TYPES = new Set(["application/pdf", "image/jpeg", "image/png", "image/webp", "image/gif"]);
const MAX_BYTES = 25 * 1024 * 1024; // 25 MB

const SYSTEM_PROMPT = `You are an immigration document specialist. Your job is to read an immigration-related document and produce a plain-language structured analysis that helps the document holder understand exactly what it is, what they need to do, and what happens if they do not act.

Tone rules:
- Use plain language. No legal jargon. No Latin.
- Never promise outcomes or make legal predictions.
- Do not hide uncertainty. If something is unclear from the document, say so.
- Never say "this document guarantees" or imply legal entitlement.
- If the document requires legal representation or official legal advice, say so in referral_card.

Return ONLY valid JSON — no markdown fences, no preamble, no trailing text. Use this exact shape:
{
  "title": "Short descriptive title of this document (e.g. 'Residence Permit Renewal Notice')",
  "issuing_authority": "Name of the issuing body",
  "category": one of: "residence_permit" | "travel_document" | "work_authorization" | "asylum" | "appeal" | "request_documentation" | "appointment_notice" | "tax_registration" | "other",
  "what_it_is": "2–3 plain-language sentences: what this document is, who issued it, and what it formally confirms or requests.",
  "requires_from_you": ["array of concrete things the holder must do or provide"],
  "deadlines": [{ "label": "short deadline description", "date": "YYYY-MM-DD or approximate string" }],
  "consequences_of_inaction": "1–2 sentences on what happens if the holder does nothing.",
  "next_steps": ["ordered list of immediate next actions, most urgent first"],
  "authority": { "name": "authority name", "role": "what this authority does", "contact": "contact details if present in document, otherwise omit" },
  "not_telling_you": "What this document does NOT tell the holder that they probably need to know (e.g. where to go, what to bring, language requirements). Be honest.",
  "needs_referral": true or false,
  "referral_card": { "who": "type of professional", "what": "what they can help with", "why": "why this case may need professional support" },
  "summary": "1 concise sentence summarising the document for a list view",
  "confidence": "high" | "medium" | "low",
  "confidence_score": number between 0 and 1,
  "tags": ["array of short keyword tags"]
}

If needs_referral is false, omit the referral_card field entirely.`;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: "A file is required", code: "MISSING_FILE" }, { status: 400 });
    }

    const mimeType = file.type || "application/octet-stream";
    if (!ALLOWED_TYPES.has(mimeType)) {
      return NextResponse.json(
        { error: "Unsupported file type. Upload a PDF, JPG, or PNG.", code: "UNSUPPORTED_TYPE" },
        { status: 415 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    if (arrayBuffer.byteLength > MAX_BYTES) {
      return NextResponse.json(
        { error: "File exceeds the 25 MB limit.", code: "FILE_TOO_LARGE" },
        { status: 413 }
      );
    }

    const base64 = Buffer.from(arrayBuffer).toString("base64");

    type ImageMediaType = "image/jpeg" | "image/png" | "image/webp" | "image/gif";

    // Build the content block — document for PDF, image for image types
    // Typed separately so the SDK union discriminant works correctly
    const contentBlock =
      mimeType === "application/pdf"
        ? ({
            type: "document" as const,
            source: {
              type: "base64" as const,
              media_type: "application/pdf" as const,
              data: base64,
            },
          })
        : ({
            type: "image" as const,
            source: {
              type: "base64" as const,
              media_type: mimeType as ImageMediaType,
              data: base64,
            },
          });

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: [
            contentBlock,
            {
              type: "text",
              text: "Analyse this immigration document and return the structured JSON summary as specified.",
            },
          ],
        },
      ],
    });

    const block = message.content[0];
    if (block.type !== "text") {
      return NextResponse.json({ error: "Unexpected response from analysis service.", code: "UNEXPECTED_RESPONSE" }, { status: 502 });
    }

    // Strip accidental markdown fences
    const cleaned = block.text
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    let raw: Record<string, unknown>;
    try {
      raw = JSON.parse(cleaned);
    } catch {
      console.error("[process-document] JSON parse failed:", cleaned.slice(0, 200));
      return NextResponse.json({ error: "Failed to parse document analysis.", code: "PARSE_ERROR" }, { status: 502 });
    }

    // Normalise snake_case keys from Claude to camelCase expected by the frontend
    const result = {
      title: raw.title ?? "Untitled Document",
      issuingAuthority: raw.issuing_authority ?? raw.issuingAuthority ?? "",
      category: raw.category ?? "other",
      whatThisIs: raw.what_it_is ?? raw.whatThisIs ?? "",
      whatItRequires: raw.requires_from_you ?? raw.whatItRequires ?? [],
      deadlines: raw.deadlines ?? [],
      consequences: raw.consequences_of_inaction ?? raw.consequences ?? "",
      nextSteps: raw.next_steps ?? raw.nextSteps ?? [],
      authorityExplainer: raw.authority ?? raw.authorityExplainer ?? { name: "", role: "" },
      whatItIsNotTelling: raw.not_telling_you ?? raw.whatItIsNotTelling ?? "",
      needsReferral: raw.needs_referral ?? raw.needsReferral ?? false,
      referralCard: raw.referral_card ?? raw.referralCard ?? undefined,
      summary: raw.summary ?? "",
      confidence: raw.confidence ?? "medium",
      confidenceScore: raw.confidence_score ?? raw.confidenceScore ?? 0.5,
      tags: raw.tags ?? [],
    };

    return NextResponse.json({ analysis: result });
  } catch (err) {
    console.error("[process-document]", err);
    // Never expose raw SDK/network errors to the client
    return NextResponse.json(
      { error: "Document analysis is temporarily unavailable. Please try again.", code: "SERVICE_ERROR" },
      { status: 500 }
    );
  }
}
