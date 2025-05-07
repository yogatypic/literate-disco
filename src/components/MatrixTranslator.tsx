"use client";

import { useState, useRef } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";

export default function MatrixTranslator() {
  const [text, setText] = useState("");
  const [direction, setDirection] = useState<"NT2A"|"A2NT">("NT2A");
  const [mode, setMode] = useState<"immersive"|"simple">("immersive");
  const [output, setOutput] = useState("");
  const controllerRef = useRef<AbortController>();

  const handleTranslate = () => {
    setOutput("");
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();

    fetchEventSource("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, direction, mode }),
      signal: controllerRef.current.signal,
      onmessage(ev) {
        if (ev.data === "[DONE]") return;
        setOutput((o) => o + ev.data);
      },
      onerror(err) {
        console.error(err);
        controllerRef.current?.abort();
      },
    });
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl mb-4">Matrix Translator</h1>

      <textarea
        className="w-full h-32 border p-2 mb-2"
        placeholder="Tape ton message…"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="flex gap-4 mb-2">
        <label>
          <input
            type="radio"
            checked={direction === "NT2A"}
            onChange={() => setDirection("NT2A")}
          />{" "}
          NT ➡️ Atypique
        </label>
        <label>
          <input
            type="radio"
            checked={direction === "A2NT"}
            onChange={() => setDirection("A2NT")}
          />{" "}
          Atypique ➡️ NT
        </label>
      </div>

      <select
        className="border p-1 mb-4"
        value={mode}
        onChange={(e) => setMode(e.target.value as any)}
      >
        <option value="immersive">Pilule rouge (immersive)</option>
        <option value="simple">Pilule bleue (simple)</option>
      </select>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
        onClick={handleTranslate}
      >
        Traduire
      </button>

      <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded">
        {output || "Résultat…"}
      </pre>
    </div>
  );
}

