"use client";

import { useState, useRef } from "react";
import { Upload, X, FileText, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface UploadModalProps {
  open: boolean;
  onClose: () => void;
}

export function UploadModal({ open, onClose }: UploadModalProps) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [stage, setStage] = useState<"select" | "processing" | "complete">("select");
  const fileRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const handleFile = (f: File) => {
    setFile(f);
    setStage("processing");
    setTimeout(() => setStage("complete"), 2200);
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
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-lg border border-neutral-200 bg-white p-6 shadow-xl">
        <button
          onClick={() => { onClose(); handleReset(); }}
          className="absolute right-4 top-4 rounded p-1 transition-colors"
          style={{ color: "rgba(2,0,134,0.4)" }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(2,0,134,0.05)"; e.currentTarget.style.color = "#020086"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ""; e.currentTarget.style.color = "rgba(2,0,134,0.4)"; }}
        >
          <X className="h-4 w-4" />
        </button>

        <h2 className="text-sm font-semibold" style={{ color: "#020086", fontFamily: "Georgia, serif" }}>Upload Document</h2>
        <p className="mt-1 text-xs" style={{ color: "rgba(2,0,134,0.5)" }}>
          PDF or image files. DOX will read your document and tell you what it means and what to do.
        </p>

        {/* GDPR notice */}
        <div className="mt-3 border-l-2 border-[#57e4d7] bg-[rgba(87,228,215,0.08)] pl-3 pr-3 py-2 rounded-r">
          <p className="text-[11px] leading-relaxed" style={{ color: "#020086" }}>
            DOX processes your document to extract key information. The original file is never stored — only the structured summary is saved, encrypted, and accessible only by you.
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
                  ? "border-[#57e4d7] bg-[rgba(87,228,215,0.05)]"
                  : "border-neutral-200 hover:border-[#57e4d7] hover:bg-[rgba(87,228,215,0.04)]"
              )}
            >
              <Upload className="h-8 w-8" style={{ color: "rgba(2,0,134,0.25)" }} strokeWidth={1.5} />
              <div>
                <p className="text-sm font-medium" style={{ color: "#020086" }}>Drop file here or click to select</p>
                <p className="mt-0.5 text-xs" style={{ color: "rgba(2,0,134,0.4)" }}>PDF, JPG, or PNG — up to 25 MB</p>
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
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-neutral-200 border-t-[#020086]" />
              <div className="text-center">
                <p className="text-sm font-medium" style={{ color: "#020086" }}>Reading your document</p>
                <p className="mt-0.5 text-xs" style={{ color: "rgba(2,0,134,0.5)" }}>Working out what it says, what it means, and what you need to do…</p>
              </div>
              <div className="flex items-center gap-2 rounded border border-neutral-200 bg-neutral-50 px-3 py-2">
                <FileText className="h-4 w-4" style={{ color: "rgba(2,0,134,0.4)" }} strokeWidth={1.5} />
                <span className="text-xs truncate max-w-[220px]" style={{ color: "#020086" }}>{file?.name}</span>
              </div>
            </div>
          )}

          {stage === "complete" && (
            <div className="flex flex-col items-center gap-4 py-10">
              <CheckCircle className="h-10 w-10" style={{ color: "#57e4d7" }} strokeWidth={1.5} />
              <div className="text-center">
                <p className="text-sm font-medium" style={{ color: "#020086" }}>Document read</p>
                <p className="mt-0.5 text-xs" style={{ color: "rgba(2,0,134,0.5)" }}>
                  We&apos;ve extracted key dates, actions, and next steps. View in My Documents.
                </p>
              </div>
              <div className="flex gap-2">
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

        <p className="mt-4 text-[10px] leading-relaxed" style={{ color: "rgba(2,0,134,0.4)" }}>
          Your original document is never stored. DOX retains only the extracted summary, encrypted and private to you.
        </p>
      </div>
    </div>
  );
}
