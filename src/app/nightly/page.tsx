"use client";

import { useState } from "react";
import { NIGHTLY_COMPLETION } from "@/data/qdr";

export default function Nightly() {
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [completed, setCompleted] = useState(false);

  const update = (key: string, val: string) => {
    setResponses((prev) => ({ ...prev, [key]: val }));
  };

  const handleComplete = () => {
    setCompleted(true);
    setTimeout(() => setCompleted(false), 3000);
  };

  return (
    <div className="min-h-screen mandala-bg relative">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 relative z-10">
        <section className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold text-gradient">Nightly Completion</h1>
          <p className="text-zinc-400">Resolve incompletions, release what no longer serves, and set tomorrow&apos;s intention.</p>
          <p className="text-sm text-zinc-600">{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</p>
        </section>

        {/* Review */}
        <div className="glass rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🔍</span>
            <h2 className="text-xl font-semibold text-purple-400">Review</h2>
          </div>
          {NIGHTLY_COMPLETION.review.map((q) => (
            <div key={q} className="bg-black/30 border border-white/5 rounded-xl p-4">
              <p className="text-sm text-zinc-300 mb-2">{q}</p>
              <textarea
                value={responses[q] || ""}
                onChange={(e) => update(q, e.target.value)}
                placeholder="Your reflection..."
                className="w-full h-20 bg-black/40 border border-white/10 rounded-lg p-3 text-sm resize-none focus:outline-none focus:border-purple-400/50 transition-colors"
              />
            </div>
          ))}
        </div>

        {/* Completion */}
        <div className="glass rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🔮</span>
            <h2 className="text-xl font-semibold text-purple-400">Completion</h2>
          </div>
          {NIGHTLY_COMPLETION.completion.map((q) => (
            <div key={q} className="bg-black/30 border border-white/5 rounded-xl p-4">
              <p className="text-sm text-zinc-300 mb-2">{q}</p>
              <textarea
                value={responses[q] || ""}
                onChange={(e) => update(q, e.target.value)}
                placeholder="Your reflection..."
                className="w-full h-20 bg-black/40 border border-white/10 rounded-lg p-3 text-sm resize-none focus:outline-none focus:border-purple-400/50 transition-colors"
              />
            </div>
          ))}
        </div>

        {/* Gratitude */}
        <div className="glass rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🙏</span>
            <h2 className="text-xl font-semibold text-yellow-400">Gratitude</h2>
          </div>
          {NIGHTLY_COMPLETION.gratitude.map((q) => (
            <div key={q} className="bg-black/30 border border-white/5 rounded-xl p-4">
              <p className="text-sm text-zinc-300 mb-2">{q}</p>
              <textarea
                value={responses[q] || ""}
                onChange={(e) => update(q, e.target.value)}
                placeholder="1. &#10;2. &#10;3."
                className="w-full h-24 bg-black/40 border border-white/10 rounded-lg p-3 text-sm resize-none focus:outline-none focus:border-purple-400/50 transition-colors"
              />
            </div>
          ))}
        </div>

        {/* Release */}
        <div className="glass rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🕊️</span>
            <h2 className="text-xl font-semibold text-cyan-400">Release</h2>
          </div>
          {NIGHTLY_COMPLETION.release.map((q) => (
            <div key={q} className="bg-black/30 border border-white/5 rounded-xl p-4">
              <p className="text-sm text-zinc-300 mb-2">{q}</p>
              <textarea
                value={responses[q] || ""}
                onChange={(e) => update(q, e.target.value)}
                placeholder="I release..."
                className="w-full h-20 bg-black/40 border border-white/10 rounded-lg p-3 text-sm resize-none focus:outline-none focus:border-purple-400/50 transition-colors"
              />
            </div>
          ))}
        </div>

        {/* Tomorrow */}
        <div className="glass rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌅</span>
            <h2 className="text-xl font-semibold text-orange-400">Tomorrow</h2>
          </div>
          {NIGHTLY_COMPLETION.tomorrow.map((q) => (
            <div key={q} className="bg-black/30 border border-white/5 rounded-xl p-4">
              <p className="text-sm text-zinc-300 mb-2">{q}</p>
              <textarea
                value={responses[q] || ""}
                onChange={(e) => update(q, e.target.value)}
                placeholder="Your intention..."
                className="w-full h-20 bg-black/40 border border-white/10 rounded-lg p-3 text-sm resize-none focus:outline-none focus:border-purple-400/50 transition-colors"
              />
            </div>
          ))}
        </div>

        {/* Complete Button */}
        <div className="text-center">
          <button
            onClick={handleComplete}
            className={`px-8 py-3 rounded-xl font-medium transition-all ${
              completed
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-400/50"
                : "btn-cosmic bg-purple-500/20 text-purple-300 border border-purple-400/30 hover:bg-purple-500/30"
            }`}
          >
            {completed ? "✓ Completion Recorded" : "Mark Completion"}
          </button>
        </div>
      </div>
    </div>
  );
}
