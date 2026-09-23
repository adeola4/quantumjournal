"use client";

import { useState, useEffect, useMemo } from "react";

type PrincipleStatus = "locked" | "generating" | "active" | "complete";

interface Principle {
  id: string;
  name: string;
  face: string;
  layer: string;
  status: PrincipleStatus;
  sealVerb: string;
  essence: string;
  towardQuestions: string[];
  dissolveQuestions: string[];
  towardAnswers: string[];
  dissolveAnswers: string[];
  completedAt: string | null;
}

interface DayEntry {
  date: string;
  principles: Principle[];
}

const INITIAL_PRINCIPLES: Principle[] = [
  {
    id: "integrity",
    name: "Integrity",
    face: "Vamadeva",
    layer: "Skeleton / Spine",
    status: "active",
    sealVerb: "I HOLD this word",
    essence: "I hold my word",
    towardQuestions: [
      "What am I integrated to right now?",
      "What new commitment do I want to make today?",
    ],
    dissolveQuestions: [
      "What do I want to stop being integrated to?",
      "What word have I given that I am still avoiding?",
    ],
    towardAnswers: ["", ""],
    dissolveAnswers: ["", ""],
    completedAt: null,
  },
  {
    id: "authenticity",
    name: "Authenticity",
    face: "Aghora",
    layer: "Musculature / Form",
    status: "locked",
    sealVerb: "I BURN the false",
    essence: "I burn the false",
    towardQuestions: [
      "What am I performing right now that isn't me?",
      "Where am I bending myself to be approved?",
    ],
    dissolveQuestions: [
      "What mask did I put on this morning?",
      "What lie am I still telling myself is just who I am?",
    ],
    towardAnswers: ["", ""],
    dissolveAnswers: ["", ""],
    completedAt: null,
  },
  {
    id: "responsibility",
    name: "Responsibility",
    face: "Tatpurusha",
    layer: "Nervous System",
    status: "locked",
    sealVerb: "I RESPOND",
    essence: "I respond; I do not react",
    towardQuestions: [
      "What am I blaming right now?",
      "Where am I playing the victim of my own life?",
    ],
    dissolveQuestions: [
      "What is mine to do that I am pointing at someone else?",
      "Where have I forgotten that I am the cause?",
    ],
    towardAnswers: ["", ""],
    dissolveAnswers: ["", ""],
    completedAt: null,
  },
  {
    id: "enriching",
    name: "Enriching",
    face: "Ishana",
    layer: "Circulatory / Flow",
    status: "locked",
    sealVerb: "I GIVE",
    essence: "I give from fullness",
    towardQuestions: [
      "Who did I enrich today?",
      "Am I taking more than I am giving?",
    ],
    dissolveQuestions: [
      "What am I hoarding that is meant to flow?",
      "Am I a source, or a leak?",
    ],
    towardAnswers: ["", ""],
    dissolveAnswers: ["", ""],
    completedAt: null,
  },
  {
    id: "causing",
    name: "Causing",
    face: "Sadyojata",
    layer: "Aura / Radiant Field",
    status: "locked",
    sealVerb: "I CAUSE",
    essence: "I am the cause",
    towardQuestions: [
      "What reality am I creating right now?",
      "Am I the cause, or the effect?",
    ],
    dissolveQuestions: [
      "What did I cause today that I am pretending happened to me?",
      "What do I choose to cause into existence this week?",
    ],
    towardAnswers: ["", ""],
    dissolveAnswers: ["", ""],
    completedAt: null,
  },
];

const FACE_META: Record<string, { icon: string; color: string; cosmic: string }> = {
  Vamadeva: { icon: "🛡️", color: "#84cc16", cosmic: "Maintenance" },
  Aghora: { icon: "🔥", color: "#f97316", cosmic: "Destruction" },
  Tatpurusha: { icon: "👁️", color: "#22d3ee", cosmic: "Delusion" },
  Ishana: { icon: "💫", color: "#a855f7", cosmic: "Liberation" },
  Sadyojata: { icon: "🌟", color: "#fbbf24", cosmic: "Creation" },
};

