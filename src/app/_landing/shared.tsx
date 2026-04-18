"use client";

import { useEffect, useRef, useState } from "react";
import type { LangContent } from "./content";
import { CONTENT } from "./content";

// ── Reveal hook ───────────────────────────────────────────────────────────────

export function useReveal(threshold = 0.15): [React.RefCallback<HTMLElement>, boolean] {
  const elRef = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  const refCb: React.RefCallback<HTMLElement> = (el) => {
    elRef.current = el;
  };

  useEffect(() => {
    const el = elRef.current;
    if (!el || shown) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setShown(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [shown, threshold]);

  return [refCb, shown];
}

// ── Scroll helper ─────────────────────────────────────────────────────────────

export function scrollToEl(el: HTMLElement | null) {
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 40;
  window.scrollTo({ top, behavior: "smooth" });
}

// ── Icons ─────────────────────────────────────────────────────────────────────

export function IconLock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="4" y="10.5" width="16" height="10" rx="1.5" />
      <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
    </svg>
  );
}

export function IconArrow(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconCheck(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 12.5l5 5L20 6.5" />
    </svg>
  );
}

// ── Logo ──────────────────────────────────────────────────────────────────────

export function Logo({ size = 20 }: { size?: number }) {
  const height = size;
  const width = Math.round(size * 5.25); // ~aspect ratio of the SVG viewBox
  return (
    <img
      src="/logo.svg"
      alt="migraDOCS"
      height={height}
      width={width}
      style={{ display: "block" }}
    />
  );
}

// ── DocCard ───────────────────────────────────────────────────────────────────

interface DocCardProps {
  lang: string;
  variant?: "A" | "B";
}

export function DocCard({ lang, variant = "A" }: DocCardProps) {
  const t = CONTENT[lang as keyof typeof CONTENT] as LangContent;
  const docs = t.docs;
  const [i, setI] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setI((x) => (x + 1) % docs.length);
        setVisible(true);
      }, 320);
    }, 3800);
    return () => clearInterval(id);
  }, [docs.length]);

  const doc = docs[i];
  const opacity = visible ? 1 : 0;

  if (variant === "B") {
    return (
      <div className="card" style={{ padding: 0, overflow: "hidden", fontSize: 13 }}>
        <div style={{ padding: "18px 22px 14px", borderBottom: "1px solid var(--line)", background: "var(--bg-2)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
            <div style={{ transition: "opacity 0.32s", opacity }}>
              <div className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--mute)", textTransform: "uppercase" }}>
                {doc.auth}
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", marginTop: 4 }}>
                {doc.type}
              </div>
            </div>
            <div className="mono" style={{ fontSize: 10, color: "var(--mute-2)", letterSpacing: "0.04em", transition: "opacity 0.32s", opacity }}>
              {doc.date}
            </div>
          </div>
          <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 6 }}>
            {[100, 86, 94, 72, 90, 60].map((w, k) => (
              <div key={k} className="redact" style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>
        <div style={{ padding: "16px 22px 20px", transition: "opacity 0.32s", opacity }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
            <div style={{ width: 3, height: 12, borderRadius: 2, background: "var(--teal)", flexShrink: 0 }} />
            <div className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", color: "var(--teal)", textTransform: "uppercase" }}>
              {t.doc_plain}
            </div>
          </div>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: "var(--ink)", fontWeight: 500 }}>
            {doc.translation}
          </p>
          <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, borderTop: "1px solid var(--line)", paddingTop: 12 }}>
            <div>
              <div className="mono" style={{ fontSize: 9.5, letterSpacing: "0.14em", color: "var(--mute-2)", textTransform: "uppercase" }}>
                {t.doc_deadline}
              </div>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)", marginTop: 3 }}>{doc.deadline}</div>
            </div>
            <div>
              <div className="mono" style={{ fontSize: 9.5, letterSpacing: "0.14em", color: "var(--mute-2)", textTransform: "uppercase" }}>
                {t.doc_action}
              </div>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)", marginTop: 3 }}>{doc.action}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Variant A — centred simple card
  return (
    <div className="card" style={{ padding: 24, textAlign: "start", transition: "opacity 0.32s", opacity }}>
      <span className="mono" style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.14em", color: "var(--mute-2)", textTransform: "uppercase" }}>
        {doc.type}
      </span>
      <div style={{ marginTop: 14, marginBottom: 18, display: "flex", flexDirection: "column", gap: 8 }}>
        {[100, 82, 94, 68, 88].map((w, k) => (
          <div key={k} className="redact" style={{ width: `${w}%` }} />
        ))}
      </div>
      <div style={{ borderTop: "1px solid var(--line)", paddingTop: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
          <div style={{ width: 3, height: 12, borderRadius: 2, background: "var(--teal)", flexShrink: 0 }} />
          <div className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", color: "var(--teal)", textTransform: "uppercase" }}>
            {t.doc_plain}
          </div>
        </div>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: "var(--ink)" }}>
          {doc.translation}
        </p>
      </div>
    </div>
  );
}

