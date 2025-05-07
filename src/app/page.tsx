"use client";

import { useState } from "react";
import MatrixTranslator from "@/components/MatrixTranslator";

export default function Home() {
  // 1️⃣ état pour savoir où on en est : "choose" (écran de choix) ou "translate"
  const [modePage, setModePage] = useState<"choose" | "translate">("choose");

  // 2️⃣ état pour mémoriser la pilule choisie ("immersive" = rouge, "simple" = bleue)
  const [initialMode, setInitialMode] = useState<"immersive" | "simple">("simple");

  // 🛑 Écran de choix
  if (modePage === "choose") {
    return (
      <div className="p-8 text-center">
        <h1 className="text-3xl mb-6">Quelle pilule prends-tu ?</h1>
        <button
          className="m-2 px-6 py-3 bg-red-600 text-white rounded"
          onClick={() => {
            setInitialMode("immersive");    // pilule rouge
            setModePage("translate");       // passer à la traduction
          }}
        >
          Pilule rouge
        </button>
        <button
          className="m-2 px-6 py-3 bg-blue-600 text-white rounded"
          onClick={() => {
            setInitialMode("simple");       // pilule bleue
            setModePage("translate");       // passer à la traduction
          }}
        >
          Pilule bleue
        </button>
      </div>
    );
  }

  // ✅ Écran de traduction
  return (
    <MatrixTranslator mode={initialMode} />
  );
}

