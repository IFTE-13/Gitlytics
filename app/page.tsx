"use client";

import { useState, useEffect, useCallback } from "react";
import { Header } from "@/app/_components/hero";
import { UserProfile } from "@/app/_components/userProfile";
import { GitcardSection } from "@/app/_components/gitcard-section";
import { RepoList } from "@/app/_components/repoList";
import { LanguageChart } from "@/app/_components/languageChart";
import { InsightsPanel } from "@/app/_components/insightsPanel";
import { TopRepos } from "@/app/_components/topRepos";
import { TrendingRepos } from "@/app/_components/trendingRepos";
import { AnalysisLoading } from "@/app/_components/analysis-loading";
import type { GitHubUser, GitHubRepo, Language } from "@/lib/types";

export default function Home() {
  const [username, setUsername] = useState("");
  const [activeSearchedUser, setActiveSearchedUser] = useState("");
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState<"stars" | "forks" | "name" | "updated">("stars");
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  // Central search executor
  const executeSearch = useCallback(async (targetUser: string) => {
    const nameToSearch = targetUser.trim();
    if (!nameToSearch) return;

    setError(null);
    setIsLoading(true);
    setActiveSearchedUser(nameToSearch);
    setSelectedLanguage(null);

    try {
      // 1. Fetch user data first
      const userResponse = await fetch(`/api/github/${encodeURIComponent(nameToSearch)}`);
      if (!userResponse.ok) {
        const userError = await userResponse.json();
        setError(userError.error || "Failed to fetch user data");
        setUserData(null);
        setRepos([]);
        setLanguages([]);
        return;
      }
      const fetchedUserData: GitHubUser = await userResponse.json();
      setUserData(fetchedUserData);

      // 2. Fetch repos and languages concurrently
      const [reposResponse, langResponse] = await Promise.all([
        fetch(`/api/github/${encodeURIComponent(nameToSearch)}/repos`),
        fetch(`/api/github/${encodeURIComponent(nameToSearch)}/languages`),
      ]);

      if (reposResponse.ok) {
        const reposData: GitHubRepo[] = await reposResponse.json();
        setRepos(reposData);
      } else {
        const repoError = await reposResponse.json();
        setError(repoError.error || "Failed to fetch repositories");
      }

      if (langResponse.ok) {
        const langData: Language[] = await langResponse.json();
        setLanguages(langData);
      }
    } catch {
      setError("An unexpected network error occurred while querying GitHub API.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      executeSearch(username);
    },
    [username, executeSearch]
  );

  const handleSelectSuggested = useCallback(
    (suggestedHandle: string) => {
      setUsername(suggestedHandle);
      executeSearch(suggestedHandle);
    },
    [executeSearch]
  );

  // Initial mount load: "octocat"
  useEffect(() => {
    setUsername("octocat");
    executeSearch("octocat");
  }, [executeSearch]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero & FlowForge-Style Operational Command Deck */}
      <Header
        username={username}
        setUsername={setUsername}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        onSelectSuggested={handleSelectSuggested}
      />

      {/* Progressive Analysis State */}
      {isLoading && (
        <AnalysisLoading username={activeSearchedUser || username || "developer"} />
      )}

      {/* Main Analysis Content View */}
      {!isLoading && (
        <div className="space-y-4">
          {/* User Profile Dossier (or Error State) */}
          <UserProfile
            userData={userData}
            error={error}
            repos={repos}
            languages={languages}
          />

          {/* Render Analytics & Gitcard only when profile & repository data are available */}
          {userData && repos.length > 0 && (
            <>
              {/* In-Page Gitcard Generator Section */}
              <GitcardSection
                userData={userData}
                repos={repos}
                languages={languages}
              />

              {/* Core Velocity & Archival Telemetry Grid */}
              <InsightsPanel repos={repos} languages={languages} />

              {/* Flagship Repositories Hall of Fame */}
              <TopRepos repos={repos} />

              {/* Linguistic Spectrum Bar + Donut Chart */}
              {languages.length > 0 && (
                <LanguageChart
                  languages={languages}
                  selectedLanguage={selectedLanguage}
                  onSelectLanguage={setSelectedLanguage}
                />
              )}

              {/* Complete Repository Explorer */}
              <RepoList
                repos={repos}
                sortBy={sortBy}
                setSortBy={setSortBy}
                selectedLanguage={selectedLanguage}
                onSelectLanguage={setSelectedLanguage}
              />
            </>
          )}

          {/* Global Radar: Trending & Flagship Repositories */}
          <TrendingRepos onSelectMaintainer={handleSelectSuggested} />
        </div>
      )}

      {/* Editorial Telemetry Footer */}
      <footer className="mt-20 border-t border-border pt-8 pb-12 text-xs font-mono text-muted-foreground bg-card/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-foreground font-display">GITLYTICS</span>
              <span>//</span>
              <span>TELEMETRY ARCHIVE ENGINE</span>
              <span className="text-[10px] text-primary hidden md:inline font-mono">v2.6</span>
            </div>

            {/* Legal & Help Links */}
            <div className="flex flex-wrap items-center gap-5 text-xs">
              <a href="/faq" className="hover:text-foreground transition-colors">
                FAQ & Docs
              </a>
              <a href="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="/cookies" className="hover:text-foreground transition-colors">
                Cookies & Storage
              </a>
              <a href="/license" className="hover:text-foreground transition-colors">
                MIT License
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-border/60 pt-4 text-[11px] font-sans text-muted-foreground/80">
            <div>
              Ground-truth data proxied through the official{" "}
              <a
                href="https://docs.github.com/en/rest"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-2 hover:text-primary transition-colors font-mono"
              >
                GitHub REST API v3
              </a>
              . Zero synthetic metrics.
            </div>

            <div className="text-amber-600 dark:text-amber-400 font-mono text-[10px]">
              * Note: Private contributions and repositories are excluded via public API scope.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}