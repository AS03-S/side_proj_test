"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { DEMO_DOCUMENTS } from "@/lib/data/documents";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { FileText, ChevronRight, Search, Filter, Upload } from "lucide-react";
import { categoryLabel, formatDateShort, statusLabel } from "@/lib/utils";
import { PageFooter } from "@/components/layout/PageFooter";
import type { DocumentStatus } from "@/types";

const STATUS_BADGE: Record<DocumentStatus, "urgent" | "high" | "success" | "muted" | "default"> = {
  action_required: "urgent",
  pending_review: "high",
  reviewed: "default",
  completed: "success",
  expired: "muted",
};

const CATEGORIES = ["All", "Residence Permit", "Request for Documentation", "Appointment Notice", "Appeal Notice", "Other"];

function daysUntil(dateString: string): number {
  const now = new Date("2026-04-12");
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
                    ? "border-navy bg-navy text-white"
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
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-navy-light">
                <FileText className="h-7 w-7 text-navy" strokeWidth={1.5} />
              </div>
              <p className="text-base font-semibold text-neutral-950">No documents yet.</p>
              <p className="mt-1 text-sm text-neutral-500">Upload your first document to get started.</p>
              <div className="mt-5">
                <button className="inline-flex items-center gap-2 rounded bg-navy px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-navy-mid">
                  <Upload className="h-4 w-4" />
                  Upload a document
                </button>
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center text-sm text-neutral-400">No documents match your search.</div>
          ) : (
            filtered.map((doc) => {
              const expiringSoon = doc.extractedDeadline && daysUntil(doc.extractedDeadline) <= 60 && daysUntil(doc.extractedDeadline) > 0;
              return (
                <Link key={doc.id} href={`/documents/${doc.id}`}>
                  <Card className="transition-shadow hover:shadow-md">
                    <CardContent className="p-0">
                      <div className="flex items-center gap-4 p-4">
                        {/* Icon */}
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-neutral-200 bg-neutral-50">
                          <FileText className="h-5 w-5 text-neutral-400" strokeWidth={1.5} />
                        </div>

                        {/* Title + meta */}
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="truncate text-sm font-semibold text-neutral-950">{doc.title}</p>
                            <Badge variant={STATUS_BADGE[doc.status]}>{statusLabel(doc.status)}</Badge>
                            {expiringSoon && (
                              <Badge variant="urgent">Expiring soon</Badge>
                            )}
                          </div>
                          <p className="mt-0.5 truncate text-xs text-neutral-500">{doc.issuingAuthority}</p>
                          <div className="mt-1.5 flex flex-wrap items-center gap-3">
                            <span className="text-[10px] text-neutral-400">
                              Received {formatDateShort(doc.dateReceived)}
                            </span>
                            {doc.extractedDeadline && (
                              <>
                                <span className="text-[10px] text-neutral-300">·</span>
                                <span className={`text-[10px] font-medium ${
                                  daysUntil(doc.extractedDeadline) <= 14 ? "text-danger" : expiringSoon ? "text-warning" : "text-neutral-500"
                                }`}>
                                  Deadline: {formatDateShort(doc.extractedDeadline)}
                                  {daysUntil(doc.extractedDeadline) <= 60 &&
                                    ` (${daysUntil(doc.extractedDeadline)}d)`}
                                </span>
                              </>
                            )}
                            <span className="text-[10px] text-neutral-300">·</span>
                            <span className="text-[10px] text-neutral-400">{categoryLabel(doc.category)}</span>
                          </div>
                        </div>

                        {/* Right */}
                        <div className="flex shrink-0 items-center gap-3">
                          <div className="hidden text-right sm:block">
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
                            <div className="h-1.5 w-1.5 rounded-full bg-warning" />
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
              );
            })
          )}
        </div>

      </main>
      <PageFooter />
    </>
  );
}
