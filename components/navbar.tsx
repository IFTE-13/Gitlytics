"use client";

import { Github, Activity, Command } from "lucide-react";
import Link from "next/link";
import { ThemeSelector } from "./theme-selector";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-primary rounded"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded bg-primary text-primary-foreground font-mono font-bold text-xs tracking-wider shadow-xs group-hover:opacity-90 transition-opacity">
              GL
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-bold tracking-tight text-base sm:text-lg text-foreground">
                Gitlytics
              </span>
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest hidden sm:inline">
                / v2.6
              </span>
            </div>
          </Link>

          {/* System status pill */}
          <div className="hidden md:flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground border-l border-border pl-3 ml-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>ENGINE ONLINE</span>
          </div>
        </div>

        {/* Right tools */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Keyboard shortcut hint */}
          <button
            type="button"
            onClick={() => {
              const input = document.getElementById("username-input");
              if (input) {
                input.focus();
                input.scrollIntoView({ behavior: "smooth", block: "center" });
              }
            }}
            className="hidden lg:flex items-center gap-1.5 px-2 py-1 text-xs font-mono text-muted-foreground border border-border/80 rounded bg-secondary/60 hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
            title="Focus search input"
          >
            <Command className="h-3 w-3" />
            <span>K</span>
            <span className="text-[10px] text-muted-foreground/70 ml-0.5">Quick Inspect</span>
          </button>

          {/* GitHub source link */}
          <Link
            href="https://github.com/IFTE-13/Github-Portfolio-Analyzer"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-primary"
            aria-label="View source repository on GitHub"
          >
            <Github className="h-4 w-4" />
          </Link>

          {/* Theme & Accent Palette Switcher */}
          <ThemeSelector />
        </div>
      </div>
    </header>
  );
}