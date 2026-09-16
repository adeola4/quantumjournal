"use client";

import { useState } from "react";
import Link from "next/link";

const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: "🏠" },
  { href: "/planner", label: "Planner", icon: "📋" },
  { href: "/sadhana", label: "Sadhana", icon: "🔥" },
  { href: "/journal", label: "Journal", icon: "📝" },
  { href: "/nightly", label: "Nightly", icon: "🌙" },
  { href: "/reference", label: "Reference", icon: "📖" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/30 to-cyan-500/30 border border-purple-400/30 flex items-center justify-center">
            <span className="text-sm">🕉️</span>
          </div>
          <div>
            <span className="text-lg font-bold text-gradient">QDR</span>
            <span className="text-purple-400/60 text-xs ml-2 hidden sm:inline">Quantum Journal</span>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-all flex items-center gap-1.5"
            >
              <span className="text-xs">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
        <button
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/5"
          onClick={() => setOpen(!open)}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/5 px-4 py-2 space-y-1 bg-black/80 backdrop-blur-xl">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 py-3 px-3 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              onClick={() => setOpen(false)}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
