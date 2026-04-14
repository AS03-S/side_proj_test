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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d1b2e]/50 backdrop-blur-sm p-4">
      <div
        className="relative w-full max-w-xl rounded-xl border border-neutral-200 bg-white"
        style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
      >
        {/* Only show header and close button when not uploading */}
        {stage !== "uploading" && (
          <>
            <button
              onClick={close}
              className="absolute right-4 top-4 z-10 rounded p-1.5 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="px-8 pt-8 pb-2">
              <h2 className="text-base font-semibold text-neutral-950">Upload a document</h2>
              <p className="mt-1 text-sm text-neutral-500">
                PDF or image — saved directly to your Google Drive. migraDOCS never stores the original file.
              </p>
            </div>
          </>
        )}

        <div className={cn("px-8", stage === "uploading" ? "py-12" : "pb-8 pt-5")}>
          {/* ── Select stage: large drop zone ── */}
          {stage === "select" && (
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
              className={cn(
                "flex cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed py-16 text-center transition-all",
                dragging
                  ? "border-navy bg-navy-light/50 scale-[1.01]"
                  : "border-neutral-200 hover:border-navy hover:bg-navy-light/20"
              )}
            >
              <div className={cn(
                "flex h-16 w-16 items-center justify-center rounded-full transition-colors",
                dragging ? "bg-navy/10" : "bg-neutral-100"
              )}>
                <Upload className="h-8 w-8 text-neutral-400" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-base font-semibold text-neutral-800">
                  {dragging ? "Drop it here" : "Drag and drop your file here"}
                </p>
                <p className="mt-1 text-sm text-neutral-500">or tap to choose</p>
                <p className="mt-3 text-xs text-neutral-400">PDF, JPG, PNG — up to 25 MB</p>
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

          {/* ── Uploading stage: single loading state, nothing else visible ── */}
          {stage === "uploading" && (
            <div className="flex flex-col items-center gap-6">
              <Loader2 className="h-14 w-14 animate-spin text-navy" strokeWidth={1.25} />
              <div className="text-center">
                <p className="text-xl font-semibold text-neutral-900">Saving to your Drive...</p>
                <p className="mt-2 text-sm text-neutral-500">
                  Your file is being uploaded directly to your Google Drive folder.
                </p>
              </div>
              {file && (
                <div className="flex items-center gap-2.5 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2.5">
                  <FileText className="h-4 w-4 shrink-0 text-neutral-400" strokeWidth={1.5} />
                  <span className="max-w-[280px] truncate text-sm text-neutral-700">{file.name}</span>
                </div>
              )}
            </div>
          )}

          {/* ── Error stage ── */}
          {stage === "error" && (
            <div className="flex flex-col items-center gap-5 py-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-danger/10">
                <AlertTriangle className="h-8 w-8 text-danger" strokeWidth={1.5} />
              </div>
              <div className="text-center">
                <p className="text-base font-semibold text-neutral-900">Upload failed</p>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-neutral-500">{errorMessage}</p>
              </div>
              <Button variant="secondary" onClick={reset}>Try again</Button>
            </div>
          )}

          {/* ── Complete stage ── */}
          {stage === "complete" && (
            <div className="flex flex-col items-center gap-5 py-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                <CheckCircle className="h-8 w-8 text-success" strokeWidth={1.5} />
              </div>
              <div className="text-center">
                <p className="text-base font-semibold text-neutral-900">Saved to your Drive</p>
                <p className="mt-2 text-sm text-neutral-500">
                  The file is in your migraDOCS folder and appears in your document list below.
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={reset}>Upload another</Button>
                <Button onClick={close}>Done</Button>
              </div>
            </div>
          )}
        </div>

        {stage !== "uploading" && (
          <p className="px-8 pb-5 text-[11px] leading-relaxed text-neutral-400">
            migraDOCS uploads directly to your Google Drive using your own account credentials.
            The file is yours and can be deleted from Drive at any time.
          </p>
        )}
      </div>
    </div>
  );
}
