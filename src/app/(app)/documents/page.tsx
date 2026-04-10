"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { DEMO_DOCUMENTS } from "@/lib/data/documents";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { FileText, ChevronRight, Search, Filter } from "lucide-react";
import { categoryLabel, formatDateShort, statusLabel } from "@/lib/utils";
import type { DocumentStatus } from "@/types";

const STATUS_BADGE: Record<DocumentStatus, "urgent" | "high" | "success" | "muted" | "default"> = {
  action_required: "urgent",
  pending_review: "high",
  reviewed: "default",
  completed: "success",
  expired: "muted",
};

const CATEGORIES = ["All", "Residence Permit", "Request for Documentation", "Appointment Notice", "Appeal Notice", "Other"];

function daysUntilSync(dateString: string): number {
  const now = new Date("2026-04-04");
  return Math.ceil((new Date(dateString).getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export default function DocumentsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filtered = DEMO_DOCUMENTS.filter((doc) => {
    const matchSearch =
      doc.title.toLowerCase().includes(search.toLowerCase()) ||
      doc.issuingAuthority.toLowerCase().includes(search.toLowerCase());
    const matchCat =
      selectedCategory === "All" ||
      categoryLabel(doc.category).includes(selectedCategory);
    return matchSearch && matchCat;
  });

  return (
    <>
      <TopBar title="Documents" subtitle={`${DEMO_DOCUMENTS.length} documents on file`} />
      <main className="flex-1 p-6">
        {/* Filters */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" />
            <Input
              placeholder="Find a document…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
            <Filter className="h-3.5 w-3.5 shrink-0 text-neutral-400" />
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 rounded border px-2.5 py-1 text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Document list */}
        <div className="space-y-2">
          {filtered.length === 0 && search === "" && selectedCategory === "All" ? (
            <div className="py-20 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full" style={{ background: "rgba(87,228,215,0.15)" }}>
                <FileText className="h-7 w-7" style={{ color: "#020086" }} strokeWidth={1.5} />
              </div>
              <p className="text-base font-semibold" style={{ color: "#020086" }}>No documents yet.</p>
              <p className="mt-1 text-sm" style={{ color: "rgba(2,0,134,0.5)" }}>Upload your first document to get started.</p>
              <div className="mt-5">
                <button
                  className="inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-medium text-white transition-colors"
                  style={{ background: "#020086" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#010060"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#020086"; }}
                >
                  <ChevronRight className="h-4 w-4" />
                  Upload a document
                </button>
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center text-sm" style={{ color: "rgba(2,0,134,0.4)" }}>No documents match your search.</div>
          ) : (
            filtered.map((doc) => (
              <Link key={doc.id} href={`/documents/${doc.id}`}>
                <Card className="transition-shadow hover:shadow-md">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-4 p-4">
                      {/* Icon */}
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-neutral-200 bg-neutral-50">
                        <FileText className="h-5 w-5 text-neutral-400" strokeWidth={1.5} />
                      </div>

                      {/* Title + meta */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-semibold text-neutral-900 truncate">{doc.title}</p>
                          <Badge variant={STATUS_BADGE[doc.status]}>{statusLabel(doc.status)}</Badge>
                        </div>
                        <p className="mt-0.5 text-xs text-neutral-500 truncate">{doc.issuingAuthority}</p>
                        <div className="mt-1.5 flex flex-wrap items-center gap-3">
                          <span className="text-[10px] text-neutral-400">
                            Received {formatDateShort(doc.dateReceived)}
                          </span>
                          {doc.extractedDeadline && (
                            <>
                              <span className="text-[10px] text-neutral-300">·</span>
                              <span className={`text-[10px] font-medium ${
                                daysUntilSync(doc.extractedDeadline) <= 14 ? "text-red-500" : "text-neutral-500"
                              }`}>
                                Deadline: {formatDateShort(doc.extractedDeadline)}
                                {daysUntilSync(doc.extractedDeadline) <= 30 &&
                                  ` (${daysUntilSync(doc.extractedDeadline)}d)`}
                              </span>
                            </>
                          )}
                          <span className="text-[10px] text-neutral-300">·</span>
                          <span className="text-[10px] text-neutral-400">{categoryLabel(doc.category)}</span>
                        </div>
                      </div>

                      {/* Right */}
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="hidden sm:block text-right">
                          <p className="text-[10px] text-neutral-400">Confidence</p>
                          <p className="text-xs font-medium text-neutral-700">{doc.confidenceScore}%</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-neutral-300" />
                      </div>
                    </div>

                    {/* Pending actions strip */}
                    {doc.requiredActions.filter((a) => !a.completed).length > 0 && (
                      <>
                        <Separator />
                        <div className="flex items-center gap-2 bg-neutral-50 px-4 py-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                          <p className="text-[10px] text-neutral-600">
                            {doc.requiredActions.filter((a) => !a.completed).length} pending action
                            {doc.requiredActions.filter((a) => !a.completed).length !== 1 ? "s" : ""}
                          </p>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>

        <Separator className="my-6" />
        <p className="text-[11px]" style={{ color: "rgba(2,0,134,0.4)" }}>
          DOX provides structured information and document guidance only. Always verify extracted dates against your original documents.
        </p>
      </main>
    </>
  );
}
