"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Github,
  Twitter,
  Building,
  MapPin,
  Calendar,
  AlertTriangle,
  ExternalLink,
  Award,
  Sparkles,
  ShieldAlert,
} from "lucide-react";
import { motion } from "motion/react";
import type { GitHubUser, GitHubRepo, Language } from "@/lib/types";

interface UserProfileProps {
  userData: GitHubUser | null;
  error: string | null;
  repos?: GitHubRepo[];
  languages?: Language[];
}

function getAccountAge(createdAt: string): string {
  const created = new Date(createdAt);
  const now = new Date();
  const years = now.getFullYear() - created.getFullYear();
  const months = now.getMonth() - created.getMonth();
  const totalMonths = years * 12 + months;

  if (totalMonths < 1) return "Joined this month";
  if (totalMonths < 12) return `${totalMonths} month${totalMonths > 1 ? "s" : ""}`;
  const yrs = Math.floor(totalMonths / 12);
  const mos = totalMonths % 12;
  if (mos === 0) return `${yrs} year${yrs > 1 ? "s" : ""}`;
  return `${yrs} yr${yrs > 1 ? "s" : ""}, ${mos} mo${mos > 1 ? "s" : ""}`;
}

function computeDeveloperArchetype(userData: GitHubUser, repos?: GitHubRepo[]): {
  title: string;
  badge: string;
  description: string;
} {
  const totalStars = repos?.reduce((sum, r) => sum + r.stars, 0) || 0;
  const languages = repos?.map((r) => r.language).filter(Boolean) as string[] || [];
  const langCounts: Record<string, number> = {};
  languages.forEach((l) => (langCounts[l] = (langCounts[l] || 0) + 1));

  const hasSystems = ["Rust", "C", "C++", "Go", "Zig"].some((l) => (langCounts[l] || 0) > 1);
  const hasWeb = ["TypeScript", "JavaScript", "HTML", "CSS"].some((l) => (langCounts[l] || 0) > 2);
  const hasData = ["Python", "Jupyter Notebook", "R", "Julia"].some((l) => (langCounts[l] || 0) > 1);

  if (userData.followers > 5000 || totalStars > 5000) {
    return {
      title: "Open-Source Luminary",
      badge: "TIER 01 // PILLAR",
      description: "High ecosystem gravity with expansive community adoption and star reach.",
    };
  }

  if (hasSystems && hasWeb) {
    return {
      title: "Polyglot Systems Engineer",
      badge: "FULL-SPECTRUM // COMPILED & WEB",
      description: "Bridges low-level systems architectures with modern application runtimes.",
    };
  }

  if (hasSystems) {
    return {
      title: "Systems & Infrastructure Architect",
      badge: "LOW-LEVEL // HIGH-PERFORMANCE",
      description: "Focuses on compiled performance, bare-metal efficiency, and core protocols.",
    };
  }

  if (hasData) {
    return {
      title: "Machine Intelligence & Analytics Lead",
      badge: "DATA // ALGORITHMIC",
      description: "Specializes in mathematical computing, machine learning pipelines, and research models.",
    };
  }

  if (userData.public_repos > 30) {
    return {
      title: "Prolific Codebase Creator",
      badge: "ACTIVE FOUNDER // HIGH VELOCITY",
      description: "Maintains an expansive portfolio of public software repositories and tools.",
    };
  }

  return {
    title: "Software Craftsman",
    badge: "ENGINEERING PRACTITIONER",
    description: "Builds focused, production-grade applications with clean version control discipline.",
  };
}

