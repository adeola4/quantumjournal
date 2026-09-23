"use client";

import { useState, useEffect, useMemo } from "react";
import {
  KOSHA_META,
  SADHANA_LIBRARY,
  type Kosha,
} from "@/data/sadhana";

interface DayEntry {
  date: string;
  practices: string[];
  totalMinutes: number;
  koshaFill: Record<Kosha, number>;
  ojas: number;
  consciousnessState: string;
  stateReport: "flat" | "settled" | "expanded" | "blissful" | "";
  weeklyReflection?: string;
}

function calculateKoshaProfile(entries: DayEntry[]): Record<Kosha, number> {
  const profile: Record<Kosha, number> = { annamaya: 0, pranamaya: 0, manomaya: 0, vijnanamaya: 0, anandamaya: 0 };
  entries.forEach((entry) => {
    (Object.keys(profile) as Kosha[]).forEach((k) => {
      profile[k] += entry.koshaFill[k] || 0;
    });
  });
  const maxVal = Math.max(...Object.values(profile), 1);
  (Object.keys(profile) as Kosha[]).forEach((k) => {
    profile[k] = Math.round((profile[k] / maxVal) * 100);
  });
  return profile;
}

function calculatePracticeFrequency(entries: DayEntry[]): Record<string, number> {
  const freq: Record<string, number> = {};
  entries.forEach((entry) => {
    entry.practices.forEach((p) => {
      freq[p] = (freq[p] || 0) + 1;
    });
  });
  return freq;
}

function getLevel(totalMinutes: number): { name: string; color: string } {
  if (totalMinutes >= 10000) return { name: "Sthitaprajna", color: "text-yellow-400" };
  if (totalMinutes >= 5000) return { name: "Siddha", color: "text-purple-400" };
  if (totalMinutes >= 2000) return { name: "Tapasvi", color: "text-cyan-400" };
  if (totalMinutes >= 1000) return { name: "Sadhaka", color: "text-emerald-400" };
  if (totalMinutes >= 500) return { name: "Arurukshu", color: "text-blue-400" };
  return { name: "Beginner", color: "text-zinc-400" };
}

function calculateStreak(entries: DayEntry[]): { current: number; best: number } {
  if (entries.length === 0) return { current: 0, best: 0 };
  const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date));
  let current = 0;
  let best = 0;
  let streak = 0;
  const today = new Date();

  for (let i = 0; i < sorted.length; i++) {
    const entryDate = new Date(sorted[i].date);
    const diffDays = Math.floor((today.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === i && sorted[i].totalMinutes > 0) {
      streak++;
      current = streak;
      best = Math.max(best, streak);
    } else if (diffDays === i) {
      break;
    } else {
      break;
    }
  }
  return { current, best };
}

