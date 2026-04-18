// App — wires up tweaks + edit mode protocol

function App() {
  const [state, setStateRaw] = useState(window.TWEAK_DEFAULTS);
  const [editOn, setEditOn] = useState(false);

  // Register listener BEFORE announcing availability
  useEffect(() => {
    function onMsg(e) {
      const d = e.data;
      if (!d || typeof d !== "object") return;
      if (d.type === "__activate_edit_mode") setEditOn(true);
      else if (d.type === "__deactivate_edit_mode") setEditOn(false);
    }
    window.addEventListener("message", onMsg);
    // Announce after registering
    try { window.parent.postMessage({ type: "__edit_mode_available" }, "*"); } catch (_) {}
    return () => window.removeEventListener("message", onMsg);
  }, []);

  function setState(patch) {
    setStateRaw(s => {
      const next = { ...s, ...patch };
      try {
        window.parent.postMessage({ type: "__edit_mode_set_keys", edits: patch }, "*");
      } catch (_) {}
      return next;
    });
  }

  // Update <html> lang/dir based on language
  useEffect(() => {
    const c = CONTENT[state.language];
    document.documentElement.lang = state.language.toLowerCase();
    document.documentElement.dir = c.dir || "ltr";
  }, [state.language]);

  const rootClass = state.accent ? "accent-on" : "";

  return (
    <div className={rootClass}>
      {state.direction === "A"
        ? <DirectionA lang={state.language} />
        : <DirectionB lang={state.language} />
      }
      <TweaksPanel open={editOn} state={state} setState={setState} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
