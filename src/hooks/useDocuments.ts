"use client";

import { useState, useEffect } from "react";
import type { Document } from "@/types";
import type { DocumentRow } from "@/lib/db";
import { DEMO_DOCUMENTS } from "@/lib/data/documents";

function rowToDocument(row: DocumentRow): Document {
  const isImage = row.file_type.startsWith("image/");
  return {
    id: row.id,
    title: row.file_name,
    issuingAuthority: "",
    dateReceived: row.uploaded_at.split("T")[0],
    category: "other",
    status: "pending_review",
    confidence: "low",
    confidenceScore: 0,
    summary: "Run analysis in the Analyse Document tab to extract details.",
    requiredActions: [],
    preparationChecklist: [],
    fileType: isImage ? "image" : "pdf",
    tags: [],
  };
}

export function useDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/documents")
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => {
        if (!cancelled) {
          // Demo mode: use rich static fixtures so the dashboard Documents tab
          // shows meaningful demo content even without real Drive uploads.
          if (data.isDemo) {
            setDocuments(DEMO_DOCUMENTS);
          } else {
            setDocuments((data.documents ?? [] as DocumentRow[]).map(rowToDocument));
          }
        }
      })
      .catch(() => { if (!cancelled) setError("Could not load documents."); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return { documents, loading, error };
}
