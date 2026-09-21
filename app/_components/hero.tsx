"use client";

import { useEffect, useRef, FormEvent } from "react";
import {
  ArrowRight,
  CornerDownLeft,
  Terminal,
  Monitor,
  Sparkles,
  ShieldAlert,
} from "lucide-react";
import { motion } from "motion/react";
import {
  HeroPixelClusterLeft,
  HeroPixelClusterRight,
} from "./hero-pixel-doodles";

interface HeaderProps {
  username: string;
  setUsername: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
  isLoading: boolean;
  onSelectSuggested?: (username: string) => void;
}

const FEATURED_DEVELOPERS = [
  { handle: "torvalds", label: "Linus Torvalds" },
  { handle: "shadcn", label: "shadcn" },
  { handle: "leerob", label: "Lee Robinson" },
  { handle: "antfu", label: "Anthony Fu" },
  { handle: "sindresorhus", label: "Sindre Sorhus" },
  { handle: "gaearon", label: "Dan Abramov" },
];

export function Header({
  username,
  setUsername,
  onSubmit,
  isLoading,
  onSelectSuggested,
}: HeaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut: pressing "/" or "Cmd+K" focuses search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === "/" || ((e.metaKey || e.ctrlKey) && e.key === "k")) &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section className="relative w-full border-b border-border bg-background pt-14 pb-20 sm:pt-20 sm:pb-28 overflow-hidden min-h-[580px] sm:min-h-[640px] flex items-center justify-center">
      
      {/* 1. Bottom-Left Pixel Art Doodle Cluster */}
      <HeroPixelClusterLeft />

      {/* 2. Bottom-Right Pixel Art Doodle Cluster */}
      <HeroPixelClusterRight />

      {/* Center Container */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-20 text-center space-y-7">
        
        {/* Top Centered Pixel Computer Badge */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-secondary/70 backdrop-blur-xs font-mono text-xs text-foreground shadow-2xs"
        >
          {/* Pixel Retro Computer Icon */}
          <span className="text-sm select-none">🖥️</span>
          <span className="font-semibold tracking-wide text-muted-foreground uppercase text-[11px]">
            Developer Intelligence &amp; Repository Analytics
          </span>
        </motion.div>

        {/* Centered Large Editorial Display Headline */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground font-display leading-[1.08] max-w-3xl mx-auto">
            The developer intelligence platform that reveals it all.
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground font-sans max-w-2xl mx-auto leading-relaxed pt-1">
            One unified dossier for all your public GitHub activity. Ground-truth metrics. Zero synthetic fluff. High-precision byte gravity, linguistic cadence, and shareable Gitcards.
          </p>
        </motion.div>

        {/* Centered Command Search Deck */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="pt-2 max-w-xl mx-auto space-y-4"
        >
          <form onSubmit={onSubmit} className="relative">
            <div className="surface-panel-interactive p-1.5 sm:p-2 rounded-xl border-2 border-border focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all shadow-md bg-card/90 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <div className="flex items-center pl-3 text-muted-foreground font-mono text-xs sm:text-sm select-none shrink-0 border-r border-border pr-3">
                  <span className="text-muted-foreground/60">github.com/</span>
                </div>

                <input
                  ref={inputRef}
                  id="username-input"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="octocat, torvalds, shadcn..."
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck="false"
                  className="flex-1 bg-transparent py-2.5 px-2 text-sm sm:text-base font-mono text-foreground placeholder:text-muted-foreground/45 focus:outline-hidden"
                />

                {/* Main Action Button with Chromatic Corner Swatch */}
                <button
                  type="submit"
                  disabled={isLoading || !username.trim()}
                  className="relative h-11 px-5 sm:px-6 rounded-lg bg-foreground text-background font-mono text-xs sm:text-sm font-bold tracking-wider hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2 shrink-0 cursor-pointer shadow-md overflow-hidden group"
                >
                  {/* Chromatic Corner Pixel Swatch (from the reference button) */}
                  <span className="absolute top-0 left-0 w-3 h-3 flex flex-wrap pointer-events-none">
                    <span className="w-1.5 h-1.5 bg-amber-400" />
                    <span className="w-1.5 h-1.5 bg-cyan-400" />
                    <span className="w-1.5 h-1.5 bg-rose-500" />
                    <span className="w-1.5 h-1.5 bg-emerald-400" />
                  </span>

                  {isLoading ? (
                    <>
                      <span className="h-4 w-4 rounded-full border-2 border-background border-t-transparent animate-spin" />
                      <span className="hidden sm:inline">INSPECTING...</span>
                    </>
                  ) : (
                    <>
                      <span>INSPECT FOOTPRINT</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Status Badge (like reference: "Accepting new clients") */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs font-mono text-muted-foreground pt-1">
            <div className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-xs bg-emerald-400 dark:bg-emerald-500 shrink-0 animate-pulse" />
              <span className="text-foreground font-semibold">GitHub REST API Online</span>
              <span className="text-muted-foreground/60">//</span>
              <span>Public Scope</span>
            </div>

            <div className="hidden sm:flex items-center gap-1 text-[11px] text-muted-foreground/80">
              <span>(Zero Auth Required · Private Excluded)</span>
            </div>
          </div>

          {/* Quick Benchmark Preset Handles */}
          <div className="pt-2 space-y-2">
            <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground flex items-center justify-center gap-1.5">
              <Terminal className="h-3 w-3 text-primary" />
              <span>Benchmark Profiles:</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {FEATURED_DEVELOPERS.map((dev) => (
                <button
                  key={dev.handle}
                  type="button"
                  onClick={() => {
                    setUsername(dev.handle);
                    if (onSelectSuggested) {
                      onSelectSuggested(dev.handle);
                    }
                  }}
                  className={`text-xs font-mono px-2.5 py-1 rounded-md border transition-all cursor-pointer ${
                    username.toLowerCase() === dev.handle.toLowerCase()
                      ? "border-primary bg-primary/10 text-primary font-bold ring-1 ring-primary/30"
                      : "border-border bg-secondary/50 text-muted-foreground hover:border-foreground/40 hover:text-foreground hover:bg-secondary backdrop-blur-xs"
                  }`}
                >
                  @{dev.handle}
                </button>
              ))}
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}