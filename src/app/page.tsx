"use client";

import { useEffect, useState } from "react";
import { TWEAK_DEFAULTS, CONTENT } from "./_landing/content";
import type { TweakState } from "./_landing/content";
import { DirectionA } from "./_landing/DirectionA";
import { DirectionB } from "./_landing/DirectionB";
import { TweaksPanel } from "./_landing/TweaksPanel";

export default function App() {
  const [state, setState_] = useState<TweakState>(TWEAK_DEFAULTS);
  const [editOn, setEditOn] = useState(false);

  // Register postMessage listener BEFORE announcing availability (design edit protocol)
  useEffect(() => {
    function onMsg(e: MessageEvent) {
      const d = e.data;
      if (!d || typeof d !== "object") return;
      if (d.type === "__activate_edit_mode") setEditOn(true);
      else if (d.type === "__deactivate_edit_mode") setEditOn(false);
    }
    window.addEventListener("message", onMsg);
    try { window.parent.postMessage({ type: "__edit_mode_available" }, "*"); } catch (_) {}
    return () => window.removeEventListener("message", onMsg);
  }, []);

  function setState(patch: Partial<TweakState>) {
    setState_((s) => {
      const next = { ...s, ...patch };
      try {
        window.parent.postMessage({ type: "__edit_mode_set_keys", edits: patch }, "*");
      } catch (_) {}
      return next;
    });
  }

  // Sync <html> lang + dir with selected language
  useEffect(() => {
    const c = CONTENT[state.language];
    document.documentElement.lang = state.language.toLowerCase();
    document.documentElement.dir = c.dir ?? "ltr";
  }, [state.language]);

  const rootClass = state.accent ? "accent-on" : "";

  return (
    <div className={rootClass}>
      {state.direction === "A"
        ? <DirectionA lang={state.language} onLang={(l) => setState({ language: l as TweakState["language"] })} />
        : <DirectionB lang={state.language} onLang={(l) => setState({ language: l as TweakState["language"] })} />
      }
      <TweaksPanel open={editOn} state={state} setState={setState} />
    </div>
  );
}
