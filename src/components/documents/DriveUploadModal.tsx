"use client";

import { useState, useRef } from "react";
import { Upload, X, CheckCircle, AlertTriangle, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DocumentRow } from "@/lib/db";

interface DriveUploadModalProps {
  open: boolean;
  onClose: () => void;
  onUploaded: (doc: DocumentRow) => void;
}

type Stage = "select" | "uploading" | "complete" | "error";

export function DriveUploadModal({ open, onClose, onUploaded }: DriveUploadModalProps) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [stage, setStage] = useState<Stage>("select");
  const [errorMessage, setErrorMessage] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const handleFile = async (f: File) => {
    setFile(f);
    setStage("uploading");
    setErrorMessage("");

    try {
      const form = new FormData();
      form.append("file", f);

      const res = await fetch("/api/drive/upload", { method: "POST", body: form });
      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error ?? "Upload failed. Please try again.");
        setStage("error");
        return;
      }

      onUploaded(data.document as DocumentRow);
      setStage("complete");
    } catch {
      setErrorMessage("Could not reach the server. Check your connection and try again.");
      setStage("error");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const reset = () => {
    setFile(null);
    setStage("select");
    setErrorMessage("");
  };

  const close = () => {
    onClose();
    reset();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d1b2e]/40 backdrop-blur-sm">
      <div
        className="relative w-full max-w-md rounded-lg border border-neutral-200 bg-white p-6"
        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
      >
        <button
          onClick={close}
          className="absolute right-4 top-4 rounded p-1 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
        >
          <X className="h-4 w-4" />
        </button>

        <h2 className="text-sm font-semibold text-neutral-950">Upload Document</h2>
        <p className="mt-1 text-xs text-neutral-500">
          PDF or image files. Saved directly to your Google Drive — migraDOCS never stores the original.
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
                  ? "border-navy bg-navy-light/30"
                  : "border-neutral-200 hover:border-navy hover:bg-navy-light/20"
              )}
            >
              <Upload className="h-8 w-8 text-neutral-300" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-medium text-neutral-700">Drop file here or click to select</p>
                <p className="mt-0.5 text-xs text-neutral-400">PDF, JPG, PNG — up to 25 MB</p>
              </div>
              <input
                ref={fileRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.webp"
                className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
              />
            </div>
          )}

          {stage === "uploading" && (
            <div className="flex flex-col items-center gap-4 py-10">
              <Loader2 className="h-10 w-10 animate-spin text-navy" strokeWidth={1.5} />
              <div className="text-center">
                <p className="text-sm font-medium text-neutral-800">Saving to your Google Drive…</p>
                <p className="mt-0.5 text-xs text-neutral-500">This is your file — it will appear in your Drive folder.</p>
              </div>
              <div className="flex items-center gap-2 rounded border border-neutral-200 bg-neutral-50 px-3 py-2">
                <FileText className="h-4 w-4 text-neutral-400" strokeWidth={1.5} />
                <span className="max-w-[240px] truncate text-xs text-neutral-700">{file?.name}</span>
              </div>
            </div>
          )}

          {stage === "error" && (
            <div className="flex flex-col items-center gap-4 py-8">
              <AlertTriangle className="h-10 w-10 text-warning" strokeWidth={1.5} />
              <div className="text-center">
                <p className="text-sm font-medium text-neutral-800">Upload failed</p>
                <p className="mt-1 max-w-xs text-xs leading-relaxed text-neutral-500">{errorMessage}</p>
              </div>
              <Button variant="secondary" size="sm" onClick={reset}>Try again</Button>
            </div>
          )}

          {stage === "complete" && (
            <div className="flex flex-col items-center gap-4 py-10">
              <CheckCircle className="h-10 w-10 text-success" strokeWidth={1.5} />
              <div className="text-center">
                <p className="text-sm font-medium text-neutral-800">Saved to Google Drive</p>
                <p className="mt-0.5 text-xs text-neutral-500">
                  The file is in your migraDOCS Drive folder and listed below.
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" onClick={reset}>Upload another</Button>
                <Button size="sm" onClick={close}>Done</Button>
              </div>
            </div>
          )}
        </div>

        <p className="mt-4 text-[10px] leading-relaxed text-neutral-400">
          migraDOCS uploads directly to your Google Drive using your own account credentials.
          The file is yours and can be deleted from Drive at any time.
        </p>
      </div>
    </div>
  );
}
