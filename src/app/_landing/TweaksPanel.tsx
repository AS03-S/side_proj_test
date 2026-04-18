"use client";

import type { TweakState, Direction, Language } from "./content";

interface Props {
  open: boolean;
  state: TweakState;
  setState: (patch: Partial<TweakState>) => void;
}

const LANGS: Language[] = ["EN", "DE", "FR", "IT", "SV", "PL", "UK", "AR"];

export function TweaksPanel({ open, state, setState }: Props) {
  if (!open) return null;
  const { direction, language, accent } = state;

  return (
    <div className="tweaks-panel" role="dialog" aria-label="Tweaks">
      <h4>Tweaks</h4>

      <div className="tweaks-row">
        <label>Direction</label>
        <div className="seg">
          {(["A", "B"] as Direction[]).map((d) => (
            <button key={d} className={direction === d ? "on" : ""} onClick={() => setState({ direction: d })}>
              {d === "A" ? "A · Centered" : "B · Editorial"}
            </button>
          ))}
        </div>
      </div>

      <div className="tweaks-row">
        <label>Language</label>
        <div className="seg">
          {LANGS.map((l) => (
            <button key={l} className={language === l ? "on" : ""} onClick={() => setState({ language: l })}>
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="tweaks-row">
        <label>Accent</label>
        <div className="seg">
          <button className={!accent ? "on" : ""} onClick={() => setState({ accent: false })}>Off</button>
          <button className={accent ? "on" : ""} onClick={() => setState({ accent: true })}>On</button>
        </div>
      </div>
    </div>
  );
}
