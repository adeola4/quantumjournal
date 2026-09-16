"use client";

import { useState, useEffect } from "react";

interface SadhanaItem {
  id: string;
  name: string;
  icon: string;
  category: string;
  duration: number; // minutes
  intensity: number; // 1-10
  completed: boolean;
  notes: string;
}

interface DayLog {
  date: string;
  items: SadhanaItem[];
  totalMinutes: number;
  avgIntensity: number;
  consciousnessState: string;
  completionScore: number;
}

const DEFAULT_SADHANA: Omit<SadhanaItem, "id" | "completed" | "notes">[] = [
  { name: "Meditation (Dhyana)", icon: "🧘", category: "Meditation", duration: 30, intensity: 8 },
  { name: "Japa / Mantra", icon: "📿", category: "Meditation", duration: 20, intensity: 7 },
  { name: "Pranayama", icon: "🌬️", category: "Energy", duration: 15, intensity: 8 },
  { name: "Yoga / Asana", icon: "🤸", category: "Body", duration: 30, intensity: 7 },
  { name: "Scripture Study (Svadhyaya)", icon: "📖", category: "Knowledge", duration: 30, intensity: 6 },
  { name: "Self-Inquiry (Atma Vichara)", icon: "🔍", category: "Knowledge", duration: 20, intensity: 9 },
  { name: "Karma Yoga / Seva", icon: "🤲", category: "Action", duration: 60, intensity: 7 },
  { name: "Kirtan / Chanting", icon: "🎵", category: "Devotion", duration: 20, intensity: 8 },
  { name: "Silence (Mouna)", icon: "🤫", category: "Meditation", duration: 30, intensity: 7 },
  { name: "Nature Walk (Prithvi Sadhana)", icon: "🌿", category: "Body", duration: 30, intensity: 5 },
  { name: "Dream Yoga / Journal", icon: "💭", category: "Subtle", duration: 15, intensity: 6 },
  { name: "Chakra Meditation", icon: "🔮", category: "Energy", duration: 20, intensity: 9 },
  { name: "Guru Bhajan / Satsang", icon: "🙏", category: "Devotion", duration: 30, intensity: 8 },
  { name: "Fasting / Upavasa", icon: "🍽️", category: "Body", duration: 0, intensity: 7 },
  { name: "Tapas (Austerity)", icon: "🔥", category: "Energy", duration: 30, intensity: 10 },
  { name: "Yantra / Mandala", icon: "🔯", category: "Subtle", duration: 20, intensity: 7 },
  { name: "Nada Yoga (Sound)", icon: "🎶", category: "Subtle", duration: 20, intensity: 8 },
  { name: "Trataka (Concentration)", icon: "👁️", category: "Meditation", duration: 15, intensity: 9 },
];

const CATEGORIES = ["All", "Meditation", "Energy", "Body", "Knowledge", "Action", "Devotion", "Subtle"];

