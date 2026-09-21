"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Star,
  GitFork,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  Search,
  X,
  FolderGit2,
  Calendar,
  ArrowUpDown,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { GitHubRepo } from "@/lib/types";
import { getLanguageColor } from "@/lib/github";

interface RepoListProps {
  repos: GitHubRepo[];
  sortBy: "stars" | "forks" | "name" | "updated";
  setSortBy: (value: "stars" | "forks" | "name" | "updated") => void;
  selectedLanguage?: string | null;
  onSelectLanguage?: (lang: string | null) => void;
}

export function RepoList({
  repos,
  sortBy,
  setSortBy,
  selectedLanguage,
  onSelectLanguage,
}: RepoListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [reposPerPage, setReposPerPage] = useState(12);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter repositories by search query and selected language
  const filteredRepos = useMemo(() => {
    return repos.filter((repo) => {
      // Language filter
      if (selectedLanguage && repo.language !== selectedLanguage) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = repo.name.toLowerCase().includes(query);
        const matchesDesc = (repo.description || "").toLowerCase().includes(query);
        const matchesTopic = repo.topics?.some((t) => t.toLowerCase().includes(query));
        return matchesName || matchesDesc || matchesTopic;
      }
      return true;
    });
  }, [repos, selectedLanguage, searchQuery]);

  // Sort filtered repos
  const sortedRepos = useMemo(() => {
    return [...filteredRepos].sort((a, b) => {
      if (sortBy === "stars") return b.stars - a.stars;
      if (sortBy === "forks") return b.forks - a.forks;
      if (sortBy === "updated") {
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      }
      return a.name.localeCompare(b.name);
    });
  }, [filteredRepos, sortBy]);

  const totalPages = Math.max(1, Math.ceil(sortedRepos.length / reposPerPage));
  const startIndex = (currentPage - 1) * reposPerPage;
  const currentRepos = sortedRepos.slice(startIndex, startIndex + reposPerPage);

  const resetFilters = () => {
    setSearchQuery("");
    onSelectLanguage?.(null);
    setCurrentPage(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6"
    >
      <div className="surface-panel rounded-lg border border-border bg-card p-5 sm:p-6 shadow-xs">
        
        {/* Masthead Control Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-border">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded bg-primary/10 text-primary">
                <FolderGit2 className="h-3 w-3" />
              </div>
              <h3 className="font-display font-bold text-base text-foreground tracking-tight">
                Repository Archive & Explorer
              </h3>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 font-sans">
              Showing {sortedRepos.length} of {repos.length} public codebases
            </p>
          </div>

          {/* Controls: Search, Sort, Page Size, View Switcher */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Live Search Input */}
            <div className="relative flex-1 sm:w-48 sm:flex-none">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Filter repositories..."
                className="w-full h-8 pl-8 pr-7 text-xs font-mono bg-secondary/50 border border-border rounded text-foreground placeholder:text-muted-foreground/60 focus:outline-hidden focus:border-primary"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5">
              <Select
                value={sortBy}
                onValueChange={(val) => setSortBy(val as "stars" | "forks" | "name" | "updated")}
              >
                <SelectTrigger className="h-8 px-2.5 gap-2 border-border bg-secondary/50 text-xs font-mono rounded w-[130px] cursor-pointer">
                  <ArrowUpDown className="h-3 w-3 text-muted-foreground" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-border bg-popover text-xs font-mono">
                  <SelectItem value="stars">Most Stars</SelectItem>
                  <SelectItem value="forks">Most Forks</SelectItem>
                  <SelectItem value="updated">Recently Updated</SelectItem>
                  <SelectItem value="name">Alphabetical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Page size */}
            <Select
              value={reposPerPage.toString()}
              onValueChange={(val) => {
                setReposPerPage(Number(val));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="h-8 px-2 border-border bg-secondary/50 text-xs font-mono rounded w-[68px] cursor-pointer">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-border bg-popover text-xs font-mono">
                <SelectItem value="6">6/page</SelectItem>
                <SelectItem value="12">12/page</SelectItem>
                <SelectItem value="24">24/page</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode Toggle: Grid vs Table */}
            <div className="flex items-center border border-border rounded bg-secondary/40 p-0.5">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`flex h-7 w-7 items-center justify-center rounded transition-colors cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-card text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title="Grid layout"
                aria-label="Grid layout"
              >
                <LayoutGrid className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("table")}
                className={`flex h-7 w-7 items-center justify-center rounded transition-colors cursor-pointer ${
                  viewMode === "table"
                    ? "bg-card text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title="Table layout"
                aria-label="Table layout"
              >
                <List className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Badges */}
        {(selectedLanguage || searchQuery) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 py-3 border-b border-border text-xs font-mono"
          >
            <span className="text-muted-foreground">Active Filter:</span>
            {selectedLanguage && (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-primary/10 border border-primary/30 text-primary">
                <span>Lang: {selectedLanguage}</span>
                <button
                  type="button"
                  onClick={() => onSelectLanguage?.(null)}
                  className="hover:opacity-70 cursor-pointer"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-secondary border border-border text-foreground">
                <span>Query: &quot;{searchQuery}&quot;</span>
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="hover:opacity-70 cursor-pointer"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            <button
              type="button"
              onClick={resetFilters}
              className="text-muted-foreground hover:text-foreground ml-auto underline cursor-pointer"
            >
              Clear All
            </button>
          </motion.div>
        )}

        {/* Repositories Display with AnimatePresence */}
        <AnimatePresence mode="wait">
          {sortedRepos.length === 0 ? (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-16 text-center space-y-3"
            >
              <p className="text-sm font-mono text-muted-foreground">
                No repositories match current filter criteria.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="px-3 py-1.5 rounded border border-border bg-secondary text-xs font-mono text-foreground hover:bg-card transition-colors cursor-pointer"
              >
                Reset Repository Filters
              </button>
            </motion.div>
          ) : viewMode === "grid" ? (
            /* GRID VIEW */
            <motion.div
              key={`grid-page-${currentPage}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-5"
            >
              {currentRepos.map((repo) => (
                <motion.div
                  key={repo.name}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.15 }}
                  className="surface-panel-interactive p-4 rounded-lg border border-border bg-secondary/20 hover:bg-card flex flex-col justify-between group transition-all"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <Link
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-display font-bold text-sm text-foreground group-hover:text-primary transition-colors truncate"
                        title={repo.name}
                      >
                        {repo.name}
                      </Link>
                      <Link
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground/60 group-hover:text-muted-foreground transition-colors shrink-0"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                    </div>

                    <p className="text-xs text-muted-foreground font-sans line-clamp-2 leading-relaxed min-h-[2.5rem]">
                      {repo.description || "No public description provided."}
                    </p>

                    {/* Topics */}
                    {repo.topics && repo.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2.5">
                        {repo.topics.slice(0, 2).map((topic) => (
                          <span
                            key={topic}
                            className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-secondary text-muted-foreground border border-border/40"
                          >
                            #{topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border mt-4 text-[11px] font-mono">
                    {repo.language ? (
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <span
                          className="h-2 w-2 rounded-full shrink-0"
                          style={{ backgroundColor: getLanguageColor(repo.language) }}
                        />
                        <span className="truncate max-w-[90px]">{repo.language}</span>
                      </span>
                    ) : (
                      <span className="text-muted-foreground/50">—</span>
                    )}

                    <div className="flex items-center gap-2.5">
                      <span className="flex items-center gap-1 text-foreground font-semibold">
                        <Star className="h-3 w-3 text-amber-500 fill-amber-500/20" />
                        <span className="tabular-nums">{repo.stars.toLocaleString()}</span>
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <GitFork className="h-3 w-3 text-sky-500" />
                        <span className="tabular-nums">{repo.forks.toLocaleString()}</span>
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* TABLE / LIST VIEW */
            <motion.div
              key={`table-page-${currentPage}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-x-auto pt-4"
            >
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border text-muted-foreground uppercase text-[10px] tracking-wider">
                    <th className="py-2.5 px-3 font-semibold">Repository</th>
                    <th className="py-2.5 px-3 font-semibold">Language</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Stars</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Forks</th>
                    <th className="py-2.5 px-3 font-semibold text-right hidden sm:table-cell">Updated</th>
                    <th className="py-2.5 px-3 font-semibold text-right w-10">Link</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {currentRepos.map((repo) => (
                    <tr
                      key={repo.name}
                      className="hover:bg-secondary/40 transition-colors group"
                    >
                      <td className="py-2.5 px-3 max-w-[240px]">
                        <Link
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-foreground group-hover:text-primary transition-colors truncate block"
                        >
                          {repo.name}
                        </Link>
                        <p className="font-sans text-[11px] text-muted-foreground truncate hidden md:block">
                          {repo.description || "No description"}
                        </p>
                      </td>
                      <td className="py-2.5 px-3">
                        {repo.language ? (
                          <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                            <span
                              className="h-2 w-2 rounded-full shrink-0"
                              style={{ backgroundColor: getLanguageColor(repo.language) }}
                            />
                            <span>{repo.language}</span>
                          </span>
                        ) : (
                          <span className="text-muted-foreground/40">—</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-right text-foreground font-semibold tabular-nums">
                        {repo.stars.toLocaleString()}
                      </td>
                      <td className="py-2.5 px-3 text-right text-muted-foreground tabular-nums">
                        {repo.forks.toLocaleString()}
                      </td>
                      <td className="py-2.5 px-3 text-right text-muted-foreground text-[11px] hidden sm:table-cell">
                        {new Date(repo.updated_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <Link
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground inline-flex items-center justify-center"
                          title="View on GitHub"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination Navigation */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-border mt-6 pt-4 text-xs font-mono">
            <span className="text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="h-8 px-2.5 rounded border border-border bg-secondary/50 text-foreground hover:bg-secondary disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer flex items-center gap-1"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Prev</span>
              </button>

              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum = i + 1;
                if (totalPages > 5) {
                  if (currentPage > 3) {
                    pageNum = Math.min(totalPages - 4 + i, currentPage - 2 + i);
                  }
                }
                if (pageNum <= 0 || pageNum > totalPages) return null;

                return (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => setCurrentPage(pageNum)}
                    className={`h-8 w-8 rounded border transition-colors cursor-pointer ${
                      currentPage === pageNum
                        ? "border-primary bg-primary text-primary-foreground font-bold"
                        : "border-border bg-secondary/30 text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="h-8 px-2.5 rounded border border-border bg-secondary/50 text-foreground hover:bg-secondary disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer flex items-center gap-1"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

      </div>
    </motion.div>
  );
}