import { ShieldAlert } from "lucide-react";

export function PageFooter() {
  return (
    <footer className="mt-auto border-t border-neutral-200 px-6 py-3">
      <div className="flex items-start gap-2">
        <ShieldAlert className="mt-0.5 h-3 w-3 shrink-0 text-neutral-400" strokeWidth={1.75} />
        <p className="text-[11px] text-neutral-400">
          migraDOCS is an information and organisation tool. It does not provide legal advice and does not replace a qualified immigration lawyer.
        </p>
      </div>
    </footer>
  );
}
