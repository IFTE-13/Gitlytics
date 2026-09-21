"use client";

import { useEffect, useState } from "react";
import { Terminal, CheckCircle2, Loader2, Sparkles } from "lucide-react";

interface AnalysisLoadingProps {
  username: string;
}

const STEPS = [
  { id: 1, label: "Querying GitHub API v3 user profile entity" },
  { id: 2, label: "Crawling repository manifests & stargazer indexes" },
  { id: 3, label: "Aggregating byte-level linguistic volumes & weights" },
  { id: 4, label: "Synthesizing developer dossier & activity metrics" },
];

export function AnalysisLoading({ username }: AnalysisLoadingProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep(1), 300);
    const timer2 = setTimeout(() => setCurrentStep(2), 700);
    const timer3 = setTimeout(() => setCurrentStep(3), 1100);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Diagnostic telemetry banner */}
      <div className="surface-panel p-5 rounded-lg border border-primary/30 bg-card/90 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary/10 text-primary">
              <Terminal className="h-3.5 w-3.5" />
            </div>
            <span className="font-mono text-xs font-semibold text-foreground tracking-wide">
              RUNNING DIAGNOSTIC DISASSEMBLY: @{username}
            </span>
          </div>
          <div className="font-mono text-[11px] text-muted-foreground flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
            <span>PROGRESS: {Math.min(100, (currentStep + 1) * 25)}%</span>
          </div>
        </div>

        {/* Diagnostic Pipeline Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {STEPS.map((step, idx) => {
            const isCompleted = idx < currentStep;
            const isCurrent = idx === currentStep;

            return (
              <div
                key={step.id}
                className={`p-3 rounded border font-mono text-xs transition-all ${
                  isCompleted
                    ? "border-emerald-500/40 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400"
                    : isCurrent
                    ? "border-primary bg-primary/5 text-foreground ring-1 ring-primary/20"
                    : "border-border bg-secondary/30 text-muted-foreground opacity-60"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {isCompleted ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  ) : isCurrent ? (
                    <Loader2 className="h-3.5 w-3.5 text-primary animate-spin shrink-0" />
                  ) : (
                    <span className="h-3.5 w-3.5 rounded-full border border-border shrink-0 flex items-center justify-center text-[9px]">
                      {idx + 1}
                    </span>
                  )}
                  <span className="text-[10px] uppercase font-bold tracking-wider">
                    Stage 0{step.id}
                  </span>
                </div>
                <p className="font-sans text-[11px] leading-snug line-clamp-2">
                  {step.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Matching wireframe skeleton to eliminate layout shift */}
      <div className="space-y-6 opacity-60 animate-pulse">
        {/* Profile skeleton */}
        <div className="surface-panel p-6 rounded-lg border border-border bg-card">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="h-24 w-24 rounded-lg bg-secondary shrink-0" />
            <div className="space-y-3 flex-1 w-full">
              <div className="h-6 w-48 bg-secondary rounded" />
              <div className="h-4 w-32 bg-secondary rounded" />
              <div className="h-4 w-3/4 bg-secondary rounded" />
            </div>
            <div className="grid grid-cols-3 gap-4 w-full md:w-auto">
              <div className="h-16 w-20 bg-secondary rounded" />
              <div className="h-16 w-20 bg-secondary rounded" />
              <div className="h-16 w-20 bg-secondary rounded" />
            </div>
          </div>
        </div>

        {/* Metrics skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="h-24 bg-card rounded-lg border border-border" />
          <div className="h-24 bg-card rounded-lg border border-border" />
          <div className="h-24 bg-card rounded-lg border border-border" />
          <div className="h-24 bg-card rounded-lg border border-border" />
        </div>
      </div>
    </div>
  );
}
