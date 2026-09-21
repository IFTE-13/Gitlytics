"use client";

import { useEffect, useRef, FormEvent } from "react";
import { Search, ArrowRight, CornerDownLeft, Sparkles, Terminal } from "lucide-react";
import { motion } from "motion/react";
import { HeroNetworkCanvas } from "./hero-network-canvas";

interface HeaderProps {
  username: string;
  setUsername: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
  isLoading: boolean;
  onSelectSuggested?: (username: string) => void;
}

const FEATURED_DEVELOPERS = [
  { handle: "torvalds", label: "Linus Torvalds", role: "Kernel Architect" },
  { handle: "shadcn", label: "shadcn", role: "UI Systems" },
  { handle: "leerob", label: "Lee Robinson", role: "DX Lead" },
  { handle: "sindresorhus", label: "Sindre Sorhus", role: "OSS Pillar" },
  { handle: "gaearon", label: "Dan Abramov", role: "React Core" },
  { handle: "octocat", label: "The Octocat", role: "GitHub Mascot" },
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
    <section className="relative w-full border-b border-border technical-grid pt-12 pb-14 sm:pt-16 sm:pb-18 lg:pt-20 lg:pb-20 overflow-hidden">
      {/* Animated Git Commit & Topology Network Canvas */}
      <HeroNetworkCanvas />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Typographic Masthead & Command Deck */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6 sm:space-y-7"
          >
            {/* Telemetry micro-tag */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm border border-border bg-secondary/80 font-mono text-xs text-muted-foreground backdrop-blur-xs shadow-2xs"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span>GITHUB TELEMETRY & ARCHIVAL DISASSEMBLER</span>
            </motion.div>

            {/* Editorial Main Headline */}
            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.15 }}
                className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.08] font-display"
              >
                Disassemble any GitHub codebase footprint.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.22 }}
                className="text-base sm:text-lg text-muted-foreground max-w-2xl font-sans leading-relaxed pt-1"
              >
                Transform public repositories, commit cadence, and language byte gravity into an understandable, editorial developer dossier.
              </motion.p>
            </div>

            {/* Command Input Deck */}
            <motion.form
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              onSubmit={onSubmit}
              className="pt-2"
            >
              <div className="surface-panel-interactive p-1.5 rounded-lg border-2 border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all shadow-xs backdrop-blur-sm">
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
                    className="flex-1 bg-transparent py-2.5 px-2 text-sm sm:text-base font-mono text-foreground placeholder:text-muted-foreground/50 focus:outline-hidden"
                  />

                  <button
                    type="submit"
                    disabled={isLoading || !username.trim()}
                    className="h-10 px-4 sm:px-5 rounded bg-primary text-primary-foreground font-mono text-xs sm:text-sm font-semibold hover:opacity-95 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2 shrink-0 cursor-pointer shadow-xs"
                  >
                    {isLoading ? (
                      <>
                        <span className="h-3.5 w-3.5 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                        <span className="hidden sm:inline">DISASSEMBLING...</span>
                      </>
                    ) : (
                      <>
                        <span>INSPECT</span>
                        <CornerDownLeft className="h-3.5 w-3.5 opacity-80" />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Input sub-bar with shortcut reminder */}
              <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground mt-2 px-1">
                <span>PRESS <kbd className="px-1 py-0.5 rounded border border-border bg-secondary text-[10px]">ENTER</kbd> TO RUN QUERY</span>
                <span className="hidden sm:inline">FOCUS WITH <kbd className="px-1 py-0.5 rounded border border-border bg-secondary text-[10px]">/</kbd> OR <kbd className="px-1 py-0.5 rounded border border-border bg-secondary text-[10px]">⌘K</kbd></span>
              </div>
            </motion.form>

            {/* Quick Benchmark Handles */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.38 }}
              className="space-y-2 pt-2"
            >
              <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Terminal className="h-3 w-3 text-primary" />
                <span>Preset Developer Profiles:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
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
                    className={`text-xs font-mono px-2.5 py-1 rounded border transition-all cursor-pointer ${
                      username.toLowerCase() === dev.handle.toLowerCase()
                        ? "border-primary bg-primary/10 text-primary font-semibold ring-1 ring-primary/30"
                        : "border-border bg-secondary/60 text-muted-foreground hover:border-foreground/30 hover:text-foreground hover:bg-secondary backdrop-blur-xs"
                    }`}
                  >
                    @{dev.handle}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Live Diagnostic Specimen & Blueprint Preview */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <div className="surface-panel p-5 sm:p-6 border border-border rounded-lg bg-card/85 backdrop-blur-md relative overflow-hidden font-mono text-xs shadow-xs">
              {/* Top status bar */}
              <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span className="font-bold text-foreground tracking-wide">INDEXING SPECS</span>
                </div>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                  REST API v3
                </span>
              </div>

              {/* Data Extraction Points */}
              <div className="space-y-3 font-sans text-muted-foreground">
                <motion.div
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-start gap-3 p-2.5 rounded bg-secondary/40 border border-border/60"
                >
                  <div className="font-mono text-primary font-bold text-xs shrink-0 w-6">01</div>
                  <div>
                    <div className="text-foreground font-semibold text-xs">Byte-Density Distribution</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">Aggregates exact code volume across all public repositories with linguistic entropy analysis.</div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-start gap-3 p-2.5 rounded bg-secondary/40 border border-border/60"
                >
                  <div className="font-mono text-primary font-bold text-xs shrink-0 w-6">02</div>
                  <div>
                    <div className="text-foreground font-semibold text-xs">Community Stargazer Velocity</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">Calculates star-to-fork traction metrics and isolates flagship open-source repositories.</div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-start gap-3 p-2.5 rounded bg-secondary/40 border border-border/60"
                >
                  <div className="font-mono text-primary font-bold text-xs shrink-0 w-6">03</div>
                  <div>
                    <div className="text-foreground font-semibold text-xs">Developer Archetype Synthesis</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">Categorizes developer focus (Systems, Web, Core Infrastructure) based on verified commits.</div>
                  </div>
                </motion.div>
              </div>

              {/* Monospace telemetry footer */}
              <div className="mt-4 pt-3 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 text-[10px] font-mono text-muted-foreground">
                <span>RATE LIMIT: 60/HR (PUBLIC API)</span>
                <span className="text-amber-500 font-medium">PRIVATE CONTRIBUTIONS EXCLUDED</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}