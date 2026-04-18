"use client";

import { useEffect, useRef, useState } from "react";
import { CONTENT } from "./content";
import { useReveal, scrollToEl, Nav, DocCard, WaitlistForm, IconLock, Logo } from "./shared";

interface Props { lang: string; onLang: (l: string) => void; }

export function DirectionB({ lang, onLang }: Props) {
  const t = CONTENT[lang as keyof typeof CONTENT];
  const [pulse, setPulse] = useState(true);
  const waitlistRef = useRef<HTMLElement | null>(null);

  const [stepsRef, stepsIn] = useReveal(0.15);
  const [whoRef, whoIn] = useReveal(0.15);
  const [privRef, privIn] = useReveal(0.15);

  useEffect(() => {
    const id = setTimeout(() => setPulse(false), 6000);
    return () => clearTimeout(id);
  }, []);

  const goCTA = () => scrollToEl(waitlistRef.current);

  return (
    <div>
      <Nav lang={lang} onCTA={goCTA} onLang={onLang} pulse={pulse} variant="B" />

      {/* Hero — split */}
      <section className="container-wide" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.3fr) minmax(0, 1fr)", gap: 40, alignItems: "center" }}>
          <div>
            <div className="section-label" style={{ marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
              <span className="accent-bar" style={{ display: "inline-block", width: 24, height: 1, background: "var(--mute-2)" }} />
              {t.hero_kicker}
            </div>
            <h1 style={{ fontSize: "clamp(2.2rem, 4.2vw, 3.8rem)", lineHeight: 1.0, letterSpacing: "-0.04em", fontWeight: 700, margin: "0 0 28px", color: "var(--ink)", overflowWrap: "break-word" }}>
              <span style={{ display: "block", color: "var(--mute)" }}>{t.hero_h1_1}</span>
              <span style={{ display: "block" }}>{t.hero_h1_2}</span>
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.55, color: "var(--ink-2)", maxWidth: 460, margin: "0 0 32px" }}>
              {t.hero_sub}
            </p>
            <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
              <button onClick={goCTA} className="btn btn-primary" style={{ padding: "12px 22px", fontSize: 14 }}>
                {t.hero_cta} <IconArrowInline />
              </button>
              <div className="mono" style={{ fontSize: 11.5, color: "var(--mute)", letterSpacing: "0.04em", display: "flex", alignItems: "center", gap: 8 }}>
                <IconLock /> {t.hero_meta}
              </div>
            </div>
          </div>
          <div>
            <DocCard lang={lang} variant="B" />
          </div>
        </div>
      </section>

      <hr className="rule" />

      {/* How it works — numbered ledger */}
      <section ref={stepsRef} className={"container-wide reveal" + (stepsIn ? " is-in" : "")} style={{ padding: "80px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 0.7fr) minmax(0, 1.3fr)", gap: 48 }}>
          <div style={{ position: "sticky", top: 100, alignSelf: "start" }}>
            <div className="section-label" style={{ marginBottom: 14 }}>{t.how_label} / 03</div>
            <h2 style={{ fontSize: "clamp(2rem, 3.2vw, 2.6rem)", fontWeight: 700, letterSpacing: "-0.03em", margin: "0 0 14px", lineHeight: 1.05, color: "var(--ink)" }}>
              {t.how_h}
            </h2>
            <p style={{ fontSize: 15, color: "var(--mute)", margin: 0, maxWidth: 320 }}>{t.how_sub}</p>
          </div>
          <div>
            {t.steps.map(({ n, t: title, d }, i) => (
              <div key={n} style={{
                display: "grid",
                gridTemplateColumns: "60px 1fr",
                gap: 24,
                padding: "28px 0",
                borderTop: "1px solid var(--line)",
                transition: `opacity 0.6s ease ${i * 140}ms, transform 0.6s ease ${i * 140}ms`,
                opacity: stepsIn ? 1 : 0,
                transform: stepsIn ? "translateY(0)" : "translateY(14px)",
              }}>
                <div className="mono" style={{ fontSize: 12, color: "var(--mute-2)", letterSpacing: "0.08em", paddingTop: 2 }}>{n}</div>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 600, color: "var(--ink)", marginBottom: 6, letterSpacing: "-0.015em" }}>{title}</div>
                  <div style={{ fontSize: 15, color: "var(--mute)", lineHeight: 1.55, maxWidth: 520 }}>{d}</div>
                </div>
              </div>
            ))}
            <div style={{ borderTop: "1px solid var(--line)" }} />
          </div>
        </div>
      </section>

      <hr className="rule" />

      {/* Who it's for — horizontal rows */}
      <section ref={whoRef} className={"container-wide reveal" + (whoIn ? " is-in" : "")} style={{ padding: "80px 32px" }}>
        <div style={{ marginBottom: 40, maxWidth: 640 }}>
          <div className="section-label" style={{ marginBottom: 14 }}>{t.who_label}</div>
          <h2 style={{ fontSize: "clamp(2rem, 3.2vw, 2.6rem)", fontWeight: 700, letterSpacing: "-0.03em", margin: "0 0 12px", lineHeight: 1.05, color: "var(--ink)" }}>
            {t.who_h}
          </h2>
          <p style={{ fontSize: 15, color: "var(--mute)", margin: 0 }}>{t.who_sub}</p>
        </div>
        <div style={{ borderTop: "1px solid var(--line)" }}>
          {t.personas.map(({ t: title, d }, i) => (
            <div key={title} style={{
              display: "grid",
              gridTemplateColumns: "80px minmax(0, 220px) 1fr",
              gap: 24,
              alignItems: "baseline",
              padding: "26px 0",
              borderBottom: "1px solid var(--line)",
              transition: `opacity 0.6s ease ${i * 120}ms, transform 0.6s ease ${i * 120}ms`,
              opacity: whoIn ? 1 : 0,
              transform: whoIn ? "translateY(0)" : "translateY(12px)",
            }}>
              <div className="mono" style={{ fontSize: 11, color: "var(--mute-2)", letterSpacing: "0.08em" }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <div style={{ fontSize: 18, fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.01em" }}>{title}</div>
              <div style={{ fontSize: 15, color: "var(--mute)", lineHeight: 1.55, maxWidth: 560 }}>{d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Privacy — dark panel */}
      <section ref={privRef} className={"reveal" + (privIn ? " is-in" : "")} style={{ background: "var(--navy-dark)", color: "var(--bg)" }}>
        <div className="container-wide" style={{ padding: "80px 32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 0.7fr) minmax(0, 1.3fr)", gap: 48 }}>
            <div>
              <div className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "rgba(248,248,246,0.55)", textTransform: "uppercase", marginBottom: 14 }}>
                {t.privacy_label}
              </div>
              <h2 style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)", fontWeight: 700, letterSpacing: "-0.025em", margin: "0 0 14px", lineHeight: 1.08 }}>
                {t.privacy_h}
              </h2>
              <p style={{ fontSize: 15, color: "rgba(248,248,246,0.65)", margin: 0, maxWidth: 360 }}>{t.privacy_sub}</p>
            </div>
            <div>
              {t.privacy_points.map(({ t: title, d }, i) => (
                <div key={title} style={{
                  display: "grid",
                  gridTemplateColumns: "40px 180px 1fr",
                  gap: 20,
                  padding: "22px 0",
                  borderTop: i === 0 ? "1px solid rgba(248,248,246,0.16)" : "none",
                  borderBottom: "1px solid rgba(248,248,246,0.16)",
                  alignItems: "baseline",
                }}>
                  <div className="mono" style={{ fontSize: 11, color: "rgba(248,248,246,0.4)", letterSpacing: "0.08em" }}>
                    0{i + 1}
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 600 }}>{title}</div>
                  <div style={{ fontSize: 14, color: "rgba(248,248,246,0.7)", lineHeight: 1.55 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section ref={(el) => { waitlistRef.current = el; }} className="container-wide" style={{ padding: "96px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: 80, alignItems: "center" }}>
          <div>
            <div className="section-label" style={{ marginBottom: 14 }}>/ Waitlist</div>
            <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 700, letterSpacing: "-0.03em", margin: "0 0 14px", lineHeight: 1.0, color: "var(--ink)" }}>
              {t.waitlist_h}
            </h2>
            <p style={{ fontSize: 15, color: "var(--mute)", margin: 0, maxWidth: 420 }}>{t.waitlist_sub}</p>
          </div>
          <div>
            <WaitlistForm lang={lang} layout="row" />
            <div className="mono" style={{ fontSize: 11, color: "var(--mute-2)", letterSpacing: "0.08em", marginTop: 14, textTransform: "uppercase" }}>
              No spam. One email at launch.
            </div>
          </div>
        </div>
      </section>

      <footer style={{ borderTop: "1px solid var(--line)", padding: "28px 0" }}>
        <div className="container-wide" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, fontSize: 12, color: "var(--mute-2)" }}>
          <Logo size={16} />
          <span>{t.footer_copy} · {t.footer_disclaimer}</span>
        </div>
      </footer>
    </div>
  );
}

function IconArrowInline() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
