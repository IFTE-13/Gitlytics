"use client";

import { useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Code2, Filter, X } from "lucide-react";
import { motion } from "motion/react";
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

export function LanguageChart({
  languages,
  selectedLanguage,
  onSelectLanguage,
}: LanguageChartProps) {
  const [hoveredLanguage, setHoveredLanguage] = useState<string | null>(null);

  if (!languages || languages.length === 0) return null;

  const totalBytes = languages.reduce((sum, l) => sum + l.value, 0);

  // Group languages: top 8, remainder in Other
  const topLangs = languages.slice(0, 8);
  const otherLangs = languages.slice(8);

  const chartData = [...topLangs];
  if (otherLangs.length > 0) {
    const otherValue = otherLangs.reduce((sum, l) => sum + l.value, 0);
    const otherPercentage = otherLangs.reduce((sum, l) => sum + l.percentage, 0);
    chartData.push({
      name: "Other",
      value: otherValue,
      percentage: Math.round(otherPercentage * 10) / 10,
      color: "#64748b",
    });
  }

  const activeLang = hoveredLanguage
    ? languages.find((l) => l.name === hoveredLanguage) || null
    : selectedLanguage
    ? languages.find((l) => l.name === selectedLanguage) || null
    : languages[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4"
    >
      <div className="surface-panel rounded-lg border border-border bg-card p-6 sm:p-7 shadow-xs">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border mb-6 gap-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary/10 text-primary">
              <Code2 className="h-3.5 w-3.5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-foreground tracking-tight">
                Linguistic Spectrum & Byte Gravity
              </h3>
              <p className="text-xs text-muted-foreground font-sans">
                Measured across {formatBytes(totalBytes)} of compiled and scripted source code
              </p>
            </div>
          </div>

          {selectedLanguage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2"
            >
              <span className="text-xs font-mono text-muted-foreground">Filtered to:</span>
              <button
                type="button"
                onClick={() => onSelectLanguage?.(null)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-primary/10 border border-primary/30 text-primary font-mono text-xs hover:bg-primary/20 transition-colors cursor-pointer"
              >
                <span>{selectedLanguage}</span>
                <X className="h-3 w-3" />
              </button>
            </motion.div>
          )}
        </div>

        {/* 1. Proportional Spectrum Bar with Animated Expand */}
        <div className="space-y-2 mb-8">
          <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
            <span>BYTE DENSITY CONTINUUM</span>
            <span>100% PROPORTIONAL BREAKDOWN</span>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
            className="h-4 w-full rounded-md overflow-hidden flex bg-secondary border border-border/80 p-[1px] gap-[1px]"
          >
            {languages.map((lang) => {
              const isSelected = selectedLanguage === lang.name;
              const isHovered = hoveredLanguage === lang.name;
              const widthPct = Math.max(0.6, lang.percentage);

              return (
                <div
                  key={lang.name}
                  style={{
                    width: `${widthPct}%`,
                    backgroundColor: lang.color,
                  }}
                  className={`h-full transition-all cursor-pointer relative group ${
                    isSelected ? "ring-2 ring-primary z-10" : ""
                  } ${hoveredLanguage && !isHovered ? "opacity-35" : "opacity-100"}`}
                  onMouseEnter={() => setHoveredLanguage(lang.name)}
                  onMouseLeave={() => setHoveredLanguage(null)}
                  onClick={() => onSelectLanguage?.(isSelected ? null : lang.name)}
                  title={`${lang.name}: ${lang.percentage}% (${formatBytes(lang.value)}) - Click to filter`}
                />
              );
            })}
          </motion.div>
        </div>

        {/* 2. Donut Chart + Language Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Donut Chart with Center Display */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="w-[240px] h-[240px] relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={72}
                    outerRadius={104}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="var(--card)"
                    strokeWidth={2}
                    isAnimationActive={true}
                    animationDuration={800}
                    animationEasing="ease-out"
                  >
                    {chartData.map((entry) => (
                      <Cell
                        key={`cell-${entry.name}`}
                        fill={entry.color}
                        cursor="pointer"
                        opacity={
                          hoveredLanguage && hoveredLanguage !== entry.name
                            ? 0.35
                            : 1
                        }
                        onClick={() => {
                          if (entry.name !== "Other") {
                            onSelectLanguage?.(
                              selectedLanguage === entry.name ? null : entry.name
                            );
                          }
                        }}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      const data = payload[0].payload as Language;
                      return (
                        <div className="rounded border border-border bg-popover px-3 py-2 text-xs font-mono shadow-md">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className="h-2.5 w-2.5 rounded-full"
                              style={{ backgroundColor: data.color }}
                            />
                            <span className="font-bold text-foreground">
                              {data.name}
                            </span>
                          </div>
                          <div className="text-muted-foreground">
                            {formatBytes(data.value)} · {data.percentage}%
                          </div>
                        </div>
                      );
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* High-Impact Center Summary */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center p-4">
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                  {activeLang ? activeLang.name : "Dominant"}
                </span>
                <span className="text-2xl font-extrabold font-mono text-foreground tabular-nums tracking-tight">
                  {activeLang ? `${activeLang.percentage}%` : "—"}
                </span>
                <span className="text-[10px] font-mono text-muted-foreground mt-0.5">
                  {activeLang ? formatBytes(activeLang.value) : formatBytes(totalBytes)}
                </span>
              </div>
            </div>

            <p className="text-[11px] font-mono text-muted-foreground mt-3 text-center">
              CLICK ANY SEGMENT OR ROW TO FILTER REPOSITORIES
            </p>
          </div>

          {/* Detailed Language Grid with Hover Animation */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
              {languages.slice(0, 10).map((lang, lIdx) => {
                const isSelected = selectedLanguage === lang.name;
                const isHovered = hoveredLanguage === lang.name;

                return (
                  <motion.button
                    key={lang.name}
                    type="button"
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.15 }}
                    onClick={() => onSelectLanguage?.(isSelected ? null : lang.name)}
                    onMouseEnter={() => setHoveredLanguage(lang.name)}
                    onMouseLeave={() => setHoveredLanguage(null)}
                    className={`flex items-center justify-between p-2.5 rounded border transition-all text-left cursor-pointer ${
                      isSelected
                        ? "border-primary bg-primary/10 text-foreground ring-1 ring-primary/30"
                        : isHovered
                        ? "border-foreground/30 bg-secondary text-foreground"
                        : "border-border bg-secondary/30 text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className="h-2.5 w-2.5 rounded-full shrink-0 shadow-xs"
                        style={{ backgroundColor: lang.color }}
                      />
                      <span className="font-semibold text-foreground truncate font-sans text-xs">
                        {lang.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 text-right">
                      <span className="text-[11px] text-muted-foreground font-mono">
                        {formatBytes(lang.value)}
                      </span>
                      <span className="w-11 text-right font-bold text-foreground font-mono">
                        {lang.percentage}%
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {languages.length > 10 && (
              <p className="text-[11px] font-mono text-muted-foreground mt-3">
                + {languages.length - 10} additional niche languages accounted for in total code density.
              </p>
            )}
          </div>

        </div>
      </div>
    </motion.div>
  );
}