"use client";

import { useState } from "react";
import { FOUR_PRINCIPLES, FOURTEEN_FORCES, NINE_NAVATATTTVAS } from "@/data/qdr";

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning";
  if (h < 18) return "Good Afternoon";
  return "Good Evening";
}

function getToday(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Dashboard() {
  const [intention, setIntention] = useState("");

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="text-center space-y-4 py-12">
        <p className="text-purple-400 text-sm tracking-widest uppercase">{getGreeting()}</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Quantum Journal <span className="text-purple-400">Agent</span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Daily consciousness-first operating system integrating the 4 Principles, 14 Fundamental Forces, and 25 Actions of Mahasadashiva with your society and task integration.
        </p>
        <p className="text-zinc-600 text-sm">{getToday()}</p>
      </section>

      {/* Intention Input */}
      <section className="max-w-2xl mx-auto">
        <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 space-y-3">
          <label className="text-sm text-zinc-400">Today&apos;s Intention</label>
          <input
            type="text"
            value={intention}
            onChange={(e) => setIntention(e.target.value)}
            placeholder="Set your intention for today..."
            className="w-full bg-transparent border-b border-white/10 pb-2 text-lg focus:outline-none focus:border-purple-400 transition-colors"
          />
        </div>
      </section>

      {/* Quick Access Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {FOUR_PRINCIPLES.map((p) => (
          <div key={p.name} className="bg-zinc-900/50 border border-white/10 rounded-xl p-5 space-y-2 hover:border-purple-400/50 transition-colors">
            <h3 className="font-semibold text-purple-400">{p.name}</h3>
            <p className="text-xs text-zinc-500">{p.tattva} → Power of {p.power}</p>
            <p className="text-sm text-zinc-400">{p.definition}</p>
          </div>
        ))}
      </section>

      {/* Forces Overview */}
      <section className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">14 Fundamental Forces</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {FOURTEEN_FORCES.map((f, i) => (
            <div key={f.name} className="flex items-start gap-3 p-3 rounded-lg bg-black/30">
              <span className="text-xs text-zinc-600 mt-0.5 w-5">{i + 1}</span>
              <div>
                <p className="text-sm font-medium">{f.name}</p>
                <p className="text-xs text-zinc-500">{f.sanskrit}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9 Navatattvas */}
      <section className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">9 Navatattvas — Cosmic Elements</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {NINE_NAVATATTTVAS.map((n) => (
            <div key={n.num} className="p-4 rounded-lg bg-black/30 border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-purple-400 text-sm font-mono">{n.num}</span>
                <span className="font-medium text-sm">{n.name}</span>
              </div>
              <p className="text-xs text-zinc-500">{n.element}</p>
              <p className="text-xs text-zinc-600 mt-1">Direction: {n.direction}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
