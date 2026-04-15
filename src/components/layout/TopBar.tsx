"use client";

import { Settings, Upload, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { UploadModal } from "@/components/documents/UploadModal";
import Link from "next/link";

interface TopBarProps {
  title: string;
  subtitle?: string;
  showUpload?: boolean;
}

export function TopBar({ title, subtitle, showUpload = true }: TopBarProps) {
  const [uploadOpen, setUploadOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-neutral-200 bg-white px-6">
        <div>
          <h1 className="text-sm font-semibold text-neutral-950">{title}</h1>
          {subtitle && <p className="text-xs text-neutral-500">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          {showUpload && (
            <Button size="sm" variant="default" onClick={() => setUploadOpen(true)}>
              <Upload className="h-3.5 w-3.5" />
              Upload
            </Button>
          )}
          <Link href="/settings">
            <button className="rounded p-2 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900">
              <Settings className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </Link>
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-white text-xs font-semibold">
            <User className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>
      </header>
      {showUpload && <UploadModal open={uploadOpen} onClose={() => setUploadOpen(false)} />}
    </>
  );
}
