"use client";

import { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  FileText,
  Info,
  MapPin,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DEMO_PROCESSES } from "@/lib/data/processes";
import { DEMO_DOCUMENTS } from "@/lib/data/documents";
import { formatDateShort } from "@/lib/utils";
import type { Process } from "@/types";

// Demo today — consistent with the rest of the app
const TODAY = new Date("2026-04-12");

function daysFromNow(dateString: string): number {
  return Math.ceil(
    (new Date(dateString).getTime() - TODAY.getTime()) / (1000 * 60 * 60 * 24)
  );
}

// ── Types ──────────────────────────────────────────────────────────────────

interface UpcomingEvent {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  daysLeft: number;
  urgency: "overdue" | "urgent" | "soon" | "normal";
  context: string;
  nextSteps: string[];
  processId?: string;
  documentId?: string;
}

// ── Build event list ───────────────────────────────────────────────────────

function buildUpcomingEvents(): UpcomingEvent[] {
  const events: UpcomingEvent[] = [];

  // Events from process step deadlines
  for (const proc of DEMO_PROCESSES) {
    for (const step of proc.steps) {
      if (step.deadline && step.status !== "completed") {
        const days = daysFromNow(step.deadline);
        events.push({
          id: `proc-${proc.id}-${step.id}`,
          title: step.title,
          subtitle: proc.name,
          date: step.deadline,
          daysLeft: days,
          urgency: days < 0 ? "overdue" : days <= 7 ? "urgent" : days <= 21 ? "soon" : "normal",
          context: step.description,
          nextSteps: step.checklistItems
            ?.filter((c) => !c.completed)
            .map((c) => c.label) ?? [],
          processId: proc.id,
        });
      }
    }
  }

  // Events from document required actions
  for (const doc of DEMO_DOCUMENTS) {
    for (const action of doc.requiredActions) {
      if (action.dueDate && !action.completed) {
        const days = daysFromNow(action.dueDate);
        events.push({
          id: `doc-${doc.id}-${action.id}`,
          title: action.description,
          subtitle: doc.title,
          date: action.dueDate,
          daysLeft: days,
          urgency: days < 0 ? "overdue" : days <= 7 ? "urgent" : days <= 21 ? "soon" : "normal",
          context: doc.summary,
          nextSteps: doc.nextSteps ?? doc.preparationChecklist.filter((c) => !c.completed).map((c) => c.label).slice(0, 3),
          documentId: doc.id,
        });
      }
    }
  }

  // Sort: overdue first, then by date ascending
  return events.sort((a, b) => {
    if (a.urgency === "overdue" && b.urgency !== "overdue") return -1;
    if (b.urgency === "overdue" && a.urgency !== "overdue") return 1;
    return a.daysLeft - b.daysLeft;
  });
}

// ── Status Banner ──────────────────────────────────────────────────────────

