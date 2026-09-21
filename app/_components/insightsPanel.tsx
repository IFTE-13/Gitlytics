"use client";

import { Star, GitFork, Code2, Clock, Zap, Layers } from "lucide-react";
import { motion } from "motion/react";
import type { GitHubRepo, Language } from "@/lib/types";

interface InsightsPanelProps {
  repos: GitHubRepo[];
  languages: Language[];
}

export function InsightsPanel({ repos, languages }: InsightsPanelProps) {
  const totalStars = repos.reduce((sum, r) => sum + r.stars, 0);
  const totalForks = repos.reduce((sum, r) => sum + r.forks, 0);
  const avgStars = repos.length > 0 ? (totalStars / repos.length).toFixed(1) : "0";
  const topLanguage = languages.length > 0 ? languages[0].name : "None";

  // Recency calculation
  const sortedByDate = [...repos].sort(
    (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );
  const recentRepo = sortedByDate[0];
  
  let daysSinceUpdate = 0;
  if (recentRepo) {
    const diffTime = Math.abs(Date.now() - new Date(recentRepo.updated_at).getTime());
    daysSinceUpdate = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  }

  const uniqueLanguagesCount = new Set(repos.map((r) => r.language).filter(Boolean)).size;

  // Star-to-fork community ratio
  const starToForkRatio = totalForks > 0 ? (totalStars / totalForks).toFixed(1) : totalStars > 0 ? "∞" : "0.0";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border mb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded bg-primary/10 text-primary">
            <Zap className="h-3 w-3" />
          </div>
          <h3 className="font-display font-bold text-base text-foreground tracking-tight">
            Developer Velocity & Archival Telemetry
          </h3>
        </div>
        <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest hidden sm:inline">
          {repos.length} Repositories Indexed
        </span>
      </div>

      {/* Asymmetrical Intelligence Grid with Staggered Motion */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Star Gravity */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          whileHover={{ y: -2 }}
          className="surface-panel-interactive p-5 rounded-lg border border-border bg-card flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between text-muted-foreground font-mono text-xs">
              <span className="uppercase tracking-wider">Star Gravity</span>
              <Star className="h-3.5 w-3.5 text-amber-500" />
            </div>
            <div className="mt-3">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-foreground tracking-tight tabular-nums">
                {totalStars.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1 font-sans">
                Accumulated across public repositories
              </p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-[11px] font-mono">
            <span className="text-muted-foreground">AVG PER REPO</span>
            <span className="font-semibold text-foreground">{avgStars} ★</span>
          </div>
        </motion.div>

        {/* Metric 2: Fork Leverage */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.18 }}
          whileHover={{ y: -2 }}
          className="surface-panel-interactive p-5 rounded-lg border border-border bg-card flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between text-muted-foreground font-mono text-xs">
              <span className="uppercase tracking-wider">Network Forks</span>
              <GitFork className="h-3.5 w-3.5 text-sky-500" />
            </div>
            <div className="mt-3">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-foreground tracking-tight tabular-nums">
                {totalForks.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1 font-sans">
                Community downstream branches & clones
              </p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-[11px] font-mono">
            <span className="text-muted-foreground">STAR/FORK RATIO</span>
            <span className="font-semibold text-foreground">{starToForkRatio}x</span>
          </div>
        </motion.div>

        {/* Metric 3: Linguistic Breadth */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.26 }}
          whileHover={{ y: -2 }}
          className="surface-panel-interactive p-5 rounded-lg border border-border bg-card flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between text-muted-foreground font-mono text-xs">
              <span className="uppercase tracking-wider">Language Breadth</span>
              <Layers className="h-3.5 w-3.5 text-primary" />
            </div>
            <div className="mt-3">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-foreground tracking-tight tabular-nums">
                {uniqueLanguagesCount}
              </div>
              <p className="text-xs text-muted-foreground mt-1 font-sans">
                Primary anchor: <span className="font-semibold text-foreground">{topLanguage}</span>
              </p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-[11px] font-mono">
            <span className="text-muted-foreground">DIVERSITY RATING</span>
            <span className="font-semibold text-foreground">
              {uniqueLanguagesCount >= 8
                ? "Polyglot"
                : uniqueLanguagesCount >= 4
                ? "Multifaceted"
                : "Specialized"}
            </span>
          </div>
        </motion.div>

        {/* Metric 4: Cadence & Recency */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.34 }}
          whileHover={{ y: -2 }}
          className="surface-panel-interactive p-5 rounded-lg border border-border bg-card flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between text-muted-foreground font-mono text-xs">
              <span className="uppercase tracking-wider">Cadence Recency</span>
              <Clock className="h-3.5 w-3.5 text-emerald-500" />
            </div>
            <div className="mt-3">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-foreground tracking-tight tabular-nums">
                {daysSinceUpdate === 0 ? "Today" : `${daysSinceUpdate}d`}
              </div>
              <p className="text-xs text-muted-foreground mt-1 font-sans truncate">
                Latest: <span className="font-semibold text-foreground">{recentRepo?.name || "None"}</span>
              </p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-[11px] font-mono">
            <span className="text-muted-foreground">STATUS</span>
            <span className={`font-semibold flex items-center gap-1.5 ${
              daysSinceUpdate <= 14
                ? "text-emerald-500"
                : daysSinceUpdate <= 60
                ? "text-amber-500"
                : "text-muted-foreground"
            }`}>
              <span className={`h-1.5 w-1.5 rounded-full ${
                daysSinceUpdate <= 14 ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
              }`} />
              {daysSinceUpdate <= 14 ? "High Activity" : daysSinceUpdate <= 60 ? "Steady" : "Archival"}
            </span>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
