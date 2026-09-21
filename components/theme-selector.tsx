"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Palette, Check } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type AccentTheme = "iris" | "amber" | "cobalt" | "emerald" | "vermilion";

const ACCENTS: { id: AccentTheme; label: string; color: string }[] = [
  { id: "iris", label: "Iris Indigo", color: "#6366f1" },
  { id: "amber", label: "Terminal Amber", color: "#f59e0b" },
  { id: "cobalt", label: "Cobalt Telemetry", color: "#38bdf8" },
  { id: "emerald", label: "Matrix Emerald", color: "#10b981" },
  { id: "vermilion", label: "Swiss Vermilion", color: "#f43f5e" },
];

export function ThemeSelector() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [accent, setAccent] = useState<AccentTheme>("iris");

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("gitlytics-accent") as AccentTheme | null;
    if (saved && ACCENTS.some((a) => a.id === saved)) {
      setAccent(saved);
      document.documentElement.dataset.accent = saved;
    } else {
      document.documentElement.dataset.accent = "iris";
    }
  }, []);

  const handleAccentChange = (newAccent: AccentTheme) => {
    setAccent(newAccent);
    document.documentElement.dataset.accent = newAccent;
    localStorage.setItem("gitlytics-accent", newAccent);
  };

  const isDark = resolvedTheme === "dark" || theme === "dark";

  if (!mounted) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded border border-border bg-secondary animate-pulse" />
        <div className="h-8 w-24 rounded border border-border bg-secondary animate-pulse hidden sm:block" />
      </div>
    );
  }

  const activeAccent = ACCENTS.find((a) => a.id === accent) || ACCENTS[0];

  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      {/* Accent Switcher Dropdown */}
      <div className="relative">
        <Select
          value={accent}
          onValueChange={(val) => handleAccentChange(val as AccentTheme)}
        >
          <SelectTrigger
            aria-label="Select accent theme"
            className="h-8 px-2.5 gap-2 border border-border bg-card text-xs font-mono text-foreground hover:bg-secondary transition-colors cursor-pointer rounded-md focus:ring-1 focus:ring-primary/50"
          >
            <span
              className="h-2.5 w-2.5 rounded-full shrink-0 shadow-xs"
              style={{ backgroundColor: activeAccent.color }}
            />
            <span className="hidden sm:inline font-sans text-xs font-medium text-foreground">
              {activeAccent.label.split(" ")[1]}
            </span>
          </SelectTrigger>
          <SelectContent align="end" className="bg-popover border-border p-1 min-w-[170px] shadow-lg">
            <div className="px-2 py-1 text-[10px] uppercase font-mono tracking-wider text-muted-foreground border-b border-border/60 mb-1">
              Accent Palette
            </div>
            {ACCENTS.map((item) => (
              <SelectItem
                key={item.id}
                value={item.id}
                className="text-xs font-sans cursor-pointer rounded py-1.5 px-2 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Mode Toggle (Light / Dark) */}
      <button
        type="button"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-primary"
      >
        {isDark ? (
          <Sun className="h-4 w-4 text-amber-400" />
        ) : (
          <Moon className="h-4 w-4 text-slate-700" />
        )}
      </button>
    </div>
  );
}
