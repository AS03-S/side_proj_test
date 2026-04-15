"use client";

import { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  ChevronLeft,
  ExternalLink,
  Loader2,
  MapPin,
  Plus,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DEMO_PROCESSES } from "@/lib/data/processes";
import { formatDateShort } from "@/lib/utils";
import type { Process, ProcessStep } from "@/types";
import type { IdentifyProcessResponse, ProcessMatch } from "@/app/api/identify-process/route";
import type { ProcessQuestion } from "@/app/api/process-questions/route";

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

// ── Add Process — Stepped Card UI ─────────────────────────────────────────

type FlowScreen =
  | { type: "describe" }
  | { type: "loading" }
  | { type: "clarify"; question: string; usedDescription: string }
  | { type: "select"; matches: ProcessMatch[] }
  | { type: "question"; process: ProcessMatch; questions: ProcessQuestion[]; qIndex: number; answers: string[] }
  | { type: "questions_loading"; process: ProcessMatch }
  | { type: "summary"; process: ProcessMatch; answers: string[]; questions: ProcessQuestion[] }
  | { type: "error"; message: string };

function ProgressDots({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`rounded-full transition-all ${
            i < current
              ? "h-2 w-2 bg-navy/40"
              : i === current
              ? "h-2 w-5 bg-navy"
              : "h-2 w-2 bg-neutral-200"
          }`}
        />
      ))}
    </div>
  );
}

function screenToStep(screen: FlowScreen): number {
  switch (screen.type) {
    case "describe": return 0;
    case "loading": return 1;
    case "clarify": return 1;
    case "select": return 1;
    case "questions_loading": return 2;
    case "question": return 2;
    case "summary": return 3;
    default: return 0;
  }
}

function AddProcessModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: (p: Process) => void;
}) {
  const [screen, setScreen] = useState<FlowScreen>({ type: "describe" });
  const [description, setDescription] = useState("");

  // ── Helpers ──────────────────────────────────────────────────────────────

  async function identifyProcess(desc: string, clarificationAnswer?: string) {
    setScreen({ type: "loading" });
    try {
      const res = await fetch("/api/identify-process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: desc, clarification_answer: clarificationAnswer }),
      });
      if (!res.ok) throw new Error("API error");
      const data: IdentifyProcessResponse = await res.json();

      if (data.needs_clarification && data.clarification_question && !clarificationAnswer) {
        setScreen({ type: "clarify", question: data.clarification_question, usedDescription: desc });
      } else if (data.matches.length === 1 && data.matches[0].confidence >= 0.8) {
        // High-confidence single match — go straight to follow-up questions
        await loadQuestions(data.matches[0]);
      } else {
        setScreen({ type: "select", matches: data.matches });
      }
    } catch {
      setScreen({ type: "error", message: "We couldn't identify a matching process. Please check your connection and try again." });
    }
  }

  async function loadQuestions(process: ProcessMatch) {
    setScreen({ type: "questions_loading", process });
    try {
      const res = await fetch("/api/process-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ processId: process.id, processName: process.name }),
      });
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      const questions: ProcessQuestion[] = data.questions ?? [];
      if (questions.length === 0) {
        setScreen({ type: "summary", process, answers: [], questions: [] });
      } else {
        setScreen({ type: "question", process, questions, qIndex: 0, answers: [] });
      }
    } catch {
      // If question loading fails, skip to summary gracefully
      setScreen({ type: "summary", process, answers: [], questions: [] });
    }
  }

  function answerQuestion(answer: string) {
    if (screen.type !== "question") return;
    const newAnswers = [...screen.answers, answer];
    if (screen.qIndex + 1 >= screen.questions.length) {
      setScreen({ type: "summary", process: screen.process, answers: newAnswers, questions: screen.questions });
    } else {
      setScreen({ type: "question", process: screen.process, questions: screen.questions, qIndex: screen.qIndex + 1, answers: newAnswers });
    }
  }

  function skipQuestion() {
    if (screen.type !== "question") return;
    answerQuestion("—");
  }

  function handleCreate() {
    if (screen.type !== "summary") return;
    const steps: ProcessStep[] = [
      {
        id: "ns-1", order: 1, title: "Gather required documents",
        description: "Collect all supporting documents required for this process.",
        status: "in_progress", checklistItems: [],
      },
      {
        id: "ns-2", order: 2, title: "Submit application",
        description: "Complete and submit the relevant application to Migrationsverket.",
        status: "not_started", checklistItems: [],
      },
      {
        id: "ns-3", order: 3, title: "Await decision",
        description: "Migrationsverket will review and decide on your application.",
        status: "not_started", checklistItems: [],
      },
    ];

    const proc: Process = {
      id: `proc-new-${Date.now()}`,
      name: screen.process.name,
      country: "Sweden",
      currentStageIndex: 0,
      status: "active",
      steps,
      nextAction: "Gather required documents and review the process steps",
      startedAt: new Date().toISOString().split("T")[0],
      documentIds: [],
      notes: description,
    };

    onCreated(proc);
    onClose();
  }

  // ── Back navigation ───────────────────────────────────────────────────────

  function goBack() {
    if (screen.type === "loading" || screen.type === "clarify" || screen.type === "select") {
      setScreen({ type: "describe" });
    } else if (screen.type === "questions_loading") {
      setScreen({ type: "select", matches: [] }); // fallback
    } else if (screen.type === "question") {
      if (screen.qIndex === 0) {
        setScreen({ type: "select", matches: [screen.process] });
      } else {
        const prevAnswers = screen.answers.slice(0, -1);
        setScreen({ type: "question", process: screen.process, questions: screen.questions, qIndex: screen.qIndex - 1, answers: prevAnswers });
      }
    } else if (screen.type === "summary") {
      if (screen.questions.length > 0) {
        const prevAnswers = screen.answers.slice(0, -1);
        setScreen({ type: "question", process: screen.process, questions: screen.questions, qIndex: screen.questions.length - 1, answers: prevAnswers });
      } else {
        setScreen({ type: "select", matches: [screen.process] });
      }
    }
  }

  const totalSteps = 4;
  const currentStep = screenToStep(screen);
  const showBack = screen.type !== "describe" && screen.type !== "loading" && screen.type !== "questions_loading";

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d1b2e]/50 backdrop-blur-sm p-4">
      <div
        className="relative w-full max-w-lg rounded-2xl border border-neutral-200 bg-white"
        style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.14)" }}
      >
        {/* Top bar: progress + close */}
        <div className="flex items-center justify-between px-8 pt-7 pb-0">
          <ProgressDots total={totalSteps} current={currentStep} />
          <button
            onClick={onClose}
            className="rounded p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
            title="Close"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-8 py-7">

          {/* ── Step 1: Describe ── */}
          {screen.type === "describe" && (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">Sweden — Migrationsverket</p>
                <h2 className="mt-2 text-2xl font-semibold leading-snug text-neutral-950">
                  Tell us what you&apos;re trying to do — in your own words.
                </h2>
                <p className="mt-2 text-sm text-neutral-500">
                  There&apos;s no right way to describe it. Just tell us your situation.
                </p>
              </div>
              <textarea
                className="w-full resize-none rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3.5 text-base text-neutral-900 placeholder:text-neutral-400 focus:border-navy focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy/10 transition-colors"
                rows={5}
                placeholder={`e.g. "I've been offered a job in Stockholm and need to move from outside the EU." or "I want my partner to join me in Sweden."`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                autoFocus
              />
              <Button
                className="w-full py-3 text-base"
                disabled={!description.trim()}
                onClick={() => identifyProcess(description)}
              >
                Continue
              </Button>
            </div>
          )}

          {/* ── Loading ── */}
          {(screen.type === "loading" || screen.type === "questions_loading") && (
            <div className="flex flex-col items-center gap-6 py-8">
              <Loader2 className="h-12 w-12 animate-spin text-navy" strokeWidth={1.25} />
              <div className="text-center">
                <p className="text-lg font-semibold text-neutral-900">
                  {screen.type === "loading" ? "Finding the right process…" : "Preparing your questions…"}
                </p>
                <p className="mt-1.5 text-sm text-neutral-500">This takes just a moment.</p>
              </div>
            </div>
          )}

          {/* ── Clarification ── */}
          {screen.type === "clarify" && (
            <div className="space-y-6">
              {showBack && (
                <button onClick={goBack} className="flex items-center gap-1 text-sm text-neutral-400 hover:text-neutral-700 transition-colors">
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </button>
              )}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">One quick question</p>
                <h2 className="mt-2 text-2xl font-semibold leading-snug text-neutral-950">
                  {screen.question}
                </h2>
              </div>
              <div className="space-y-2.5">
                {/* Generic answer options derived from the question — Claude sometimes returns these, otherwise show a text field */}
                <textarea
                  className="w-full resize-none rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-400 focus:border-navy focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy/10 transition-colors"
                  rows={3}
                  placeholder="Your answer…"
                  id="clarify-input"
                  autoFocus
                />
              </div>
              <Button
                className="w-full py-3 text-base"
                onClick={() => {
                  const el = document.getElementById("clarify-input") as HTMLTextAreaElement | null;
                  const answer = el?.value?.trim() ?? "";
                  identifyProcess(screen.usedDescription, answer || "no further detail");
                }}
              >
                Continue
              </Button>
            </div>
          )}

          {/* ── Process selection ── */}
          {screen.type === "select" && (
            <div className="space-y-5">
              {showBack && (
                <button onClick={goBack} className="flex items-center gap-1 text-sm text-neutral-400 hover:text-neutral-700 transition-colors">
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </button>
              )}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">Sweden — Migrationsverket</p>
                <h2 className="mt-2 text-xl font-semibold leading-snug text-neutral-950">
                  Which of these matches your situation?
                </h2>
              </div>
              <div className="space-y-2.5">
                {screen.matches.map((match) => (
                  <button
                    key={match.id}
                    onClick={() => loadQuestions(match)}
                    className="w-full rounded-xl border border-neutral-200 bg-white px-5 py-4 text-left transition-all hover:border-navy hover:bg-navy-light/30 hover:shadow-sm active:scale-[0.99]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-neutral-950">{match.name}</p>
                        <p className="mt-1 text-sm leading-relaxed text-neutral-600">{match.description}</p>
                      </div>
                      {match.confidence >= 0.8 && (
                        <span className="mt-0.5 shrink-0 rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-success">
                          Best match
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-xs text-neutral-400">
                Not sure? Pick the one that sounds closest — you can adjust it later.
              </p>
            </div>
          )}

          {/* ── Follow-up questions ── */}
          {screen.type === "question" && (
            <div className="space-y-6">
              {showBack && (
                <button onClick={goBack} className="flex items-center gap-1 text-sm text-neutral-400 hover:text-neutral-700 transition-colors">
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </button>
              )}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
                  {screen.process.name} · Question {screen.qIndex + 1} of {screen.questions.length}
                </p>
                <h2 className="mt-2 text-2xl font-semibold leading-snug text-neutral-950">
                  {screen.questions[screen.qIndex].question}
                </h2>
              </div>

              {screen.questions[screen.qIndex].type === "choice" && screen.questions[screen.qIndex].options && (
                <div className="space-y-2.5">
                  {screen.questions[screen.qIndex].options!.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => answerQuestion(opt)}
                      className="w-full rounded-xl border border-neutral-200 bg-white px-5 py-3.5 text-left text-base font-medium text-neutral-800 transition-all hover:border-navy hover:bg-navy-light/30"
                    >
                      {opt}
                    </button>
                  ))}
                  <button onClick={skipQuestion} className="text-sm text-neutral-400 hover:text-neutral-600 mt-1">
                    Skip this question
                  </button>
                </div>
              )}

              {screen.questions[screen.qIndex].type === "date" && (
                <div className="space-y-4">
                  <input
                    type="date"
                    id="q-date"
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-base text-neutral-900 focus:border-navy focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy/10 transition-colors"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 py-3"
                      onClick={() => {
                        const el = document.getElementById("q-date") as HTMLInputElement | null;
                        answerQuestion(el?.value || "—");
                      }}
                    >
                      Continue
                    </Button>
                    <Button variant="secondary" onClick={skipQuestion}>Skip</Button>
                  </div>
                </div>
              )}

              {screen.questions[screen.qIndex].type === "text" && (
                <div className="space-y-4">
                  <input
                    type="text"
                    id="q-text"
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3.5 text-base text-neutral-900 placeholder:text-neutral-400 focus:border-navy focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy/10 transition-colors"
                    placeholder="Your answer…"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const el = e.currentTarget;
                        answerQuestion(el.value || "—");
                      }
                    }}
                  />
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 py-3"
                      onClick={() => {
                        const el = document.getElementById("q-text") as HTMLInputElement | null;
                        answerQuestion(el?.value || "—");
                      }}
                    >
                      Continue
                    </Button>
                    <Button variant="secondary" onClick={skipQuestion}>Skip</Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Summary ── */}
          {screen.type === "summary" && (
            <div className="space-y-5">
              {showBack && (
                <button onClick={goBack} className="flex items-center gap-1 text-sm text-neutral-400 hover:text-neutral-700 transition-colors">
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </button>
              )}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">Summary</p>
                <h2 className="mt-1.5 text-xl font-semibold text-neutral-950">{screen.process.name}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">{screen.process.description}</p>
              </div>

              {/* Answers given */}
              {screen.questions.length > 0 && screen.answers.some((a) => a !== "—") && (
                <div className="rounded-xl border border-neutral-100 bg-neutral-50 px-4 py-3 space-y-2">
                  {screen.questions.map((q, i) => (
                    screen.answers[i] && screen.answers[i] !== "—" ? (
                      <div key={i}>
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-neutral-400">{q.question}</p>
                        <p className="mt-0.5 text-sm text-neutral-800">{screen.answers[i]}</p>
                      </div>
                    ) : null
                  ))}
                </div>
              )}

              {/* Plain-language note */}
              <div className="flex items-start gap-2.5 rounded-xl border-l-[3px] border-navy-light bg-navy-light/40 px-4 py-3">
                <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-navy" strokeWidth={1.75} />
                <p className="text-sm leading-relaxed text-neutral-700">
                  This is a plain-language overview based on commonly published information. It is not legal advice and may not reflect recent changes. Requirements vary by individual case.
                </p>
              </div>

              {/* Referral card */}
              <div className="rounded-xl border border-info/20 bg-info/5 p-4">
                <div className="flex items-start gap-3">
                  <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-info" strokeWidth={1.75} />
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">For legal questions about your case</p>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                      Contact Migrationsverket directly at{" "}
                      <span className="font-medium text-neutral-800">migrationsverket.se</span>{" "}
                      or call{" "}
                      <span className="font-medium text-neutral-800">0771-235 235</span>.
                    </p>
                    <p className="mt-1.5 text-xs text-neutral-400">
                      migraDOCS provides document organisation and information only — not legal advice.
                    </p>
                  </div>
                </div>
              </div>

              <Button className="w-full py-3 text-base" onClick={handleCreate}>
                Add to my processes
              </Button>
            </div>
          )}

          {/* ── Error ── */}
          {screen.type === "error" && (
            <div className="flex flex-col items-center gap-5 py-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-warning/10">
                <AlertTriangle className="h-7 w-7 text-warning" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-base font-semibold text-neutral-900">Something went wrong</p>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-500 max-w-xs">{screen.message}</p>
              </div>
              <Button variant="secondary" onClick={() => setScreen({ type: "describe" })}>
                Start over
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

export function ProcessesTab({ onSwitchToOverview }: { onSwitchToOverview?: () => void }) {
  const [showModal, setShowModal] = useState(false);
  const [localProcesses, setLocalProcesses] = useState<Process[]>([]);

  const allProcesses = [...DEMO_PROCESSES, ...localProcesses];

  const handleCreated = (p: Process) => {
    setLocalProcesses((prev) => [p, ...prev]);
    // After creation, switch to overview
    onSwitchToOverview?.();
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-xs text-neutral-500">
          {allProcesses.filter((p) => p.status === "active").length} active{" "}
          · {allProcesses.length} total · Sweden (Migrationsverket)
        </p>
        <Button onClick={() => setShowModal(true)}>
          <Plus className="h-4 w-4" />
          Add new process
        </Button>
      </div>

      {allProcesses.length === 0 ? (
        <div className="rounded-xl border border-dashed border-neutral-200 py-20 text-center">
          <p className="text-base font-medium text-neutral-600">No processes yet</p>
          <p className="mt-1 text-sm text-neutral-400">
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

      <div className="flex items-start gap-2.5 rounded-lg border border-neutral-100 bg-neutral-50 px-4 py-3">
        <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-400" strokeWidth={1.75} />
        <p className="text-[11px] leading-relaxed text-neutral-500">
          Process information is based on publicly available Migrationsverket guidance and may not reflect recent policy changes. Always verify requirements directly with Migrationsverket.
        </p>
      </div>

      {showModal && (
        <AddProcessModal
          onClose={() => setShowModal(false)}
          onCreated={handleCreated}
        />
      )}
    </div>
  );
}
