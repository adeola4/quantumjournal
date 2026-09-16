"use client";

import { useState } from "react";
import { FOUR_PRINCIPLES, FOURTEEN_FORCES, SIX_FACES } from "@/data/qdr";

const TIME_BLOCKS = [
  { name: "Morning", time: "5:00 AM - 12:00 PM", color: "border-orange-400/30" },
  { name: "Afternoon", time: "12:00 PM - 6:00 PM", color: "border-yellow-400/30" },
  { name: "Evening", time: "6:00 PM - 10:00 PM", color: "border-purple-400/30" },
];

export default function Planner() {
  const [selectedBlock, setSelectedBlock] = useState(0);
  const [notes, setNotes] = useState<Record<string, string>>({});

  const handleNote = (key: string, val: string) => {
    setNotes((prev) => ({ ...prev, [key]: val }));
  };

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-2">Daily Planner</h1>
        <p className="text-zinc-400">Structure your day around cosmic principles and conscious action.</p>
      </section>

      {/* Time Block Selector */}
      <div className="flex gap-2">
        {TIME_BLOCKS.map((block, i) => (
          <button
            key={block.name}
            onClick={() => setSelectedBlock(i)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedBlock === i
                ? "bg-purple-500/20 text-purple-400 border border-purple-400/50"
                : "bg-zinc-900/50 text-zinc-400 border border-white/10 hover:text-white"
            }`}
          >
            {block.name}
          </button>
        ))}
      </div>

      {/* Active Time Block */}
      <section className={`bg-zinc-900/50 border rounded-2xl p-6 space-y-6 ${TIME_BLOCKS[selectedBlock].color}`}>
        <div>
          <h2 className="text-xl font-semibold">{TIME_BLOCKS[selectedBlock].name} Block</h2>
          <p className="text-sm text-zinc-500">{TIME_BLOCKS[selectedBlock].time}</p>
        </div>

        {/* 4 Principles */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-3">4 Principles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {FOUR_PRINCIPLES.map((p) => (
              <div key={p.name} className="p-4 rounded-lg bg-black/40 border border-white/5">
                <p className="font-medium text-sm">{p.name}</p>
                <p className="text-xs text-zinc-500 mb-2">{p.tattva} → Power of {p.power}</p>
                <p className="text-xs text-zinc-400">{p.definition}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 14 Forces */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-3">14 Fundamental Forces</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {FOURTEEN_FORCES.map((f, i) => (
              <div key={f.name} className="p-3 rounded-lg bg-black/40 border border-white/5">
                <p className="text-xs font-mono text-zinc-600">{i + 1}. {f.sanskrit.split(" ")[0]}</p>
                <p className="text-sm font-medium">{f.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 5 Faces of Shiva */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-3">6 Faces of Shiva (Shanmukha)</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {SIX_FACES.map((face) => (
              <div key={face.face} className="p-3 rounded-lg bg-black/40 border border-white/5">
                <p className="text-sm font-medium">{face.face}</p>
                <p className="text-xs text-zinc-500">{face.direction} — {face.cosmicFunction}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Notes & Actions</h3>
          <textarea
            value={notes[selectedBlock] || ""}
            onChange={(e) => handleNote(String(selectedBlock), e.target.value)}
            placeholder={`Key actions for the ${TIME_BLOCKS[selectedBlock].name.toLowerCase()}...`}
            className="w-full h-32 bg-black/40 border border-white/10 rounded-lg p-3 text-sm resize-none focus:outline-none focus:border-purple-400/50"
          />
        </div>
      </section>
    </div>
  );
}
