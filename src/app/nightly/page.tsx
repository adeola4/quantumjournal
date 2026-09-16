"use client";

import { useState } from "react";
import { NIGHTLY_COMPLETION } from "@/data/qdr";

export default function Nightly() {
  const [responses, setResponses] = useState<Record<string, string>>({});

  const update = (key: string, val: string) => {
    setResponses((prev) => ({ ...prev, [key]: val }));
  };

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-2">Nightly Completion</h1>
        <p className="text-zinc-400">Resolve incompletions, release what no longer serves, and set tomorrow&apos;s intention.</p>
      </section>

      {/* Review */}
      <section className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-purple-400">Review</h2>
        {NIGHTLY_COMPLETION.review.map((q) => (
          <div key={q} className="space-y-1">
            <p className="text-sm text-zinc-300">{q}</p>
            <textarea
              value={responses[q] || ""}
              onChange={(e) => update(q, e.target.value)}
              placeholder="Your reflection..."
              className="w-full h-20 bg-black/40 border border-white/10 rounded-lg p-3 text-sm resize-none focus:outline-none focus:border-purple-400/50"
            />
          </div>
        ))}
      </section>

      {/* Completion */}
      <section className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-purple-400">Completion</h2>
        {NIGHTLY_COMPLETION.completion.map((q) => (
          <div key={q} className="space-y-1">
            <p className="text-sm text-zinc-300">{q}</p>
            <textarea
              value={responses[q] || ""}
              onChange={(e) => update(q, e.target.value)}
              placeholder="Your reflection..."
              className="w-full h-20 bg-black/40 border border-white/10 rounded-lg p-3 text-sm resize-none focus:outline-none focus:border-purple-400/50"
            />
          </div>
        ))}
      </section>

      {/* Gratitude */}
      <section className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-purple-400">Gratitude</h2>
        {NIGHTLY_COMPLETION.gratitude.map((q) => (
          <div key={q} className="space-y-1">
            <p className="text-sm text-zinc-300">{q}</p>
            <textarea
              value={responses[q] || ""}
              onChange={(e) => update(q, e.target.value)}
              placeholder="1. &#10;2. &#10;3."
              className="w-full h-24 bg-black/40 border border-white/10 rounded-lg p-3 text-sm resize-none focus:outline-none focus:border-purple-400/50"
            />
          </div>
        ))}
      </section>

      {/* Release */}
      <section className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-purple-400">Release</h2>
        {NIGHTLY_COMPLETION.release.map((q) => (
          <div key={q} className="space-y-1">
            <p className="text-sm text-zinc-300">{q}</p>
            <textarea
              value={responses[q] || ""}
              onChange={(e) => update(q, e.target.value)}
              placeholder="I release..."
              className="w-full h-20 bg-black/40 border border-white/10 rounded-lg p-3 text-sm resize-none focus:outline-none focus:border-purple-400/50"
            />
          </div>
        ))}
      </section>

      {/* Tomorrow */}
      <section className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-purple-400">Tomorrow</h2>
        {NIGHTLY_COMPLETION.tomorrow.map((q) => (
          <div key={q} className="space-y-1">
            <p className="text-sm text-zinc-300">{q}</p>
            <textarea
              value={responses[q] || ""}
              onChange={(e) => update(q, e.target.value)}
              placeholder="Your intention..."
              className="w-full h-20 bg-black/40 border border-white/10 rounded-lg p-3 text-sm resize-none focus:outline-none focus:border-purple-400/50"
            />
          </div>
        ))}
      </section>
    </div>
  );
}
