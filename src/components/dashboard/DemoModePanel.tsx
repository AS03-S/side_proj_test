"use client";

import { useEffect, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  CalendarClock,
  CheckCircle2,
  CheckCircle,
  Circle,
  ExternalLink,
  FileText,
  Info,
  ListChecks,
  Loader2,
  MapPin,
  ShieldAlert,
  Upload,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DEMO_DOCUMENTS } from "@/lib/data/documents";
import { DEMO_PROCESSES } from "@/lib/data/processes";
import { formatDateShort } from "@/lib/utils";

const TODAY = new Date("2026-04-12");

function daysFromNow(d: string) {
  return Math.ceil((new Date(d).getTime() - TODAY.getTime()) / 86400000);
}

// Use doc-001 and proc-001 as the demo fixtures
const DEMO_DOC = DEMO_DOCUMENTS[0];
const DEMO_PROC = DEMO_PROCESSES[0];

const IS_REAL_DEMO = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

interface LiveAnalysis {
  title: string;
  issuingAuthority: string;
  whatThisIs: string;
  whatItRequires: string[];
  deadlines: Array<{ label: string; date: string }>;
  consequences: string;
  nextSteps: string[];
  authorityExplainer: { name: string; role: string; contact?: string };
  whatItIsNotTelling: string;
  needsReferral: boolean;
  referralCard?: { who: string; what: string; why: string };
  summary: string;
  confidence: "high" | "medium" | "low";
  confidenceScore: number;
}

// ── Simulated upload stage ─────────────────────────────────────────────────

function UploadStage({
  onDone,
  onAnalysis,
}: {
  onDone: () => void;
  onAnalysis?: (result: LiveAnalysis) => void;
}) {
  const [pct, setPct] = useState(0);
  const [label, setLabel] = useState("Uploading file…");

  useEffect(() => {
    if (!IS_REAL_DEMO) {
      // Simulated path
      const steps = [
        { delay: 200, value: 20 },
        { delay: 600, value: 55 },
        { delay: 1000, value: 80 },
        { delay: 1400, value: 100 },
      ];
      const timers = steps.map(({ delay, value }) =>
        setTimeout(() => setPct(value), delay)
      );
      const done = setTimeout(onDone, 1800);
      return () => {
        timers.forEach(clearTimeout);
        clearTimeout(done);
      };
    }

    // Real API path: fetch demo PDF → call process-document
    let cancelled = false;

    async function runRealDemo() {
      try {
        setPct(15);
        setLabel("Fetching sample document…");

        const pdfRes = await fetch("/demo/sample-document.pdf");
        if (!pdfRes.ok) throw new Error("Could not load sample document");
        const blob = await pdfRes.blob();
        const file = new File([blob], "sample-document.pdf", { type: "application/pdf" });

        if (cancelled) return;
        setPct(35);
        setLabel("Sending to analysis service…");

        const form = new FormData();
        form.append("file", file);

        const apiRes = await fetch("/api/process-document", {
          method: "POST",
          body: form,
        });

        if (cancelled) return;
        setPct(80);
        setLabel("Generating structured summary…");

        if (apiRes.ok) {
          const data = await apiRes.json();
          if (!cancelled && data.analysis) {
            onAnalysis?.(data.analysis as LiveAnalysis);
          }
        }

        if (!cancelled) {
          setPct(100);
          setLabel("Document analysed");
          setTimeout(onDone, 400);
        }
      } catch {
        if (!cancelled) {
          // Fall through to simulated complete so demo still works
          setPct(100);
          setLabel("Analysis complete (demo data)");
          setTimeout(onDone, 400);
        }
      }
    }

    runRealDemo();
    return () => { cancelled = true; };
  }, [onDone, onAnalysis]);

  return (
    <div className="flex flex-col items-center gap-4 py-10">
      {pct < 100 ? (
        <Loader2 className="h-10 w-10 animate-spin text-navy" strokeWidth={1.5} />
      ) : (
        <CheckCircle className="h-10 w-10 text-success" strokeWidth={1.5} />
      )}
      <div className="w-full max-w-xs text-center">
        <p className="text-sm font-semibold text-neutral-900">
          {pct < 100 ? "Processing test document…" : "Document analysed"}
        </p>
        <p className="mt-0.5 text-xs text-neutral-500">{label}</p>
      </div>
      <div className="h-2 w-full max-w-xs overflow-hidden rounded-full bg-neutral-100">
        <div
          className="h-full rounded-full bg-navy transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex items-center gap-2 rounded border border-neutral-200 bg-neutral-50 px-3 py-2">
        <FileText className="h-4 w-4 text-neutral-400" strokeWidth={1.5} />
        <span className="text-xs text-neutral-700">sample-document.pdf</span>
      </div>
    </div>
  );
}

