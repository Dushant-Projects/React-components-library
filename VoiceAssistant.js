import React, { useEffect, useState, useRef } from "react";
import pkg from "../package.json";

export default function VoiceAssistant() {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState("");
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [text, setText] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [error, setError] = useState("");
  const utterRef = useRef(null);

  const components = ["Button", "Card", "Modal", "App"];

  useEffect(() => {
    const defaultText = generateProjectDescription();
    setText(defaultText);

    if ("speechSynthesis" in window) {
      const loadVoices = () => {
        const v = window.speechSynthesis.getVoices();
        setVoices(v || []);
        if (v && v.length > 0) {
          setSelectedVoice((prev) => prev || v[0].name);
        }
      };
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;

      return () => {
        window.speechSynthesis.onvoiceschanged = null;
      };
    } else {
      setError("Speech synthesis is not supported in this browser.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function generateProjectDescription() {
    const name = pkg.name || "This project";
    const version = pkg.version ? `version ${pkg.version}` : "";
    const desc = pkg.description ? `${pkg.description}.` : "";

    return `${name} ${version}. ${desc} It is a React component library that includes reusable components such as ${components.join(", ")}. The source code lives in the src folder and demonstrates use of props, state, composition, and simple styling.`;
  }

  function speak(textToSpeak) {
    try {
      if (!("speechSynthesis" in window)) {
        setError("Speech synthesis is not supported in this browser.");
        return;
      }

      stop(); // ensure no overlapping speech

      const utter = new SpeechSynthesisUtterance(textToSpeak);
      const voiceObj = voices.find((v) => v.name === selectedVoice);
      if (voiceObj) utter.voice = voiceObj;
      utter.rate = Number(rate) || 1;
      utter.pitch = Number(pitch) || 1;

      utter.onend = () => {
        setSpeaking(false);
        setPaused(false);
        utterRef.current = null;
      };
      utter.onerror = (e) => {
        setError(`Speech error: ${e?.error || "unknown"}`);
        setSpeaking(false);
        setPaused(false);
      };

      utterRef.current = utter;
      window.speechSynthesis.speak(utter);
      setSpeaking(true);
      setPaused(false);
    } catch (err) {
      setError(`Failed to speak: ${err.message}`);
    }
  }

  function pause() {
    if (window.speechSynthesis && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setPaused(true);
    }
  }

  function resume() {
    if (window.speechSynthesis && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setPaused(false);
    }
  }

  function stop() {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      setPaused(false);
      utterRef.current = null;
    }
  }

  function logStatus() {
    try {
      console.info("speechSynthesis:", window.speechSynthesis);
      console.info("voices (array):", voices);
      console.info("selectedVoice:", selectedVoice);
      setError('Status logged to console');
      setTimeout(() => setError(''), 2000);
    } catch (e) {
      setError('Failed to log status: ' + (e && e.message));
    }
  }

  function runDebugTest() {
    logStatus();
    const testText = 'Debug test: speech synthesis test phrase.';
    speak(testText);
  }

  return (
    <div style={{ marginTop: 16, padding: 12, border: "1px solid #eee", borderRadius: 6 }}>
      <h3 style={{ marginTop: 0 }}>Voice Assistant 🔊</h3>

      {error && (
        <div style={{ color: "crimson", marginBottom: 8 }}>{error}</div>
      )}

      <div style={{ marginBottom: 8, fontSize: 13, color: "#333" }}>
        <div>Speech support: <strong>{"speechSynthesis" in window ? 'Yes' : 'No'}</strong></div>
        <div>Voices available: <strong>{voices.length}</strong></div>
      </div>

      <div style={{ marginBottom: 8 }}>
        <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Choose voice</label>
        <select
          value={selectedVoice}
          onChange={(e) => setSelectedVoice(e.target.value)}
          style={{ width: "100%", padding: 6 }}
        >
          {voices.length === 0 && <option>Loading voices...</option>}
          {voices.map((v) => (
            <option key={v.name + v.lang} value={v.name}>
              {v.name} — {v.lang}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", fontWeight: 600 }}>Rate: {rate}</label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", fontWeight: 600 }}>Pitch: {pitch}</label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={pitch}
            onChange={(e) => setPitch(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>
      </div>

      <div style={{ marginBottom: 8 }}>
        <label style={{ display: "block", fontWeight: 600 }}>Message to speak</label>
        <textarea
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ width: "100%", padding: 8 }}
        />
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={() => speak(text)} disabled={!text || !!error}>
          Tell me about project ✅
        </button>
        <button onClick={pause} disabled={!speaking || paused}>
          Pause ⏸
        </button>
        <button onClick={resume} disabled={!paused}>
          Resume ▶️
        </button>
        <button onClick={stop} disabled={!speaking && !paused}>
          Stop ⏹
        </button>
        <button onClick={runDebugTest}>
          Run Debug Test 🧪
        </button>
        <button onClick={logStatus}>
          Log Status to Console 📋
        </button>
      </div>

      <div style={{ marginTop: 8, fontSize: 12, color: "#666" }}>
        <strong>Tip:</strong> Edit the message then press <em>Tell me about project</em> to hear it.
      </div>
    </div>
  );
}
