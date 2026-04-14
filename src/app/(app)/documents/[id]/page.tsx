import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { supabase } from "@/lib/db";
import { drivePreviewUrl } from "@/lib/drive";
import { TopBar } from "@/components/layout/TopBar";
import { PageFooter } from "@/components/layout/PageFooter";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, ExternalLink, FileText, Image as ImageIcon, ShieldAlert } from "lucide-react";
import type { DocumentRow } from "@/lib/db";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function fileTypeLabel(mimeType: string) {
  const map: Record<string, string> = {
    "application/pdf": "PDF",
    "image/jpeg": "JPEG Image",
    "image/png": "PNG Image",
    "image/webp": "WebP Image",
  };
  return map[mimeType] ?? mimeType.split("/")[1]?.toUpperCase() ?? mimeType;
}

export default async function DocumentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  // Fetch document — enforce ownership
  const { data: doc, error } = await supabase
    .from("documents")
    .select("*")
    .eq("id", id)
    .eq("user_id", session.user.id)
    .single();

  if (error || !doc) notFound();

  const document = doc as DocumentRow;
  const previewUrl = drivePreviewUrl(document.drive_file_id);
  const driveViewUrl = `https://drive.google.com/file/d/${encodeURIComponent(document.drive_file_id)}/view`;

  return (
    <>
      <TopBar title="Document" />
      <main className="flex-1 p-6">
        {/* Back */}
        <Link href="/documents">
          <Button variant="ghost" size="sm" className="mb-4 -ml-1 text-neutral-500">
            <ChevronLeft className="h-4 w-4" />
            Back to documents
          </Button>
        </Link>

        {/* Disclaimer */}
        <div className="mb-5 flex items-start gap-3 rounded-r-lg border-l-[3px] border-navy-light bg-navy-light/40 px-4 py-3">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-navy" strokeWidth={1.75} />
          <p className="text-xs leading-relaxed text-neutral-700">
            <strong className="font-semibold text-neutral-950">Your file, your Drive.</strong>{" "}
            This document is stored in your Google Drive. migraDOCS displays a preview — it does not store the file or its contents.
          </p>
        </div>

        {/* Metadata header */}
        <div className="mb-5 flex items-start gap-4 rounded-lg border border-neutral-200 bg-white p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50">
            {document.file_type.startsWith("image/") ? (
              <ImageIcon className="h-6 w-6 text-neutral-400" strokeWidth={1.5} />
            ) : (
              <FileText className="h-6 w-6 text-neutral-400" strokeWidth={1.5} />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-base font-semibold text-neutral-950">{document.file_name}</h1>
            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-500">
              <span>Uploaded {formatDate(document.uploaded_at)}</span>
              <span>{fileTypeLabel(document.file_type)}</span>
              <span className="text-emerald-600">In Google Drive</span>
            </div>
          </div>
          <a
            href={driveViewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-1.5 rounded border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:border-neutral-300 hover:text-neutral-900"
          >
            <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} />
            Open in Drive
          </a>
        </div>

        {/* Google Drive preview iframe */}
        <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-2.5">
            <p className="text-xs font-medium text-neutral-500">Preview — served by Google Drive</p>
          </div>
          <iframe
            src={previewUrl}
            className="h-[70vh] w-full"
            allow="autoplay"
            title={document.file_name}
          />
        </div>
      </main>
      <PageFooter />
    </>
  );
}
