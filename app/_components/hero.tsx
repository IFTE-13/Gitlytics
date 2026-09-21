"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import {
  ArrowRight,
  CornerDownLeft,
  Terminal,
  Settings2,
  Sliders,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { HeroParticleSphere } from "./hero-particle-sphere";

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

const ACCENT_PRESETS = [
  { id: "iris", color: "#6366f1", label: "Iris" },
  { id: "amber", color: "#f59e0b", label: "Amber" },
  { id: "cobalt", color: "#38bdf8", label: "Cobalt" },
  { id: "emerald", color: "#10b981", label: "Emerald" },
  { id: "vermilion", color: "#f43f5e", label: "Vermilion" },
];

export function Header({
  username,
  setUsername,
  onSubmit,
  isLoading,
  onSelectSuggested,
}: HeaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // System Calibration States
  const [fluxDynamics, setFluxDynamics] = useState(0.6);
  const [processingThreads, setProcessingThreads] = useState(0.9);
  const [density, setDensity] = useState(0.8);
  const [activeAccent, setActiveAccent] = useState("iris");

  // Read accent on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("gitlytics-accent");
      if (saved && ACCENT_PRESETS.some((a) => a.id === saved)) {
        setActiveAccent(saved);
      }
    } catch {
      // Ignore
    }
  }, []);

  const handleAccentPick = (accentId: string) => {
    setActiveAccent(accentId);
    document.documentElement.dataset.accent = accentId;
    localStorage.setItem("gitlytics-accent", accentId);
  };

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

  const currentAccentColor =
    ACCENT_PRESETS.find((a) => a.id === activeAccent)?.color || "#6366f1";

  return (
    <section className="relative w-full border-b border-border bg-background technical-grid pt-10 pb-16 lg:pt-16 lg:pb-20 overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/8 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: FlowForge-Style Typography & Command Deck */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-6 space-y-6"
          >
            {/* Telemetry Status Badge */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm border border-border bg-card/60 backdrop-blur-xs font-mono text-[11px] text-muted-foreground shadow-2xs">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="tracking-widest uppercase font-semibold">
                OPERATIONAL INTELLIGENCE
              </span>
            </div>

            {/* FlowForge High-Impact 2-Tone Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.04] font-display">
                <span className="text-foreground block">Deconstruct</span>
                <span className="text-foreground/35 block">Everything.</span>
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground font-sans leading-relaxed max-w-xl">
                From individual commit cadence to full multi-repo architecture, we eliminate manual code profiling. Unlocking true operational developer velocity and exportable Gitcards.
              </p>
            </div>

            {/* Command Search Deck */}
            <form onSubmit={onSubmit} className="pt-2 space-y-2.5">
              <div className="surface-panel-interactive p-1.5 rounded-lg border-2 border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all shadow-xs backdrop-blur-sm bg-card/70">
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
                        <span className="hidden sm:inline">PROCESSING...</span>
                      </>
                    ) : (
                      <>
                        <span>Initialize System</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Engine Status & Keyboard hints */}
              <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground px-1">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold text-[10px]">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    System Online
                  </span>
                  <span className="text-muted-foreground/70 hidden sm:inline">
                    // REST v3 API PROXY
                  </span>
                </div>

                <span className="hidden sm:inline text-[10px]">
                  PRESS <kbd className="px-1 py-0.5 rounded border border-border bg-secondary">ENTER</kbd> OR <kbd className="px-1 py-0.5 rounded border border-border bg-secondary">/</kbd>
                </span>
              </div>
            </form>

            {/* Quick Preset Developer Profiles */}
            <div className="space-y-2 pt-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Terminal className="h-3 w-3 text-primary" />
                <span>Benchmark Profiles:</span>
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
            </div>

            {/* FlowForge Bottom Spec Footer */}
            <div className="pt-3 border-t border-border/70 flex flex-wrap items-center gap-x-5 gap-y-1 text-[11px] font-mono text-muted-foreground/80">
              <span>Protocol REST v3</span>
              <span>•</span>
              <span>Encrypted Public Tunnel</span>
              <span>•</span>
              <span className="text-amber-500 font-medium">Public API Scope (Zero Private Data)</span>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: FlowForge 3D Particle Sphere & System Calibration HUD */}
          <div className="lg:col-span-6 relative min-h-[460px] sm:min-h-[500px] flex items-center justify-center">
            
            {/* 3D Particle Sphere Canvas */}
            <div className="w-full h-[460px] sm:h-[500px] relative flex items-center justify-center">
              <HeroParticleSphere
                fluxDynamics={fluxDynamics}
                processingThreads={processingThreads}
                density={density}
                accentColor={currentAccentColor}
              />

              {/* FlowForge Connected Telemetry Link Box */}
              <div className="absolute right-4 sm:right-6 bottom-28 sm:bottom-32 z-20 pointer-events-none hidden sm:flex items-center gap-3">
                <div className="p-3 rounded-lg border border-border bg-card/90 backdrop-blur-md font-mono text-[11px] space-y-1.5 shadow-lg min-w-[150px]">
                  <div className="flex items-center gap-1.5 font-bold text-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>WSS_Link.01</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Packets</span>
                    <span className="text-foreground font-semibold">14.2k/s</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Latency</span>
                    <span className="text-emerald-500 font-semibold">8ms</span>
                  </div>
                </div>

                {/* Dashed connector line */}
                <div className="w-8 border-t border-dashed border-border/80 relative">
                  <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full border border-border bg-card" />
                </div>
              </div>

              {/* FlowForge System Calibration Control HUD */}
              <div className="absolute right-0 bottom-0 z-20 w-full max-w-[280px] p-4 rounded-xl border border-border bg-card/90 backdrop-blur-md shadow-xl font-mono text-xs space-y-3.5">
                
                {/* Calibration Header */}
                <div className="flex items-center justify-between border-b border-border pb-2.5">
                  <span className="font-bold text-foreground tracking-wide flex items-center gap-1.5">
                    <Sliders className="h-3.5 w-3.5 text-primary" />
                    System Calibration
                  </span>
                  <Settings2 className="h-3.5 w-3.5 text-muted-foreground" />
                </div>

                {/* Slider 1: Flux Dynamics */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-muted-foreground">
                    <span>Flux Dynamics</span>
                    <span className="text-foreground font-bold">{fluxDynamics.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="1.0"
                    step="0.1"
                    value={fluxDynamics}
                    onChange={(e) => setFluxDynamics(parseFloat(e.target.value))}
                    className="w-full h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                {/* Slider 2: Processing Threads */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-muted-foreground">
                    <span>Processing Threads</span>
                    <span className="text-foreground font-bold">{processingThreads.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="1.0"
                    step="0.1"
                    value={processingThreads}
                    onChange={(e) => setProcessingThreads(parseFloat(e.target.value))}
                    className="w-full h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                {/* Mini Sliders Row: Clock Rate & Density */}
                <div className="grid grid-cols-2 gap-3 pt-0.5">
                  <div className="space-y-1">
                    <div className="text-[10px] text-muted-foreground">Clock Rate</div>
                    <input
                      type="range"
                      min="0.3"
                      max="1.0"
                      step="0.1"
                      defaultValue="0.7"
                      className="w-full h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] text-muted-foreground">Density</div>
                    <input
                      type="range"
                      min="0.3"
                      max="1.0"
                      step="0.1"
                      value={density}
                      onChange={(e) => setDensity(parseFloat(e.target.value))}
                      className="w-full h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  </div>
                </div>

                {/* Energy Profile (Theme Accent Switcher Dots) */}
                <div className="pt-2 border-t border-border flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground">Energy Profile</span>
                  <div className="flex items-center gap-1.5">
                    {ACCENT_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleAccentPick(preset.id)}
                        title={`Switch accent to ${preset.label}`}
                        className={`h-3.5 w-3.5 rounded-full transition-transform cursor-pointer ${
                          activeAccent === preset.id
                            ? "scale-125 ring-2 ring-foreground ring-offset-1 ring-offset-card"
                            : "opacity-70 hover:opacity-100 hover:scale-110"
                        }`}
                        style={{ backgroundColor: preset.color }}
                      />
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}