function getStreak(logs: DayLog[]): number {
  let streak = 0;
  const today = new Date();
  for (let i = 0; i < logs.length; i++) {
    const logDate = new Date(logs[i].date);
    const diffDays = Math.floor((today.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === i && logs[i].completionScore >= 70) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

function getLevel(totalMinutes: number): { name: string; color: string; next: number } {
  if (totalMinutes >= 480) return { name: "Mahasadhaka", color: "text-yellow-400", next: 600 };
  if (totalMinutes >= 360) return { name: "Siddha", color: "text-purple-400", next: 480 };
  if (totalMinutes >= 240) return { name: "Tapasvi", color: "text-cyan-400", next: 360 };
  if (totalMinutes >= 120) return { name: "Sadhaka", color: "text-emerald-400", next: 240 };
  if (totalMinutes >= 60) return { name: "Arurukshu", color: "text-blue-400", next: 120 };
  return { name: "Beginner", color: "text-zinc-400", next: 60 };
}

export default function Sadhana() {
  const [items, setItems] = useState<SadhanaItem[]>([]);
  const [logs, setLogs] = useState<DayLog[]>([]);
  const [filter, setFilter] = useState("All");
  const [showAdd, setShowAdd] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", icon: "⭐", category: "Meditation", duration: 20, intensity: 7 });
  const [consciousnessState, setConsciousnessState] = useState("Jagrat (Waking)");
  const [saved, setSaved] = useState(false);

  // Initialize with defaults
  useEffect(() => {
    const existing = localStorage.getItem("qdr-sadhana-items");
    if (existing) {
      setItems(JSON.parse(existing));
    } else {
      const defaults = DEFAULT_SADHANA.map((item, i) => ({
        ...item,
        id: `default-${i}`,
        completed: false,
        notes: "",
      }));
      setItems(defaults);
    }

    const savedLogs = localStorage.getItem("qdr-sadhana-logs");
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    }
  }, []);

  // Save items
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("qdr-sadhana-items", JSON.stringify(items));
    }
  }, [items]);

  // Save logs
  useEffect(() => {
    if (logs.length > 0) {
      localStorage.setItem("qdr-sadhana-logs", JSON.stringify(logs));
    }
  }, [logs]);

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const updateDuration = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, duration: Math.max(0, item.duration + delta) } : item
      )
    );
  };

  const updateIntensity = (id: string, intensity: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, intensity } : item))
    );
  };

  const updateNotes = (id: string, notes: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, notes } : item))
    );
  };

  const addItem = () => {
    if (newItem.name.trim()) {
      setItems((prev) => [
        ...prev,
        {
          ...newItem,
          id: `custom-${Date.now()}`,
          completed: false,
          notes: "",
        },
      ]);
      setNewItem({ name: "", icon: "⭐", category: "Meditation", duration: 20, intensity: 7 });
      setShowAdd(false);
    }
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const saveDay = () => {
    const today = new Date().toISOString().split("T")[0];
    const completedItems = items.filter((i) => i.completed);
    const totalMinutes = completedItems.reduce((sum, i) => sum + i.duration, 0);
    const avgIntensity = completedItems.length > 0
      ? completedItems.reduce((sum, i) => sum + i.intensity, 0) / completedItems.length
      : 0;
    const completionScore = items.length > 0 ? (completedItems.length / items.length) * 100 : 0;

    const dayLog: DayLog = {
      date: today,
      items: completedItems,
      totalMinutes,
      avgIntensity,
      consciousnessState,
      completionScore,
    };

    setLogs((prev) => {
      const filtered = prev.filter((l) => l.date !== today);
      return [...filtered, dayLog].sort((a, b) => b.date.localeCompare(a.date));
    });

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const resetDay = () => {
    setItems((prev) => prev.map((item) => ({ ...item, completed: false, notes: "" })));
  };

  const filteredItems = filter === "All" ? items : items.filter((i) => i.category === filter);
  const completedItems = items.filter((i) => i.completed);
  const totalMinutes = completedItems.reduce((sum, i) => sum + i.duration, 0);
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;
  const avgIntensity = completedItems.length > 0
    ? completedItems.reduce((sum, i) => sum + i.intensity, 0) / completedItems.length
    : 0;
  const completionScore = items.length > 0 ? Math.round((completedItems.length / items.length) * 100) : 0;
  const level = getLevel(totalMinutes);
  const streak = getStreak(logs);

  return (
    <div className="min-h-screen mandala-bg relative">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 relative z-10">
        {/* Header */}
        <section className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold text-gradient">Sadhana Tracker</h1>
          <p className="text-zinc-400">Organize and maximize your daily spiritual practice.</p>
          <p className="text-sm text-zinc-600">
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
          </p>
        </section>

        {/* Stats Bar */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="glass rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-purple-400">{totalHours}h {remainingMinutes}m</p>
            <p className="text-xs text-zinc-500 mt-1">Total Practice</p>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <p className={`text-2xl font-bold ${level.color}`}>{level.name}</p>
            <p className="text-xs text-zinc-500 mt-1">Level</p>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-cyan-400">{avgIntensity.toFixed(1)}</p>
            <p className="text-xs text-zinc-500 mt-1">Avg Intensity</p>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-yellow-400">{streak}</p>
            <p className="text-xs text-zinc-500 mt-1">Day Streak</p>
          </div>
        </section>

        {/* Progress Bar */}
        <section className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-zinc-400">Daily Progress</span>
            <span className="text-sm font-medium text-purple-400">{completionScore}%</span>
          </div>
          <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full transition-all duration-500"
              style={{ width: `${completionScore}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-zinc-600">
            <span>{completedItems.length} of {items.length} practices</span>
            <span>Next level: {level.next} min</span>
          </div>
        </section>

        {/* Consciousness State */}
        <section className="glass rounded-2xl p-6">
          <h3 className="text-sm font-medium text-zinc-400 mb-3">Pre-Practice Consciousness State</h3>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {["Sushupti", "Svapna", "Jagrat", "Turiya", "Turiyatita"].map((state) => (
              <button
                key={state}
                onClick={() => setConsciousnessState(state)}
                className={`p-2 rounded-lg text-xs text-center transition-all ${
                  consciousnessState === state
                    ? "bg-purple-500/20 border border-purple-400/50 text-purple-300"
                    : "bg-white/5 border border-white/5 text-zinc-400 hover:bg-white/10"
                }`}
              >
                {state}
              </button>
            ))}
          </div>
        </section>

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === cat
                  ? "bg-purple-500/20 text-purple-300 border border-purple-400/50"
                  : "bg-white/5 text-zinc-400 border border-white/5 hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sadhana Items */}
        <section className="space-y-3">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`glass rounded-xl p-4 transition-all ${
                item.completed ? "border-emerald-400/30 bg-emerald-400/5" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Checkbox */}
                <button
                  onClick={() => toggleItem(item.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    item.completed
                      ? "bg-emerald-500 border-emerald-400"
                      : "border-zinc-600 hover:border-purple-400"
                  }`}
                >
                  {item.completed && <span className="text-white text-xs">✓</span>}
                </button>

                {/* Icon + Name */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{item.icon}</span>
                    <span className={`font-medium text-sm ${item.completed ? "text-emerald-300" : "text-zinc-200"}`}>
                      {item.name}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-zinc-500">{item.category}</span>
                  </div>
                  {item.notes && (
                    <p className="text-xs text-zinc-500 mt-1 ml-7">{item.notes}</p>
                  )}
                </div>

                {/* Duration */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => updateDuration(item.id, -5)}
                    className="w-6 h-6 rounded bg-white/5 text-zinc-400 hover:bg-white/10 flex items-center justify-center text-xs"
                  >
                    -
                  </button>
                  <span className="text-sm font-mono w-12 text-center">{item.duration}m</span>
                  <button
                    onClick={() => updateDuration(item.id, 5)}
                    className="w-6 h-6 rounded bg-white/5 text-zinc-400 hover:bg-white/10 flex items-center justify-center text-xs"
                  >
                    +
                  </button>
                </div>

                {/* Intensity */}
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                    <button
                      key={n}
                      onClick={() => updateIntensity(item.id, n)}
                      className={`w-2 h-4 rounded-sm transition-all ${
                        n <= item.intensity
                          ? n >= 8 ? "bg-red-400" : n >= 5 ? "bg-yellow-400" : "bg-emerald-400"
                          : "bg-white/5"
                      }`}
                    />
                  ))}
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-zinc-600 hover:text-rose-400 transition-colors"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* Add New Item */}
        {showAdd ? (
          <div className="glass rounded-xl p-4 space-y-3">
            <input
              type="text"
              value={newItem.name}
              onChange={(e) => setNewItem((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Sadhana name..."
              className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-400/50"
            />
            <div className="grid grid-cols-3 gap-3">
              <select
                value={newItem.category}
                onChange={(e) => setNewItem((prev) => ({ ...prev, category: e.target.value }))}
                className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm"
              >
                {CATEGORIES.filter((c) => c !== "All").map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <input
                type="number"
                value={newItem.duration}
                onChange={(e) => setNewItem((prev) => ({ ...prev, duration: parseInt(e.target.value) || 0 }))}
                className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm"
                placeholder="Minutes"
              />
              <input
                type="number"
                value={newItem.intensity}
                onChange={(e) => setNewItem((prev) => ({ ...prev, intensity: parseInt(e.target.value) || 1 }))}
                min={1}
                max={10}
                className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm"
                placeholder="Intensity 1-10"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={addItem}
                className="px-4 py-2 rounded-lg bg-purple-500/20 text-purple-300 text-sm border border-purple-400/30 hover:bg-purple-500/30"
              >
                Add
              </button>
              <button
                onClick={() => setShowAdd(false)}
                className="px-4 py-2 rounded-lg bg-white/5 text-zinc-400 text-sm hover:bg-white/10"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowAdd(true)}
            className="w-full glass rounded-xl p-4 text-center text-zinc-500 hover:text-purple-400 hover:border-purple-400/30 transition-all"
          >
            + Add Custom Sadhana
          </button>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={saveDay}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              saved
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-400/50"
                : "btn-cosmic bg-purple-500/20 text-purple-300 border border-purple-400/30 hover:bg-purple-500/30"
            }`}
          >
            {saved ? "✓ Day Saved" : "Save Today's Practice"}
          </button>
          <button
            onClick={resetDay}
            className="px-6 py-3 rounded-xl bg-white/5 text-zinc-400 font-medium hover:bg-white/10 transition-all"
          >
            Reset
          </button>
        </div>

        {/* Recent Logs */}
        {logs.length > 0 && (
          <section className="glass rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-gradient-purple">Recent Practice</h3>
            <div className="space-y-2">
              {logs.slice(0, 7).map((log) => (
                <div key={log.date} className="flex items-center justify-between p-3 rounded-lg bg-black/30 border border-white/5">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-zinc-500">{log.date}</span>
                    <span className="text-sm font-medium">{log.totalMinutes}m</span>
                    <span className="text-xs text-zinc-500">Intensity: {log.avgIntensity.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-purple-400/10 text-purple-300">
                      {log.consciousnessState}
                    </span>
                    <span className={`text-sm font-medium ${log.completionScore >= 70 ? "text-emerald-400" : "text-yellow-400"}`}>
                      {Math.round(log.completionScore)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Level Progress */}
        <section className="glass rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-gradient-purple">Sadhana Levels</h3>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {[
              { name: "Beginner", min: 0, color: "text-zinc-400" },
              { name: "Arurukshu", min: 60, color: "text-blue-400" },
              { name: "Sadhaka", min: 120, color: "text-emerald-400" },
              { name: "Tapasvi", min: 240, color: "text-cyan-400" },
              { name: "Siddha", min: 360, color: "text-purple-400" },
              { name: "Mahasadhaka", min: 480, color: "text-yellow-400" },
            ].map((l) => (
              <div
                key={l.name}
                className={`p-3 rounded-xl text-center transition-all ${
                  level.name === l.name ? "bg-white/10 border border-purple-400/30" : "bg-white/5 border border-white/5"
                }`}
              >
                <p className={`text-sm font-medium ${l.color}`}>{l.name}</p>
                <p className="text-xs text-zinc-600 mt-1">{l.min}+ min</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
