"use client";

import { useEffect, useState } from "react";
import {
  Star,
  GitFork,
  ExternalLink,
  Search,
  Sparkles,
  Layers,
  ArrowUpRight,
  UserCheck,
  RefreshCw,
} from "lucide-react";
import { motion } from "motion/react";
import type { TrendingRepo } from "@/app/api/github/trending/route";

interface TrendingReposProps {
  onSelectMaintainer: (maintainerHandle: string) => void;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Rust: "#dea584",
  C: "#555555",
  "C++": "#f34b7d",
  Zig: "#ec915c",
  Python: "#3572A5",
  Go: "#00ADD8",
  Ruby: "#701516",
};

const DEFAULT_TRENDING: TrendingRepo[] = [
  {
    name: "ui",
    fullName: "shadcn-ui/ui",
    owner: "shadcn",
    ownerAvatar: "https://avatars.githubusercontent.com/u/124599?v=4",
    description: "A set of beautifully-designed, accessible components and a code distribution platform.",
    stars: 84200,
    forks: 7100,
    language: "TypeScript",
    url: "https://github.com/shadcn-ui/ui",
    topics: ["react", "tailwind", "ui", "radix-ui", "components"],
  },
  {
    name: "next.js",
    fullName: "vercel/next.js",
    owner: "vercel",
    ownerAvatar: "https://avatars.githubusercontent.com/u/14985020?v=4",
    description: "The React Framework for the Web. Used by some of the world's largest companies.",
    stars: 131500,
    forks: 27400,
    language: "JavaScript",
    url: "https://github.com/vercel/next.js",
    topics: ["react", "framework", "ssr", "fullstack", "jamstack"],
  },
  {
    name: "linux",
    fullName: "torvalds/linux",
    owner: "torvalds",
    ownerAvatar: "https://avatars.githubusercontent.com/u/1024025?v=4",
    description: "Linux kernel source tree maintained by Linus Torvalds.",
    stars: 194000,
    forks: 55600,
    language: "C",
    url: "https://github.com/torvalds/linux",
    topics: ["operating-system", "kernel", "c", "systems"],
  },
  {
    name: "uv",
    fullName: "astral-sh/uv",
    owner: "astral-sh",
    ownerAvatar: "https://avatars.githubusercontent.com/u/115962839?v=4",
    description: "An extremely fast Python package and project manager, written in Rust.",
    stars: 52000,
    forks: 2100,
    language: "Rust",
    url: "https://github.com/astral-sh/uv",
    topics: ["python", "rust", "packaging", "performance"],
  },
  {
    name: "bun",
    fullName: "oven-sh/bun",
    owner: "Jarred-Sumner",
    ownerAvatar: "https://avatars.githubusercontent.com/u/961176?v=4",
    description: "Incredibly fast JavaScript runtime, bundler, test runner, and package manager.",
    stars: 77000,
    forks: 2800,
    language: "Zig",
    url: "https://github.com/oven-sh/bun",
    topics: ["javascript", "runtime", "zig", "bundler"],
  },
  {
    name: "supabase",
    fullName: "supabase/supabase",
    owner: "kiwicopple",
    ownerAvatar: "https://avatars.githubusercontent.com/u/8291514?v=4",
    description: "The open source Firebase alternative. Build production apps with Postgres, Auth, and APIs.",
    stars: 81000,
    forks: 6900,
    language: "TypeScript",
    url: "https://github.com/supabase/supabase",
    topics: ["postgres", "database", "auth", "realtime", "storage"],
  },
];

