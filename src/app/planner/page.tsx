"use client";

import { useState } from "react";
import { FOUR_PRINCIPLES, FOURTEEN_FORCES, SIX_FACES, NINE_NAVATATTTVAS } from "@/data/qdr";

const TIME_BLOCKS = [
  { name: "Morning", time: "5:00 AM - 12:00 PM", icon: "🌅", color: "from-orange-400/20 to-yellow-400/20", borderColor: "border-orange-400/30" },
  { name: "Afternoon", time: "12:00 PM - 6:00 PM", icon: "☀️", color: "from-yellow-400/20 to-amber-400/20", borderColor: "border-yellow-400/30" },
  { name: "Evening", time: "6:00 PM - 10:00 PM", icon: "🌆", color: "from-purple-400/20 to-indigo-400/20", borderColor: "border-purple-400/30" },
  { name: "Night", time: "10:00 PM - 5:00 AM", icon: "🌙", color: "from-indigo-400/20 to-blue-400/20", borderColor: "border-indigo-400/30" },
];

export default function Planner() {
  const [selectedBlock, setSelectedBlock] = useState(0);
  const [notes, setNotes] = useState<Record<string, string>>({});

  const handleNote = (key: string, val: string) => {
    setNotes((prev) => ({ ...prev, [key]: val }));
  };

  return (
    <div className="min-h-screen mandala-bg relative">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 relative z-10">
        {/* Header */}
        <section className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold text-gradient">Daily Planner</h1>
          <p className="text-zinc-400">Structure your day around cosmic principles and conscious action.</p>
          <p className="text-sm text-zinc-600">{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</p>
        </section>

        {/* Time Block Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {TIME_BLOCKS.map((block, i) => (
            <button
              key={block.name}
              onClick={() => setSelectedBlock(i)}
              className={`p-4 rounded-xl text-center transition-all duration-300 ${
                selectedBlock === i
                  ? `bg-gradient-to-br ${block.color} border ${block.borderColor} shadow-lg`
                  : "glass hover:bg-white/5"
              }`}
            >
              <span className="text-2xl">{block.icon}</span>
              <p className="text-sm font-medium mt-2">{block.name}</p>
              <p className="text-xs text-zinc-500 mt-1">{block.time}</p>
            </button>
          ))}
        </div>

        {/* Active Time Block Content */}
        <section className={`glass rounded-2xl p-6 md:p-8 space-y-8`}>
          <div className="flex items-center gap-4">
            <span className="text-4xl">{TIME_BLOCKS[selectedBlock].icon}</span>
            <div>
              <h2 className="text-2xl font-bold">{TIME_BLOCKS[selectedBlock].name} Block</h2>
              <p className="text-sm text-zinc-500">{TIME_BLOCKS[selectedBlock].time}</p>
            </div>
          </div>

          {/* 4 Principles */}
          <div>
            <h3 className="text-sm font-medium text-zinc-400 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              4 Principles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FOUR_PRINCIPLES.map((p) => (
                <div key={p.name} className="p-4 rounded-xl bg-black/40 border border-white/5 hover:border-purple-400/30 transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-purple-400/10 text-purple-300">{p.tattva}</span>
                    <span className="text-xs text-zinc-600">→ Power of {p.power}</span>
                  </div>
                  <p className="font-medium">{p.name}</p>
                  <p className="text-xs text-zinc-400 mt-1">{p.definition}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 14 Forces */}
          <div>
            <h3 className="text-sm font-medium text-zinc-400 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              14 Fundamental Forces
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {FOURTEEN_FORCES.map((f, i) => (
                <div key={f.name} className="p-3 rounded-xl bg-black/40 border border-white/5 hover:border-cyan-400/30 transition-all">
                  <div className="flex items-center gap-2">
                    <span className="num-badge">{i + 1}</span>
                    <div>
                      <p className="text-xs font-medium">{f.name}</p>
                      <p className="text-[10px] text-zinc-600">{f.sanskrit.split(" ")[0]}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 6 Faces of Shiva */}
          <div>
            <h3 className="text-sm font-medium text-zinc-400 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-400" />
              6 Faces of Shiva
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SIX_FACES.map((face) => (
                <div key={face.face} className="p-3 rounded-xl bg-black/40 border border-white/5 hover:border-yellow-400/30 transition-all">
                  <p className="text-sm font-medium text-yellow-300">{face.face}</p>
                  <p className="text-xs text-zinc-500">{face.direction} — {face.cosmicFunction}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 9 Navatattvas */}
          <div>
            <h3 className="text-sm font-medium text-zinc-400 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              9 Navatattvas
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2">
              {NINE_NAVATATTTVAS.map((n) => (
                <div key={n.num} className="p-3 rounded-xl bg-black/40 border border-white/5 hover:border-emerald-400/30 transition-all text-center">
                  <span className="num-badge mx-auto mb-1">{n.num}</span>
                  <p className="text-xs font-medium">{n.name.split(" ")[0]}</p>
                  <p className="text-[10px] text-zinc-600">{n.direction}</p>
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
              className="w-full h-32 bg-black/40 border border-white/10 rounded-xl p-4 text-sm resize-none focus:outline-none focus:border-purple-400/50 transition-colors"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