export default function Tracker() {
  const [entries, setEntries] = useState<DayEntry[]>([]);
  const [showReflection, setShowReflection] = useState(false);
  const [reflectionText, setReflectionText] = useState("");
  const [selectedTab, setSelectedTab] = useState<"overview" | "history" | "insights">("overview");

  useEffect(() => {
    const saved = localStorage.getItem("qdr-sadhana-log");
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem("qdr-sadhana-log", JSON.stringify(entries));
    }
  }, [entries]);

  const profile = useMemo(() => {
    const totalMinutes = entries.reduce((sum, e) => sum + e.totalMinutes, 0);
    const avgOjas = entries.length > 0 ? entries.reduce((sum, e) => sum + e.ojas, 0) / entries.length : 0;
    const streakData = calculateStreak(entries);
    const level = getLevel(totalMinutes);
    const koshaProfile = calculateKoshaProfile(entries);
    const practiceFrequency = calculatePracticeFrequency(entries);
    const lastReflection = entries.filter((e) => e.weeklyReflection).pop()?.weeklyReflection || "";
    return {
      totalDays: entries.length,
      totalMinutes,
      avgOjas,
      streak: streakData.current,
      bestStreak: streakData.best,
      level: level.name,
      levelColor: level.color,
      koshaProfile,
      practiceFrequency,
      lastReflection,
    };
  }, [entries]);

  const today = new Date();
  const currentHour = today.getHours();
  const timeRemaining = 24 * 60 - (currentHour * 60 + today.getMinutes());
  const hoursRemaining = Math.floor(timeRemaining / 60);
  const minsRemaining = timeRemaining % 60;

  const topPractice = Object.entries(profile.practiceFrequency).sort(([, a], [, b]) => b - a)[0];
  const topPracticeName = topPractice ? SADHANA_LIBRARY.find((s) => s.id === topPractice[0])?.name || "None" : "None";

  const underKosha = (Object.entries(profile.koshaProfile) as [Kosha, number][]).sort(([, a], [, b]) => a - b)[0];
  const underKoshaName = underKosha ? KOSHA_META[underKosha[0]].name : "None";

  const last7Days = useMemo(() => {
    const days: { date: string; minutes: number; ojas: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      const entry = entries.find((e) => e.date === dateStr);
      days.push({
        date: d.toLocaleDateString("en-US", { weekday: "short" }),
        minutes: entry?.totalMinutes || 0,
        ojas: entry?.ojas || 0,
      });
    }
    return days;
  }, [entries, today]);

  const saveReflection = () => {
    if (reflectionText.trim()) {
      const todayStr = today.toISOString().split("T")[0];
      setEntries((prev) => {
        const existing = prev.find((e) => e.date === todayStr);
        if (existing) {
          return prev.map((e) => (e.date === todayStr ? { ...e, weeklyReflection: reflectionText } : e));
        }
        return [...prev, { date: todayStr, practices: [], totalMinutes: 0, koshaFill: { annamaya: 0, pranamaya: 0, manomaya: 0, vijnanamaya: 0, anandamaya: 0 }, ojas: 5, consciousnessState: "", stateReport: "", weeklyReflection: reflectionText }];
      });
      setReflectionText("");
      setShowReflection(false);
    }
  };

  const getSuggestion = (): string => {
    if (profile.totalDays === 0) return "Start with the Morning Spine: Surya Namaskar → Pranayama → Dhyana";
    if (underKosha && underKosha[1] < 50) return `Strengthen your ${KOSHA_META[underKosha[0]].name} — try ${KOSHA_META[underKosha[0]].icon} practices`;
    if (profile.avgOjas < 3) return "Your ojas is depleted — prioritize recovery: Yoga Nidra, earlier sleep, sattvic meals";
    if (profile.streak >= 7) return "Strong Nitya Anusthana! Maintain your seal practices";
    return "Balance across all koshas — follow the sequencing spine";
  };

  return (
    <div className="min-h-screen mandala-bg relative">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6 relative z-10">
        {/* Header */}
        <section className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold text-gradient">Nitya Tracker</h1>
          <p className="text-zinc-400">Your sadhana journey — measured in states, not streaks.</p>
        </section>

        {/* Yogi Spinner + Countdown */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Yogi Avatar */}
          <div className="glass rounded-2xl p-6 flex flex-col items-center justify-center">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 rounded-full border-2 border-purple-400/30 animate-orbit" />
              <div className="absolute inset-3 rounded-full border border-cyan-400/20 animate-orbit-reverse" />
              <div className="absolute inset-6 flex items-center justify-center">
                {(Object.keys(KOSHA_META) as Kosha[]).map((k, i) => {
                  const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
                  const radius = 30;
                  const x = 50 + radius * Math.cos(angle);
                  const y = 50 + radius * Math.sin(angle);
                  const fill = profile.koshaProfile[k] || 0;
                  return (
                    <div
                      key={k}
                      className="absolute w-3 h-3 rounded-full transition-all duration-1000"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        backgroundColor: fill > 70 ? KOSHA_META[k].color : fill > 30 ? `${KOSHA_META[k].color}80` : `${KOSHA_META[k].color}30`,
                        transform: `scale(${0.8 + (fill / 100) * 0.6})`,
                      }}
                    />
                  );
                })}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/30 to-cyan-500/30 border border-purple-400/40 flex items-center justify-center animate-pulse-slow">
                  <span className="text-2xl">🧘</span>
                </div>
              </div>
            </div>
            <p className={`text-sm font-semibold mt-4 ${profile.levelColor}`}>{profile.level}</p>
            <p className="text-xs text-zinc-500">{profile.totalDays} days logged</p>
          </div>

          {/* Countdown Timer */}
          <div className="glass rounded-2xl p-6 flex flex-col items-center justify-center">
            <p className="text-xs text-zinc-500 mb-2">Time Remaining Today</p>
            <div className="text-center">
              <p className="text-4xl font-bold text-purple-400 font-mono">
                {hoursRemaining}h {minsRemaining.toString().padStart(2, "0")}m
              </p>
              <p className="text-xs text-zinc-600 mt-1">until day ends</p>
            </div>
            <div className="mt-4 w-full space-y-1">
              <div className="flex justify-between text-xs text-zinc-500">
                <span>Total Practice Today</span>
                <span>{entries.find((e) => e.date === today.toISOString().split("T")[0])?.totalMinutes || 0}m</span>
              </div>
              <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full transition-all"
                  style={{ width: `${Math.min(100, ((entries.find((e) => e.date === today.toISOString().split("T")[0])?.totalMinutes || 0) / 180) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Streak + Level */}
          <div className="glass rounded-2xl p-6 flex flex-col items-center justify-center">
            <p className="text-xs text-zinc-500 mb-2">Nitya Anusthana (Streak)</p>
            <div className="text-center">
              <p className="text-4xl font-bold text-yellow-400 font-mono">{profile.streak}</p>
              <p className="text-xs text-zinc-600 mt-1">consecutive days</p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 w-full">
              <div className="text-center p-2 rounded-lg bg-black/30">
                <p className="text-lg font-bold text-cyan-400">{profile.bestStreak}</p>
                <p className="text-[10px] text-zinc-600">Best</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-black/30">
                <p className="text-lg font-bold text-emerald-400">{Math.round(profile.avgOjas)}</p>
                <p className="text-[10px] text-zinc-600">Avg Ojas</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Selector */}
        <div className="flex gap-2">
          {(["overview", "history", "insights"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                selectedTab === tab ? "bg-purple-500/20 text-purple-400 border border-purple-400/50" : "bg-white/5 text-zinc-400 border border-white/5 hover:bg-white/10"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {selectedTab === "overview" && (
          <div className="space-y-4">
            {/* Pancha Kosha Radar */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-gradient-purple">Pancha Kosha Profile</h3>
              <div className="grid grid-cols-5 gap-3">
                {(Object.keys(KOSHA_META) as Kosha[]).map((k) => {
                  const meta = KOSHA_META[k];
                  const fill = profile.koshaProfile[k] || 0;
                  return (
                    <div key={k} className="text-center space-y-2">
                      <div className="relative w-16 h-16 mx-auto">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                          <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                          <circle cx="18" cy="18" r="15" fill="none" stroke={meta.color} strokeWidth="3" strokeDasharray={`${fill} ${100 - fill}`} strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg">{meta.icon}</span>
                        </div>
                      </div>
                      <p className="text-xs font-medium" style={{ color: meta.color }}>{meta.name}</p>
                      <p className="text-xs text-zinc-500">{fill}%</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 7-Day Chart */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-gradient-purple">Last 7 Days</h3>
              <div className="flex items-end justify-between gap-2 h-32">
                {last7Days.map((day, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex flex-col items-center gap-1 flex-1 justify-end">
                      <div
                        className="w-full max-w-[30px] rounded-t bg-gradient-to-t from-purple-500/50 to-cyan-500/50 transition-all"
                        style={{ height: `${Math.max(4, (day.minutes / 180) * 100)}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-zinc-500">{day.date}</p>
                    <p className="text-[10px] text-zinc-600">{day.minutes}m</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggestion */}
            <div className="glass rounded-2xl p-4 flex items-center gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <p className="text-sm font-medium text-purple-300">Today&apos;s Suggestion</p>
                <p className="text-xs text-zinc-400">{getSuggestion()}</p>
              </div>
            </div>
          </div>
        )}

        {/* History Tab */}
        {selectedTab === "history" && (
          <div className="space-y-3">
            {entries.length === 0 ? (
              <div className="glass rounded-2xl p-8 text-center text-zinc-500">
                <span className="text-4xl block mb-3">📅</span>
                <p>No practice history yet. Start logging your sadhana!</p>
              </div>
            ) : (
              [...entries].reverse().map((entry) => {
                const dayPractices = entry.practices.map((id) => SADHANA_LIBRARY.find((s) => s.id === id)).filter(Boolean);
                return (
                  <div key={entry.date} className="glass rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">{entry.date}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-zinc-500">{entry.totalMinutes}m</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-purple-400/10 text-purple-300">{entry.consciousnessState}</span>
                        {entry.stateReport && (
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            entry.stateReport === "blissful" ? "bg-yellow-400/10 text-yellow-300" :
                            entry.stateReport === "expanded" ? "bg-cyan-400/10 text-cyan-300" :
                            entry.stateReport === "settled" ? "bg-emerald-400/10 text-emerald-300" :
                            "bg-zinc-400/10 text-zinc-300"
                          }`}>
                            {entry.stateReport}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {dayPractices.map((p) => p && (
                        <span key={p.id} className="text-xs px-2 py-1 rounded bg-white/5 text-zinc-400">
                          {p.icon} {p.name}
                        </span>
                      ))}
                    </div>
                    {entry.weeklyReflection && (
                      <p className="text-xs text-zinc-500 mt-2 italic">"{entry.weeklyReflection}"</p>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Insights Tab */}
        {selectedTab === "insights" && (
          <div className="space-y-4">
            {/* Weekly Reflection */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gradient-purple">Weekly Reflection</h3>
                <button
                  onClick={() => setShowReflection(true)}
                  className="px-3 py-1 rounded-lg bg-purple-500/20 text-purple-300 text-xs border border-purple-400/30 hover:bg-purple-500/30"
                >
                  Add Reflection
                </button>
              </div>
              {showReflection ? (
                <div className="space-y-3">
                  <textarea
                    value={reflectionText}
                    onChange={(e) => setReflectionText(e.target.value)}
                    placeholder="What actually changed in you this week — not what you did, what changed?"
                    className="w-full h-32 bg-black/40 border border-white/10 rounded-xl p-3 text-sm resize-none focus:outline-none focus:border-purple-400/50"
                  />
                  <div className="flex gap-2">
                    <button onClick={saveReflection} className="px-4 py-2 rounded-lg bg-purple-500/20 text-purple-300 text-sm border border-purple-400/30 hover:bg-purple-500/30">Save</button>
                    <button onClick={() => setShowReflection(false)} className="px-4 py-2 rounded-lg bg-white/5 text-zinc-400 text-sm hover:bg-white/10">Cancel</button>
                  </div>
                </div>
              ) : profile.lastReflection ? (
                <p className="text-sm text-zinc-400 italic">"{profile.lastReflection}"</p>
              ) : (
                <p className="text-sm text-zinc-500">No reflection yet. What changed in you this week?</p>
              )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="glass rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-purple-400">{profile.totalMinutes}</p>
                <p className="text-xs text-zinc-500 mt-1">Total Minutes</p>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-cyan-400">{Math.round(profile.totalMinutes / Math.max(1, profile.totalDays))}</p>
                <p className="text-xs text-zinc-500 mt-1">Avg/Day</p>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-yellow-400">{topPracticeName}</p>
                <p className="text-xs text-zinc-500 mt-1">Most Practiced</p>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-rose-400">{underKoshaName}</p>
                <p className="text-xs text-zinc-500 mt-1">Needs Attention</p>
              </div>
            </div>

            {/* Bad Day Protocol */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-3 text-gradient-purple">Bad Day Protocol</h3>
              <p className="text-xs text-zinc-500 mb-3">Minimum viable sadhana — never fully stop:</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { icon: "🕉️", name: "3-Minute Breath", desc: "One conscious breath cycle" },
                  { icon: "🙏", name: "One Prostration", desc: "Full surrender, 30 seconds" },
                  { icon: "📿", name: "One Mantra", desc: "Single repetition with awareness" },
                ].map((item) => (
                  <div key={item.name} className="p-3 rounded-lg bg-black/30 border border-white/5">
                    <span className="text-lg">{item.icon}</span>
                    <p className="text-sm font-medium mt-1">{item.name}</p>
                    <p className="text-xs text-zinc-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Practice Frequency */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-3 text-gradient-purple">Practice Frequency</h3>
              <div className="space-y-2">
                {Object.entries(profile.practiceFrequency)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 10)
                  .map(([id, count]) => {
                    const s = SADHANA_LIBRARY.find((s) => s.id === id);
                    if (!s) return null;
                    return (
                      <div key={id} className="flex items-center gap-3">
                        <span className="text-lg">{s.icon}</span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">{s.name}</p>
                            <p className="text-xs text-zinc-500">{count}x</p>
                          </div>
                          <div className="w-full h-1 bg-black/40 rounded-full mt-1">
                            <div className="h-full rounded-full bg-purple-400/50" style={{ width: `${Math.min(100, (count / Math.max(1, profile.totalDays)) * 100)}%` }} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
