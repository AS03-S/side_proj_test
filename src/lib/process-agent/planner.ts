import Anthropic from "@anthropic-ai/sdk";
import { FullPlanSchema, type FullPlan, type CandidateProcess } from "./schemas";
import { matchTemplate } from "@/lib/process-catalog/matcher";
import type { ProcessTemplate } from "@/lib/process-catalog/templates";

const client = new Anthropic();

const PLAN_SYSTEM = `Immigration process planner. Output ONLY valid JSON. Be concise — use short bullet-style text (max 1–2 lines per field). No prose paragraphs. Never claim legal certainty. Express uncertainty in uncertainty_notes.`;

function planFromTemplate(template: ProcessTemplate, score: number): FullPlan {
  return {
    title: template.title,
    jurisdiction: template.jurisdiction,
    destination_country: template.destination_country,
    authority_name: template.authority_name,
    summary: template.summary,
    rationale: template.summary,
    confidence_score: Math.min(0.7 + score * 0.25, 0.95),
    uncertainty_notes: "Verify current requirements and fees with the official authority before proceeding.",
    timeline_summary: template.timeline_summary,
    next_action: template.next_action,
    next_deadline: null,
    steps: template.steps.map((s) => ({
      title: s.title,
      description: s.description,
      estimated_duration: s.estimated_duration ?? null,
      target_date: null,
      checklist_items: s.checklist_items.map((c) => ({
        label: c.label,
        item_type: c.item_type,
        due_date: null,
        notes: c.notes ?? null,
      })),
    })),
    source_notes: "Based on pre-loaded process template.",
    official_sources: template.official_sources ?? null,
  };
}

/**
 * Generate a full process plan.
 *
 * Strategy:
 * 1. Template match ≥ 0.3 → return template data directly, no Claude call.
 * 2. No match → Claude generates full plan (optionally enriched with web search results via extraContext).
 */
export async function generatePlan(
  candidate: CandidateProcess,
  userDescription: string,
  answers: { question: string; answer: string }[],
  extraContext?: string
): Promise<FullPlan> {
  const templateMatch = matchTemplate(candidate.id, userDescription, extraContext);

  if (templateMatch && templateMatch.score >= 0.3) {
    return planFromTemplate(templateMatch.template, templateMatch.score);
  }

  // ── No template match — ask Claude ────────────────────────────────────────

  const answersBlock =
    answers.length > 0
      ? answers
          .filter((a) => a.answer && a.answer !== "—")
          .map((a) => `- ${a.question}: ${a.answer}`)
          .join("\n")
      : "No extra details.";

  const webContextBlock = extraContext
    ? `\nOfficial source context:\n${extraContext}`
    : "";

  const prompt = `Generate a process plan.
Process: "${candidate.name}"
Destination: ${candidate.destination_country ?? candidate.country ?? "Unknown"}
Authority: ${candidate.authority_name ?? "Unknown"}
User: "${userDescription}"
Details: ${answersBlock}${webContextBlock}

Keep all text fields concise (bullet points or 1 line max per field). Use publicly available facts only.

Return ONLY valid JSON:
{
  "title": "...",
  "jurisdiction": "...",
  "destination_country": "...",
  "authority_name": "...",
  "summary": "...",
  "rationale": "...",
  "confidence_score": <0.0–1.0>,
  "uncertainty_notes": "...",
  "timeline_summary": "...",
  "next_action": "...",
  "next_deadline": null,
  "steps": [
    {
      "title": "...",
      "description": "...",
      "estimated_duration": "...",
      "target_date": null,
      "checklist_items": [
        { "label": "...", "item_type": "document|action|appointment|payment|other", "due_date": null, "notes": null }
      ]
    }
  ],
  "source_notes": "...",
  "official_sources": [{ "title": "...", "url": "..." }]
}`;

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 3000,
    system: PLAN_SYSTEM,
    messages: [{ role: "user", content: prompt }],
  });

  const block = message.content[0];
  if (block.type !== "text") throw new Error("Unexpected model response type");

  const cleaned = block.text
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  const parsed = JSON.parse(cleaned);

  const STRING_FIELDS = ["summary", "rationale", "uncertainty_notes", "timeline_summary", "next_action", "source_notes"] as const;
  for (const field of STRING_FIELDS) {
    if (Array.isArray(parsed[field])) {
      parsed[field] = (parsed[field] as string[]).join("\n");
    }
  }

  const result = FullPlanSchema.safeParse(parsed);

  if (!result.success) {
    console.error("[planner] Zod validation failed:", result.error.flatten());
    return parsed as FullPlan;
  }

  return result.data;
}
