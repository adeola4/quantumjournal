"use client";

const MODULES = [
  { href: "/planner", icon: "📋", label: "Daily Planner", desc: "Structure your day around cosmic principles" },
  { href: "/sadhana", icon: "🔥", label: "Sadhana Builder", desc: "Build your daily practice architecture" },
  { href: "/pulse", icon: "💫", label: "Integrity Pulse", desc: "Scan your word, seal your principles" },
  { href: "/tracker", icon: "📊", label: "Nitya Tracker", desc: "Track your practice journey" },
  { href: "/journal", icon: "📝", label: "Daily Journal", desc: "Morning, midday, evening reflections" },
  { href: "/nightly", icon: "🌙", label: "Nightly Completion", desc: "Release, forgive, set intention" },
  { href: "/reference", icon: "📖", label: "Reference", desc: "Tattvas, states, faces, forces" },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen mandala-bg relative">
      <div className="max-w-4xl mx-auto px-4 py-12 relative z-10 space-y-8">
        {/* Header */}
        <section className="text-center space-y-3">
          <div className="animate-float inline-block">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-400/30 flex items-center justify-center">
              <span className="text-3xl">🕉️</span>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gradient">QDR</h1>
          <p className="text-zinc-500 text-sm">
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
          </p>
        </section>

        {/* Module Grid */}
        <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {MODULES.map((mod) => (
            <a
              key={mod.href}
              href={mod.href}
              className="glass rounded-2xl p-5 text-center group hover:scale-105 transition-all duration-300"
            >
              <span className="text-3xl group-hover:scale-110 inline-block transition-transform">{mod.icon}</span>
              <p className="text-sm font-medium mt-3">{mod.label}</p>
              <p className="text-xs text-zinc-500 mt-1">{mod.desc}</p>
            </a>
          ))}
        </section>

        {/* Footer */}
        <div className="text-center text-zinc-700 text-xs py-6 space-y-1">
          <p>NithyaCosmology • 4 Principles • 14 Forces • 25 Actions of Mahasadashiva</p>
          <p>Completion through consciousness. Society through practice.</p>
        </div>
      </div>
    </div>
  );
}
