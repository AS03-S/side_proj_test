// Tweaks panel — direction, language, accent
function TweaksPanel({ open, state, setState }) {
  if (!open) return null;
  const { direction, language, accent } = state;

  const langs = ["EN", "DE", "SV", "AR"];

  return (
    <div className="tweaks-panel" role="dialog" aria-label="Tweaks">
      <h4>Tweaks</h4>

      <div className="tweaks-row">
        <label>Direction</label>
        <div className="seg">
          <button className={direction === "A" ? "on" : ""} onClick={() => setState({ direction: "A" })}>A · Centered</button>
          <button className={direction === "B" ? "on" : ""} onClick={() => setState({ direction: "B" })}>B · Editorial</button>
        </div>
      </div>

      <div className="tweaks-row">
        <label>Language</label>
        <div className="seg">
          {langs.map(l => (
            <button key={l} className={language === l ? "on" : ""} onClick={() => setState({ language: l })}>{l}</button>
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

window.TweaksPanel = TweaksPanel;
