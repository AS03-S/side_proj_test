"use client";

import { notFound, useParams } from "next/navigation";
import { TopBar } from "@/components/layout/TopBar";
import { DEMO_DOCUMENTS } from "@/lib/data/documents";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  FileText,
  ChevronLeft,
  AlertTriangle,
  CheckCircle2,
  Circle,
  Info,
  Lock,
  CalendarClock,
  Building2,
  Hash,
  Tag,
  ShieldAlert,
} from "lucide-react";
import { categoryLabel, formatDate, statusLabel } from "@/lib/utils";
import { useState } from "react";
import type { DocumentStatus } from "@/types";

const STATUS_BADGE: Record<DocumentStatus, "urgent" | "high" | "success" | "muted" | "default"> = {
  action_required: "urgent",
  pending_review: "high",
  reviewed: "default",
  completed: "success",
  expired: "muted",
};

function daysUntil(dateString: string): number {
  const now = new Date("2026-04-12");
  return Math.ceil((new Date(dateString).getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export default function DocumentDetailPage() {
  const params = useParams();
  const doc = DEMO_DOCUMENTS.find((d) => d.id === params.id);
  if (!doc) return notFound();

  const [checklist, setChecklist] = useState(doc.preparationChecklist);
  const [actions, setActions] = useState(doc.requiredActions);

  const toggleCheck = (id: string) => {
    setChecklist((prev) => prev.map((item) => item.id === id ? { ...item, completed: !item.completed } : item));
  };
  const toggleAction = (id: string) => {
    setActions((prev) => prev.map((a) => a.id === id ? { ...a, completed: !a.completed } : a));
  };

  const checklistProgress = Math.round(
    (checklist.filter((c) => c.completed).length / checklist.length) * 100
  );

  const confidenceColor =
    doc.confidence === "high" ? "text-success" :
    doc.confidence === "medium" ? "text-warning" : "text-danger";

  return (
    <>
      <TopBar title="Document Detail" />
      <main className="flex-1 p-6">
        {/* Back */}
        <Link href="/documents">
          <Button variant="ghost" size="sm" className="mb-4 -ml-1 text-neutral-500">
            <ChevronLeft className="h-4 w-4" />
            Back to documents
          </Button>
        </Link>

        {/* Disclaimer banner */}
        <div className="mb-5 flex items-start gap-3 rounded-r-lg border-l-[3px] border-navy-light bg-navy-light/40 px-4 py-3">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-navy" strokeWidth={1.75} />
          <p className="text-xs leading-relaxed text-neutral-700">
            <strong className="font-semibold text-neutral-950">Informational guidance only.</strong>{" "}
            migraDOCS provides structured document guidance and procedural information only. This is not legal advice.
            Always verify extracted information against your original document.
            For legal questions, consult a qualified immigration lawyer.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main column */}
          <div className="space-y-5 lg:col-span-2">

            {/* Document header */}
            <Card>
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50">
                    <FileText className="h-6 w-6 text-neutral-400" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h1 className="text-base font-semibold text-neutral-950">{doc.title}</h1>
                      <Badge variant={STATUS_BADGE[doc.status]}>{statusLabel(doc.status)}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-neutral-500">{doc.issuingAuthority}</p>
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Metadata grid */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <div className="flex items-start gap-2">
                    <CalendarClock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-400" strokeWidth={1.75} />
                    <div>
                      <p className="text-[10px] uppercase tracking-wide text-neutral-400">Received</p>
                      <p className="mt-0.5 text-xs font-medium text-neutral-700">{formatDate(doc.dateReceived)}</p>
                    </div>
                  </div>
                  {doc.extractedDeadline && (
                    <div className="flex items-start gap-2">
                      <AlertTriangle className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${
                        daysUntil(doc.extractedDeadline) <= 14 ? "text-danger" : "text-warning"
                      }`} strokeWidth={1.75} />
                      <div>
                        <p className="text-[10px] uppercase tracking-wide text-neutral-400">Deadline</p>
                        <p className={`mt-0.5 text-xs font-medium ${
                          daysUntil(doc.extractedDeadline) <= 14 ? "text-danger" : "text-neutral-700"
                        }`}>
                          {formatDate(doc.extractedDeadline)}
                        </p>
                        {daysUntil(doc.extractedDeadline) > 0 && (
                          <p className="text-[10px] text-neutral-400">
                            {daysUntil(doc.extractedDeadline)} days remaining
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-2">
                    <Tag className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-400" strokeWidth={1.75} />
                    <div>
                      <p className="text-[10px] uppercase tracking-wide text-neutral-400">Category</p>
                      <p className="mt-0.5 text-xs font-medium text-neutral-700">{categoryLabel(doc.category)}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Building2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-400" strokeWidth={1.75} />
                    <div>
                      <p className="text-[10px] uppercase tracking-wide text-neutral-400">File type</p>
                      <p className="mt-0.5 text-xs font-medium uppercase text-neutral-700">
                        {doc.fileType} {doc.pageCount && `· ${doc.pageCount}p`}
                      </p>
                    </div>
                  </div>
                  {doc.referenceNumber && (
                    <div className="flex items-start gap-2">
                      <Hash className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-400" strokeWidth={1.75} />
                      <div>
                        <p className="text-[10px] uppercase tracking-wide text-neutral-400">Reference</p>
                        <p className="mt-0.5 text-xs font-medium text-neutral-700">{doc.referenceNumber}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-2">
                    <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-400" strokeWidth={1.75} />
                    <div>
                      <p className="text-[10px] uppercase tracking-wide text-neutral-400">Confidence</p>
                      <p className={`mt-0.5 text-xs font-medium capitalize ${confidenceColor}`}>
                        {doc.confidence} — {doc.confidenceScore}%
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Structured summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-neutral-600">{doc.summary}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {doc.tags.map((tag) => (
                    <span key={tag} className="rounded border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[10px] text-neutral-500">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Required actions */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Required actions</CardTitle>
                  <span className="text-[10px] text-neutral-400">
                    {actions.filter((a) => a.completed).length}/{actions.length} completed
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {actions.map((action) => (
                  <div
                    key={action.id}
                    onClick={() => toggleAction(action.id)}
                    className={`flex cursor-pointer items-start gap-3 rounded border px-3 py-2.5 transition-colors ${
                      action.completed
                        ? "border-neutral-100 bg-neutral-50"
                        : "border-neutral-200 hover:border-neutral-300"
                    }`}
                  >
                    {action.completed ? (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" strokeWidth={1.75} />
                    ) : (
                      <Circle className="mt-0.5 h-4 w-4 shrink-0 text-neutral-300" strokeWidth={1.75} />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className={`text-xs font-medium leading-snug ${action.completed ? "line-through text-neutral-400" : "text-neutral-950"}`}>
                        {action.description}
                      </p>
                      {action.dueDate && !action.completed && (
                        <p className="mt-0.5 text-[10px] text-neutral-400">Due: {formatDate(action.dueDate)}</p>
                      )}
                      {action.isLegalAction && !action.completed && (
                        <p className="mt-0.5 text-[10px] text-info">
                          This step may require qualified legal support.
                        </p>
                      )}
                    </div>
                    {!action.completed && (
                      <Badge variant={action.priority === "urgent" ? "urgent" : action.priority === "high" ? "high" : "default"}>
                        {action.priority}
                      </Badge>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right column */}
          <div className="space-y-5">

            {/* Confidence indicator */}
            <Card>
              <CardHeader>
                <CardTitle>Extraction confidence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-2 flex items-end justify-between">
                  <span className={`text-2xl font-semibold ${confidenceColor}`}>{doc.confidenceScore}%</span>
                  <span className={`text-xs font-medium capitalize ${confidenceColor}`}>{doc.confidence}</span>
                </div>
                <Progress value={doc.confidenceScore} className="h-2" />
                <p className="mt-3 text-[10px] leading-relaxed text-neutral-400">
                  {doc.confidence === "high"
                    ? "Extraction confidence is high. Key dates and categories are likely accurate."
                    : doc.confidence === "medium"
                    ? "Extraction confidence is moderate. Verify key dates against the original document."
                    : "Extraction confidence is low. Carefully verify all extracted information."}
                </p>
              </CardContent>
            </Card>

            {/* Preparation checklist */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Preparation checklist</CardTitle>
                  <span className="text-[10px] text-neutral-400">{checklistProgress}%</span>
                </div>
              </CardHeader>
              <CardContent>
                <Progress value={checklistProgress} className="mb-4" />
                <ul className="space-y-2">
                  {checklist.map((item) => (
                    <li
                      key={item.id}
                      onClick={() => toggleCheck(item.id)}
                      className="flex cursor-pointer items-start gap-2.5"
                    >
                      {item.completed ? (
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" strokeWidth={1.75} />
                      ) : (
                        <Circle className="mt-0.5 h-4 w-4 shrink-0 text-neutral-200" strokeWidth={1.75} />
                      )}
                      <span className={`text-xs leading-snug ${item.completed ? "line-through text-neutral-400" : "text-neutral-700"}`}>
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Storage note */}
            <div className="flex items-start gap-2.5 rounded-r-lg border-l-[3px] border-navy-light bg-navy-light/40 p-3">
              <Lock className="mt-0.5 h-4 w-4 shrink-0 text-navy" strokeWidth={1.75} />
              <p className="text-[10px] leading-relaxed text-neutral-600">
                Original document not stored. migraDOCS stores only the extracted summary, encrypted and accessible only by you.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
