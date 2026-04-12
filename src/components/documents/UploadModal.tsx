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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d1b2e]/40 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-lg border border-neutral-200 bg-white p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
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
                <span className="max-w-[220px] truncate text-xs text-neutral-700">{file?.name}</span>
              </div>
            </div>
          )}

          {stage === "complete" && (
            <div className="flex flex-col items-center gap-4 py-10">
              <CheckCircle className="h-10 w-10 text-success" strokeWidth={1.5} />
              <div className="text-center">
                <p className="text-sm font-medium text-neutral-800">Document read</p>
                <p className="mt-0.5 text-xs text-neutral-500">
                  We&apos;ve extracted key dates, actions, and next steps. View in Documents.
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

        <p className="mt-4 text-[10px] leading-relaxed text-neutral-400">
          Your original document is never stored. migraDOCS retains only the extracted summary, encrypted and private to you.
        </p>
      </div>
    </div>
  );
}
