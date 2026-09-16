"use client";

import { useState, useEffect, useMemo } from "react";
import {
  SADHANA_LIBRARY,
  KOSHA_META,
  INSTRUMENT_META,
  MUHURTA_BANDS,
  getCurrentMuhurta,
  calculateKoshaFill,
  calculateOjas,
  checkClashes,
  getComplements,
  type Sadhana,
  type Kosha,
  type Instrument,
} from "@/data/sadhana";

interface ScheduledItem {
  sadhanaId: string;
  slotIndex: number;
  startTime: number; // minutes from midnight
}

const HOURS = Array.from({ length: 24 }, (_, i) => i);

export default function SadhanaBuilder() {
  const [scheduled, setScheduled] = useState<ScheduledItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterKosha, setFilterKosha] = useState<Kosha | "all">("all");
  const [filterInstrument, setFilterInstrument] = useState<Instrument | "all">("all");
  const [filterAdhikara, setFilterAdhikara] = useState<string>("all");
  const [showConflicts, setShowConflicts] = useState(true);
  const [view, setView] = useState<"timeline" | "mandala">("timeline");
  const [saved, setSaved] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const savedSchedule = localStorage.getItem("qdr-sadhana-schedule");
    if (savedSchedule) {
      setScheduled(JSON.parse(savedSchedule));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("qdr-sadhana-schedule", JSON.stringify(scheduled));
  }, [scheduled]);

  const currentMuhurta = getCurrentMuhurta();
  const scheduledIds = scheduled.map((s) => s.sadhanaId);
  const koshaFill = calculateKoshaFill(scheduledIds);
  const ojas = calculateOjas(scheduledIds);
  const conflicts = checkClashes(scheduledIds);
  const totalMinutes = scheduled.reduce((sum, s) => {
    const sadhana = SADHANA_LIBRARY.find((sd) => sd.id === s.sadhanaId);
    return sum + (sadhana?.cost.time_minutes || 0);
  }, 0);

  const filteredLibrary = useMemo(() => {
    return SADHANA_LIBRARY.filter((s) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (
          !s.name.toLowerCase().includes(q) &&
          !s.description.toLowerCase().includes(q) &&
          !s.tradition.toLowerCase().includes(q)
        )
          return false;
      }
      if (filterKosha !== "all" && !s.koshas.includes(filterKosha)) return false;
      if (filterInstrument !== "all" && !s.instruments.includes(filterInstrument)) return false;
      if (filterAdhikara !== "all" && s.adhikara !== filterAdhikara) return false;
      return true;
    });
  }, [searchQuery, filterKosha, filterInstrument, filterAdhikara]);

  const addToSadhana = (sadhanaId: string) => {
    // Find next empty slot
    const existingSlots = scheduled.map((s) => s.slotIndex);
    let nextSlot = 0;
    while (existingSlots.includes(nextSlot)) nextSlot++;

    // Calculate start time (distribute across waking hours)
    const startHour = 5; // Start at 5 AM
    const slotDuration = 60; // 1 hour per slot
    const startTime = startHour * 60 + nextSlot * slotDuration;

    setScheduled((prev) => [...prev, { sadhanaId, slotIndex: nextSlot, startTime }]);
  };

  const removeFromSadhana = (sadhanaId: string) => {
    setScheduled((prev) => prev.filter((s) => s.sadhanaId !== sadhanaId));
  };

  const clearAll = () => {
    setScheduled([]);
  };

  const markDone = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const getSadhanaById = (id: string) => SADHANA_LIBRARY.find((s) => s.id === id);

  const getTimeOfDayLabel = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    const ampm = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 || 12;
    return `${hour12}:${m.toString().padStart(2, "0")} ${ampm}`;
  };

  const getMuhurtaAt = (minutes: number) => {
    const hour = Math.floor(minutes / 60);
    return MUHURTA_BANDS.find((b) => {
      if (b.start < b.end) return hour >= b.start && hour < b.end;
      return hour >= b.start || hour < b.end;
    });
  };

  return (
    <div className="min-h-screen mandala-bg relative">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 relative z-10">
        {/* Header */}
        <section className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-gradient">
            Vrata Builder — Build Your Lifestyle
          </h1>
          <p className="text-zinc-400 text-sm">
            Design your daily sadhana architecture. Spiritual life at the forefront, society as maintenance.
          </p>
        </section>

        {/* Live Meters Bar */}
        <section className="glass rounded-2xl p-4">
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-4">
            {(Object.keys(KOSHA_META) as Kosha[]).map((kosha) => {
              const meta = KOSHA_META[kosha];
              const fill = koshaFill[kosha];
              return (
                <div key={kosha} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-500">
                      {meta.icon} {meta.name}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">{fill}%</span>
                  </div>
                  <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${fill}%`,
                        backgroundColor: meta.color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500">⚡ Ojas</span>
                <span className={`text-xs font-mono ${ojas < 0 ? "text-red-400" : ojas < 3 ? "text-yellow-400" : "text-emerald-400"}`}>
                  {ojas}
                </span>
              </div>
              <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${ojas < 0 ? "bg-red-500" : ojas < 3 ? "bg-yellow-500" : "bg-emerald-500"}`}
                  style={{ width: `${Math.max(0, Math.min(100, (ojas / 10) * 100))}%` }}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-3 text-xs text-zinc-600">
            <span>Total: {Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m</span>
            <span>{currentMuhurta.name} ({currentMuhurta.start}:00–{currentMuhurta.end}:00)</span>
          </div>
        </section>

        {/* Conflicts Banner */}
        {conflicts.length > 0 && showConflicts && (
          <div className="bg-red-500/10 border border-red-400/30 rounded-xl p-3 flex items-start gap-3">
            <span className="text-red-400 text-lg">⚠️</span>
            <div className="flex-1">
              <p className="text-sm text-red-300 font-medium">Practice Conflicts Detected</p>
              <ul className="text-xs text-red-400/80 mt-1 space-y-1">
                {conflicts.map((c, i) => (
                  <li key={i}>• {c}</li>
                ))}
              </ul>
            </div>
            <button onClick={() => setShowConflicts(false)} className="text-red-400/60 hover:text-red-400">
              ×
            </button>
          </div>
        )}

        {/* Main Three-Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT — Library Panel */}
          <div className="lg:col-span-4 space-y-4">
            <div className="glass rounded-2xl p-4 space-y-3">
              <h2 className="font-semibold text-sm text-zinc-300">Sadhana Library</h2>

              {/* Search */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search practices..."
                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-400/50"
              />

              {/* Filters */}
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={filterKosha}
                  onChange={(e) => setFilterKosha(e.target.value as Kosha | "all")}
                  className="bg-black/40 border border-white/10 rounded-lg px-2 py-1.5 text-xs"
                >
                  <option value="all">All Koshas</option>
                  {(Object.keys(KOSHA_META) as Kosha[]).map((k) => (
                    <option key={k} value={k}>{KOSHA_META[k].name}</option>
                  ))}
                </select>
                <select
                  value={filterInstrument}
                  onChange={(e) => setFilterInstrument(e.target.value as Instrument | "all")}
                  className="bg-black/40 border border-white/10 rounded-lg px-2 py-1.5 text-xs"
                >
                  <option value="all">All Instruments</option>
                  {(Object.keys(INSTRUMENT_META) as Instrument[]).map((i) => (
                    <option key={i} value={i}>{INSTRUMENT_META[i].name}</option>
                  ))}
                </select>
              </div>

              {/* Practice List */}
              <div className="max-h-[400px] overflow-y-auto space-y-2 pr-1">
                {filteredLibrary.map((s) => {
                  const isScheduled = scheduledIds.includes(s.id);
                  return (
                    <div
                      key={s.id}
                      onClick={() => setSelectedId(s.id)}
                      className={`p-3 rounded-xl cursor-pointer transition-all ${
                        selectedId === s.id
                          ? "bg-purple-500/20 border border-purple-400/50"
                          : isScheduled
                          ? "bg-emerald-500/10 border border-emerald-400/30"
                          : "bg-white/5 border border-white/5 hover:border-purple-400/30"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{s.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{s.name}</p>
                          <p className="text-xs text-zinc-500">{s.tradition}</p>
                        </div>
                        {isScheduled && <span className="text-emerald-400 text-xs">✓</span>}
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-xs text-zinc-500">
                        <span>⏱ {s.cost.time_minutes}m</span>
                        <span>⚡ {s.cost.ojas_spend > 0 ? "-" : "+"}{Math.abs(s.cost.ojas_spend)}</span>
                        <span className="px-1.5 py-0.5 rounded bg-white/5">{s.primary_kosha.slice(0, 4)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Current Muhurta */}
            <div className="glass rounded-2xl p-4">
              <h3 className="text-sm font-medium text-zinc-400 mb-2">Current Muhurta</h3>
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full animate-pulse"
                  style={{ backgroundColor: currentMuhurta.color }}
                />
                <div>
                  <p className="text-sm font-medium" style={{ color: currentMuhurta.color }}>
                    {currentMuhurta.name}
                  </p>
                  <p className="text-xs text-zinc-500">
                    {currentMuhurta.start}:00 – {currentMuhurta.end}:00
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CENTER — Day Timeline / Mandala */}
          <div className="lg:col-span-5 space-y-4">
            <div className="glass rounded-2xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-sm text-zinc-300">Your Day Architecture</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setView("timeline")}
                    className={`px-3 py-1 rounded-lg text-xs transition-all ${
                      view === "timeline" ? "bg-purple-500/20 text-purple-300" : "bg-white/5 text-zinc-400 hover:bg-white/10"
                    }`}
                  >
                    Timeline
                  </button>
                  <button
                    onClick={() => setView("mandala")}
                    className={`px-3 py-1 rounded-lg text-xs transition-all ${
                      view === "mandala" ? "bg-purple-500/20 text-purple-300" : "bg-white/5 text-zinc-400 hover:bg-white/10"
                    }`}
                  >
                    Mandala
                  </button>
                </div>
              </div>

              {view === "timeline" ? (
                <div className="space-y-2">
                  {scheduled.length === 0 ? (
                    <div className="text-center py-12 text-zinc-500">
                      <span className="text-4xl block mb-3">🧘</span>
                      <p className="text-sm">Add practices from the library to build your day</p>
                      <p className="text-xs mt-1">Drag the slider to schedule your sadhana</p>
                    </div>
                  ) : (
                    scheduled
                      .sort((a, b) => a.startTime - b.startTime)
                      .map((item, idx) => {
                        const sadhana = getSadhanaById(item.sadhanaId);
                        if (!sadhana) return null;
                        const muhurta = getMuhurtaAt(item.startTime);
                        const hasConflict = conflicts.some((c) => c.includes(sadhana.name));
                        return (
                          <div
                            key={item.sadhanaId}
                            className={`p-3 rounded-xl flex items-center gap-3 transition-all ${
                              hasConflict
                                ? "bg-red-500/10 border border-red-400/30"
                                : "bg-black/30 border border-white/5 hover:border-purple-400/30"
                            }`}
                          >
                            <div className="text-center min-w-[60px]">
                              <p className="text-xs font-mono text-zinc-400">
                                {getTimeOfDayLabel(item.startTime)}
                              </p>
                              {muhurta && (
                                <div
                                  className="w-2 h-2 rounded-full mx-auto mt-1"
                                  style={{ backgroundColor: muhurta.color }}
                                  title={muhurta.name}
                                />
                              )}
                            </div>
                            <span className="text-lg">{sadhana.icon}</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{sadhana.name}</p>
                              <p className="text-xs text-zinc-500">
                                {sadhana.cost.time_minutes}m • {sadhana.instruments.map((i) => INSTRUMENT_META[i].icon).join(" ")}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-zinc-500">{sadhana.cost.ojas_spend > 0 ? "-" : "+"}{Math.abs(sadhana.cost.ojas_spend)}</span>
                              <button
                                onClick={() => removeFromSadhana(item.sadhanaId)}
                                className="text-zinc-600 hover:text-red-400 ml-2"
                              >
                                ×
                              </button>
                            </div>
                          </div>
                        );
                      })
                  )}
                </div>
              ) : (
                <div className="relative w-full aspect-square max-w-[400px] mx-auto">
                  {/* Mandala rings */}
                  <div className="absolute inset-0">
                    {[20, 35, 50, 65, 80].map((size, i) => (
                      <div
                        key={i}
                        className="absolute rounded-full border border-white/5"
                        style={{
                          inset: `${50 - size / 2}%`,
                          transform: `rotate(${i * 15}deg)`,
                        }}
                      />
                    ))}
                  </div>
                  {/* Muhurta sectors */}
                  {MUHURTA_BANDS.map((band, i) => {
                    const startAngle = ((band.start / 24) * 360 - 90) * (Math.PI / 180);
                    const endAngle = ((band.end / 24) * 360 - 90) * (Math.PI / 180);
                    const radius = 45;
                    const x1 = 50 + radius * Math.cos(startAngle);
                    const y1 = 50 + radius * Math.sin(startAngle);
                    const x2 = 50 + radius * Math.cos(endAngle);
                    const y2 = 50 + radius * Math.sin(endAngle);
                    const largeArc = band.end - band.start > 12 ? 1 : 0;
                    return (
                      <svg key={band.id} className="absolute inset-0 w-full h-full">
                        <path
                          d={`M 50 50 L ${x1}% ${y1}% A ${radius}% ${radius}% 0 ${largeArc} 1 ${x2}% ${y2}% Z`}
                          fill={band.color}
                          opacity={currentMuhurta.id === band.id ? 0.3 : 0.1}
                        />
                        <text
                          x={`${50 + 38 * Math.cos((startAngle + endAngle) / 2)}%`}
                          y={`${50 + 38 * Math.sin((startAngle + endAngle) / 2)}%`}
                          fill={band.color}
                          fontSize="8"
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          {band.name.split(" ")[0]}
                        </text>
                      </svg>
                    );
                  })}
                  {/* Center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-400/30 flex items-center justify-center animate-pulse-slow">
                      <span className="text-3xl">🕉️</span>
                    </div>
                  </div>
                  {/* Scheduled practices */}
                  {scheduled.map((item, idx) => {
                    const sadhana = getSadhanaById(item.sadhanaId);
                    if (!sadhana) return null;
                    const angle = ((item.startTime / (24 * 60)) * 360 - 90) * (Math.PI / 180);
                    const radius = 42;
                    const x = 50 + radius * Math.cos(angle);
                    const y = 50 + radius * Math.sin(angle);
                    return (
                      <div
                        key={item.sadhanaId}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                        style={{ left: `${x}%`, top: `${y}%` }}
                        onClick={() => setSelectedId(item.sadhanaId)}
                      >
                        <span className="text-lg group-hover:scale-125 inline-block transition-transform">
                          {sadhana.icon}
                        </span>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-black/80 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          {sadhana.name}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={markDone}
                className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                  saved
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-400/50"
                    : "btn-cosmic bg-purple-500/20 text-purple-300 border border-purple-400/30 hover:bg-purple-500/30"
                }`}
              >
                {saved ? "✓ Day Saved" : "Save Today's Practice"}
              </button>
              <button
                onClick={clearAll}
                className="px-6 py-3 rounded-xl bg-white/5 text-zinc-400 font-medium hover:bg-white/10 transition-all"
              >
                Clear
              </button>
            </div>
          </div>

          {/* RIGHT — Inspector */}
          <div className="lg:col-span-3 space-y-4">
            {selectedId ? (
              <SelectedPracticeInspector
                sadhana={getSadhanaById(selectedId)!}
                isScheduled={scheduledIds.includes(selectedId)}
                onAdd={() => addToSadhana(selectedId)}
                onRemove={() => removeFromSadhana(selectedId)}
              />
            ) : (
              <div className="glass rounded-2xl p-6 text-center text-zinc-500">
                <span className="text-3xl block mb-3">👆</span>
                <p className="text-sm">Select a practice to see details</p>
              </div>
            )}

            {/* Quick Add Suggestions */}
            <div className="glass rounded-2xl p-4">
              <h3 className="text-sm font-medium text-zinc-400 mb-3">Suggested for {currentMuhurta.name}</h3>
              <div className="space-y-2">
                {SADHANA_LIBRARY.filter((s) => {
                  const affinity = s.muhurta_affinity[currentMuhurta.id as keyof typeof s.muhurta_affinity];
                  return affinity && affinity >= 7 && !scheduledIds.includes(s.id);
                })
                  .slice(0, 4)
                  .map((s) => (
                    <button
                      key={s.id}
                      onClick={() => addToSadhana(s.id)}
                      className="w-full p-2 rounded-lg bg-white/5 border border-white/5 hover:border-purple-400/30 transition-all text-left flex items-center gap-2"
                    >
                      <span>{s.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate">{s.name}</p>
                        <p className="text-[10px] text-zinc-500">{s.cost.time_minutes}m • {s.primary_kosha}</p>
                      </div>
                      <span className="text-purple-400 text-xs">+</span>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SelectedPracticeInspector({
  sadhana,
  isScheduled,
  onAdd,
  onRemove,
}: {
  sadhana: Sadhana;
  isScheduled: boolean;
  onAdd: () => void;
  onRemove: () => void;
}) {
  const complements = getComplements(sadhana.id);
  const clashes = SADHANA_LIBRARY.filter((s) => sadhana.clashes.includes(s.id));

  return (
    <div className="glass rounded-2xl p-4 space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-3xl">{sadhana.icon}</span>
        <div>
          <h3 className="font-semibold text-sm">{sadhana.name}</h3>
          <p className="text-xs text-zinc-500">{sadhana.tradition}</p>
        </div>
      </div>

      <p className="text-xs text-zinc-400">{sadhana.description}</p>

      {/* Cost Vector */}
      <div className="space-y-2">
        <h4 className="text-xs font-medium text-zinc-500">Cost Vector</h4>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Time", value: `${sadhana.cost.time_minutes}m`, color: "text-blue-400" },
            { label: "Ojas", value: `${sadhana.cost.ojas_spend > 0 ? "-" : "+"}${Math.abs(sadhana.cost.ojas_spend)}`, color: sadhana.cost.ojas_spend > 0 ? "text-red-400" : "text-emerald-400" },
            { label: "Physical", value: sadhana.cost.physical_load, color: "text-orange-400" },
            { label: "Cognitive", value: sadhana.cost.cognitive_load, color: "text-purple-400" },
            { label: "Emotional", value: sadhana.cost.emotional_intensity, color: "text-pink-400" },
            { label: "Recovery", value: `${sadhana.cost.recovery_needed_minutes}m`, color: "text-cyan-400" },
          ].map((c) => (
            <div key={c.label} className="text-center p-2 rounded-lg bg-black/30">
              <p className={`text-sm font-bold ${c.color}`}>{c.value}</p>
              <p className="text-[10px] text-zinc-600">{c.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Instruments */}
      <div className="space-y-2">
        <h4 className="text-xs font-medium text-zinc-500">Instruments</h4>
        <div className="flex flex-wrap gap-1">
          {sadhana.instruments.map((i) => (
            <span key={i} className="px-2 py-1 rounded bg-white/5 text-xs">
              {INSTRUMENT_META[i].icon} {INSTRUMENT_META[i].name}
            </span>
          ))}
        </div>
      </div>

      {/* Koshas */}
      <div className="space-y-2">
        <h4 className="text-xs font-medium text-zinc-500">Koshas</h4>
        <div className="flex flex-wrap gap-1">
          {sadhana.koshas.map((k) => (
            <span
              key={k}
              className="px-2 py-1 rounded text-xs"
              style={{ backgroundColor: `${KOSHA_META[k].color}20`, color: KOSHA_META[k].color }}
            >
              {KOSHA_META[k].icon} {KOSHA_META[k].name}
            </span>
          ))}
        </div>
      </div>

      {/* Complements */}
      {complements.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-medium text-emerald-400">Complements</h4>
          <div className="flex flex-wrap gap-1">
            {complements.map((c) => (
              <span key={c.id} className="px-2 py-1 rounded bg-emerald-400/10 text-emerald-300 text-xs">
                {c.icon} {c.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Clashes */}
      {clashes.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-medium text-red-400">Clashes</h4>
          <div className="flex flex-wrap gap-1">
            {clashes.map((c) => (
              <span key={c.id} className="px-2 py-1 rounded bg-red-400/10 text-red-300 text-xs">
                {c.icon} {c.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Action */}
      <button
        onClick={isScheduled ? onRemove : onAdd}
        className={`w-full py-2 rounded-xl font-medium text-sm transition-all ${
          isScheduled
            ? "bg-red-500/20 text-red-300 border border-red-400/30 hover:bg-red-500/30"
            : "btn-cosmic bg-purple-500/20 text-purple-300 border border-purple-400/30 hover:bg-purple-500/30"
        }`}
      >
        {isScheduled ? "Remove from Schedule" : "Add to Schedule"}
      </button>
    </div>
  );
}
