"use client";

import { useState } from "react";

interface JournalEntry {
  time: string;
  prompt: string;
  response: string;
}

const MORNING_PROMPTS = [
  "What is my intention for today?",
  "How am I feeling? (Consciousness state)",
  "What teaching resonates with me right now?",
  "What positive thing do I want to attract?",
  "One authentic action I will take today:",
];

const MIDDAY_PROMPTS = [
  "How am I integrating the 14 Shaktis into my actions?",
  "Energy levels (1-10):",
  "Where am I experiencing resistance or flow?",
  "Which of the 4 Principles am I embodying?",
];

const EVENING_PROMPTS = [
  "How did I embody the Mukhas today?",
  "What old patterns did I dissolve (Aghora)?",
  "What did I preserve and nurture (Vamadeva)?",
  "What did I create (Sadyojata)?",
  "What am I grateful for today?",
  "What insight emerged today?",
  "One improvement for tomorrow:",
];

export default function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  const updateEntry = (prompt: string, response: string) => {
    setEntries((prev) => {
      const existing = prev.find((e) => e.prompt === prompt);
      if (existing) {
        return prev.map((e) => (e.prompt === prompt ? { ...e, response } : e));
      }
      return [...prev, { time: new Date().toLocaleTimeString(), prompt, response }];
    });
  };

  const getResponse = (prompt: string) => {
    return entries.find((e) => e.prompt === prompt)?.response || "";
  };

  const Section = ({ title, icon, prompts, color }: { title: string; icon: string; prompts: string[]; color: string }) => (
    <div className="glass rounded-2xl p-6 space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <h3 className={`text-lg font-semibold ${color}`}>{title}</h3>
      </div>
      <div className="space-y-4">
        {prompts.map((prompt) => (
          <div key={prompt} className="bg-black/30 border border-white/5 rounded-xl p-4">
            <p className="text-sm text-zinc-300 mb-2">{prompt}</p>
            <textarea
              value={getResponse(prompt)}
              onChange={(e) => updateEntry(prompt, e.target.value)}
              placeholder="Write your reflection..."
              className="w-full h-24 bg-black/40 border border-white/10 rounded-lg p-3 text-sm resize-none focus:outline-none focus:border-purple-400/50 transition-colors"
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen mandala-bg relative">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 relative z-10">
        <section className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold text-gradient">Daily Journal</h1>
          <p className="text-zinc-400">Reflect on your consciousness journey through the day.</p>
          <p className="text-sm text-zinc-600">{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</p>
        </section>

        <Section title="Morning" icon="🌅" prompts={MORNING_PROMPTS} color="text-orange-400" />
        <Section title="Midday Check-In" icon="☀️" prompts={MIDDAY_PROMPTS} color="text-yellow-400" />
        <Section title="Evening Reflection" icon="🌆" prompts={EVENING_PROMPTS} color="text-purple-400" />
      </div>
    </div>
  );
}
