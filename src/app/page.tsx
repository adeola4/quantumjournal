"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FOUR_PRINCIPLES, FOURTEEN_FORCES, NINE_NAVATATTTVAS, TWENTY_NINE_STATES, SIX_FACES } from "@/data/qdr";

function getTimeGreeting(): string {
  const h = new Date().getHours();
  if (h < 5) return "Deep Night Practice";
  if (h < 12) return "Good Morning";
  if (h < 17) return "Good Afternoon";
  if (h < 21) return "Good Evening";
  return "Night Practice";
}

function getTodayFormatted(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function MandalaOrb({ size = 400, delay = 0 }: { size?: number; delay?: number }) {
  return (
    <div
      className="absolute opacity-20"
      style={{
        width: size,
        height: size,
        animationDelay: `${delay}s`,
      }}
    >
      <div className="w-full h-full rounded-full border border-purple-400/30 animate-orbit" />
      <div className="absolute inset-4 rounded-full border border-cyan-400/20 animate-orbit-reverse" />
      <div className="absolute inset-8 rounded-full border border-gold-400/10 animate-orbit" />
    </div>
  );
}

function ConsciousnessWheel() {
  const [selected, setSelected] = useState<number | null>(null);
  const states = TWENTY_NINE_STATES;

  return (
    <div className="glass rounded-2xl p-6 cosmic-glow">
      <h3 className="text-lg font-semibold mb-4 text-gradient-purple">Consciousness State</h3>
      <p className="text-sm text-zinc-400 mb-4">Where are you right now?</p>
      <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-7 gap-2">
        {states.map((s, i) => (
          <button
            key={s.state}
            onClick={() => setSelected(i)}
            className={`relative group p-2 rounded-lg text-center transition-all duration-300 ${
              selected === i
                ? "bg-purple-500/20 border border-purple-400/50 shadow-lg shadow-purple-500/20"
                : "bg-white/5 border border-white/5 hover:border-purple-400/30 hover:bg-white/10"
            }`}
          >
            <div className="num-badge mx-auto mb-1">{i + 1}</div>
            <p className="text-[10px] leading-tight text-zinc-300 group-hover:text-white transition-colors">
              {s.state.split(" ")[0]}
            </p>
          </button>
        ))}
      </div>
      {selected !== null && (
        <div className="mt-4 p-4 rounded-xl bg-black/40 border border-white/10">
          <p className="font-medium text-sm text-purple-300">{states[selected].state}</p>
          <p className="text-xs text-zinc-400 mt-1">{states[selected].description}</p>
          <p className="text-xs text-cyan-400 mt-2">✦ {states[selected].practice}</p>
        </div>
      )}
    </div>
  );
}

function PrinciplesTracker() {
  const [scores, setScores] = useState<Record<string, number>>({});

  const updateScore = (name: string, val: number) => {
    setScores((prev) => ({ ...prev, [name]: val }));
  };

  const getColor = (val: number) => {
    if (val >= 8) return "text-emerald-400";
    if (val >= 5) return "text-yellow-400";
    return "text-rose-400";
  };

  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="text-lg font-semibold mb-4 text-gradient-purple">4 Principles Tracker</h3>
      <div className="space-y-4">
        {FOUR_PRINCIPLES.map((p) => (
          <div key={p.name} className="group">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-3">
                <span className="text-xs px-2 py-0.5 rounded bg-purple-400/10 text-purple-300">{p.tattva}</span>
                <span className="text-sm font-medium">{p.name}</span>
              </div>
              <span className={`text-sm font-mono font-bold ${getColor(scores[p.name] || 0)}`}>
                {scores[p.name] || 0}/10
              </span>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                <button
                  key={n}
                  onClick={() => updateScore(p.name, n)}
                  className={`flex-1 h-2 rounded-full transition-all ${
                    n <= (scores[p.name] || 0)
                      ? "bg-purple-400 shadow-sm shadow-purple-400/50"
                      : "bg-white/5 hover:bg-white/10"
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ForcesEnergyMap() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="text-lg font-semibold mb-4 text-gradient-purple">14 Forces Energy Map</h3>
      <p className="text-xs text-zinc-500 mb-4">Click a force to set your focus</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {FOURTEEN_FORCES.map((f, i) => (
          <button
            key={f.name}
            onClick={() => setActive(active === i ? null : i)}
            className={`p-3 rounded-xl text-left transition-all duration-300 ${
              active === i
                ? "bg-cyan-500/10 border border-cyan-400/40 shadow-lg shadow-cyan-500/10"
                : "bg-white/5 border border-white/5 hover:border-white/20"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="num-badge">{i + 1}</span>
              <span className="text-xs font-mono text-zinc-500">{f.sanskrit.split(" ")[0]}</span>
            </div>
            <p className="text-xs font-medium text-zinc-300">{f.name}</p>
          </button>
        ))}
      </div>
      {active !== null && (
        <div className="mt-4 p-4 rounded-xl bg-black/40 border border-white/10">
          <p className="text-sm font-medium text-cyan-300">{FOURTEEN_FORCES[active].name}</p>
          <p className="text-xs text-zinc-500 mt-1">{FOURTEEN_FORCES[active].sanskrit}</p>
          <p className="text-xs text-zinc-400 mt-2">{FOURTEEN_FORCES[active].description}</p>
        </div>
      )}
    </div>
  );
}

function QuickJournal() {
  const [entry, setEntry] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (entry.trim()) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gradient-purple">Quick Journal</h3>
        <button
          onClick={handleSave}
          className="btn-cosmic px-4 py-1.5 rounded-lg bg-purple-500/20 text-purple-300 text-xs font-medium border border-purple-400/30 hover:bg-purple-500/30 transition-all"
        >
          {saved ? "✓ Saved" : "Save Entry"}
        </button>
      </div>
      <textarea
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        placeholder="Quick reflection, insight, or note..."
        className="w-full h-32 bg-black/40 border border-white/10 rounded-xl p-3 text-sm resize-none focus:outline-none focus:border-purple-400/50 transition-colors"
      />
      <div className="mt-3 flex items-center gap-4 text-xs text-zinc-500">
        <span>💭 {entry.length} chars</span>
        <span>📅 {new Date().toLocaleTimeString()}</span>
      </div>
    </div>
  );
}

function NavatattvaElement() {
  const [selected, setSelected] = useState<number | null>(null);

  const elements = [
    { name: "Earth", emoji: "🌍", color: "text-emerald-400", direction: "Center" },
    { name: "Water", emoji: "💧", color: "text-blue-400", direction: "SW" },
    { name: "Fire", emoji: "🔥", color: "text-orange-400", direction: "SE" },
    { name: "Air", emoji: "💨", color: "text-cyan-400", direction: "NW" },
    { name: "Space", emoji: "✨", color: "text-purple-400", direction: "Center" },
    { name: "Time", emoji: "⏳", color: "text-yellow-400", direction: "East" },
    { name: "Direction", emoji: "🧭", color: "text-rose-400", direction: "All" },
    { name: "Mind", emoji: "🧠", color: "text-pink-400", direction: "Inner" },
    { name: "Soul", emoji: "🕉️", color: "text-gold-400", direction: "Heart" },
  ];

  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="text-lg font-semibold mb-4 text-gradient-purple">9 Navatattvas — Elemental Alignments</h3>
      <div className="grid grid-cols-3 gap-3">
        {elements.map((el, i) => (
          <button
            key={el.name}
            onClick={() => setSelected(selected === i ? null : i)}
            className={`p-3 rounded-xl text-center transition-all duration-300 ${
              selected === i
                ? `bg-white/10 border border-${el.color.split("-")[1]}-400/40`
                : "bg-white/5 border border-white/5 hover:bg-white/10"
            }`}
          >
            <span className="text-2xl">{el.emoji}</span>
            <p className={`text-xs font-medium mt-1 ${selected === i ? el.color : "text-zinc-300"}`}>{el.name}</p>
            <p className="text-[10px] text-zinc-600">{el.direction}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function FacesOfShiva() {
  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="text-lg font-semibold mb-4 text-gradient-purple">6 Faces of Shiva (Shanmukha)</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {SIX_FACES.map((f) => (
          <div
            key={f.face}
            className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-purple-400/30 transition-all"
          >
            <p className="text-sm font-medium text-purple-300">{f.face}</p>
            <p className="text-xs text-zinc-500 mt-1">{f.direction}</p>
            <p className="text-xs text-zinc-400">{f.cosmicFunction}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DailyStats() {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {[
        { label: "Principles", value: "4", icon: "⚡", color: "text-purple-400" },
        { label: "Forces", value: "14", icon: "🌊", color: "text-cyan-400" },
        { label: "States", value: "29", icon: "🕉️", color: "text-yellow-400" },
        { label: "Tattvas", value: "37", icon: "🔮", color: "text-rose-400" },
      ].map((stat) => (
        <div key={stat.label} className="glass rounded-xl p-4 text-center">
          <span className="text-2xl">{stat.icon}</span>
          <p className={`text-2xl font-bold stat-glow ${stat.color}`}>{stat.value}</p>
          <p className="text-xs text-zinc-500 mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const [intention, setIntention] = useState("");
  const [showQuickJournal, setShowQuickJournal] = useState(false);

  return (
    <div className="min-h-screen mandala-bg relative overflow-hidden">
      {/* Cosmic orbs background */}
      <div className="fixed inset-0 pointer-events-none">
        <MandalaOrb size={600} delay={0} />
        <MandalaOrb size={400} delay={2} />
        <MandalaOrb size={300} delay={4} />
      </div>

      {/* Hero */}
      <section className="relative z-10 text-center py-12 space-y-6">
        <div className="animate-float inline-block">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-400/30 flex items-center justify-center animate-pulse-slow">
            <span className="text-4xl">🕉️</span>
          </div>
        </div>
        <div>
          <p className="text-purple-400 text-sm tracking-[0.2em] uppercase mb-2">{getTimeGreeting()}</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gradient">
            QDR
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 mt-2">
            Quantum Journal Agent
          </p>
          <p className="text-zinc-600 text-sm mt-1">{getTodayFormatted()}</p>
        </div>

        {/* Intention Input */}
        <div className="max-w-2xl mx-auto px-4">
          <input
            type="text"
            value={intention}
            onChange={(e) => setIntention(e.target.value)}
            placeholder="Set today's intention..."
            className="w-full bg-black/60 border border-white/10 rounded-2xl px-6 py-4 text-center text-lg focus:outline-none focus:border-purple-400/50 transition-all backdrop-blur-sm"
          />
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative z-10 px-4 max-w-6xl mx-auto">
        <DailyStats />
      </section>

      {/* Main Content Grid */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Consciousness Wheel */}
        <ConsciousnessWheel />

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PrinciplesTracker />
          <QuickJournal />
        </div>

        {/* Forces Energy Map */}
        <ForcesEnergyMap />

        {/* Navatattvas + Faces */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <NavatattvaElement />
          <FacesOfShiva />
        </div>

        {/* Quick Actions */}
        <div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-gradient-purple">Today&apos;s Practice</h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { href: "/sadhana", icon: "🔥", label: "Sadhana", desc: "Track intense daily spiritual practice" },
              { href: "/journal", icon: "📝", label: "Daily Journal", desc: "Morning, midday, evening reflections" },
              { href: "/planner", icon: "📋", label: "Daily Planner", desc: "Structure your day around cosmic principles" },
              { href: "/nightly", icon: "🌙", label: "Nightly", desc: "Release, forgive, set tomorrow's intention" },
              { href: "/reference", icon: "📖", label: "Reference", desc: "Tattvas, states, faces, forces" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-purple-400/30 hover:bg-white/10 transition-all text-left group"
              >
                <span className="text-2xl group-hover:scale-110 inline-block transition-transform">{item.icon}</span>
                <p className="text-sm font-medium mt-2">{item.label}</p>
                <p className="text-xs text-zinc-500 mt-1">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="section-divider" />

        {/* Footer */}
        <div className="text-center text-zinc-600 text-xs py-8">
          <p>NithyaCosmology • 4 Principles • 14 Fundamental Forces • 25 Actions of Mahasadashiva</p>
          <p className="mt-1">Completion through consciousness. Society through practice.</p>
        </div>
      </section>
    </div>
  );
}
