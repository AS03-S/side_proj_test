"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings, LogOut, LayoutDashboard, Files } from "lucide-react";
import { signOut } from "next-auth/react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/documents", label: "My Documents", icon: Files },
  { href: "/settings", label: "Settings", icon: Settings },
];

function MigraDOCSLogo() {
  return (
    <img src="/logo.svg" alt="migraDOCS" height={34} width={Math.round(34 * 5.25)} style={{ display: "block" }} />
  );
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-56 flex-col border-r border-neutral-200 bg-white">
      {/* Logo */}
      <div className="flex h-14 items-center border-b border-neutral-200 px-5">
        <Link href="/dashboard" className="flex items-center">
          <MigraDOCSLogo />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-0.5 px-3 py-4">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2.5 rounded py-2 pr-3 pl-2 text-sm transition-colors ${
                active
                  ? "bg-navy-light text-navy font-semibold border-l-[3px] border-navy"
                  : "text-neutral-500 border-l-[3px] border-transparent hover:bg-neutral-50 hover:text-neutral-900"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-neutral-200 px-3 py-3">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex w-full items-center gap-2.5 rounded px-3 py-2 text-sm text-neutral-500 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
        >
          <LogOut className="h-4 w-4 shrink-0" strokeWidth={1.75} />
          Sign out
        </button>
        <p className="mt-3 px-3 text-[10px] leading-relaxed text-neutral-400">
          migraDOCS provides information and organisation only. Not legal advice.
        </p>
      </div>
    </aside>
  );
}
