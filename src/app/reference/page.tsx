"use client";

import { useState } from "react";
import { THIRTY_SIX_TATTTVAS, TWENTY_NINE_STATES, NINE_NAVATATTTVAS, SIX_FACES } from "@/data/qdr";

const TABS = [
  { id: "tattvas", label: "36 Tattvas", icon: "🔮" },
  { id: "states", label: "25 States", icon: "🕉️" },
  { id: "navatattvas", label: "9 Navatattvas", icon: "✨" },
  { id: "faces", label: "6 Faces", icon: "☯️" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function Reference() {
  const [tab, setTab] = useState<TabId>("tattvas");
  const [searchQuery, setSearchQuery] = useState("");

  const filterBySearch = (items: string[]) => {
    if (!searchQuery) return items;
    return items.filter((item) =>
      item.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen mandala-bg relative">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 relative z-10">
        {/* Header */}
        <section className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold text-gradient">Reference Library</h1>
          <p className="text-zinc-400">Consciousness maps, cosmic forces, and divine expressions — all in one place.</p>
        </section>

        {/* Tab Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`p-4 rounded-xl text-center transition-all duration-300 ${
                tab === t.id
                  ? "bg-purple-500/20 border border-purple-400/50 shadow-lg shadow-purple-500/10"
                  : "glass hover:bg-white/5"
              }`}
            >
              <span className="text-2xl">{t.icon}</span>
              <p className="text-sm font-medium mt-2">{t.label}</p>
            </button>
          ))}
        </div>

        {/* Search */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-400/50 transition-colors"
        />

        {/* Content */}
        {tab === "tattvas" && (
          <section className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filterBySearch(THIRTY_SIX_TATTTVAS.map((t) => t.name)).length > 0 ? (
                THIRTY_SIX_TATTTVAS.filter((t) =>
                  t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  t.description.toLowerCase().includes(searchQuery.toLowerCase())
                ).map((t) => (
                  <div key={t.num} className="glass rounded-xl p-4 cosmic-glow">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="num-badge">{t.num}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-purple-400/10 text-purple-300">{t.category}</span>
                    </div>
                    <p className="font-medium text-sm">{t.name}</p>
                    <p className="text-xs text-zinc-400 mt-1">{t.description}</p>
                  </div>
                ))
              ) : (
                <p className="col-span-full text-center text-zinc-500 py-8">No matching tattvas</p>
              )}
            </div>
          </section>
        )}

        {tab === "states" && (
          <section className="space-y-3">
            {filterBySearch(TWENTY_NINE_STATES.map((s) => s.state)).length > 0 ? (
              TWENTY_NINE_STATES.filter((s) =>
                s.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.practice.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((s, i) => (
                <div key={s.state} className="glass rounded-xl p-4 cosmic-glow">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="num-badge">{i + 1}</span>
                    <p className="font-medium">{s.state}</p>
                  </div>
                  <p className="text-sm text-zinc-400">{s.description}</p>
                  <p className="text-xs text-cyan-400 mt-2">✦ {s.practice}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-zinc-500 py-8">No matching states</p>
            )}
          </section>
        )}

        {tab === "navatattvas" && (
          <section className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {NINE_NAVATATTTVAS.filter((n) =>
                n.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                n.element.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((n) => (
                <div key={n.num} className="glass rounded-xl p-4 cosmic-glow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="num-badge">{n.num}</span>
                    <p className="font-medium">{n.name}</p>
                  </div>
                  <p className="text-sm text-zinc-400">{n.element}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-emerald-400/10 text-emerald-300">{n.direction}</span>
                  </div>
                  <p className="text-xs text-cyan-400 mt-2">✦ {n.practice}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {tab === "faces" && (
          <section className="space-y-3">
            {SIX_FACES.filter((f) =>
              f.face.toLowerCase().includes(searchQuery.toLowerCase()) ||
              f.cosmicFunction.toLowerCase().includes(searchQuery.toLowerCase())
            ).map((f) => (
              <div key={f.face} className="glass rounded-xl p-4 cosmic-glow">
                <div className="flex items-center gap-3 mb-2">
                  <span className="num-badge text-lg">☯️</span>
                  <div>
                    <p className="font-medium text-lg">{f.face}</p>
                    <p className="text-xs text-zinc-500">{f.direction}</p>
                  </div>
                </div>
                <p className="text-sm text-zinc-400">
                  Cosmic Function: <span className="text-yellow-300">{f.cosmicFunction}</span>
                </p>
                <p className="text-xs text-cyan-400 mt-2">✦ {f.practice}</p>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