// ── WaitlistForm ──────────────────────────────────────────────────────────────

interface WaitlistFormProps {
  lang: string;
  layout?: "row" | "col";
}

export function WaitlistForm({ lang, layout = "row" }: WaitlistFormProps) {
  const t = CONTENT[lang as keyof typeof CONTENT] as LangContent;
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [ok, setOk] = useState(false);

  const valid = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid(email)) { setErr(t.waitlist_err); return; }
    setBusy(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok || res.status === 409) {
        setOk(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setErr((data as { error?: string }).error ?? t.waitlist_err);
      }
    } catch {
      setErr(t.waitlist_err);
    } finally {
      setBusy(false);
    }
  }

  if (ok) {
    return (
      <div className="card" style={{ padding: "24px 28px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: 999, background: "var(--navy)", color: "var(--bg)", marginBottom: 12 }}>
          <IconCheck />
        </div>
        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)" }}>{t.waitlist_ok_t}</div>
        <div style={{ fontSize: 13, color: "var(--mute)", marginTop: 4 }}>{t.waitlist_ok_d}</div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      <div style={{ display: "flex", flexDirection: layout === "col" ? "column" : "row", gap: 10, flexWrap: "wrap" }}>
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setErr(""); }}
          placeholder={t.waitlist_placeholder}
          className={"input" + (err ? " error" : "")}
          style={{ flex: 1, minWidth: 0 }}
        />
        <button type="submit" className="btn btn-primary" disabled={busy} style={{ opacity: busy ? 0.7 : 1 }}>
          {busy ? t.waitlist_joining : t.waitlist_cta}
          {!busy && <IconArrow />}
        </button>
      </div>
      {err && <div style={{ color: "var(--danger)", fontSize: 12, marginTop: 8, textAlign: "start" }}>{err}</div>}
    </form>
  );
}

// ── Nav ───────────────────────────────────────────────────────────────────────

const ALL_LANGS = ["EN", "DE", "FR", "IT", "SV", "PL", "UK", "RU", "ES", "TR", "RO", "HU", "SO", "FA", "TI", "AM", "SW", "HA", "AR", "ZH", "ZH_TW"] as const;
const LANG_LABELS: Record<string, string> = {
  EN: "EN", DE: "DE", FR: "FR", IT: "IT", SV: "SV", PL: "PL", UK: "УК", RU: "РУ",
  ES: "ES", TR: "TR", RO: "RO", HU: "HU", SO: "SO", FA: "فا", TI: "ትግ", AM: "አማ", SW: "SW", HA: "HA", AR: "ع", ZH: "普通话", ZH_TW: "廣東話",
};

interface NavProps {
  lang: string;
  onCTA: () => void;
  onLang: (l: string) => void;
  pulse: boolean;
  variant?: "A" | "B";
}

export function Nav({ lang, onCTA, onLang, pulse, variant = "A" }: NavProps) {
  const t = CONTENT[lang as keyof typeof CONTENT] as LangContent;
  const containerClass = variant === "B" ? "container-wide" : "container-narrow";
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 40,
      background: "rgba(255,255,255,0.92)",
      backdropFilter: "saturate(1.1) blur(10px)",
      borderBottom: "1px solid var(--line)",
    }}>
      {/* Top row: logo + CTA */}
      <div className={containerClass} style={{ display: "flex", height: 56, alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Logo size={34} />
          {variant === "B" && (
            <span className="mono" style={{ fontSize: 10, color: "var(--mute-2)", letterSpacing: "0.14em", textTransform: "uppercase", borderLeft: "1px solid var(--line-strong)", paddingLeft: 12 }}>
              v0.1 · preview
            </span>
          )}
        </div>
        <button onClick={onCTA} className={"btn btn-primary" + (pulse ? " nav-pulse" : "")} style={{ fontSize: 13 }}>
          {t.nav_cta}
        </button>
      </div>
      {/* Language strip */}
      <div style={{ borderTop: "1px solid var(--line)", overflowX: "auto", scrollbarWidth: "none" }}>
        <div className={containerClass} style={{ display: "flex", gap: 2, padding: "4px 0", flexWrap: "nowrap" }}>
          {ALL_LANGS.map((l) => (
            <button
              key={l}
              onClick={() => onLang(l)}
              className="mono"
              style={{
                fontSize: 10.5,
                fontWeight: lang === l ? 700 : 400,
                color: lang === l ? "var(--navy)" : "var(--mute)",
                background: lang === l ? "var(--navy-light)" : "transparent",
                border: "none",
                borderRadius: 4,
                padding: "3px 8px",
                cursor: "pointer",
                letterSpacing: "0.04em",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {LANG_LABELS[l]}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
