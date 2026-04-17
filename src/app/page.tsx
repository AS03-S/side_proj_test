"use client";

import { useEffect, useRef, useState } from "react";
import { Lock } from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────

const DOC_CARDS = [
  {
    type: "Permit Notice",
    translation:
      "Your work permit has been approved. You must collect it in person within 30 days.",
  },
  {
    type: "Appointment Letter",
    translation:
      "You have been scheduled for a biometric appointment. Attendance is mandatory.",
  },
  {
    type: "Appeal Decision",
    translation:
      "Your appeal is under review. A written decision will be issued within 60 days.",
  },
];

const STEPS = [
  {
    n: "1",
    title: "Upload your document",
    desc: "Any official immigration letter or notice — permit, appointment, appeal decision.",
  },
  {
    n: "2",
    title: "We explain it",
    desc: "Plain language, no jargon, no guesswork.",
  },
  {
    n: "3",
    title: "You know what to do",
    desc: "Clear next steps and deadlines, in the right order.",
  },
];

const PERSONAS = [
  {
    title: "Asylum seekers",
    desc: "Understand every letter from the migration authority without needing a translator.",
  },
  {
    title: "International students",
    desc: "Never miss a permit renewal, appointment, or deadline in an unfamiliar system.",
  },
  {
    title: "Workers & families",
    desc: "Keep your whole household's immigration documents organised in one place.",
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function WaitlistPage() {
  const [cardIndex, setCardIndex] = useState(0);
  const [cardVisible, setCardVisible] = useState(true);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [navPulse, setNavPulse] = useState(true);
  const [stepsVisible, setStepsVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const waitlistRef = useRef<HTMLElement | null>(null);
  const stepsRef = useRef<HTMLElement | null>(null);

  // Cycle hero document card
  useEffect(() => {
    const id = setInterval(() => {
      setCardVisible(false);
      setTimeout(() => {
        setCardIndex((i) => (i + 1) % DOC_CARDS.length);
        setCardVisible(true);
      }, 500);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  // Stop nav pulse when waitlist section enters viewport
  useEffect(() => {
    const el = waitlistRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setNavPulse(false); },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Fade-up steps when they scroll into view
  useEffect(() => {
    const el = stepsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStepsVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  function scrollToWaitlist() {
    waitlistRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    setMobileOpen(false);
  }

  function validateEmail(v: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEmailError("");
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok || res.status === 409) {
        setSubmitted(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setEmailError((data as { error?: string }).error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setEmailError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const card = DOC_CARDS[cardIndex];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8f8f6", color: "#0d1b2e" }}>

      {/* ── Nav ───────────────────────────────────────────────────────────── */}
      <nav
        className="sticky top-0 z-50"
        style={{ backgroundColor: "#f8f8f6", borderBottom: "1px solid #e4e4e7" }}
      >
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <span
            className="logo-wordmark select-none"
            style={{ fontSize: "1.375rem", color: "#0d1b2e" }}
          >
            migraDOCS
          </span>

          {/* Desktop CTA */}
          <button
            onClick={scrollToWaitlist}
            className={`hidden sm:block text-sm font-semibold px-5 py-2 rounded-md transition-opacity${navPulse ? " nav-pulse" : ""}`}
            style={{ backgroundColor: "#0d1b2e", color: "#f8f8f6" }}
          >
            Join the waitlist
          </button>

          {/* Mobile hamburger */}
          <button
            className="sm:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span style={{ display: "block", width: 20, height: 2, backgroundColor: "#0d1b2e", borderRadius: 1 }} />
            <span style={{ display: "block", width: 20, height: 2, backgroundColor: "#0d1b2e", borderRadius: 1 }} />
            <span style={{ display: "block", width: 20, height: 2, backgroundColor: "#0d1b2e", borderRadius: 1 }} />
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div
            className="sm:hidden px-6 pb-4"
            style={{ backgroundColor: "#f8f8f6", borderBottom: "1px solid #e4e4e7" }}
          >
            <button
              onClick={scrollToWaitlist}
              className="w-full text-sm font-semibold px-4 py-3 rounded-md"
              style={{ backgroundColor: "#0d1b2e", color: "#f8f8f6" }}
            >
              Join the waitlist
            </button>
          </div>
        )}
      </nav>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-6 pt-24 pb-20 text-center">
        <h1
          className="font-bold tracking-tight leading-none mb-6"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", color: "#0d1b2e" }}
        >
          The immigration system,
          <br />
          translated.
        </h1>
        <p className="text-lg max-w-md mx-auto mb-10" style={{ color: "#71717a", lineHeight: 1.6 }}>
          Upload your documents. Understand what they mean. Know what to do next.
        </p>
        <button
          onClick={scrollToWaitlist}
          className="text-sm font-semibold px-7 py-3 rounded-md"
          style={{ backgroundColor: "#0d1b2e", color: "#f8f8f6" }}
        >
          Join the waitlist
        </button>

        {/* Animated document card */}
        <div className="mt-16 mx-auto" style={{ maxWidth: 360 }}>
          <div
            className="rounded-xl p-6 text-left"
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e4e4e7",
              opacity: cardVisible ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          >
            {/* Document type badge */}
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "#a1a1aa" }}
            >
              {card.type}
            </span>

            {/* Abstract redacted text lines */}
            <div className="mt-4 mb-5 space-y-2">
              {[100, 82, 94, 68, 88].map((w, i) => (
                <div
                  key={i}
                  style={{
                    height: 7,
                    width: `${w}%`,
                    backgroundColor: "#e4e4e7",
                    borderRadius: 4,
                  }}
                />
              ))}
            </div>

            {/* Plain-language translation */}
            <div style={{ borderTop: "1px solid #e4e4e7" }} className="pt-4">
              <p className="text-xs font-semibold mb-2" style={{ color: "#a1a1aa" }}>
                Plain language
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#0d1b2e" }}>
                {card.translation}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <section
        ref={(el) => { stepsRef.current = el; }}
        className="mx-auto max-w-4xl px-6 py-20"
      >
        <h2
          className="font-bold text-center mb-14"
          style={{ fontSize: "1.75rem", color: "#0d1b2e" }}
        >
          How it works
        </h2>
        <div className="grid gap-5 sm:grid-cols-3">
          {STEPS.map(({ n, title, desc }, i) => (
            <div
              key={n}
              className="rounded-xl p-8"
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e4e4e7",
                opacity: stepsVisible ? 1 : 0,
                transform: stepsVisible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.6s ease ${i * 120}ms, transform 0.6s ease ${i * 120}ms`,
              }}
            >
              <div
                className="font-bold leading-none mb-5"
                style={{ fontSize: "3.5rem", color: "#e4e4e7" }}
              >
                {n}
              </div>
              <h3 className="text-base font-semibold mb-2" style={{ color: "#0d1b2e" }}>
                {title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#71717a" }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Who it's for ──────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2
          className="font-bold text-center mb-14"
          style={{ fontSize: "1.75rem", color: "#0d1b2e" }}
        >
          Who it&apos;s for
        </h2>
        <div className="grid gap-5 sm:grid-cols-3">
          {PERSONAS.map(({ title, desc }) => (
            <div
              key={title}
              className="rounded-xl p-8"
              style={{ backgroundColor: "#ffffff", border: "1px solid #e4e4e7" }}
            >
              <h3 className="text-base font-semibold mb-2" style={{ color: "#0d1b2e" }}>
                {title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#71717a" }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Privacy strip ─────────────────────────────────────────────────── */}
      <div
        className="py-10"
        style={{ borderTop: "1px solid #e4e4e7", borderBottom: "1px solid #e4e4e7" }}
      >
        <div className="flex items-center justify-center gap-2.5">
          <Lock className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "#a1a1aa" }} />
          <span className="text-sm" style={{ color: "#a1a1aa" }}>
            Your documents are never stored. Processed and discarded.
          </span>
        </div>
      </div>

      {/* ── Waitlist ──────────────────────────────────────────────────────── */}
      <section
        ref={(el) => { waitlistRef.current = el; }}
        className="mx-auto max-w-xl px-6 py-28 text-center"
      >
        <h2
          className="font-bold mb-4"
          style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "#0d1b2e" }}
        >
          Be the first to know.
        </h2>
        <p className="text-base mb-12" style={{ color: "#71717a" }}>
          We&apos;re launching in Sweden first. Leave your email and we&apos;ll reach out when
          you&apos;re up.
        </p>

        {submitted ? (
          <div
            className="rounded-xl px-8 py-8"
            style={{ backgroundColor: "#ffffff", border: "1px solid #e4e4e7" }}
          >
            <p className="text-base font-semibold" style={{ color: "#0d1b2e" }}>
              You&apos;re on the list.
            </p>
            <p className="text-sm mt-1.5" style={{ color: "#71717a" }}>
              We&apos;ll be in touch.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
                placeholder="your@email.com"
                className="flex-1 text-sm px-4 py-3 rounded-md outline-none"
                style={{
                  backgroundColor: "#ffffff",
                  border: emailError ? "1px solid #dc2626" : "1px solid #d4d4d8",
                  color: "#0d1b2e",
                }}
              />
              <button
                type="submit"
                disabled={submitting}
                className="text-sm font-semibold px-6 py-3 rounded-md whitespace-nowrap"
                style={{
                  backgroundColor: "#0d1b2e",
                  color: "#f8f8f6",
                  opacity: submitting ? 0.6 : 1,
                  cursor: submitting ? "not-allowed" : "pointer",
                  transition: "opacity 0.15s",
                }}
              >
                {submitting ? "Joining…" : "Join the waitlist"}
              </button>
            </div>
            {emailError && (
              <p className="mt-3 text-xs text-left" style={{ color: "#dc2626" }}>
                {emailError}
              </p>
            )}
          </form>
        )}
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer
        className="py-8"
        style={{ borderTop: "1px solid #e4e4e7" }}
      >
        <div className="mx-auto max-w-5xl px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-xs" style={{ color: "#a1a1aa" }}>
            © 2026 migraDOCS
          </span>
          <span className="text-xs" style={{ color: "#a1a1aa" }}>
            This is not legal advice
          </span>
        </div>
      </footer>
    </div>
  );
}
