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

              {/* Holographic Humanoid Body */}
              <div className="relative w-full aspect-[3/4] max-h-[420px] mx-auto">
                <svg className="w-full h-full" viewBox="0 0 300 440" fill="none">
                  <defs>
                    <radialGradient id="bodyGlow" cx="50%" cy="45%" r="35%">
                      <stop offset="0%" stopColor={FACE_META[selectedPrinciple.face]?.color || "#a855f7"} stopOpacity="0.25" />
                      <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                    </radialGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <filter id="strongGlow">
                      <feGaussianBlur stdDeviation="8" result="blur" />
                      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <linearGradient id="boneGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#fbbf24" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                  </defs>

                  <rect x="0" y="0" width="300" height="440" fill="url(#bodyGlow)" />

                  {/* === AURA LAYER (Causing) - outermost === */}
                  <g opacity={principles[4].status === "complete" ? 0.6 : principles[4].status === "locked" ? 0.05 : 0.2} filter={animatingLayer === "causing" ? "url(#strongGlow)" : undefined}>
                    <ellipse cx="150" cy="220" rx="130" ry="180" stroke={principles[4].status === "complete" ? "#fbbf24" : "#444"} strokeWidth="1" fill="none" strokeDasharray="3 6" />
                    <ellipse cx="150" cy="220" rx="145" ry="195" stroke={principles[4].status === "complete" ? "#fbbf24" : "#333"} strokeWidth="0.5" fill="none" strokeDasharray="2 8" />
                    {principles[4].status === "complete" && (
                      <ellipse cx="150" cy="220" rx="135" ry="185" stroke="#fbbf24" strokeWidth="1.5" fill="none" opacity="0.4">
                        <animate attributeName="rx" values="130;150;130" dur="4s" repeatCount="indefinite" />
                        <animate attributeName="ry" values="180;200;180" dur="4s" repeatCount="indefinite" />
                      </ellipse>
                    )}
                  </g>

                  {/* === CIRCULATORY LAYER (Enriching) === */}
                  <g opacity={principles[3].status === "complete" ? 0.8 : principles[3].status === "locked" ? 0.05 : 0.25} filter={animatingLayer === "enriching" ? "url(#glow)" : undefined}>
                    {/* Heart */}
                    <path d="M142 165 Q150 155 158 165 Q168 175 158 185 Q150 195 142 185 Q132 175 142 165" fill={principles[3].status === "complete" ? "#a855f7" : "#444"}>
                      {principles[3].status === "complete" && <animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite" />}
                    </path>
                    {/* Aorta */}
                    <path d="M150 165 L150 140 Q150 130 140 125" stroke={principles[3].status === "complete" ? "#a855f7" : "#444"} strokeWidth="2.5" fill="none" />
                    {/* Vena cava */}
                    <path d="M155 165 L155 140 Q160 130 165 125" stroke={principles[3].status === "complete" ? "#a855f755" : "#333"} strokeWidth="1.5" fill="none" />
                    {/* Main arteries down */}
                    <path d="M150 185 L150 280" stroke={principles[3].status === "complete" ? "#a855f7" : "#444"} strokeWidth="2" fill="none" />
                    {/* Arm arteries */}
                    <path d="M140 140 Q120 160 100 200 Q90 220 85 250" stroke={principles[3].status === "complete" ? "#a855f7" : "#444"} strokeWidth="1" fill="none" />
                    <path d="M160 140 Q180 160 200 200 Q210 220 215 250" stroke={principles[3].status === "complete" ? "#a855f7" : "#444"} strokeWidth="1" fill="none" />
                    {/* Leg arteries */}
                    <path d="M145 280 Q130 320 120 380" stroke={principles[3].status === "complete" ? "#a855f7" : "#444"} strokeWidth="1.5" fill="none" />
                    <path d="M155 280 Q170 320 180 380" stroke={principles[3].status === "complete" ? "#a855f7" : "#444"} strokeWidth="1.5" fill="none" />
                    {/* Pulse points */}
                    {[[100, 200], [200, 200], [120, 380], [180, 380]].map(([x, y], i) => (
                      <circle key={i} cx={x} cy={y} r="3" fill={principles[3].status === "complete" ? "#a855f7" : "#444"} opacity="0.6">
                        {principles[3].status === "complete" && <animate attributeName="r" values="2;5;2" dur={`${1 + i * 0.3}s`} repeatCount="indefinite" />}
                      </circle>
                    ))}
                  </g>

                  {/* === NERVOUS SYSTEM LAYER (Responsibility) === */}
                  <g opacity={principles[2].status === "complete" ? 0.8 : principles[2].status === "locked" ? 0.05 : 0.25} filter={animatingLayer === "responsibility" ? "url(#glow)" : undefined}>
                    {/* Brain */}
                    <path d="M125 65 Q135 45 150 45 Q165 45 175 65 Q180 75 175 85 Q165 100 150 100 Q135 100 125 85 Q120 75 125 65" stroke={principles[2].status === "complete" ? "#22d3ee" : "#444"} strokeWidth="1.5" fill="none" />
                    {/* Brain detail */}
                    <path d="M135 60 Q145 55 150 60 Q155 55 165 60" stroke={principles[2].status === "complete" ? "#22d3ee" : "#333"} strokeWidth="0.8" fill="none" />
                    <path d="M130 75 Q140 70 150 75 Q160 70 170 75" stroke={principles[2].status === "complete" ? "#22d3ee" : "#333"} strokeWidth="0.8" fill="none" />
                    {/* Spinal cord */}
                    <path d="M150 100 L150 200" stroke={principles[2].status === "complete" ? "#22d3ee" : "#444"} strokeWidth="2" fill="none" />
                    {/* Nerve branches */}
                    <path d="M150 120 L120 140" stroke={principles[2].status === "complete" ? "#22d3ee" : "#444"} strokeWidth="0.8" fill="none" />
                    <path d="M150 120 L180 140" stroke={principles[2].status === "complete" ? "#22d3ee" : "#444"} strokeWidth="0.8" fill="none" />
                    <path d="M150 150 L110 180" stroke={principles[2].status === "complete" ? "#22d3ee" : "#444"} strokeWidth="0.8" fill="none" />
                    <path d="M150 150 L190 180" stroke={principles[2].status === "complete" ? "#22d3ee" : "#444"} strokeWidth="0.8" fill="none" />
                    <path d="M150 180 L120 220" stroke={principles[2].status === "complete" ? "#22d3ee" : "#444"} strokeWidth="0.8" fill="none" />
                    <path d="M150 180 L180 220" stroke={principles[2].status === "complete" ? "#22d3ee" : "#444"} strokeWidth="0.8" fill="none" />
                    {/* Lumbar nerves */}
                    <path d="M150 200 L130 260" stroke={principles[2].status === "complete" ? "#22d3ee" : "#444"} strokeWidth="1" fill="none" />
                    <path d="M150 200 L170 260" stroke={principles[2].status === "complete" ? "#22d3ee" : "#444"} strokeWidth="1" fill="none" />
                    {/* Synapse dots */}
                    {[[120, 140], [180, 140], [110, 180], [190, 180], [130, 260], [170, 260]].map(([x, y], i) => (
                      <circle key={i} cx={x} cy={y} r="2.5" fill={principles[2].status === "complete" ? "#22d3ee" : "#444"} opacity="0.7">
                        {principles[2].status === "complete" && <animate attributeName="opacity" values="0.4;1;0.4" dur={`${0.8 + i * 0.2}s`} repeatCount="indefinite" />}
                      </circle>
                    ))}
                  </g>

                  {/* === MUSCULATURE LAYER (Authenticity) === */}
                  <g opacity={principles[1].status === "complete" ? 0.7 : principles[1].status === "locked" ? 0.05 : 0.2} filter={animatingLayer === "authenticity" ? "url(#glow)" : undefined}>
                    {/* Head outline */}
                    <ellipse cx="150" cy="65" rx="28" ry="32" stroke={principles[1].status === "complete" ? "#22d3ee" : "#444"} strokeWidth="1.5" fill="none" />
                    {/* Neck */}
                    <rect x="140" y="95" width="20" height="20" rx="5" stroke={principles[1].status === "complete" ? "#22d3ee" : "#444"} strokeWidth="1" fill="none" />
                    {/* Torso */}
                    <path d="M115 115 Q110 130 108 160 Q108 200 115 240 Q120 260 130 270 L170 270 Q180 260 185 240 Q192 200 192 160 Q190 130 185 115 Z" stroke={principles[1].status === "complete" ? "#22d3ee" : "#444"} strokeWidth="1.5" fill="none" />
                    {/* Shoulders */}
                    <path d="M115 115 Q100 118 85 130" stroke={principles[1].status === "complete" ? "#22d3ee" : "#444"} strokeWidth="1.5" fill="none" />
                    <path d="M185 115 Q200 118 215 130" stroke={principles[1].status === "complete" ? "#22d3ee" : "#444"} strokeWidth="1.5" fill="none" />
                    {/* Arms */}
                    <path d="M85 130 Q75 160 72 200 Q70 230 75 260" stroke={principles[1].status === "complete" ? "#22d3ee" : "#444"} strokeWidth="1.5" fill="none" />
                    <path d="M215 130 Q225 160 228 200 Q230 230 225 260" stroke={principles[1].status === "complete" ? "#22d3ee" : "#444"} strokeWidth="1.5" fill="none" />
                    {/* Hands */}
                    <circle cx="75" cy="265" r="8" stroke={principles[1].status === "complete" ? "#22d3ee" : "#444"} strokeWidth="1" fill="none" />
                    <circle cx="225" cy="265" r="8" stroke={principles[1].status === "complete" ? "#22d3ee" : "#444"} strokeWidth="1" fill="none" />
                    {/* Pelvis */}
                    <path d="M130 270 Q125 285 120 295 L180 295 Q175 285 170 270" stroke={principles[1].status === "complete" ? "#22d3ee" : "#444"} strokeWidth="1" fill="none" />
                    {/* Legs */}
                    <path d="M120 295 Q115 320 112 360 Q110 390 115 420" stroke={principles[1].status === "complete" ? "#22d3ee" : "#444"} strokeWidth="1.5" fill="none" />
                    <path d="M180 295 Q185 320 188 360 Q190 390 185 420" stroke={principles[1].status === "complete" ? "#22d3ee" : "#444"} strokeWidth="1.5" fill="none" />
                    {/* Feet */}
                    <path d="M115 420 Q110 430 100 435 L125 435 Q122 428 115 420" stroke={principles[1].status === "complete" ? "#22d3ee" : "#444"} strokeWidth="1" fill="none" />
                    <path d="M185 420 Q190 430 200 435 L175 435 Q178 428 185 420" stroke={principles[1].status === "complete" ? "#22d3ee" : "#444"} strokeWidth="1" fill="none" />
                    {/* Muscle striations */}
                    <path d="M125 130 Q130 140 135 130" stroke={principles[1].status === "complete" ? "#22d3ee55" : "#333"} strokeWidth="0.5" fill="none" />
                    <path d="M165 130 Q170 140 175 130" stroke={principles[1].status === "complete" ? "#22d3ee55" : "#333"} strokeWidth="0.5" fill="none" />
                    <path d="M120 160 Q125 170 130 160" stroke={principles[1].status === "complete" ? "#22d3ee55" : "#333"} strokeWidth="0.5" fill="none" />
                    <path d="M170 160 Q175 170 180 160" stroke={principles[1].status === "complete" ? "#22d3ee55" : "#333"} strokeWidth="0.5" fill="none" />
                    {/* Mask overlay when locked */}
                    {principles[1].status === "locked" && (
                      <ellipse cx="150" cy="200" rx="80" ry="120" fill="#666" opacity="0.15" />
                    )}
                  </g>

                  {/* === SKELETON LAYER (Integrity) - innermost === */}
                  <g opacity={principles[0].status === "complete" ? 1 : principles[0].status === "locked" ? 0.08 : 0.4} filter={animatingLayer === "integrity" ? "url(#glow)" : undefined}>
                    {/* Skull */}
                    <ellipse cx="150" cy="58" rx="22" ry="26" stroke={principles[0].status === "complete" ? "url(#boneGrad)" : "#555"} strokeWidth="2" fill="none" />
                    <ellipse cx="150" cy="55" rx="18" ry="20" stroke={principles[0].status === "complete" ? "#fbbf24" : "#444"} strokeWidth="0.5" fill="none" />
                    {/* Jaw */}
                    <path d="M135 72 Q150 80 165 72" stroke={principles[0].status === "complete" ? "#fbbf24" : "#555"} strokeWidth="1.5" fill="none" />
                    {/* Eye sockets */}
                    <circle cx="142" cy="55" r="4" fill={principles[0].status === "complete" ? "#fbbf24" : "#333"} opacity="0.5" />
                    <circle cx="158" cy="55" r="4" fill={principles[0].status === "complete" ? "#fbbf24" : "#333"} opacity="0.5" />
                    {/* Spine */}
                    <line x1="150" y1="80" x2="150" y2="270" stroke={principles[0].status === "complete" ? "#fbbf24" : "#555"} strokeWidth="3" />
                    {/* Vertebrae - cervical */}
                    {[88, 96, 104, 112].map((y, i) => (
                      <g key={`c${i}`}>
                        <rect x="143" y={y} width="14" height="6" rx="3" fill={principles[0].status === "complete" ? "#fbbf24" : "#555"} opacity={animatingLayer === "integrity" ? 1 : 0.6} />
                      </g>
                    ))}
                    {/* Vertebrae - thoracic */}
                    {[120, 132, 144, 156, 168, 180, 192, 204].map((y, i) => (
                      <g key={`t${i}`}>
                        <rect x="142" y={y} width="16" height="7" rx="3" fill={principles[0].status === "complete" ? "#fbbf24" : "#555"} opacity={animatingLayer === "integrity" ? 1 : 0.6} />
                      </g>
                    ))}
                    {/* Vertebrae - lumbar */}
                    {[216, 228, 240, 252, 264].map((y, i) => (
                      <g key={`l${i}`}>
                        <rect x="140" y={y} width="20" height="8" rx="3" fill={principles[0].status === "complete" ? "#fbbf24" : "#555"} opacity={animatingLayer === "integrity" ? 1 : 0.6} />
                      </g>
                    ))}
                    {/* Ribcage */}
                    {[130, 145, 160, 175, 190, 205, 220].map((y, i) => (
                      <g key={`r${i}`}>
                        <path d={`M150 ${y} Q130 ${y - 8} 115 ${y - 3}`} stroke={principles[0].status === "complete" ? "#fbbf24" : "#555"} strokeWidth="1.2" fill="none" />
                        <path d={`M150 ${y} Q170 ${y - 8} 185 ${y - 3}`} stroke={principles[0].status === "complete" ? "#fbbf24" : "#555"} strokeWidth="1.2" fill="none" />
                      </g>
                    ))}
                    {/* Sternum */}
                    <line x1="150" y1="125" x2="150" y2="225" stroke={principles[0].status === "complete" ? "#fbbf24" : "#555"} strokeWidth="1" strokeDasharray="2 2" />
                    {/* Pelvis */}
                    <path d="M120 270 Q115 280 120 295 Q130 300 150 300 Q170 300 180 295 Q185 280 180 270" stroke={principles[0].status === "complete" ? "#fbbf24" : "#555"} strokeWidth="2" fill="none" />
                    {/* Clavicles */}
                    <path d="M150 108 Q130 108 115 115" stroke={principles[0].status === "complete" ? "#fbbf24" : "#555"} strokeWidth="1.5" fill="none" />
                    <path d="M150 108 Q170 108 185 115" stroke={principles[0].status === "complete" ? "#fbbf24" : "#555"} strokeWidth="1.5" fill="none" />
                    {/* Shoulder blades */}
                    <path d="M120 130 Q115 150 120 170" stroke={principles[0].status === "complete" ? "#fbbf24" : "#555"} strokeWidth="1" fill="none" />
                    <path d="M180 130 Q185 150 180 170" stroke={principles[0].status === "complete" ? "#fbbf24" : "#555"} strokeWidth="1" fill="none" />
                    {/* Humerus */}
                    <line x1="115" y1="115" x2="95" y2="200" stroke={principles[0].status === "complete" ? "#fbbf24" : "#555"} strokeWidth="1.5" />
                    <line x1="185" y1="115" x2="205" y2="200" stroke={principles[0].status === "complete" ? "#fbbf24" : "#555"} strokeWidth="1.5" />
                    {/* Radius/Ulna */}
                    <line x1="95" y1="200" x2="85" y2="270" stroke={principles[0].status === "complete" ? "#fbbf24" : "#555"} strokeWidth="1.2" />
                    <line x1="100" y1="200" x2="92" y2="270" stroke={principles[0].status === "complete" ? "#fbbf24" : "#555"} strokeWidth="0.8" />
                    <line x1="205" y1="200" x2="215" y2="270" stroke={principles[0].status === "complete" ? "#fbbf24" : "#555"} strokeWidth="1.2" />
                    <line x1="200" y1="200" x2="208" y2="270" stroke={principles[0].status === "complete" ? "#fbbf24" : "#555"} strokeWidth="0.8" />
                    {/* Carpals (wrists) */}
                    <circle cx="88" cy="273" r="4" stroke={principles[0].status === "complete" ? "#fbbf24" : "#555"} strokeWidth="1" fill="none" />
                    <circle cx="212" cy="273" r="4" stroke={principles[0].status === "complete" ? "#fbbf24" : "#555"} strokeWidth="1" fill="none" />
                    {/* Phalanges (fingers) simplified */}
                    <path d="M84 277 L80 285 M86 277 L83 286 M88 277 L87 286 M90 277 L91 285" stroke={principles[0].status === "complete" ? "#fbbf24" : "#555"} strokeWidth="0.5" />
                    <path d="M216 277 L220 285 M214 277 L217 286 M212 277 L213 286 M210 277 L209 285" stroke={principles[0].status === "complete" ? "#fbbf24" : "#555"} strokeWidth="0.5" />
                    {/* Femur */}
                    <line x1="130" y1="295" x2="125" y2="370" stroke={principles[0].status === "complete" ? "#fbbf24" : "#555"} strokeWidth="2" />
                    <line x1="170" y1="295" x2="175" y2="370" stroke={principles[0].status === "complete" ? "#fbbf24" : "#555"} strokeWidth="2" />
                    {/* Patella */}
                    <circle cx="125" cy="373" r="4" stroke={principles[0].status === "complete" ? "#fbbf24" : "#555"} strokeWidth="1" fill="none" />
                    <circle cx="175" cy="373" r="4" stroke={principles[0].status === "complete" ? "#fbbf24" : "#555"} strokeWidth="1" fill="none" />
                    {/* Tibia/Fibula */}
                    <line x1="125" y1="378" x2="120" y2="425" stroke={principles[0].status === "complete" ? "#fbbf24" : "#555"} strokeWidth="1.5" />
                    <line x1="128" y1="378" x2="125" y2="425" stroke={principles[0].status === "complete" ? "#fbbf24" : "#555"} strokeWidth="0.8" />
                    <line x1="175" y1="378" x2="180" y2="425" stroke={principles[0].status === "complete" ? "#fbbf24" : "#555"} strokeWidth="1.5" />
                    <line x1="172" y1="378" x2="175" y2="425" stroke={principles[0].status === "complete" ? "#fbbf24" : "#555"} strokeWidth="0.8" />
                    {/* Tarsals/Metatarsals */}
                    <path d="M120 425 Q110 432 105 438 L130 438 Q128 430 120 425" stroke={principles[0].status === "complete" ? "#fbbf24" : "#555"} strokeWidth="1" fill="none" />
                    <path d="M180 425 Q190 432 195 438 L170 438 Q172 430 180 425" stroke={principles[0].status === "complete" ? "#fbbf24" : "#555"} strokeWidth="1" fill="none" />
                    {/* Fracture lines when not complete */}
                    {principles[0].status !== "complete" && (
                      <>
                        <line x1="148" y1="140" x2="152" y2="155" stroke="#ef4444" strokeWidth="1" opacity="0.7" />
                        <line x1="147" y1="180" x2="153" y2="198" stroke="#ef4444" strokeWidth="1" opacity="0.7" />
                        <line x1="146" y1="220" x2="154" y2="235" stroke="#ef4444" strokeWidth="1" opacity="0.7" />
                        <line x1="148" y1="110" x2="155" y2="115" stroke="#ef4444" strokeWidth="0.8" opacity="0.5" />
                        <line x1="145" y1="250" x2="153" y2="258" stroke="#ef4444" strokeWidth="0.8" opacity="0.5" />
                      </>
                    )}
                  </g>

                  {/* Seal Animation Overlay */}
                  {animatingLayer === selectedPrinciple.id && (
                    <g>
                      <circle cx="150" cy="220" r="60" stroke={FACE_META[selectedPrinciple.face]?.color || "#a855f7"} strokeWidth="2" fill="none" opacity="0.8">
                        <animate attributeName="r" values="20;80;20" dur="1.5s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="1;0;1" dur="1.5s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="150" cy="220" r="40" stroke={FACE_META[selectedPrinciple.face]?.color || "#a855f7"} strokeWidth="1" fill="none" opacity="0.5">
                        <animate attributeName="r" values="10;60;10" dur="1.2s" repeatCount="indefinite" />
                      </circle>
                    </g>
                  )}
                </svg>
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
