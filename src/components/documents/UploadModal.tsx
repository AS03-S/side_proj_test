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
          className="absolute right-4 top-4 rounded p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
        >
          <X className="h-4 w-4" />
        </button>

        <h2 className="text-sm font-semibold text-neutral-900">Upload Document</h2>
        <p className="mt-1 text-xs text-neutral-500">
          PDF or image files. Certa will extract key dates and required actions.
        </p>

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
                  ? "border-neutral-400 bg-neutral-50"
                  : "border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50"
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
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-900" />
              <div className="text-center">
                <p className="text-sm font-medium text-neutral-900">Processing document</p>
                <p className="mt-0.5 text-xs text-neutral-500">Extracting dates, categories, and required actions…</p>
              </div>
              <div className="flex items-center gap-2 rounded border border-neutral-200 bg-neutral-50 px-3 py-2">
                <FileText className="h-4 w-4 text-neutral-400" strokeWidth={1.5} />
                <span className="text-xs text-neutral-600 truncate max-w-[220px]">{file?.name}</span>
              </div>
            </div>
          )}

          {stage === "complete" && (
            <div className="flex flex-col items-center gap-4 py-10">
              <CheckCircle className="h-10 w-10 text-emerald-500" strokeWidth={1.5} />
              <div className="text-center">
                <p className="text-sm font-medium text-neutral-900">Document processed</p>
                <p className="mt-0.5 text-xs text-neutral-500">
                  Key dates and actions extracted. View in Documents.
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
          Documents are encrypted in transit and at rest. Certa does not share your documents with third parties.
        </p>
      </div>
    </div>
  );
}