export function UserProfile({ userData, error, repos }: UserProfileProps) {
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6"
      >
        <div className="surface-panel border-destructive/40 bg-destructive/5 p-6 rounded-lg">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-destructive/10 text-destructive shrink-0">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-destructive font-display">
                Profile Telemetry Query Failed
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground font-sans max-w-xl">
                {error}. Verify that the GitHub handle exists and has public activity, or check if the GitHub REST API hourly rate limit has been exceeded.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!userData) return null;

  const archetype = computeDeveloperArchetype(userData, repos);
  const accountAge = getAccountAge(userData.created_at);

  const scrollToGitcardSection = () => {
    const el = document.getElementById("gitcard-generator-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4"
    >
      {/* Editorial Developer Dossier */}
      <div className="surface-panel rounded-lg border border-border bg-card overflow-hidden shadow-xs">
        {/* Dossier Masthead Bar with Gitcard Trigger & Public Scope Notice */}
        <div className="border-b border-border bg-secondary/40 px-5 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-muted-foreground">
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="font-semibold text-foreground">DOSSIER // @{userData.login}</span>
            <span className="text-[11px] text-muted-foreground/80 hidden sm:inline">
              · MEMBER SINCE {new Date(userData.created_at).getFullYear()}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Prominent Public Scope Notice */}
            <span className="hidden md:inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-mono">
              <ShieldAlert className="h-3 w-3 shrink-0" />
              <span>PUBLIC SCOPE ONLY (PRIVATE COMMITS EXCLUDED)</span>
            </span>

            {/* Scroll to Gitcard Section Button */}
            <button
              type="button"
              onClick={scrollToGitcardSection}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-primary text-primary-foreground font-mono text-xs font-bold hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer shadow-xs"
            >
              <Sparkles className="h-3 w-3" />
              <span>CREATE GITCARD</span>
            </button>
          </div>
        </div>

        {/* Core Dossier Body */}
        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Identity & Bio */}
            <div className="lg:col-span-7 flex flex-col sm:flex-row items-start gap-6">
              {/* Hairline Avatar with motion hover */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="relative shrink-0"
              >
                <Image
                  src={userData.avatar_url}
                  alt={`${userData.login}'s GitHub avatar`}
                  width={104}
                  height={104}
                  className="rounded-lg border-2 border-border bg-secondary object-cover shadow-sm"
                  priority
                />
              </motion.div>

              <div className="space-y-3 flex-1 min-w-0">
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight font-display">
                      {userData.name || userData.login}
                    </h2>
                    <Link
                      href={userData.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono text-muted-foreground bg-secondary hover:text-foreground hover:bg-border transition-colors"
                      title="Open profile on GitHub"
                    >
                      <span>@{userData.login}</span>
                      <ExternalLink className="h-3 w-3 opacity-70" />
                    </Link>
                  </div>

                  {/* Archetype summary banner */}
                  <div className="mt-1 text-xs font-mono text-primary font-semibold flex items-center gap-1.5">
                    <Award className="h-3.5 w-3.5" />
                    <span>{archetype.title}</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed font-sans max-w-xl">
                  {userData.bio || "No public biographical description filed on this developer profile."}
                </p>

                {/* Metadata row */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground pt-1">
                  {userData.location && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-muted-foreground/70" />
                      <span>{userData.location}</span>
                    </div>
                  )}
                  {userData.company && (
                    <div className="flex items-center gap-1.5">
                      <Building className="h-3.5 w-3.5 text-muted-foreground/70" />
                      <span>{userData.company}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground/70" />
                    <span>{accountAge} tenure</span>
                  </div>
                  {userData.twitter_username && (
                    <Link
                      href={`https://twitter.com/${userData.twitter_username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:text-foreground transition-colors"
                    >
                      <Twitter className="h-3.5 w-3.5 text-muted-foreground/70" />
                      <span>@{userData.twitter_username}</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Architectural Telemetry Numbers with Staggered Entrance */}
            <div className="lg:col-span-5 grid grid-cols-3 gap-3 border-t lg:border-t-0 lg:border-l border-border pt-6 lg:pt-0 lg:pl-8">
              {/* Stat 1: Repos */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                whileHover={{ y: -2 }}
                className="p-3.5 rounded bg-secondary/40 border border-border flex flex-col justify-between transition-all"
              >
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  Public Repos
                </span>
                <div className="mt-2">
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-foreground tabular-nums">
                    {userData.public_repos.toLocaleString()}
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground">Analyzed</span>
                </div>
              </motion.div>

              {/* Stat 2: Followers */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.18 }}
                whileHover={{ y: -2 }}
                className="p-3.5 rounded bg-secondary/40 border border-border flex flex-col justify-between transition-all"
              >
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  Followers
                </span>
                <div className="mt-2">
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-foreground tabular-nums">
                    {userData.followers.toLocaleString()}
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground">Subscribers</span>
                </div>
              </motion.div>

              {/* Stat 3: Following */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.26 }}
                whileHover={{ y: -2 }}
                className="p-3.5 rounded bg-secondary/40 border border-border flex flex-col justify-between transition-all"
              >
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  Following
                </span>
                <div className="mt-2">
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-foreground tabular-nums">
                    {userData.following.toLocaleString()}
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground">Network</span>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}