"use client";

import { useEffect, useRef, useState } from "react";
import { CONTENT } from "./content";
import { useReveal, scrollToEl, Nav, DocCard, WaitlistForm, IconLock, Logo } from "./shared";

interface Props { lang: string; }

export function DirectionA({ lang }: Props) {
  const t = CONTENT[lang as keyof typeof CONTENT];
  const [pulse, setPulse] = useState(true);
  const waitlistRef = useRef<HTMLElement | null>(null);

  const [stepsRef, stepsIn] = useReveal(0.2);
  const [whoRef, whoIn] = useReveal(0.2);
  const [privRef, privIn] = useReveal(0.2);

  useEffect(() => {
    const id = setTimeout(() => setPulse(false), 6000);
    return () => clearTimeout(id);
  }, []);

  const goCTA = () => scrollToEl(waitlistRef.current);

  return (
    <div>
      <Nav lang={lang} onCTA={goCTA} pulse={pulse} variant="A" />

      {/* Hero */}
      <section className="container-narrow" style={{ paddingTop: 80, paddingBottom: 72, textAlign: "center" }}>
        <div className="section-label accent-text" style={{ marginBottom: 22 }}>
          <span className="accent-bar" style={{ display: "inline-block", width: 22, height: 1, background: "var(--mute-2)", verticalAlign: "middle", marginInlineEnd: 10 }} />
          {t.hero_kicker}
        </div>
        <h1 style={{ fontSize: "clamp(2.6rem, 6vw, 4.2rem)", lineHeight: 1.02, letterSpacing: "-0.035em", fontWeight: 700, margin: "0 0 20px", color: "var(--ink)" }}>
          {t.hero_h1_1}<br />{t.hero_h1_2}
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.55, color: "var(--mute)", maxWidth: 520, margin: "0 auto 32px" }}>
          {t.hero_sub}
        </p>
        <button onClick={goCTA} className="btn btn-primary" style={{ padding: "12px 22px", fontSize: 14 }}>
          {t.hero_cta} <span>→</span>
        </button>
        <div style={{ maxWidth: 380, margin: "56px auto 0" }}>
          <DocCard lang={lang} variant="A" />
        </div>
      </section>

      <hr className="rule" />

      {/* How it works */}
      <section ref={stepsRef} className={"container-narrow reveal" + (stepsIn ? " is-in" : "")} style={{ padding: "80px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="section-label" style={{ marginBottom: 12 }}>{t.how_label}</div>
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2rem)", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 8px", color: "var(--ink)" }}>
            {t.how_h}
          </h2>
          <p style={{ fontSize: 15, color: "var(--mute)", margin: 0 }}>{t.how_sub}</p>
        </div>
        <div style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          {t.steps.map(({ n, t: title, d }, i) => (
            <div key={n} className="card" style={{ padding: 28, transitionDelay: `${i * 80}ms` }}>
              <div className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--mute-2)", marginBottom: 22 }}>{n}</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)", marginBottom: 6 }}>{title}</div>
              <div style={{ fontSize: 13.5, color: "var(--mute)", lineHeight: 1.55 }}>{d}</div>
            </div>
          ))}
        </div>
      </section>

      <hr className="rule" />

      {/* Who it's for */}
      <section ref={whoRef} className={"container-narrow reveal" + (whoIn ? " is-in" : "")} style={{ padding: "80px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="section-label" style={{ marginBottom: 12 }}>{t.who_label}</div>
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2rem)", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 8px", color: "var(--ink)" }}>
            {t.who_h}
          </h2>
          <p style={{ fontSize: 15, color: "var(--mute)", margin: 0, maxWidth: 520, marginInline: "auto" }}>{t.who_sub}</p>
        </div>
        <div style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          {t.personas.map(({ t: title, d }) => (
            <div key={title} className="card" style={{ padding: 28 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)", marginBottom: 6 }}>{title}</div>
              <div style={{ fontSize: 13.5, color: "var(--mute)", lineHeight: 1.55 }}>{d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Privacy strip */}
      <section ref={privRef} className={"reveal" + (privIn ? " is-in" : "")} style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", background: "var(--bg-2)" }}>
        <div className="container-narrow" style={{ padding: "64px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div className="section-label" style={{ marginBottom: 12 }}>{t.privacy_label}</div>
            <h2 style={{ fontSize: "clamp(1.5rem, 2.6vw, 1.8rem)", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 8px", color: "var(--ink)" }}>
              {t.privacy_h}
            </h2>
            <p style={{ fontSize: 14.5, color: "var(--mute)", margin: 0, maxWidth: 520, marginInline: "auto" }}>{t.privacy_sub}</p>
          </div>
          <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            {t.privacy_points.map(({ t: title, d }) => (
              <div key={title} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ color: "var(--navy)", marginTop: 3 }}><IconLock /></div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", marginBottom: 4 }}>{title}</div>
                  <div style={{ fontSize: 13, color: "var(--mute)", lineHeight: 1.55 }}>{d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section ref={(el) => { waitlistRef.current = el; }} style={{ padding: "96px 24px" }}>
        <div style={{ maxWidth: 520, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", fontWeight: 700, letterSpacing: "-0.025em", margin: "0 0 12px", color: "var(--ink)" }}>
            {t.waitlist_h}
          </h2>
          <p style={{ fontSize: 15, color: "var(--mute)", margin: "0 0 32px" }}>{t.waitlist_sub}</p>
          <WaitlistForm lang={lang} layout="row" />
        </div>
      </section>

      <footer style={{ borderTop: "1px solid var(--line)", padding: "24px 0" }}>
        <div className="container-narrow" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, fontSize: 12, color: "var(--mute-2)" }}>
          <Logo size={14} />
          <span>{t.footer_copy} · {t.footer_disclaimer}</span>
        </div>
      </footer>
    </div>
  );
}
