"use client";

import { useState } from "react";
import { THIRTY_SIX_TATTTVAS, TWENTY_NINE_STATES, NINE_NAVATATTTVAS, SIX_FACES } from "@/data/qdr";

const TABS = ["36 Tattvas", "25 States", "9 Navatattvas", "6 Faces"] as const;
type Tab = (typeof TABS)[number];

export default function Reference() {
  const [tab, setTab] = useState<Tab>("36 Tattvas");

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-2">Reference Library</h1>
        <p className="text-zinc-400">Consciousness maps, cosmic forces, and divine expressions — all in one place.</p>
      </section>

      {/* Tab Selector */}
      <div className="flex gap-2 flex-wrap">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === t
                ? "bg-purple-500/20 text-purple-400 border border-purple-400/50"
                : "bg-zinc-900/50 text-zinc-400 border border-white/10 hover:text-white"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === "36 Tattvas" && (
        <section className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {THIRTY_SIX_TATTTVAS.map((t) => (
              <div key={t.num} className="bg-zinc-900/50 border border-white/10 rounded-xl p-4 hover:border-purple-400/30 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-purple-400 font-mono">{t.num}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-purple-400/10 text-purple-300">{t.category}</span>
                </div>
                <p className="font-medium text-sm">{t.name}</p>
                <p className="text-xs text-zinc-400 mt-1">{t.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {tab === "25 States" && (
        <section className="space-y-3">
          {TWENTY_NINE_STATES.map((s, i) => (
            <div key={s.state} className="bg-zinc-900/50 border border-white/10 rounded-xl p-4 hover:border-purple-400/30 transition-colors">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-zinc-600">{i + 1}</span>
                <p className="font-medium">{s.state}</p>
              </div>
              <p className="text-sm text-zinc-400">{s.description}</p>
              <p className="text-xs text-purple-400 mt-1">Practice: {s.practice}</p>
            </div>
          ))}
        </section>
      )}

      {tab === "9 Navatattvas" && (
        <section className="space-y-3">
          {NINE_NAVATATTTVAS.map((n) => (
            <div key={n.num} className="bg-zinc-900/50 border border-white/10 rounded-xl p-4 hover:border-purple-400/30 transition-colors">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-purple-400 font-mono">{n.num}</span>
                <p className="font-medium">{n.name}</p>
                <span className="text-xs px-2 py-0.5 rounded bg-zinc-700 text-zinc-300">{n.direction}</span>
              </div>
              <p className="text-sm text-zinc-400">{n.element}</p>
              <p className="text-xs text-purple-400 mt-1">Practice: {n.practice}</p>
            </div>
          ))}
        </section>
      )}

      {tab === "6 Faces" && (
        <section className="space-y-3">
          {SIX_FACES.map((f) => (
            <div key={f.face} className="bg-zinc-900/50 border border-white/10 rounded-xl p-4 hover:border-purple-400/30 transition-colors">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-medium text-lg">{f.face}</p>
                <span className="text-xs px-2 py-0.5 rounded bg-zinc-700 text-zinc-300">{f.direction}</span>
              </div>
              <p className="text-sm text-zinc-400">Cosmic Function: <span className="text-zinc-300">{f.cosmicFunction}</span></p>
              <p className="text-xs text-purple-400 mt-1">Practice: {f.practice}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
