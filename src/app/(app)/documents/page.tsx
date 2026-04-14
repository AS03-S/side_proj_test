"use client";

import { useCallback, useEffect, useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { PageFooter } from "@/components/layout/PageFooter";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  FileText,
  Search,
  Upload,
  Trash2,
  AlertTriangle,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DriveUploadModal } from "@/components/documents/DriveUploadModal";
import type { DocumentRow } from "@/lib/db";

function fileTypeIcon(mimeType: string) {
  if (mimeType.startsWith("image/")) {
    return <ImageIcon className="h-5 w-5 text-neutral-400" strokeWidth={1.5} />;
  }
  return <FileText className="h-5 w-5 text-neutral-400" strokeWidth={1.5} />;
}

function formatUploadedAt(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function DeleteButton({
  doc,
  onDeleted,
}: {
  doc: DocumentRow;
  onDeleted: (id: string) => void;
}) {
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setDeleting(true);
    setError("");
    try {
      const res = await fetch("/api/drive/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documentId: doc.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Deletion failed. Please try again.");
        setDeleting(false);
        return;
      }
      onDeleted(doc.id);
    } catch {
      setError("Could not reach the server. Please try again.");
      setDeleting(false);
    }
  };

  if (!confirming) {
    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setConfirming(true);
        }}
        className="rounded p-1.5 text-neutral-400 transition-colors hover:bg-danger/10 hover:text-danger"
        title="Delete document"
      >
        <Trash2 className="h-4 w-4" strokeWidth={1.75} />
      </button>
    );
  }

  return (
    <div
      className="flex flex-col gap-1"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <p className="text-[11px] font-medium text-danger">
        Delete from Google Drive permanently?
      </p>
      {error && (
        <p className="flex items-center gap-1 text-[11px] text-danger">
          <AlertTriangle className="h-3 w-3" />
          {error}
        </p>
      )}
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="destructive"
          disabled={deleting}
          onClick={handleDelete}
        >
          {deleting ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            "Yes, delete"
          )}
        </Button>
        <Button
          size="sm"
          variant="secondary"
          disabled={deleting}
          onClick={() => {
            setConfirming(false);
            setError("");
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<DocumentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [search, setSearch] = useState("");
  const [uploadOpen, setUploadOpen] = useState(false);

  const fetchDocuments = useCallback(async () => {
    setLoading(true);
    setFetchError("");
    try {
      const res = await fetch("/api/documents");
      const data = await res.json();
      if (!res.ok) {
        setFetchError(data.error ?? "Failed to load documents.");
      } else {
        setDocuments(data.documents ?? []);
      }
    } catch {
      setFetchError("Could not reach the server. Please refresh.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const handleDocumentAdded = (doc: DocumentRow) => {
    setDocuments((prev) => [doc, ...prev]);
  };

  const handleDocumentDeleted = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  const filtered = documents.filter((doc) =>
    doc.file_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <TopBar
        title="Documents"
        subtitle={
          loading
            ? "Loading…"
            : `${documents.length} document${documents.length !== 1 ? "s" : ""} in your Google Drive`
        }
      />
      <main className="flex-1 p-6">
        {/* Actions bar */}
        <div className="mb-5 flex items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" />
            <Input
              placeholder="Find a document…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button
            onClick={() => setUploadOpen(true)}
            className="ml-auto flex items-center gap-2"
          >
            <Upload className="h-4 w-4" strokeWidth={1.75} />
            Upload
          </Button>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-neutral-300" />
          </div>
        )}

        {/* Error state */}
        {!loading && fetchError && (
          <div className="flex flex-col items-center gap-3 py-20 text-center">
            <AlertTriangle className="h-8 w-8 text-warning" strokeWidth={1.5} />
            <p className="text-sm text-neutral-600">{fetchError}</p>
            <Button variant="secondary" size="sm" onClick={fetchDocuments}>
              Retry
            </Button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !fetchError && documents.length === 0 && (
          <div className="py-20 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-navy-light">
              <FileText className="h-7 w-7 text-navy" strokeWidth={1.5} />
            </div>
            <p className="text-base font-semibold text-neutral-950">
              No documents yet.
            </p>
            <p className="mt-1 text-sm text-neutral-500">
              Upload a document — it goes straight into your Google Drive.
            </p>
            <div className="mt-5">
              <Button
                onClick={() => setUploadOpen(true)}
                className="inline-flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                Upload a document
              </Button>
            </div>
          </div>
        )}

        {/* No search results */}
        {!loading && !fetchError && documents.length > 0 && filtered.length === 0 && (
          <div className="py-16 text-center text-sm text-neutral-400">
            No documents match &ldquo;{search}&rdquo;.
          </div>
        )}

        {/* Document list */}
        {!loading && !fetchError && filtered.length > 0 && (
          <div className="space-y-2">
            {filtered.map((doc) => (
              <Card key={doc.id} className="group transition-shadow hover:shadow-md">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 p-4">
                    {/* Type icon */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-neutral-200 bg-neutral-50">
                      {fileTypeIcon(doc.file_type)}
                    </div>

                    {/* Name + metadata */}
                    <Link
                      href={`/documents/${doc.id}`}
                      className="min-w-0 flex-1"
                    >
                      <p className="truncate text-sm font-semibold text-neutral-950 group-hover:text-navy transition-colors">
                        {doc.file_name}
                      </p>
                      <div className="mt-1 flex items-center gap-2 text-[11px] text-neutral-400">
                        <span>{formatUploadedAt(doc.uploaded_at)}</span>
                        <span className="text-neutral-200">·</span>
                        <span className="uppercase">
                          {doc.file_type.split("/")[1] ?? doc.file_type}
                        </span>
                        <span className="text-neutral-200">·</span>
                        <span className="text-emerald-600">In Google Drive</span>
                      </div>
                    </Link>

                    {/* Delete */}
                    <div className="shrink-0">
                      <DeleteButton doc={doc} onDeleted={handleDocumentDeleted} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <PageFooter />

      <DriveUploadModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onUploaded={handleDocumentAdded}
      />
    </>
  );
}
