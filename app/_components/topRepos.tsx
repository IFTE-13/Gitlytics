"use client";

import Link from "next/link";
import { Star, GitFork, ExternalLink, Trophy } from "lucide-react";
import { motion } from "motion/react";
import type { GitHubRepo } from "@/lib/types";
import { getLanguageColor } from "@/lib/github";

interface TopReposProps {
  repos: GitHubRepo[];
}

export function TopRepos({ repos }: TopReposProps) {
  const topRepos = [...repos]
    .sort((a, b) => b.stars - a.stars)
    .slice(0, 3);

  if (topRepos.length === 0) return null;

  const ranks = [
    { label: "FLAGSHIP", tag: "#01 PRIMARY STAR", color: "text-amber-500", border: "border-amber-500/40" },
    { label: "SECONDARY", tag: "#02 ACCLAIMED", color: "text-slate-400 dark:text-slate-300", border: "border-slate-400/40" },
    { label: "TERTIARY", tag: "#03 NOTABLE", color: "text-amber-700 dark:text-amber-600", border: "border-amber-700/40" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border mb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded bg-primary/10 text-primary">
            <Trophy className="h-3 w-3" />
          </div>
          <h3 className="font-display font-bold text-base text-foreground tracking-tight">
            Flagship Codebases // Star Pantheon
          </h3>
        </div>
        <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest hidden sm:inline">
          Ranked by Community Stargazers
        </span>
      </div>

      {/* Top 3 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topRepos.map((repo, idx) => {
          const rank = ranks[idx];
          return (
            <motion.div
              key={repo.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + idx * 0.08 }}
              whileHover={{ y: -3 }}
              className={`surface-panel-interactive p-5 rounded-lg border ${rank.border} bg-card flex flex-col justify-between relative overflow-hidden group transition-all`}
            >
              <div>
                {/* Header with Rank Badge and External Link */}
                <div className="flex items-center justify-between pb-3 border-b border-border mb-3.5">
                  <span className={`font-mono text-[10px] font-bold tracking-widest uppercase ${rank.color}`}>
                    {rank.tag}
                  </span>
                  <Link
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-7 w-7 items-center justify-center rounded border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                    title={`Open ${repo.name} on GitHub`}
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </div>

                {/* Repo Title */}
                <h4 className="font-display font-bold text-base text-foreground group-hover:text-primary transition-colors truncate">
                  {repo.name}
                </h4>

                {/* Description */}
                <p className="text-xs text-muted-foreground leading-relaxed font-sans line-clamp-3 mt-1.5 min-h-[3rem]">
                  {repo.description || "No public description provided for this codebase."}
                </p>

                {/* Topic tags if any */}
                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {repo.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary text-muted-foreground border border-border/60"
                      >
                        #{topic}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer: Language & Metrics */}
              <div className="flex items-center justify-between pt-3.5 border-t border-border mt-5 text-xs font-mono">
                {repo.language ? (
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <span
                      className="h-2 w-2 rounded-full shrink-0"
                      style={{ backgroundColor: getLanguageColor(repo.language) }}
                    />
                    <span className="truncate max-w-[100px]">{repo.language}</span>
                  </span>
                ) : (
                  <span className="text-muted-foreground/60">Plain text / Misc</span>
                )}

                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-foreground font-semibold">
                    <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500/20" />
                    <span className="tabular-nums">{repo.stars.toLocaleString()}</span>
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <GitFork className="h-3.5 w-3.5 text-sky-500" />
                    <span className="tabular-nums">{repo.forks.toLocaleString()}</span>
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
