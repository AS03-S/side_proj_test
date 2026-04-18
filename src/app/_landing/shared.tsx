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
          <div className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", color: "var(--mute)", textTransform: "uppercase", marginBottom: 8 }}>
            {t.doc_plain}
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
        <div className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", color: "var(--mute)", textTransform: "uppercase", marginBottom: 8 }}>
          {t.doc_plain}
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

interface NavProps {
  lang: string;
  onCTA: () => void;
  pulse: boolean;
  variant?: "A" | "B";
}

export function Nav({ lang, onCTA, pulse, variant = "A" }: NavProps) {
  const t = CONTENT[lang as keyof typeof CONTENT] as LangContent;
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 40,
      background: "rgba(248,248,246,0.92)",
      backdropFilter: "saturate(1.1) blur(10px)",
      borderBottom: "1px solid var(--line)",
    }}>
      <div
        className={variant === "B" ? "container-wide" : "container-narrow"}
        style={{ display: "flex", height: 60, alignItems: "center", justifyContent: "space-between" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span className="wordmark" style={{ fontSize: 19, color: "var(--ink)" }}>migraDOCS</span>
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
    </nav>
  );
}
