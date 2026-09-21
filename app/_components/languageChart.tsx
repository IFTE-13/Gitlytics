"use client";

import { useState, useMemo } from "react";
import {
  Code2,
  Filter,
  X,
  Layers,
  Sparkles,
  Cpu,
  Binary,
  Compass,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { Language } from "@/lib/types";

interface LanguageChartProps {
  languages: Language[];
  selectedLanguage?: string | null;
  onSelectLanguage?: (lang: string | null) => void;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// Categorize paradigm
function getParadigm(name: string): { label: string; type: "compiled" | "interpreted" | "typesafe" | "markup" } {
  const n = name.toLowerCase();
  if (["c", "c++", "rust", "zig", "go", "swift", "kotlin", "assembly"].includes(n)) {
    return { label: "COMPILED", type: "compiled" };
  }
  if (["typescript", "scala", "c#", "java"].includes(n)) {
    return { label: "TYPE-SAFE", type: "typesafe" };
  }
  if (["html", "css", "scss", "markdown", "tex"].includes(n)) {
    return { label: "MARKUP / STYLE", type: "markup" };
  }
  return { label: "INTERPRETED", type: "interpreted" };
}

export function LanguageChart({
  languages,
  selectedLanguage,
  onSelectLanguage,
}: LanguageChartProps) {
  const [hoveredLanguage, setHoveredLanguage] = useState<string | null>(null);

  if (!languages || languages.length === 0) return null;

  const totalBytes = useMemo(
    () => languages.reduce((sum, l) => sum + l.value, 0),
    [languages]
  );

  // Calculate compiled vs interpreted ratio
  const { compiledBytes, interpretedBytes, polyglotScore } = useMemo(() => {
    let comp = 0;
    let inter = 0;
    languages.forEach((l) => {
      const p = getParadigm(l.name);
      if (p.type === "compiled") comp += l.value;
      else inter += l.value;
    });

    // Shannon entropy-based polyglot quotient (0-10)
    let entropy = 0;
    languages.forEach((l) => {
      const p = l.percentage / 100;
      if (p > 0) entropy -= p * Math.log2(p);
    });
    const maxEntropy = Math.log2(Math.max(2, languages.length));
    const score = Math.min(10, Math.max(1, (entropy / maxEntropy) * 10));

    return {
      compiledBytes: comp,
      interpretedBytes: inter,
      polyglotScore: Math.round(score * 10) / 10,
    };
  }, [languages]);

  const activeLang = useMemo(() => {
    if (hoveredLanguage) return languages.find((l) => l.name === hoveredLanguage) || null;
    if (selectedLanguage) return languages.find((l) => l.name === selectedLanguage) || null;
    return languages[0] || null;
  }, [hoveredLanguage, selectedLanguage, languages]);

  // Top 6 languages for concentric radial rings
  const ringLanguages = languages.slice(0, 6);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4"
    >
      <div className="surface-panel rounded-xl border border-border bg-card/90 p-6 sm:p-8 shadow-xs relative overflow-hidden backdrop-blur-md">
        
        {/* Subtle background gradient glow */}
        <div
          className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-15 transition-colors duration-500"
          style={{ backgroundColor: activeLang?.color || "var(--primary)" }}
        />

        {/* Section Masthead */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-border mb-6 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">
                LINGUISTIC ENTROPY & CODE VOLUME ANALYSIS
              </span>
            </div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-foreground tracking-tight">
              Linguistic Spectrum & Byte Gravity
            </h3>
            <p className="text-xs text-muted-foreground font-sans">
              Calculated across <strong className="text-foreground font-mono">{formatBytes(totalBytes)}</strong> of compiled, scripted, and structured source repositories.
            </p>
          </div>

          {/* Active Filter Clear Tag */}
          {selectedLanguage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 self-start sm:self-center"
            >
              <span className="text-xs font-mono text-muted-foreground">Isolating:</span>
              <button
                type="button"
                onClick={() => onSelectLanguage?.(null)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-primary/10 border border-primary/40 text-primary font-mono text-xs font-semibold hover:bg-primary/20 transition-all cursor-pointer shadow-2xs"
              >
                <span>{selectedLanguage}</span>
                <X className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          )}
        </div>

        {/* 1. Proportional Illuminated Spectrum Continuum */}
        <div className="space-y-2 mb-8">
          <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Compass className="h-3 w-3 text-primary" />
              <span>CONTINUOUS BYTE DENSITY STREAM</span>
            </span>
            <span>100% CODE GRAVITY DISTRIBUTION</span>
          </div>

          {/* Multi-segmented glowing progress rail */}
          <div className="h-5 w-full rounded-md overflow-hidden flex bg-secondary/80 border border-border p-[1px] gap-[1.5px] shadow-inner relative">
            {languages.map((lang) => {
              const isSelected = selectedLanguage === lang.name;
              const isHovered = hoveredLanguage === lang.name;
              const widthPct = Math.max(0.7, lang.percentage);

              return (
                <div
                  key={lang.name}
                  style={{
                    width: `${widthPct}%`,
                    backgroundColor: lang.color,
                  }}
                  className={`h-full transition-all cursor-pointer relative group rounded-xs ${
                    isSelected ? "ring-2 ring-primary ring-offset-1 ring-offset-card z-10" : ""
                  } ${hoveredLanguage && !isHovered ? "opacity-30 scale-y-90" : "opacity-100 hover:opacity-95"}`}
                  onMouseEnter={() => setHoveredLanguage(lang.name)}
                  onMouseLeave={() => setHoveredLanguage(null)}
                  onClick={() => onSelectLanguage?.(isSelected ? null : lang.name)}
                  title={`${lang.name}: ${lang.percentage}% (${formatBytes(lang.value)}) — Click to filter`}
                />
              );
            })}
          </div>
        </div>

        {/* 2. Interactive Concentric Radial Orbit & Metric Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
          
          {/* LEFT: Concentric Radial Orbit Gauge (Custom SVG Instrument) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="w-[280px] h-[280px] relative flex items-center justify-center select-none">
              
              {/* SVG Radial Instrument */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 280 280">
                <defs>
                  {/* Subtle glow filter */}
                  <filter id="orbit-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Outer subtle calibration ticks ring */}
                <circle
                  cx="140"
                  cy="140"
                  r="132"
                  fill="none"
                  stroke="var(--border)"
                  strokeWidth="1"
                  strokeDasharray="2 6"
                  opacity="0.6"
                />

                {/* Background tracks and animated active arcs */}
                {ringLanguages.map((lang, idx) => {
                  const radius = 120 - idx * 16;
                  const circumference = 2 * Math.PI * radius;
                  const pct = lang.percentage / 100;
                  const strokeLength = circumference * pct;
                  const strokeOffset = circumference - strokeLength;
                  const isHovered = activeLang?.name === lang.name;

                  return (
                    <g key={lang.name}>
                      {/* Background Faint Track */}
                      <circle
                        cx="140"
                        cy="140"
                        r={radius}
                        fill="none"
                        stroke="var(--secondary)"
                        strokeWidth={isHovered ? 7 : 5}
                        opacity="0.5"
                      />

                      {/* Animated Arc */}
                      <motion.circle
                        cx="140"
                        cy="140"
                        r={radius}
                        fill="none"
                        stroke={lang.color}
                        strokeWidth={isHovered ? 8 : 6}
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: strokeOffset }}
                        transition={{ duration: 1.1, delay: idx * 0.1, ease: "easeOut" }}
                        strokeLinecap="round"
                        className="transition-all cursor-pointer"
                        filter={isHovered ? "url(#orbit-glow)" : undefined}
                        opacity={hoveredLanguage && !isHovered ? 0.3 : 1}
                        onMouseEnter={() => setHoveredLanguage(lang.name)}
                        onMouseLeave={() => setHoveredLanguage(null)}
                        onClick={() => onSelectLanguage?.(selectedLanguage === lang.name ? null : lang.name)}
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Central Telemetry Readout */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 pointer-events-none">
                <AnimatePresence mode="wait">
                  {activeLang ? (
                    <motion.div
                      key={activeLang.name}
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.92 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-1"
                    >
                      <div className="flex items-center justify-center gap-1.5">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: activeLang.color }}
                        />
                        <span className="font-mono text-xs font-bold text-foreground uppercase tracking-wider">
                          {activeLang.name}
                        </span>
                      </div>

                      <div className="text-3xl font-extrabold font-mono text-foreground tracking-tight tabular-nums">
                        {activeLang.percentage}%
                      </div>

                      <div className="text-[11px] font-mono text-muted-foreground">
                        {formatBytes(activeLang.value)}
                      </div>

                      <div className="pt-1">
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full border border-border bg-secondary font-semibold text-muted-foreground uppercase">
                          {getParadigm(activeLang.name).label}
                        </span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="summary"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-1"
                    >
                      <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest block">
                        TOTAL REPO VOLUME
                      </span>
                      <span className="text-2xl font-extrabold font-mono text-foreground tracking-tight">
                        {formatBytes(totalBytes)}
                      </span>
                      <span className="text-[10px] font-mono text-primary block">
                        {languages.length} LANGUAGES ACTIVE
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <p className="text-[11px] font-mono text-muted-foreground mt-2 text-center">
              CLICK OR HOVER ANY ARC TO INSPECT CODE DENSITY
            </p>
          </div>

          {/* RIGHT: High-Velocity Language Matrix & Telemetry Gauges */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Telemetry Micro-Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {/* Polyglot Quotient */}
              <div className="p-3 rounded-lg border border-border bg-secondary/40 font-mono space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground uppercase">
                  <Sparkles className="h-3 w-3 text-primary" />
                  <span>Polyglot Index</span>
                </div>
                <div className="text-base font-bold text-foreground">
                  {polyglotScore} <span className="text-xs text-muted-foreground font-normal">/ 10</span>
                </div>
                <div className="text-[10px] text-muted-foreground">
                  {polyglotScore > 6 ? "High Diversity" : "Specialized"}
                </div>
              </div>

              {/* Primary Paradigm */}
              <div className="p-3 rounded-lg border border-border bg-secondary/40 font-mono space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground uppercase">
                  <Cpu className="h-3 w-3 text-amber-500" />
                  <span>Lead Stack</span>
                </div>
                <div className="text-base font-bold text-foreground truncate">
                  {languages[0]?.name || "N/A"}
                </div>
                <div className="text-[10px] text-muted-foreground">
                  {languages[0] ? `${languages[0].percentage}% code share` : "No data"}
                </div>
              </div>

              {/* Compiled vs Interpreted */}
              <div className="p-3 rounded-lg border border-border bg-secondary/40 font-mono space-y-1 col-span-2 sm:col-span-1">
                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground uppercase">
                  <Binary className="h-3 w-3 text-emerald-500" />
                  <span>Type System</span>
                </div>
                <div className="text-base font-bold text-foreground">
                  {compiledBytes > interpretedBytes ? "Native" : "Scripted"}
                </div>
                <div className="text-[10px] text-muted-foreground">
                  {Math.round((compiledBytes / Math.max(1, totalBytes)) * 100)}% compiled
                </div>
              </div>
            </div>

            {/* Language Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs pt-1">
              {languages.slice(0, 8).map((lang, idx) => {
                const isSelected = selectedLanguage === lang.name;
                const isHovered = hoveredLanguage === lang.name;
                const paradigm = getParadigm(lang.name);

                return (
                  <motion.button
                    key={lang.name}
                    type="button"
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.15 }}
                    onClick={() => onSelectLanguage?.(isSelected ? null : lang.name)}
                    onMouseEnter={() => setHoveredLanguage(lang.name)}
                    onMouseLeave={() => setHoveredLanguage(null)}
                    className={`flex flex-col justify-between p-3 rounded-lg border transition-all text-left cursor-pointer group/card ${
                      isSelected
                        ? "border-primary bg-primary/10 text-foreground ring-1 ring-primary/40 shadow-xs"
                        : isHovered
                        ? "border-foreground/30 bg-secondary text-foreground"
                        : "border-border bg-secondary/30 text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 w-full">
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className="h-2.5 w-2.5 rounded-full shrink-0 shadow-2xs group-hover/card:scale-125 transition-transform"
                          style={{ backgroundColor: lang.color }}
                        />
                        <span className="font-semibold text-foreground truncate font-sans text-xs">
                          {lang.name}
                        </span>
                      </div>

                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-background border border-border/70 text-muted-foreground uppercase font-semibold">
                        {paradigm.label}
                      </span>
                    </div>

                    {/* Progress meter */}
                    <div className="w-full bg-secondary/80 h-1.5 rounded-full overflow-hidden my-2 border border-border/40">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${lang.percentage}%` }}
                        transition={{ duration: 0.8, delay: idx * 0.05 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: lang.color }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono w-full">
                      <span>{formatBytes(lang.value)}</span>
                      <span className="font-bold text-foreground">
                        {lang.percentage}%
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {languages.length > 8 && (
              <p className="text-[11px] font-mono text-muted-foreground pt-1">
                + {languages.length - 8} additional long-tail languages calculated in aggregate byte telemetry.
              </p>
            )}
          </div>

        </div>
      </div>
    </motion.section>
  );
}