"use client";

import { Bell, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { UploadModal } from "@/components/documents/UploadModal";

interface TopBarProps {
  title: string;
  subtitle?: string;
}

export function TopBar({ title, subtitle }: TopBarProps) {
  const [uploadOpen, setUploadOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-neutral-200 bg-white px-6">
        <div>
          <h1 className="text-sm font-semibold text-neutral-900">{title}</h1>
          {subtitle && <p className="text-xs text-neutral-500">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          <button className="relative rounded p-2 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900">
            <Bell className="h-4 w-4" strokeWidth={1.75} />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
          </button>
          <Button size="sm" onClick={() => setUploadOpen(true)}>
            <Upload className="h-3.5 w-3.5" />
            Upload
          </Button>
        </div>
      </header>
      <UploadModal open={uploadOpen} onClose={() => setUploadOpen(false)} />
    </>
  );
}