export default function IntegrityPulse() {
  const [principles, setPrinciples] = useState<Principle[]>(INITIAL_PRINCIPLES);
  const [selectedId, setSelectedId] = useState<string>("integrity");
  const [animatingLayer, setAnimatingLayer] = useState<string | null>(null);
  const [showNotebook, setShowNotebook] = useState(true);
  const [showHistory, setShowHistory] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("qdr-integrity-pulse");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        // Check if it's today
        const today = new Date().toISOString().split("T")[0];
        if (data.date === today) {
          setPrinciples(data.principles);
        } else {
          // Reset for new day
          localStorage.removeItem("qdr-integrity-pulse");
        }
      } catch (e) {
        // Corrupted, reset
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem(
      "qdr-integrity-pulse",
      JSON.stringify({ date: today, principles })
    );
  }, [principles]);

  const updateAnswer = (
    principleIndex: number,
    column: "toward" | "dissolve",
    questionIndex: number,
    value: string
  ) => {
    setPrinciples((prev) => {
      const updated = [...prev];
      const p = { ...updated[principleIndex] };
      const answers = column === "toward" ? [...p.towardAnswers] : [...p.dissolveAnswers];
      answers[questionIndex] = value;
      updated[principleIndex] = {
        ...p,
        [column === "toward" ? "towardAnswers" : "dissolveAnswers"]: answers,
      };
      return updated;
    });
  };

  const sealPrinciple = (principleIndex: number) => {
    const p = principles[principleIndex];
    const hasAnswers = p.towardAnswers.some((a) => a.trim()) && p.dissolveAnswers.some((a) => a.trim());
    if (!hasAnswers) return;

    setAnimatingLayer(p.id);

    // After animation, complete and unlock next
    setTimeout(() => {
      setPrinciples((prev) => {
        const updated = [...prev];
        updated[principleIndex] = {
          ...updated[principleIndex],
          status: "complete",
          completedAt: new Date().toISOString(),
        };
        // Unlock next principle
        if (principleIndex + 1 < updated.length) {
          updated[principleIndex + 1] = {
            ...updated[principleIndex + 1],
            status: "active",
          };
        }
        return updated;
      });
      setAnimatingLayer(null);
      // Auto-select next
      if (principleIndex + 1 < principles.length) {
        setSelectedId(principles[principleIndex + 1].id);
      }
    }, 1500);
  };

  const selectedPrinciple = principles.find((p) => p.id === selectedId) || principles[0];
  const selectedIndex = principles.findIndex((p) => p.id === selectedId);

  const canSeal =
    selectedPrinciple.towardAnswers.some((a) => a.trim()) &&
    selectedPrinciple.dissolveAnswers.some((a) => a.trim()) &&
    selectedPrinciple.status === "active";

  return (
    <div className="min-h-screen mandala-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-6 relative z-10 space-y-6">
        {/* Header */}
        <section className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-gradient">Integrity Pulse</h1>
          <p className="text-zinc-400 text-sm">
            Your body is being examined, live. The scan reads your word, not your organs.
          </p>
          <p className="text-xs text-zinc-600">
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
        </section>

        {/* Main Three-Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* LEFT — Toward Column */}
          <div className="lg:col-span-3 space-y-3">
            <div className="glass rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <h3 className="text-sm font-semibold text-emerald-400">Toward</h3>
                <span className="text-xs text-zinc-600">Commit</span>
              </div>
              <div className="space-y-3">
                {selectedPrinciple.towardQuestions.map((q, i) => (
                  <div key={i} className="space-y-1">
                    <p className="text-xs text-zinc-400">{q}</p>
                    <textarea
                      value={selectedPrinciple.towardAnswers[i] || ""}
                      onChange={(e) => updateAnswer(selectedIndex, "toward", i, e.target.value)}
                      disabled={selectedPrinciple.status === "locked" || selectedPrinciple.status === "complete"}
                      placeholder="Type your answer..."
                      className="w-full h-16 bg-black/40 border border-white/10 rounded-lg p-2 text-xs resize-none focus:outline-none focus:border-emerald-400/50 disabled:opacity-30 disabled:cursor-not-allowed"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CENTER — Holographic Body */}
          <div className="lg:col-span-6 space-y-4">
            <div className="glass rounded-2xl p-4 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{FACE_META[selectedPrinciple.face]?.icon}</span>
                  <div>
                    <h2 className="text-lg font-semibold">{selectedPrinciple.name}</h2>
                    <p className="text-xs text-zinc-500">{selectedPrinciple.face} • {FACE_META[selectedPrinciple.face]?.cosmic}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => setShowNotebook(!showNotebook)}
                    className={`px-2 py-1 rounded text-xs ${showNotebook ? "bg-purple-500/20 text-purple-300" : "bg-white/5 text-zinc-400"}`}
                  >
                    📝
                  </button>
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className={`px-2 py-1 rounded text-xs ${showHistory ? "bg-purple-500/20 text-purple-300" : "bg-white/5 text-zinc-400"}`}
                  >
                    📅
                  </button>
                </div>
              </div>

              {/* Holographic Body SVG */}
              <div className="relative w-full aspect-[3/4] max-h-[400px] mx-auto">
                <svg className="w-full h-full" viewBox="0 0 300 400" fill="none">
                  {/* Background glow */}
                  <defs>
                    <radialGradient id="bodyGlow" cx="50%" cy="50%" r="40%">
                      <stop offset="0%" stopColor={FACE_META[selectedPrinciple.face]?.color || "#a855f7"} stopOpacity="0.2" />
                      <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                    </radialGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  <rect x="0" y="0" width="300" height="400" fill="url(#bodyGlow)" />

                  {/* Skeleton Layer (Integrity) */}
                  <g
                    opacity={principles[0].status === "complete" ? 1 : principles[0].status === "locked" ? 0.1 : 0.5}
                    filter={animatingLayer === "integrity" ? "url(#glow)" : undefined}
                  >
                    {/* Spine */}
                    <line x1="150" y1="80" x2="150" y2="280" stroke={principles[0].status === "complete" ? "#fbbf24" : "#666"} strokeWidth="3" />
                    {/* Vertebrae */}
                    {[100, 120, 140, 160, 180, 200, 220, 240, 260].map((y, i) => (
                      <rect key={i} x="140" y={y} width="20" height="8" rx="2" fill={principles[0].status === "complete" ? "#fbbf24" : "#555"} opacity={animatingLayer === "integrity" ? 1 : 0.5} />
                    ))}
                    {/* Ribs */}
                    {[130, 150, 170, 190, 210].map((y, i) => (
                      <g key={i}>
                        <path d={`M150 ${y} Q130 ${y - 10} 110 ${y - 5}`} stroke={principles[0].status === "complete" ? "#fbbf24" : "#555"} strokeWidth="1.5" fill="none" />
                        <path d={`M150 ${y} Q170 ${y - 10} 190 ${y - 5}`} stroke={principles[0].status === "complete" ? "#fbbf24" : "#555"} strokeWidth="1.5" fill="none" />
                      </g>
                    ))}
                    {/* Skull */}
                    <circle cx="150" cy="70" r="25" stroke={principles[0].status === "complete" ? "#fbbf24" : "#555"} strokeWidth="2" fill="none" />
                  </g>

                  {/* Muscle/Form Layer (Authenticity) */}
                  <g
                    opacity={principles[1].status === "complete" ? 1 : principles[1].status === "locked" ? 0.1 : 0.3}
                    filter={animatingLayer === "authenticity" ? "url(#glow)" : undefined}
                  >
                    <ellipse cx="150" cy="200" rx="70" ry="100" stroke={principles[1].status === "complete" ? "#22d3ee" : "#555"} strokeWidth="1.5" fill="none" />
                    <line x1="100" y1="140" x2="80" y2="220" stroke={principles[1].status === "complete" ? "#22d3ee" : "#555"} strokeWidth="2" />
                    <line x1="200" y1="140" x2="220" y2="220" stroke={principles[1].status === "complete" ? "#22d3ee" : "#555"} strokeWidth="2" />
                    <line x1="120" y1="300" x2="110" y2="380" stroke={principles[1].status === "complete" ? "#22d3ee" : "#555"} strokeWidth="2" />
                    <line x1="180" y1="300" x2="190" y2="380" stroke={principles[1].status === "complete" ? "#22d3ee" : "#555"} strokeWidth="2" />
                    {principles[1].status === "locked" && (
                      <ellipse cx="150" cy="200" rx="72" ry="102" fill="#888" opacity="0.2" />
                    )}
                  </g>

                  {/* Nervous System Layer (Responsibility) */}
                  <g
                    opacity={principles[2].status === "complete" ? 1 : principles[2].status === "locked" ? 0.1 : 0.3}
                    filter={animatingLayer === "responsibility" ? "url(#glow)" : undefined}
                  >
                    {/* Brain */}
                    <path d="M130 60 Q150 40 170 60 Q180 70 170 80 Q150 90 130 80 Q120 70 130 60" stroke={principles[2].status === "complete" ? "#22d3ee" : "#555"} strokeWidth="1" fill="none" />
                    {/* Nerve lines */}
                    <path d="M150 80 L150 200" stroke={principles[2].status === "complete" ? "#22d3ee" : "#555"} strokeWidth="1" />
                    <path d="M150 120 L100 160" stroke={principles[2].status === "complete" ? "#22d3ee" : "#555"} strokeWidth="0.5" />
                    <path d="M150 120 L200 160" stroke={principles[2].status === "complete" ? "#22d3ee" : "#555"} strokeWidth="0.5" />
                    <path d="M150 200 L120 300" stroke={principles[2].status === "complete" ? "#22d3ee" : "#555"} strokeWidth="0.5" />
                    <path d="M150 200 L180 300" stroke={principles[2].status === "complete" ? "#22d3ee" : "#555"} strokeWidth="0.5" />
                    {/* Synapses */}
                    {[120, 140, 160, 180].map((x, i) => (
                      <circle key={i} cx={x} cy={140 + i * 20} r="2" fill={principles[2].status === "complete" ? "#22d3ee" : "#555"} opacity="0.7" />
                    ))}
                  </g>

                  {/* Circulatory Layer (Enriching) */}
                  <g
                    opacity={principles[3].status === "complete" ? 1 : principles[3].status === "locked" ? 0.1 : 0.3}
                    filter={animatingLayer === "enriching" ? "url(#glow)" : undefined}
                  >
                    {/* Heart */}
                    <path d="M140 160 Q150 150 160 160 Q170 170 160 180 Q150 190 140 180 Q130 170 140 160" fill={principles[3].status === "complete" ? "#a855f7" : "#555"} />
                    {/* Vessels */}
                    <path d="M150 180 L150 250" stroke={principles[3].status === "complete" ? "#a855f7" : "#555"} strokeWidth="1.5" />
                    <path d="M150 200 L100 280" stroke={principles[3].status === "complete" ? "#a855f7" : "#555"} strokeWidth="1" />
                    <path d="M150 200 L200 280" stroke={principles[3].status === "complete" ? "#a855f7" : "#555"} strokeWidth="1" />
                    <path d="M150 250 L100 350" stroke={principles[3].status === "complete" ? "#a855f7" : "#555"} strokeWidth="1" />
                    <path d="M150 250 L200 350" stroke={principles[3].status === "complete" ? "#a855f7" : "#555"} strokeWidth="1" />
                  </g>

                  {/* Aura Layer (Causing) */}
                  <g
                    opacity={principles[4].status === "complete" ? 1 : principles[4].status === "locked" ? 0.1 : 0.3}
                    filter={animatingLayer === "causing" ? "url(#glow)" : undefined}
                  >
                    <circle cx="150" cy="200" r="120" stroke={principles[4].status === "complete" ? "#fbbf24" : "#555"} strokeWidth="1" fill="none" strokeDasharray="4 4" />
                    <circle cx="150" cy="200" r="140" stroke={principles[4].status === "complete" ? "#fbbf24" : "#555"} strokeWidth="0.5" fill="none" strokeDasharray="2 6" />
                    {principles[4].status === "complete" && (
                      <>
                        <circle cx="150" cy="200" r="130" stroke="#fbbf24" strokeWidth="2" fill="none" opacity="0.5">
                          <animate attributeName="r" values="120;140;120" dur="3s" repeatCount="indefinite" />
                        </circle>
                      </>
                    )}
                  </g>

                  {/* Rotation indicator for active layer */}
                  {selectedPrinciple.status === "active" && (
                    <g>
                      <circle cx="150" cy="200" r="150" stroke="none" fill="none" />
                    </g>
                  )}
                </svg>

                {/* Seal Animation Overlay */}
                {animatingLayer === selectedPrinciple.id && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-2xl animate-pulse">
                      {FACE_META[selectedPrinciple.face]?.icon}
                    </div>
                  </div>
                )}
              </div>

              {/* Layer Status Chips */}
              <div className="flex flex-wrap gap-1 mt-4">
                {principles.map((p, i) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedId(p.id)}
                    className={`px-2 py-1 rounded text-xs transition-all ${
                      selectedId === p.id
                        ? "bg-purple-500/20 text-purple-300 border border-purple-400/50"
                        : p.status === "complete"
                        ? "bg-yellow-400/10 text-yellow-400 border border-yellow-400/30"
                        : p.status === "locked"
                        ? "bg-white/5 text-zinc-600 border border-white/5"
                        : "bg-white/5 text-zinc-400 border border-white/5 hover:bg-white/10"
                    }`}
                  >
                    {p.status === "complete" ? "✓" : p.status === "locked" ? "🔒" : "▸"} {p.name}
                  </button>
                ))}
              </div>

              {/* Seal Button */}
              {selectedPrinciple.status === "active" && (
                <button
                  onClick={() => sealPrinciple(selectedIndex)}
                  disabled={!canSeal}
                  className={`w-full mt-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                    canSeal
                      ? "btn-cosmic bg-gradient-to-r from-purple-500/30 to-cyan-500/30 text-white border border-purple-400/50 hover:from-purple-500/50 hover:to-cyan-500/50"
                      : "bg-white/5 text-zinc-600 border border-white/5 cursor-not-allowed"
                  }`}
                >
                  {selectedPrinciple.sealVerb}
                </button>
              )}
              {selectedPrinciple.status === "complete" && (
                <div className="w-full mt-4 py-3 rounded-xl font-semibold text-sm text-center bg-yellow-400/10 text-yellow-400 border border-yellow-400/30">
                  ✓ Sealed — {selectedPrinciple.essence}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — Dissolve Column */}
          <div className="lg:col-span-3 space-y-3">
            <div className="glass rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                <h3 className="text-sm font-semibold text-rose-400">Dissolve</h3>
                <span className="text-xs text-zinc-600">Clear</span>
              </div>
              <div className="space-y-3">
                {selectedPrinciple.dissolveQuestions.map((q, i) => (
                  <div key={i} className="space-y-1">
                    <p className="text-xs text-zinc-400">{q}</p>
                    <textarea
                      value={selectedPrinciple.dissolveAnswers[i] || ""}
                      onChange={(e) => updateAnswer(selectedIndex, "dissolve", i, e.target.value)}
                      disabled={selectedPrinciple.status === "locked" || selectedPrinciple.status === "complete"}
                      placeholder="Type your answer..."
                      className="w-full h-16 bg-black/40 border border-white/10 rounded-lg p-2 text-xs resize-none focus:outline-none focus:border-rose-400/50 disabled:opacity-30 disabled:cursor-not-allowed"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Daily Progress */}
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-400">Today&apos;s Progress</span>
            <span className="text-sm font-mono text-purple-400">
              {principles.filter((p) => p.status === "complete").length} / 5 held
            </span>
          </div>
          <div className="flex gap-2 mt-3">
            {principles.map((p) => (
              <div
                key={p.id}
                className={`flex-1 h-2 rounded-full transition-all ${
                  p.status === "complete"
                    ? "bg-yellow-400 shadow-sm shadow-yellow-400/50"
                    : p.status === "active"
                    ? "bg-purple-400 animate-pulse"
                    : "bg-white/10"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