function StatusBanner({ process }: { process: Process | undefined }) {
  if (!process) {
    return (
      <div className="rounded-lg border border-neutral-200 bg-white p-5">
        <p className="text-sm text-neutral-500">No active processes. Add a process to get started.</p>
      </div>
    );
  }

  const currentStep = process.steps.find((s) => s.status === "in_progress");
  const upcomingStep = process.steps.find((s) => s.status === "not_started");
  const completedCount = process.steps.filter((s) => s.status === "completed").length;
  const totalSteps = process.steps.length;

  const deadlineDays = process.nextDeadline ? daysFromNow(process.nextDeadline) : null;
  const urgencyColor =
    deadlineDays === null ? "border-navy-light bg-navy-light/40" :
    deadlineDays < 0 ? "border-danger/40 bg-danger/5" :
    deadlineDays <= 7 ? "border-danger/30 bg-danger/5" :
    deadlineDays <= 21 ? "border-warning/40 bg-warning/5" :
    "border-navy-light bg-navy-light/40";

  const urgencyIcon =
    deadlineDays !== null && deadlineDays <= 7
      ? <AlertTriangle className="h-4 w-4 shrink-0 text-danger" strokeWidth={1.75} />
      : deadlineDays !== null && deadlineDays <= 21
      ? <Clock className="h-4 w-4 shrink-0 text-warning" strokeWidth={1.75} />
      : <Zap className="h-4 w-4 shrink-0 text-navy" strokeWidth={1.75} />;

  return (
    <div className={`rounded-lg border-l-[3px] px-5 py-4 ${urgencyColor}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          {urgencyIcon}
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-neutral-950">{process.name}</h2>
              <Badge variant="info">{completedCount}/{totalSteps} steps</Badge>
            </div>
            {currentStep && (
              <p className="mt-1 text-xs text-neutral-600">
                <span className="font-medium text-neutral-800">Now: </span>
                {currentStep.title}
              </p>
            )}
            {upcomingStep && (
              <p className="mt-0.5 text-xs text-neutral-500">
                <span className="font-medium">Next: </span>
                {upcomingStep.title}
              </p>
            )}
          </div>
        </div>

        {process.nextDeadline && (
          <div className="shrink-0 text-right">
            <p className="text-[10px] uppercase tracking-wide text-neutral-400">Next deadline</p>
            <p className={`mt-0.5 text-xs font-semibold ${
              deadlineDays !== null && deadlineDays < 0 ? "text-danger" :
              deadlineDays !== null && deadlineDays <= 7 ? "text-danger" :
              deadlineDays !== null && deadlineDays <= 21 ? "text-warning" :
              "text-neutral-800"
            }`}>
              {formatDateShort(process.nextDeadline)}
            </p>
            {deadlineDays !== null && (
              <p className="text-[10px] text-neutral-400">
                {deadlineDays < 0
                  ? `${Math.abs(deadlineDays)}d overdue`
                  : deadlineDays === 0
                  ? "Today"
                  : `${deadlineDays}d remaining`}
              </p>
            )}
          </div>
        )}
      </div>

      {process.nextAction && (
        <div className="mt-3 flex items-center gap-2 text-xs text-neutral-600">
          <ArrowRight className="h-3 w-3 shrink-0 text-navy" />
          <span>{process.nextAction}</span>
        </div>
      )}
    </div>
  );
}

// ── Upcoming Events ────────────────────────────────────────────────────────

function urgencyBadge(urgency: UpcomingEvent["urgency"]) {
  if (urgency === "overdue")
    return <Badge variant="urgent">Overdue</Badge>;
  if (urgency === "urgent")
    return <Badge variant="urgent">Urgent</Badge>;
  if (urgency === "soon")
    return <Badge variant="high">Soon</Badge>;
  return <Badge variant="muted">Upcoming</Badge>;
}

function UpcomingEventItem({
  event,
  expanded,
  onToggle,
}: {
  event: UpcomingEvent;
  expanded: boolean;
  onToggle: () => void;
}) {
  const borderColor =
    event.urgency === "overdue" ? "border-danger/30" :
    event.urgency === "urgent" ? "border-danger/20" :
    event.urgency === "soon" ? "border-warning/20" :
    "border-neutral-200";

  return (
    <div className={`rounded-lg border bg-white transition-shadow ${borderColor}`}>
      <button
        onClick={onToggle}
        className="flex w-full items-start gap-4 p-4 text-left"
      >
        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-100">
          <CalendarClock className="h-3.5 w-3.5 text-neutral-500" strokeWidth={1.75} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs font-semibold text-neutral-950 leading-snug">{event.title}</p>
            {urgencyBadge(event.urgency)}
          </div>
          <p className="mt-0.5 text-[11px] text-neutral-500 truncate">{event.subtitle}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-[11px] font-medium text-neutral-700">{formatDateShort(event.date)}</p>
          <p className={`text-[10px] ${
            event.urgency === "overdue" ? "text-danger" :
            event.urgency === "urgent" ? "text-danger" :
            "text-neutral-400"
          }`}>
            {event.daysLeft < 0
              ? `${Math.abs(event.daysLeft)}d overdue`
              : event.daysLeft === 0
              ? "Today"
              : `${event.daysLeft}d`}
          </p>
        </div>
        <div className="shrink-0 self-center text-neutral-400">
          {expanded ? (
            <ChevronUp className="h-4 w-4" strokeWidth={1.75} />
          ) : (
            <ChevronDown className="h-4 w-4" strokeWidth={1.75} />
          )}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-neutral-100 px-4 pb-4 pt-3">
          <p className="text-[11px] leading-relaxed text-neutral-600">{event.context}</p>
          {event.nextSteps.length > 0 && (
            <div className="mt-3">
              <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
                Next steps
              </p>
              <ul className="space-y-1">
                {event.nextSteps.slice(0, 4).map((step, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <ArrowRight className="mt-0.5 h-3 w-3 shrink-0 text-navy" />
                    <span className="text-[11px] text-neutral-700">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Processes Summary Card ─────────────────────────────────────────────────

function ProcessesSummaryCard({
  processes,
  onSwitchToProcesses,
}: {
  processes: Process[];
  onSwitchToProcesses: () => void;
}) {
  const active = processes.filter((p) => p.status === "active").length;
  const completed = processes.filter((p) => p.status === "completed").length;
  const onHold = processes.filter((p) => p.status === "on_hold").length;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Your processes</CardTitle>
          <button
            onClick={onSwitchToProcesses}
            className="text-[11px] font-medium text-navy hover:underline"
          >
            View all
          </button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="mb-4 grid grid-cols-3 gap-3">
          <div className="rounded-lg border border-neutral-100 bg-neutral-50 p-3 text-center">
            <p className="text-xl font-bold text-navy">{active}</p>
            <p className="mt-0.5 text-[10px] uppercase tracking-wide text-neutral-500">Active</p>
          </div>
          <div className="rounded-lg border border-neutral-100 bg-neutral-50 p-3 text-center">
            <p className="text-xl font-bold text-success">{completed}</p>
            <p className="mt-0.5 text-[10px] uppercase tracking-wide text-neutral-500">Completed</p>
          </div>
          <div className="rounded-lg border border-neutral-100 bg-neutral-50 p-3 text-center">
            <p className="text-xl font-bold text-neutral-400">{onHold}</p>
            <p className="mt-0.5 text-[10px] uppercase tracking-wide text-neutral-500">On hold</p>
          </div>
        </div>

        <div className="space-y-2">
          {processes
            .filter((p) => p.status === "active")
            .map((proc) => {
              const currentStep = proc.steps.find((s) => s.status === "in_progress");
              const deadlineDays = proc.nextDeadline ? daysFromNow(proc.nextDeadline) : null;
              return (
                <div
                  key={proc.id}
                  className="flex items-start gap-3 rounded border border-neutral-100 bg-neutral-50 px-3 py-2.5"
                >
                  <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-navy" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-neutral-900 leading-snug">{proc.name}</p>
                    {currentStep && (
                      <p className="mt-0.5 text-[10px] text-neutral-500">{currentStep.title}</p>
                    )}
                  </div>
                  {deadlineDays !== null && (
                    <div className="shrink-0">
                      <Badge
                        variant={deadlineDays < 0 ? "urgent" : deadlineDays <= 14 ? "high" : "muted"}
                      >
                        {deadlineDays < 0
                          ? `${Math.abs(deadlineDays)}d overdue`
                          : `${deadlineDays}d`}
                      </Badge>
                    </div>
                  )}
                </div>
              );
            })}
        </div>

        <div className="mt-4 flex items-start gap-2.5 rounded border border-neutral-100 bg-neutral-50 px-3 py-2.5">
          <FileText className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-400" strokeWidth={1.75} />
          <div>
            <p className="text-[11px] text-neutral-600">
              <span className="font-medium">{DEMO_DOCUMENTS.filter((d) => d.status === "action_required").length} documents</span> require action.{" "}
              <span className="font-medium">{DEMO_DOCUMENTS.length} total</span> on file.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

export function OverviewTab({ onSwitchToProcesses }: { onSwitchToProcesses: () => void }) {
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);

  const activeProcesses = DEMO_PROCESSES.filter((p) => p.status === "active");

  // Primary process: the one with the nearest upcoming deadline
  const primaryProcess = [...activeProcesses].sort((a, b) => {
    if (!a.nextDeadline) return 1;
    if (!b.nextDeadline) return -1;
    return new Date(a.nextDeadline).getTime() - new Date(b.nextDeadline).getTime();
  })[0];

  const events = buildUpcomingEvents();

  const overdueCount = events.filter((e) => e.urgency === "overdue").length;
  const urgentCount = events.filter((e) => e.urgency === "urgent").length;

  const toggleEvent = (id: string) =>
    setExpandedEvent((prev) => (prev === id ? null : id));

  return (
    <div className="space-y-5">
      {/* Alert strip if there are overdue items */}
      {overdueCount > 0 && (
        <div className="flex items-start gap-3 rounded-lg border border-danger/30 bg-danger/5 px-4 py-3">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-danger" strokeWidth={1.75} />
          <p className="text-xs leading-relaxed text-neutral-800">
            <span className="font-semibold text-danger">
              {overdueCount} {overdueCount === 1 ? "item is" : "items are"} overdue.
            </span>{" "}
            Review the events below and take action. Some deadlines may have passed — check whether you can still act.
          </p>
        </div>
      )}

      {/* Status banner */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
            Current process status
          </p>
        </div>
        <StatusBanner process={primaryProcess} />
      </div>

      {/* Upcoming events */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
            Upcoming events & deadlines
          </p>
          <div className="flex items-center gap-1.5">
            {urgentCount > 0 && (
              <Badge variant="urgent">{urgentCount} urgent</Badge>
            )}
            <span className="text-[10px] text-neutral-400">{events.length} total</span>
          </div>
        </div>

        {events.length === 0 ? (
          <div className="rounded-lg border border-dashed border-neutral-200 py-8 text-center">
            <CheckCircle2 className="mx-auto mb-2 h-6 w-6 text-success" strokeWidth={1.5} />
            <p className="text-xs text-neutral-500">No upcoming deadlines. You're up to date.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {events.slice(0, 8).map((event) => (
              <UpcomingEventItem
                key={event.id}
                event={event}
                expanded={expandedEvent === event.id}
                onToggle={() => toggleEvent(event.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Processes summary card */}
      <ProcessesSummaryCard
        processes={DEMO_PROCESSES}
        onSwitchToProcesses={onSwitchToProcesses}
      />

      {/* Informational note */}
      <div className="flex items-start gap-2.5 rounded-lg border border-neutral-100 bg-neutral-50 px-4 py-3">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-400" strokeWidth={1.75} />
        <p className="text-[11px] leading-relaxed text-neutral-500">
          Dates and deadlines are extracted from your uploaded documents and may not reflect subsequent correspondence from authorities.
          Always verify against the original documents.
        </p>
      </div>
    </div>
  );
}
