"use client";

import { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Circle,
  ExternalLink,
  FileText,
  Loader2,
  MapPin,
  Plus,
  ShieldAlert,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DEMO_DOCUMENTS } from "@/lib/data/documents";
import { DEMO_PROCESSES } from "@/lib/data/processes";
import { formatDateShort, categoryLabel } from "@/lib/utils";
import type { Process, ProcessStep } from "@/types";
import type { ProcessTypeOption } from "@/app/api/identify-process/route";

// Demo today
const TODAY = new Date("2026-04-12");

function daysFromNow(dateString: string): number {
  return Math.ceil(
    (new Date(dateString).getTime() - TODAY.getTime()) / (1000 * 60 * 60 * 24)
  );
}

// ── Process Card ───────────────────────────────────────────────────────────

function ProcessCard({ process }: { process: Process }) {
  const currentStep = process.steps.find((s) => s.status === "in_progress");
  const completedCount = process.steps.filter((s) => s.status === "completed").length;
  const deadlineDays = process.nextDeadline ? daysFromNow(process.nextDeadline) : null;

  const statusVariant: Record<string, "success" | "info" | "muted" | "urgent"> = {
    active: "info",
    completed: "success",
    on_hold: "muted",
    abandoned: "urgent",
  };

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-semibold text-neutral-950 leading-snug">{process.name}</h3>
              <Badge variant={statusVariant[process.status] ?? "muted"}>
                {process.status.replace("_", " ")}
              </Badge>
            </div>
            <div className="mt-1 flex items-center gap-3 text-[11px] text-neutral-500">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" strokeWidth={1.75} />
                {process.country}
              </span>
              <span>
                {completedCount}/{process.steps.length} steps complete
              </span>
            </div>
          </div>
          {deadlineDays !== null && (
            <div className="shrink-0 text-right">
              <p className="text-[10px] uppercase tracking-wide text-neutral-400">Next deadline</p>
              <p className={`mt-0.5 text-xs font-semibold ${
                deadlineDays < 0 ? "text-danger" : deadlineDays <= 14 ? "text-warning" : "text-neutral-700"
              }`}>
                {formatDateShort(process.nextDeadline!)}
              </p>
              <p className="text-[10px] text-neutral-400">
                {deadlineDays < 0 ? `${Math.abs(deadlineDays)}d overdue` : `${deadlineDays}d remaining`}
              </p>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="mb-1 flex justify-between text-[10px] text-neutral-400">
            <span>Progress</span>
            <span>{Math.round((completedCount / process.steps.length) * 100)}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
            <div
              className="h-full rounded-full bg-navy transition-all"
              style={{ width: `${(completedCount / process.steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Current stage + next action */}
        {currentStep && (
          <div className="mt-3 flex items-start gap-2 rounded border border-navy-light bg-navy-light/40 px-3 py-2">
            <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-navy" strokeWidth={1.75} />
            <div>
              <p className="text-[10px] font-semibold text-navy">Current stage</p>
              <p className="text-[11px] text-neutral-700">{currentStep.title}</p>
            </div>
          </div>
        )}

        {process.nextAction && (
          <p className="mt-2 text-[11px] text-neutral-500">
            <span className="font-medium text-neutral-700">Next: </span>
            {process.nextAction}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

// ── Add New Process Modal ──────────────────────────────────────────────────

interface FlowState {
  step: 1 | 2 | 3 | 4 | 5;
  description: string;
  processTypes: ProcessTypeOption[];
  loadingTypes: boolean;
  loadError: string | null;
  selectedType: ProcessTypeOption | null;
  hasStarted: boolean | null;
  matchedDocIds: string[];
}

const INITIAL_FLOW: FlowState = {
  step: 1,
  description: "",
  processTypes: [],
  loadingTypes: false,
  loadError: null,
  selectedType: null,
  hasStarted: null,
  matchedDocIds: [],
};

function matchDocumentsToProcess(type: ProcessTypeOption): string[] {
  const keywords = [
    type.name.toLowerCase(),
    type.id.replace(/_/g, " "),
    type.country.toLowerCase(),
  ];

  return DEMO_DOCUMENTS.filter((doc) => {
    const text = [
      doc.title,
      doc.category,
      doc.issuingAuthority,
      ...(doc.tags ?? []),
    ]
      .join(" ")
      .toLowerCase();
    return keywords.some((kw) => text.includes(kw));
  }).map((d) => d.id);
}

function buildNewProcess(state: FlowState): Process {
  const type = state.selectedType!;
  const steps: ProcessStep[] = [
    {
      id: `new-s1`,
      order: 1,
      title: "Gather required documents",
      description: "Collect all supporting documents specified for this process.",
      status: state.hasStarted ? "in_progress" : "not_started",
      checklistItems: [],
    },
    {
      id: `new-s2`,
      order: 2,
      title: "Complete and submit application",
      description: "Fill in the required forms and submit to the relevant authority.",
      status: "not_started",
      checklistItems: [],
    },
    {
      id: `new-s3`,
      order: 3,
      title: "Await decision",
      description: `Expected processing time: ${type.typicalDuration}. You will be notified of the outcome.`,
      status: "not_started",
      checklistItems: [],
    },
  ];

  return {
    id: `proc-new-${Date.now()}`,
    name: type.name,
    country: type.country,
    currentStageIndex: state.hasStarted ? 1 : 0,
    status: "active",
    steps,
    nextAction: "Gather required documents and review the process steps",
    nextDeadline: undefined,
    startedAt: new Date().toISOString().split("T")[0],
    documentIds: state.matchedDocIds,
    notes: state.description,
  };
}

// ── Step components ────────────────────────────────────────────────────────

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 rounded-full transition-all ${
            i + 1 === current
              ? "w-6 bg-navy"
              : i + 1 < current
              ? "w-4 bg-navy/40"
              : "w-4 bg-neutral-200"
          }`}
        />
      ))}
    </div>
  );
}

function AddProcessModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: (p: Process) => void;
}) {
  const [flow, setFlow] = useState<FlowState>(INITIAL_FLOW);

  const update = (patch: Partial<FlowState>) =>
    setFlow((prev) => ({ ...prev, ...patch }));

  async function handleStep1Submit() {
    if (!flow.description.trim()) return;
    update({ loadingTypes: true, loadError: null, step: 2 });

    try {
      const res = await fetch("/api/identify-process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: flow.description }),
      });

      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      update({ processTypes: data.processTypes, loadingTypes: false });
    } catch {
      update({
        loadingTypes: false,
        loadError: "Could not identify process types. Please try again.",
      });
    }
  }

  function handleSelectType(type: ProcessTypeOption) {
    update({ selectedType: type, step: 3 });
  }

  function handleStep3Submit(started: boolean) {
    const matched = matchDocumentsToProcess(flow.selectedType!);
    update({ hasStarted: started, matchedDocIds: matched, step: 4 });
  }

  function handleStep4Continue() {
    update({ step: 5 });
  }

  function handleCreate() {
    const proc = buildNewProcess(flow);
    onCreated(proc);
    onClose();
  }

  const matchedDocs = DEMO_DOCUMENTS.filter((d) => flow.matchedDocIds.includes(d.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d1b2e]/40 backdrop-blur-sm p-4">
      <div
        className="relative w-full max-w-lg rounded-lg border border-neutral-200 bg-white"
        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.10)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-4">
          <div>
            <h2 className="text-sm font-semibold text-neutral-950">Add new process</h2>
            <div className="mt-1.5">
              <StepIndicator current={flow.step} total={5} />
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[70vh] overflow-y-auto px-6 py-5">

          {/* Step 1: Describe */}
          {flow.step === 1 && (
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
                  Step 1 of 5 — Describe your situation
                </p>
                <h3 className="mt-1 text-sm font-semibold text-neutral-950">
                  What do you need to do?
                </h3>
                <p className="mt-1 text-xs text-neutral-500">
                  Describe in plain language what you want to achieve and in which country. For example: &quot;I want to bring my spouse to Sweden&quot; or &quot;I need to renew my work visa in Germany&quot;.
                </p>
              </div>
              <textarea
                className="w-full resize-none rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy/20"
                rows={4}
                placeholder="Describe what you want to do and in which country…"
                value={flow.description}
                onChange={(e) => update({ description: e.target.value })}
              />
              <Button
                className="w-full"
                disabled={!flow.description.trim()}
                onClick={handleStep1Submit}
              >
                Find matching processes
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Step 2: Process type selection */}
          {flow.step === 2 && (
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
                  Step 2 of 5 — Select your process
                </p>
                <h3 className="mt-1 text-sm font-semibold text-neutral-950">
                  Which process matches your situation?
                </h3>
              </div>

              {flow.loadingTypes && (
                <div className="flex flex-col items-center gap-3 py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-navy" strokeWidth={1.75} />
                  <p className="text-xs text-neutral-500">Identifying matching processes…</p>
                </div>
              )}

              {flow.loadError && (
                <div className="flex items-start gap-3 rounded-lg border border-danger/30 bg-danger/5 p-4">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-danger" strokeWidth={1.75} />
                  <div>
                    <p className="text-xs text-neutral-800">{flow.loadError}</p>
                    <button
                      onClick={() => update({ step: 1, loadError: null })}
                      className="mt-1 text-xs font-medium text-navy hover:underline"
                    >
                      Go back and try again
                    </button>
                  </div>
                </div>
              )}

              {!flow.loadingTypes && !flow.loadError && flow.processTypes.length > 0 && (
                <div className="space-y-2">
                  {flow.processTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => handleSelectType(type)}
                      className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-left transition-colors hover:border-navy hover:bg-navy-light/30"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-xs font-semibold text-neutral-950">{type.name}</p>
                            <Badge
                              variant={
                                type.complexity === "complex" ? "urgent" :
                                type.complexity === "moderate" ? "high" : "success"
                              }
                            >
                              {type.complexity}
                            </Badge>
                          </div>
                          <p className="mt-1 text-[11px] leading-relaxed text-neutral-600">
                            {type.description}
                          </p>
                          {type.note && (
                            <p className="mt-1.5 text-[11px] text-warning">
                              <AlertTriangle className="mr-1 inline h-3 w-3" strokeWidth={1.75} />
                              {type.note}
                            </p>
                          )}
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="text-[10px] text-neutral-400">Typical duration</p>
                          <p className="mt-0.5 text-[11px] font-medium text-neutral-700">{type.typicalDuration}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                  <button
                    onClick={() => update({ step: 1 })}
                    className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-neutral-700"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                    Change description
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Have you started? */}
          {flow.step === 3 && flow.selectedType && (
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
                  Step 3 of 5 — Your current status
                </p>
                <h3 className="mt-1 text-sm font-semibold text-neutral-950">
                  {flow.selectedType.name}
                </h3>
                <p className="mt-1 text-xs text-neutral-500">
                  {flow.selectedType.description}
                </p>
              </div>

              <div className="rounded-lg border border-navy-light bg-navy-light/30 p-3">
                <p className="text-[11px] text-neutral-600">
                  <span className="font-medium">Country: </span>{flow.selectedType.country} ·{" "}
                  <span className="font-medium">Typical duration: </span>{flow.selectedType.typicalDuration}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs font-medium text-neutral-700">
                  Have you already started this process?
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleStep3Submit(true)}
                    className="rounded-lg border border-neutral-200 px-4 py-3 text-sm font-medium text-neutral-700 hover:border-navy hover:bg-navy-light/30 transition-colors"
                  >
                    Yes, I&apos;ve started
                  </button>
                  <button
                    onClick={() => handleStep3Submit(false)}
                    className="rounded-lg border border-neutral-200 px-4 py-3 text-sm font-medium text-neutral-700 hover:border-navy hover:bg-navy-light/30 transition-colors"
                  >
                    Not yet
                  </button>
                </div>
              </div>

              <button
                onClick={() => update({ step: 2, selectedType: null })}
                className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-neutral-700"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                Back to process selection
              </button>
            </div>
          )}

          {/* Step 4: Document matching */}
          {flow.step === 4 && (
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
                  Step 4 of 5 — Document matching
                </p>
                <h3 className="mt-1 text-sm font-semibold text-neutral-950">
                  Documents linked to this process
                </h3>
                <p className="mt-1 text-xs text-neutral-500">
                  We found the following documents in your library that may be relevant to this process.
                </p>
              </div>

              {matchedDocs.length > 0 ? (
                <div className="space-y-2">
                  {matchedDocs.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-start gap-3 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2.5"
                    >
                      <FileText className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400" strokeWidth={1.5} />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-neutral-900 leading-snug">{doc.title}</p>
                        <p className="mt-0.5 text-[10px] text-neutral-500">{categoryLabel(doc.category)}</p>
                      </div>
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" strokeWidth={1.75} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-neutral-200 py-6 text-center">
                  <FileText className="mx-auto mb-2 h-5 w-5 text-neutral-300" strokeWidth={1.5} />
                  <p className="text-xs text-neutral-500">
                    No matching documents found in your library.
                    <br />
                    You can upload documents later from the Documents tab.
                  </p>
                </div>
              )}

              <Button className="w-full" onClick={handleStep4Continue}>
                Continue
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Step 5: Explanation + referral */}
          {flow.step === 5 && flow.selectedType && (
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
                  Step 5 of 5 — Process overview
                </p>
                <h3 className="mt-1 text-sm font-semibold text-neutral-950">
                  {flow.selectedType.name}
                </h3>
              </div>

              {/* Inline disclaimer */}
              <div className="flex items-start gap-2.5 rounded-r-lg border-l-[3px] border-navy-light bg-navy-light/40 px-3 py-2.5">
                <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-navy" strokeWidth={1.75} />
                <p className="text-[11px] leading-relaxed text-neutral-700">
                  This is a plain-language overview of a common process. It is not legal advice and does not account for your specific circumstances. Requirements and timelines vary.
                </p>
              </div>

              <div className="space-y-3 text-[12px] text-neutral-700">
                <div>
                  <p className="font-semibold text-neutral-900">What this process involves</p>
                  <p className="mt-1 leading-relaxed">{flow.selectedType.description}</p>
                </div>
                <div>
                  <p className="font-semibold text-neutral-900">Typical steps</p>
                  <ol className="mt-1 space-y-1 pl-4">
                    <li className="list-decimal leading-relaxed">Gather required documents (identity, employment, and status documents)</li>
                    <li className="list-decimal leading-relaxed">Complete and submit the relevant application form to the authority</li>
                    <li className="list-decimal leading-relaxed">Await a decision — typical processing time: {flow.selectedType.typicalDuration}</li>
                    <li className="list-decimal leading-relaxed">Respond to any requests for further information</li>
                    <li className="list-decimal leading-relaxed">Collect your outcome (permit, decision letter, etc.)</li>
                  </ol>
                </div>

                {flow.selectedType.note && (
                  <div className="flex items-start gap-2 rounded-lg border border-warning/30 bg-warning/5 px-3 py-2">
                    <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warning" strokeWidth={1.75} />
                    <p className="text-[11px] leading-relaxed">{flow.selectedType.note}</p>
                  </div>
                )}
              </div>

              {/* Referral card for complex processes */}
              {(flow.selectedType.complexity === "complex" || flow.selectedType.note) && (
                <div className="rounded-lg border border-info/30 bg-info/5 p-4">
                  <div className="flex items-start gap-2.5">
                    <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-info" strokeWidth={1.75} />
                    <div>
                      <p className="text-xs font-semibold text-neutral-900">Consider professional guidance</p>
                      <p className="mt-1 text-[11px] leading-relaxed text-neutral-700">
                        This process is classified as <strong>{flow.selectedType.complexity}</strong>. Given the complexity and the potential consequences of errors, you may benefit from consulting a qualified immigration lawyer or accredited adviser before proceeding.
                      </p>
                      <p className="mt-1.5 text-[10px] text-neutral-500">
                        migraDOCS does not provide legal advice and cannot predict outcomes.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <Button className="w-full" onClick={handleCreate}>
                <CheckCircle2 className="h-4 w-4" />
                Add to my processes
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

export function ProcessesTab() {
  const [showModal, setShowModal] = useState(false);
  const [localProcesses, setLocalProcesses] = useState<Process[]>([]);

  const allProcesses = [...DEMO_PROCESSES, ...localProcesses];

  const handleCreated = (p: Process) => {
    setLocalProcesses((prev) => [p, ...prev]);
  };

  return (
    <div className="space-y-5">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-neutral-500">
            {allProcesses.filter((p) => p.status === "active").length} active{" "}
            · {allProcesses.length} total
          </p>
        </div>
        <Button onClick={() => setShowModal(true)}>
          <Plus className="h-4 w-4" />
          Add new process
        </Button>
      </div>

      {/* Process cards */}
      {allProcesses.length === 0 ? (
        <div className="rounded-lg border border-dashed border-neutral-200 py-16 text-center">
          <Circle className="mx-auto mb-3 h-8 w-8 text-neutral-200" strokeWidth={1.5} />
          <p className="text-sm font-medium text-neutral-600">No processes yet</p>
          <p className="mt-1 text-xs text-neutral-400">
            Click &quot;Add new process&quot; to get started.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {allProcesses.map((proc) => (
            <ProcessCard key={proc.id} process={proc} />
          ))}
        </div>
      )}

      {/* Informational strip */}
      <div className="flex items-start gap-2.5 rounded-lg border border-neutral-100 bg-neutral-50 px-4 py-3">
        <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-400" strokeWidth={1.75} />
        <p className="text-[11px] leading-relaxed text-neutral-500">
          Process information is based on commonly published procedures and may not reflect recent changes. Always verify requirements with the relevant authority.
        </p>
      </div>

      {/* Modal */}
      {showModal && (
        <AddProcessModal
          onClose={() => setShowModal(false)}
          onCreated={handleCreated}
        />
      )}
    </div>
  );
}
