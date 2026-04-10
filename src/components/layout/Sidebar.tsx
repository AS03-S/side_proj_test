"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  Settings,
  LogOut,
} from "lucide-react";
import { logout } from "@/lib/auth";
import { useRouter } from "next/navigation";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Home", icon: LayoutDashboard },
  { href: "/documents", label: "My Documents", icon: FileText },
  { href: "/guidance", label: "What to do next", icon: BookOpen },
  { href: "/settings", label: "Settings", icon: Settings },
];

function DoxLogo() {
  return (
    <svg viewBox="0 0 120 48" xmlns="http://www.w3.org/2000/svg" className="h-7 w-auto">
      <defs>
        <linearGradient id="doxGrad-sidebar" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#020086" />
          <stop offset="100%" stopColor="#57e4d7" />
        </linearGradient>
      </defs>
      <text
        x="0" y="40"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="48"
        fontWeight="700"
        fill="url(#doxGrad-sidebar)"
        letterSpacing="-1"
      >DOX</text>
    </svg>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-56 flex-col border-r border-neutral-200 bg-white">
      {/* Logo */}
      <div className="flex h-14 items-center border-b border-neutral-200 px-5">
        <Link href="/dashboard">
          <DoxLogo />
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
              className="flex items-center gap-2.5 py-2 pr-3 pl-2 text-sm transition-colors rounded"
              style={
                active
                  ? {
                      borderLeft: "3px solid #57e4d7",
                      backgroundColor: "rgba(2,0,134,0.05)",
                      color: "#020086",
                      fontWeight: 600,
                      paddingLeft: "9px",
                    }
                  : {
                      color: "rgba(2,0,134,0.6)",
                      borderLeft: "3px solid transparent",
                    }
              }
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
          onClick={handleLogout}
          className="flex w-full items-center gap-2.5 rounded px-3 py-2 text-sm transition-colors"
          style={{ color: "rgba(2,0,134,0.5)" }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(2,0,134,0.05)"; e.currentTarget.style.color = "#020086"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ""; e.currentTarget.style.color = "rgba(2,0,134,0.5)"; }}
        >
          <LogOut className="h-4 w-4 shrink-0" strokeWidth={1.75} />
          Sign out
        </button>
        <p className="mt-3 px-3 text-[10px] leading-relaxed" style={{ color: "rgba(2,0,134,0.4)" }}>
          DOX provides informational guidance only, not legal advice.
        </p>
      </div>
    </aside>
  );
}