export function TrendingRepos({ onSelectMaintainer }: TrendingReposProps) {
  const [repos, setRepos] = useState<TrendingRepo[]>(DEFAULT_TRENDING);
  const [isLoading, setIsLoading] = useState(false);
  const [source, setSource] = useState<"live" | "fallback">("live");
  const [filter, setFilter] = useState<"all" | "web" | "systems">("all");

  const fetchTrending = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/github/trending");
      if (res.ok) {
        const data = await res.json();
        const reposList: TrendingRepo[] = Array.isArray(data)
          ? data
          : Array.isArray(data.repos)
          ? data.repos
          : [];
        setRepos(reposList);
        setSource(data.source || "live");
      }
    } catch {
      // Graceful silence, keep existing
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  const filteredRepos = repos.filter((r) => {
    if (filter === "all") return true;
    if (filter === "web") {
      return (
        r.language === "TypeScript" ||
        r.language === "JavaScript" ||
        r.topics.some((t) => ["react", "vue", "nextjs", "ui"].includes(t.toLowerCase()))
      );
    }
    if (filter === "systems") {
      return (
        r.language === "Rust" ||
        r.language === "C" ||
        r.language === "C++" ||
        r.language === "Zig" ||
        r.language === "Go"
      );
    }
    return true;
  });

  const handleInspect = (maintainer: string) => {
    onSelectMaintainer(maintainer);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(num >= 10000 ? 0 : 1)}k`;
    return num.toString();
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
      <div className="surface-panel p-6 sm:p-8 rounded-xl border border-border bg-card/60 backdrop-blur-md">
        
        {/* Section Masthead */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                GLOBAL REPOSITORY RADAR // {source === "live" ? "LIVE SEARCH v3" : "CURATED BENCHMARKS"}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground font-display">
              Flagship & Trending Repositories
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-sans max-w-2xl">
              Pillar open-source repositories shaping modern engineering infrastructure. Click any maintainer to immediately deconstruct their repository intelligence in Gitlytics.
            </p>
          </div>

          {/* Filter Controls & Refresh */}
          <div className="flex items-center gap-2 self-start md:self-end">
            <div className="flex items-center bg-secondary/70 p-1 rounded-lg border border-border font-mono text-xs">
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  filter === "all"
                    ? "bg-card text-foreground font-semibold shadow-2xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setFilter("web")}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  filter === "web"
                    ? "bg-card text-foreground font-semibold shadow-2xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Web / JS
              </button>
              <button
                type="button"
                onClick={() => setFilter("systems")}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  filter === "systems"
                    ? "bg-card text-foreground font-semibold shadow-2xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Systems / Rust
              </button>
            </div>

            <button
              type="button"
              onClick={fetchTrending}
              disabled={isLoading}
              title="Refresh Trending Repositories"
              className="p-2 rounded-lg border border-border bg-secondary/70 text-muted-foreground hover:text-foreground transition-all cursor-pointer"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin text-primary" : ""}`} />
            </button>
          </div>
        </div>

        {/* Repository Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="p-5 rounded-lg border border-border bg-secondary/30 space-y-3 animate-pulse"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-secondary" />
                    <div className="space-y-1.5 flex-1">
                      <div className="h-4 w-28 bg-secondary rounded" />
                      <div className="h-3 w-16 bg-secondary rounded" />
                    </div>
                  </div>
                  <div className="h-10 bg-secondary rounded" />
                  <div className="h-8 bg-secondary rounded" />
                </div>
              ))
            : filteredRepos.map((repo, idx) => {
                const langColor =
                  (repo.language && LANGUAGE_COLORS[repo.language]) || "var(--primary)";

                return (
                  <motion.div
                    key={repo.fullName}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                    className="p-5 rounded-lg border border-border bg-card/80 hover:border-primary/40 hover:bg-card transition-all flex flex-col justify-between group shadow-2xs"
                  >
                    <div className="space-y-3">
                      {/* Maintainer Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          {/* Owner Avatar */}
                          <img
                            src={repo.ownerAvatar}
                            alt={repo.owner}
                            className="h-8 w-8 rounded-full border border-border object-cover bg-secondary"
                            loading="lazy"
                          />
                          <div>
                            <span className="text-[11px] font-mono text-muted-foreground block leading-tight">
                              @{repo.owner}
                            </span>
                            <span className="font-bold text-foreground text-sm group-hover:text-primary transition-colors leading-snug">
                              {repo.name}
                            </span>
                          </div>
                        </div>

                        <a
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                          title="View on GitHub"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-muted-foreground font-sans line-clamp-2 min-h-[32px] leading-relaxed">
                        {repo.description || "No description provided."}
                      </p>

                      {/* Topics */}
                      {repo.topics && repo.topics.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {repo.topics.slice(0, 3).map((topic) => (
                            <span
                              key={topic}
                              className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-secondary/80 text-muted-foreground border border-border/50"
                            >
                              #{topic}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Footer Stats & Actions */}
                    <div className="pt-4 mt-3 border-t border-border/70 space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                        {/* Language */}
                        {repo.language ? (
                          <div className="flex items-center gap-1.5">
                            <span
                              className="h-2 w-2 rounded-full shrink-0"
                              style={{ backgroundColor: langColor }}
                            />
                            <span className="text-[11px]">{repo.language}</span>
                          </div>
                        ) : (
                          <span className="text-[11px]">Multi</span>
                        )}

                        {/* Stars & Forks */}
                        <div className="flex items-center gap-3 text-[11px]">
                          <span className="flex items-center gap-1 text-foreground font-semibold">
                            <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                            {formatNumber(repo.stars)}
                          </span>
                          <span className="flex items-center gap-1">
                            <GitFork className="h-3 w-3" />
                            {formatNumber(repo.forks)}
                          </span>
                        </div>
                      </div>

                      {/* Action: Inspect Maintainer */}
                      <button
                        type="button"
                        onClick={() => handleInspect(repo.owner)}
                        className="w-full py-2 px-3 rounded border border-border bg-secondary/60 hover:bg-primary hover:text-primary-foreground hover:border-primary text-foreground font-mono text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer group/btn"
                      >
                        <UserCheck className="h-3.5 w-3.5 group-hover/btn:scale-110 transition-transform" />
                        <span>Inspect Maintainer (@{repo.owner})</span>
                        <ArrowUpRight className="h-3 w-3 opacity-60" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
        </div>

        {/* Global radar disclosure */}
        <div className="mt-6 pt-4 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-muted-foreground">
          <span>SOURCE: OFFICIAL GITHUB SEARCH REST API (STARS &gt; 40,000)</span>
          <span className="text-primary font-medium">Click maintainer to inspect full profile & Gitcard</span>
        </div>
      </div>
    </section>
  );
}