// ── Mini document summary ──────────────────────────────────────────────────

function MiniDocumentSummary({ liveAnalysis }: { liveAnalysis?: LiveAnalysis | null }) {
  // Prefer live API result when available; fall back to static demo data
  const doc = liveAnalysis
    ? {
        whatThisIs: liveAnalysis.whatThisIs,
        deadlines: liveAnalysis.deadlines,
        consequences: liveAnalysis.consequences,
        nextSteps: liveAnalysis.nextSteps,
        authorityExplainer: liveAnalysis.authorityExplainer,
        whatItIsNotTelling: liveAnalysis.whatItIsNotTelling,
        referralCard: liveAnalysis.referralCard,
      }
    : DEMO_DOC;
  return (
    <div className="space-y-4">
      {/* Inline disclaimer */}
      <div className="flex items-start gap-2 rounded-r-lg border-l-[3px] border-navy-light bg-navy-light/40 px-3 py-2.5">
        <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-navy" strokeWidth={1.75} />
        <p className="text-[11px] leading-relaxed text-neutral-700">
          <strong className="font-semibold">Informational guidance only.</strong>{" "}
          This is not legal advice. Verify all dates against your original document. For legal questions, consult a qualified immigration lawyer.
        </p>
      </div>

      {/* What this document is */}
      {doc.whatThisIs && (
        <div>
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
            What this document is
          </p>
          <p className="text-[12px] leading-relaxed text-neutral-700">{doc.whatThisIs}</p>
        </div>
      )}

      {/* Deadlines */}
      {doc.deadlines && doc.deadlines.length > 0 && (
        <div>
          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
            Deadlines
          </p>
          <div className="space-y-1.5">
            {doc.deadlines.map((dl, i) => {
              const days = daysFromNow(dl.date);
              return (
                <div
                  key={i}
                  className={`flex items-center justify-between rounded border px-3 py-2 ${
                    days <= 14 ? "border-warning/30 bg-warning/5" : "border-neutral-200 bg-neutral-50"
                  }`}
                >
                  <span className="text-[12px] text-neutral-700">{dl.label}</span>
                  <span className={`text-[12px] font-medium ${days <= 14 ? "text-warning" : "text-neutral-800"}`}>
                    {formatDateShort(dl.date)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Consequences */}
      {doc.consequences && (
        <div>
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
            Consequences of inaction
          </p>
          <div className="flex items-start gap-2 rounded border border-warning/30 bg-warning/5 px-3 py-2.5">
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warning" strokeWidth={1.75} />
            <p className="text-[12px] leading-relaxed text-neutral-700">{doc.consequences}</p>
          </div>
        </div>
      )}

      {/* Next steps */}
      {doc.nextSteps && doc.nextSteps.length > 0 && (
        <div>
          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
            Next steps
          </p>
          <ol className="space-y-1.5">
            {doc.nextSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-2">
                <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white text-[9px] font-bold text-neutral-500">
                  {i + 1}
                </div>
                <span className="text-[12px] leading-relaxed text-neutral-700">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Authority */}
      {doc.authorityExplainer && (
        <div>
          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
            About the authority
          </p>
          <div className="flex items-start gap-2 rounded border border-neutral-200 bg-neutral-50 px-3 py-2.5">
            <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400" strokeWidth={1.75} />
            <div>
              <p className="text-[12px] font-medium text-neutral-900">{doc.authorityExplainer.name}</p>
              <p className="mt-0.5 text-[11px] text-neutral-600">{doc.authorityExplainer.role}</p>
            </div>
          </div>
        </div>
      )}

      {/* What it's not telling you */}
      {doc.whatItIsNotTelling && (
        <div>
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
            What this is not telling you
          </p>
          <div className="flex items-start gap-2 rounded-r-lg border-l-[3px] border-neutral-300 bg-neutral-50 px-3 py-2.5">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-400" strokeWidth={1.75} />
            <p className="text-[12px] leading-relaxed text-neutral-600">{doc.whatItIsNotTelling}</p>
          </div>
        </div>
      )}

      {/* Referral card */}
      {doc.referralCard && (
        <div className="rounded-lg border border-info/30 bg-info/5 p-4">
          <div className="flex items-start gap-2.5">
            <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-info" strokeWidth={1.75} />
            <div>
              <p className="text-[12px] font-semibold text-neutral-900">Consider getting advice</p>
              <p className="mt-1 text-[11px] text-neutral-700">
                <strong>Who: </strong>{doc.referralCard.who}
              </p>
              <p className="mt-0.5 text-[11px] text-neutral-600">
                <strong>Why: </strong>{doc.referralCard.why}
              </p>
              <p className="mt-1.5 text-[10px] text-neutral-400">
                migraDOCS does not endorse specific advisers and cannot predict outcomes.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Mini timeline ──────────────────────────────────────────────────────────

function MiniTimeline() {
  const proc = DEMO_PROC;
  const [expandedId, setExpandedId] = useState<string | null>(
    proc.steps.find((s) => s.status === "in_progress")?.id ?? null
  );

  return (
    <div className="space-y-1">
      {proc.steps.map((step, i) => {
        const isCompleted = step.status === "completed";
        const isCurrent = step.status === "in_progress";
        const isLast = i === proc.steps.length - 1;
        const expanded = expandedId === step.id;
        const days = step.deadline ? daysFromNow(step.deadline) : null;

        return (
          <div key={step.id} className="relative flex gap-3">
            {/* Node + line */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => setExpandedId(expanded ? null : step.id)}
                className={`z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 ${
                  isCompleted
                    ? "border-neutral-300 bg-neutral-100"
                    : isCurrent
                    ? "border-navy bg-navy"
                    : "border-neutral-300 bg-white"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-3 w-3 text-neutral-400" strokeWidth={2} />
                ) : (
                  <span className={`text-[10px] font-bold leading-none ${isCurrent ? "text-white" : "text-neutral-400"}`}>
                    {step.order}
                  </span>
                )}
              </button>
              {!isLast && (
                <div className={`mt-1 w-0.5 flex-1 ${isCompleted ? "bg-neutral-200" : "bg-neutral-100"}`} />
              )}
            </div>

            {/* Content */}
            <div className="mb-3 flex-1">
              <button
                onClick={() => setExpandedId(expanded ? null : step.id)}
                className="flex w-full items-center justify-between gap-2 text-left"
              >
                <p className={`text-[12px] font-semibold leading-snug ${
                  isCompleted ? "text-neutral-400" : isCurrent ? "text-neutral-950" : "text-neutral-500"
                }`}>
                  {step.title}
                </p>
                <div className="flex items-center gap-1.5 shrink-0">
                  {isCurrent && <Badge variant="info">Current</Badge>}
                  {isCompleted && <Badge variant="success">Done</Badge>}
                  {days !== null && !isCompleted && (
                    <span className={`text-[10px] font-medium ${days < 0 ? "text-danger" : days <= 14 ? "text-warning" : "text-neutral-400"}`}>
                      {formatDateShort(step.deadline!)}
                    </span>
                  )}
                </div>
              </button>

              {expanded && (
                <div className="mt-2 rounded-lg border border-neutral-200 bg-neutral-50 p-3">
                  <p className="text-[11px] leading-relaxed text-neutral-700">{step.description}</p>
                  {step.notes && (
                    <p className="mt-1.5 text-[11px] text-neutral-500 italic">{step.notes}</p>
                  )}
                  {step.checklistItems && step.checklistItems.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {step.checklistItems.slice(0, 4).map((item) => (
                        <li key={item.id} className="flex items-center gap-2">
                          {item.completed ? (
                            <CheckCircle2 className="h-3 w-3 shrink-0 text-success" strokeWidth={1.75} />
                          ) : (
                            <Circle className="h-3 w-3 shrink-0 text-neutral-300" strokeWidth={1.75} />
                          )}
                          <span className={`text-[11px] ${item.completed ? "line-through text-neutral-400" : "text-neutral-700"}`}>
                            {item.label}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Mini checklist ─────────────────────────────────────────────────────────

function MiniChecklist() {
  const proc = DEMO_PROC;
  const allItems = proc.steps.flatMap((step) =>
    (step.checklistItems ?? []).map((item) => ({
      ...item,
      stepTitle: step.title,
      stepDeadline: step.deadline,
    }))
  );

  const [items, setItems] = useState(allItems);
  const toggle = (id: string) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, completed: !i.completed } : i)));

  const pct = items.length ? Math.round((items.filter((i) => i.completed).length / items.length) * 100) : 0;

  return (
    <div className="space-y-3">
      {/* Progress */}
      <div>
        <div className="mb-1 flex justify-between text-[10px] text-neutral-400">
          <span>{items.filter((i) => i.completed).length}/{items.length} complete</span>
          <span>{pct}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
          <div className="h-full rounded-full bg-navy transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Items */}
      <ul className="space-y-1.5">
        {items.map((item) => {
          const due = item.stepDeadline;
          const days = due ? daysFromNow(due) : null;
          const isOverdue = days !== null && days < 0 && !item.completed;
          return (
            <li
              key={item.id}
              onClick={() => toggle(item.id)}
              className={`flex cursor-pointer items-start gap-2 rounded border px-2.5 py-2 transition-colors ${
                item.completed
                  ? "border-neutral-100 bg-neutral-50"
                  : isOverdue
                  ? "border-danger/20 bg-danger/5"
                  : "border-neutral-200 bg-white hover:border-neutral-300"
              }`}
            >
              {item.completed ? (
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" strokeWidth={1.75} />
              ) : (
                <Circle className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${isOverdue ? "text-danger" : "text-neutral-300"}`} strokeWidth={1.75} />
              )}
              <div className="min-w-0 flex-1">
                <p className={`text-[11px] leading-snug ${item.completed ? "line-through text-neutral-400" : isOverdue ? "text-danger font-medium" : "text-neutral-700"}`}>
                  {item.label}
                </p>
                <p className="mt-0.5 text-[10px] text-neutral-400">{item.stepTitle}</p>
              </div>
              {isOverdue && <Badge variant="urgent" className="shrink-0">Overdue</Badge>}
            </li>
          );
        })}
      </ul>

      {/* Disclaimer */}
      <div className="flex items-start gap-2 rounded border border-neutral-100 bg-neutral-50 px-3 py-2">
        <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-400" strokeWidth={1.75} />
        <p className="text-[10px] leading-relaxed text-neutral-500">
          Checklists are organisational tools only. They do not constitute legal advice. For deadlines and legal submissions, consult a qualified immigration lawyer.
        </p>
      </div>
    </div>
  );
}

// ── Section tab ────────────────────────────────────────────────────────────

type OutputSection = "summary" | "timeline" | "checklist";

function SectionTab({
  id,
  label,
  icon: Icon,
  active,
  onClick,
}: {
  id: OutputSection;
  label: string;
  icon: React.ElementType;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
        active
          ? "border-navy bg-navy text-white"
          : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50"
      }`}
    >
      <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
      {label}
    </button>
  );
}

// ── Main Modal ─────────────────────────────────────────────────────────────

type DemoStage = "upload" | "outputs";

export function DemoModePanel({ onClose }: { onClose: () => void }) {
  const [stage, setStage] = useState<DemoStage>("upload");
  const [section, setSection] = useState<OutputSection>("summary");
  const [liveAnalysis, setLiveAnalysis] = useState<LiveAnalysis | null>(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d1b2e]/50 backdrop-blur-sm p-4">
      <div
        className="relative flex w-full max-w-xl flex-col rounded-xl border border-neutral-200 bg-white"
        style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.14)", maxHeight: "90vh" }}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-neutral-100 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-light">
              <Upload className="h-4 w-4 text-navy" strokeWidth={1.75} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-neutral-950">Demo walkthrough</h2>
              <p className="text-[11px] text-neutral-500">
                {stage === "upload"
                  ? "Simulating a test document upload…"
                  : "Showing all outputs for a sample document"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {stage === "upload" ? (
            <div className="px-6 py-2">
              <UploadStage
                onDone={() => setStage("outputs")}
                onAnalysis={(result) => setLiveAnalysis(result)}
              />
              <div className="mb-4 flex items-start gap-2.5 rounded-r-lg border-l-[3px] border-navy-light bg-navy-light/40 px-3 py-2.5">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-navy" strokeWidth={1.75} />
                <p className="text-[11px] leading-relaxed text-neutral-700">
                  This is a simulated demo using sample data. No file is actually uploaded. migraDOCS processes your document to extract key dates, required actions, and procedural guidance — all shown below when complete.
                </p>
              </div>
            </div>
          ) : (
            <div className="px-6 py-5 space-y-5">
              {/* Sample doc label */}
              <div className="flex items-center gap-3 rounded-lg border border-success/30 bg-success/5 px-4 py-3">
                <CheckCircle className="h-4 w-4 shrink-0 text-success" strokeWidth={1.75} />
                <div>
                  <p className="text-xs font-semibold text-neutral-900">
                    {liveAnalysis?.title ?? DEMO_DOC.title}
                  </p>
                  <p className="text-[11px] text-neutral-500">
                    {liveAnalysis?.issuingAuthority ?? DEMO_DOC.issuingAuthority}
                    {" · "}
                    {liveAnalysis ? liveAnalysis.confidence : `${DEMO_DOC.confidenceScore}%`} confidence
                  </p>
                </div>
                <Badge variant="success" className="ml-auto shrink-0">
                  {liveAnalysis ? liveAnalysis.confidence : `${DEMO_DOC.confidenceScore}%`}
                </Badge>
              </div>

              {/* Section tabs */}
              <div className="flex flex-wrap gap-2">
                <SectionTab id="summary" label="Summary view" icon={FileText} active={section === "summary"} onClick={() => setSection("summary")} />
                <SectionTab id="timeline" label="Timeline" icon={CalendarClock} active={section === "timeline"} onClick={() => setSection("timeline")} />
                <SectionTab id="checklist" label="Checklist" icon={ListChecks} active={section === "checklist"} onClick={() => setSection("checklist")} />
              </div>

              {/* Section content */}
              {section === "summary" && <MiniDocumentSummary liveAnalysis={liveAnalysis} />}
              {section === "timeline" && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-neutral-400" strokeWidth={1.75} />
                    <p className="text-xs font-semibold text-neutral-800">{DEMO_PROC.name}</p>
                  </div>
                  <MiniTimeline />
                </div>
              )}
              {section === "checklist" && (
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-neutral-800">{DEMO_PROC.name}</p>
                  <MiniChecklist />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-neutral-100 px-6 py-3">
          <p className="text-[10px] text-neutral-400">
            migraDOCS is an information and organisation tool. It does not provide legal advice and does not replace a qualified immigration lawyer.
          </p>
        </div>
      </div>
    </div>
  );
}
