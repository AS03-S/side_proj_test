"use client";

import { useState, useRef } from "react";
import { Upload, X, FileText, CheckCircle, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AnalysisResult {
  title: string;
  issuingAuthority: string;
  category: string;
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
  tags: string[];
}

interface UploadModalProps {
  open: boolean;
  onClose: () => void;
  onAnalysisComplete?: (analysis: AnalysisResult) => void;
}

function ConfidencePip({ level }: { level: "high" | "medium" | "low" }) {
  const colors = { high: "bg-success", medium: "bg-warning", low: "bg-danger" };
  const labels = { high: "High confidence", medium: "Medium confidence", low: "Low confidence — verify carefully" };
  return (
    <span className="flex items-center gap-1.5 text-[10px] text-neutral-500">
      <span className={cn("h-1.5 w-1.5 rounded-full", colors[level])} />
      {labels[level]}
    </span>
  );
}

function AnalysisSummary({ analysis }: { analysis: AnalysisResult }) {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="mt-3 space-y-3 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
      {/* Title + confidence */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-neutral-950">{analysis.title}</p>
          {analysis.issuingAuthority && (
            <p className="mt-0.5 text-[10px] text-neutral-500">{analysis.issuingAuthority}</p>
          )}
        </div>
        <ConfidencePip level={analysis.confidence} />
      </div>

      {/* Summary */}
      <p className="text-xs leading-relaxed text-neutral-700">{analysis.whatThisIs}</p>

      {/* Next steps */}
      {analysis.nextSteps.length > 0 && (
        <div>
          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-neutral-400">What to do next</p>
          <ol className="space-y-1">
            {analysis.nextSteps.slice(0, 3).map((step, i) => (
              <li key={i} className="flex gap-2 text-xs text-neutral-700">
                <span className="shrink-0 font-medium text-neutral-400">{i + 1}.</span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Deadlines */}
      {analysis.deadlines.length > 0 && (
        <div className="rounded border border-amber-100 bg-amber-50 px-3 py-2">
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-amber-700">Deadlines</p>
          {analysis.deadlines.map((d, i) => (
            <p key={i} className="text-xs text-amber-800">
              <span className="font-medium">{d.date}</span> — {d.label}
            </p>
          ))}
        </div>
      )}

      {/* Show more toggle */}
      {(analysis.consequences || analysis.whatItIsNotTelling || analysis.referralCard) && (
        <>
          <button
            onClick={() => setShowMore(!showMore)}
            className="flex items-center gap-1 text-[11px] text-neutral-500 hover:text-neutral-800"
          >
            {showMore ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            {showMore ? "Show less" : "Show full analysis"}
          </button>

          {showMore && (
            <div className="space-y-3 border-t border-neutral-200 pt-3">
              {analysis.consequences && (
                <div>
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-neutral-400">If you do nothing</p>
                  <p className="text-xs leading-relaxed text-neutral-700">{analysis.consequences}</p>
                </div>
              )}
              {analysis.whatItIsNotTelling && (
                <div>
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-neutral-400">What this document doesn't tell you</p>
                  <p className="text-xs leading-relaxed text-neutral-600">{analysis.whatItIsNotTelling}</p>
                </div>
              )}
              {analysis.referralCard && (
                <div className="rounded border border-sky-100 bg-sky-50 px-3 py-2">
                  <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-wide text-sky-700">Professional advice recommended</p>
                  <p className="text-xs text-sky-800">
                    <span className="font-medium">{analysis.referralCard.who}</span> — {analysis.referralCard.what}
                  </p>
                  <p className="mt-0.5 text-[10px] text-sky-700">{analysis.referralCard.why}</p>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export function UploadModal({ open, onClose, onAnalysisComplete }: UploadModalProps) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [stage, setStage] = useState<"select" | "processing" | "complete" | "error">("select");
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const fileRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const handleFile = async (f: File) => {
    setFile(f);
    setStage("processing");
    setAnalysis(null);
    setErrorMessage("");

    try {
      const form = new FormData();
      form.append("file", f);

      const res = await fetch("/api/process-document", {
        method: "POST",
        body: form,
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error ?? "Document analysis failed. Please try again.");
        setStage("error");
        return;
      }

      const result: AnalysisResult = data.analysis;
      setAnalysis(result);
      setStage("complete");
      onAnalysisComplete?.(result);
    } catch {
      setErrorMessage("Could not reach the analysis service. Check your connection and try again.");
      setStage("error");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const handleReset = () => {
    setFile(null);
    setStage("select");
    setAnalysis(null);
    setErrorMessage("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d1b2e]/40 backdrop-blur-sm">
      <div
        className="relative w-full max-w-lg rounded-lg border border-neutral-200 bg-white p-6"
        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)", maxHeight: "90vh", overflowY: "auto" }}
      >
        <button
          onClick={() => { onClose(); handleReset(); }}
          className="absolute right-4 top-4 rounded p-1 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
        >
          <X className="h-4 w-4" />
        </button>

        <h2 className="text-sm font-semibold text-neutral-950">Upload Document</h2>
        <p className="mt-1 text-xs text-neutral-500">
          PDF or image files. migraDOCS will read your document and tell you what it means and what to do.
        </p>

        {/* Privacy notice */}
        <div className="mt-3 rounded-r border-l-2 border-navy-light bg-navy-light/40 pl-3 pr-3 py-2">
          <p className="text-[11px] leading-relaxed text-neutral-600">
            migraDOCS processes your document to extract key information. The original file is never stored — only the structured summary is saved, encrypted, and accessible only by you.
          </p>
        </div>

        <div className="mt-4">
          {stage === "select" && (
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
              className={cn(
                "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed py-10 text-center transition-colors",
                dragging
                  ? "border-navy bg-navy-light/30"
                  : "border-neutral-200 hover:border-navy hover:bg-navy-light/20"
              )}
            >
              <Upload className="h-8 w-8 text-neutral-300" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-medium text-neutral-700">Drop file here or click to select</p>
                <p className="mt-0.5 text-xs text-neutral-400">PDF, JPG, or PNG — up to 25 MB</p>
              </div>
              <input
                ref={fileRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
              />
            </div>
          )}

          {stage === "processing" && (
            <div className="flex flex-col items-center gap-4 py-10">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-neutral-200 border-t-navy" />
              <div className="text-center">
                <p className="text-sm font-medium text-neutral-800">Reading your document</p>
                <p className="mt-0.5 text-xs text-neutral-500">Working out what it says, what it means, and what you need to do…</p>
              </div>
              <div className="flex items-center gap-2 rounded border border-neutral-200 bg-neutral-50 px-3 py-2">
                <FileText className="h-4 w-4 text-neutral-400" strokeWidth={1.5} />
                <span className="max-w-[260px] truncate text-xs text-neutral-700">{file?.name}</span>
              </div>
            </div>
          )}

          {stage === "error" && (
            <div className="flex flex-col items-center gap-4 py-8">
              <AlertTriangle className="h-10 w-10 text-warning" strokeWidth={1.5} />
              <div className="text-center">
                <p className="text-sm font-medium text-neutral-800">Analysis unavailable</p>
                <p className="mt-1 max-w-xs text-xs leading-relaxed text-neutral-500">{errorMessage}</p>
              </div>
              <Button variant="secondary" size="sm" onClick={handleReset}>
                Try again
              </Button>
            </div>
          )}

          {stage === "complete" && analysis && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 shrink-0 text-success" strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-medium text-neutral-800">Document read</p>
                  <p className="text-xs text-neutral-500">Key dates, actions, and context extracted below.</p>
                </div>
              </div>

              <AnalysisSummary analysis={analysis} />

              <div className="flex gap-2 pt-1">
                <Button variant="secondary" size="sm" onClick={handleReset}>
                  Upload another
                </Button>
                <Button size="sm" onClick={() => { onClose(); handleReset(); }}>
                  View documents
                </Button>
              </div>
            </div>
          )}
        </div>

        <p className="mt-4 text-[10px] leading-relaxed text-neutral-400">
          Your original document is never stored. migraDOCS retains only the extracted summary, encrypted and private to you.
        </p>
      </div>
    </div>
  );
}
