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

  const Section = ({ title, prompts }: { title: string; prompts: string[] }) => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-purple-400">{title}</h3>
      <div className="space-y-4">
        {prompts.map((prompt) => (
          <div key={prompt} className="bg-zinc-900/50 border border-white/10 rounded-xl p-4">
            <p className="text-sm text-zinc-300 mb-2">{prompt}</p>
            <textarea
              value={getResponse(prompt)}
              onChange={(e) => updateEntry(prompt, e.target.value)}
              placeholder="Write your reflection..."
              className="w-full h-24 bg-black/40 border border-white/10 rounded-lg p-3 text-sm resize-none focus:outline-none focus:border-purple-400/50"
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-2">Daily Journal</h1>
        <p className="text-zinc-400">Reflect on your consciousness journey through the day.</p>
      </section>

      <Section title="🌅 Morning" prompts={MORNING_PROMPTS} />
      <Section title="☀️ Midday Check-In" prompts={MIDDAY_PROMPTS} />
      <Section title="🌙 Evening Reflection" prompts={EVENING_PROMPTS} />
    </div>
  );
}
