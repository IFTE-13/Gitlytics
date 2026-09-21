"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Sparkles,
  GitBranch,
  Layers,
  Cpu,
  Shield,
  Palette,
  Share2,
  Terminal,
  Activity,
  CheckCircle2,
} from "lucide-react";
import { motion } from "motion/react";

interface Milestone {
  version: string;
  codename: string;
  date: string;
  badge: "LATEST" | "FEATURE RELEASE" | "MAJOR MILESTONE" | "FOUNDATION";
  badgeColor: string;
  summary: string;
  highlights: {
    category: "FEATURE" | "UI/UX" | "TELEMETRY" | "RADAR";
    text: string;
  }[];
  architectureNote: string;
}

const TIMELINE: Milestone[] = [
  {
    version: "v2.6",
    codename: "FlowForge Engine & Global Radar",
    date: "September 2026",
    badge: "LATEST",
    badgeColor: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
    summary:
      "A complete reimagining of the platform experience: retro-pixel editorial hero, Global Open-Source Repository Radar, real-time System Calibration HUD, and rich multi-variant Gitcards.",
    highlights: [
      {
        category: "RADAR",
        text: "Global Repository Radar querying official GitHub Search REST API (>40k stars) with one-click maintainer inspection.",
      },
      {
        category: "UI/UX",
        text: "Retro-pixel illustrative collage framing an editorial command deck with high-contrast centered typography.",
      },
      {
        category: "FEATURE",
        text: "In-page Gitcard Studio featuring 4 creative variants (Telemetry Dossier, Cyber Matrix, RPG Adventurer, Swiss Modernist) with PNG & JPG high-DPI export.",
      },
      {
        category: "TELEMETRY",
        text: "Interactive 3D Particle Sphere visualizer with wave flux displacement, rotation velocity, and dynamic System Calibration HUD.",
      },
    ],
    architectureNote:
      "Transitioned card generator from modal to first-class in-page section, isolating Profile README Markdown & HTML embed snippets into an interactive dialog.",
  },
  {
    version: "v2.5",
    codename: "Gitcard Studio & README Embed Engine",
    date: "August 2026",
    badge: "FEATURE RELEASE",
    badgeColor: "bg-primary/10 text-primary border-primary/30",
    summary:
      "Empowered developers to showcase their telemetry stats directly on their GitHub Profile READMEs with custom-generated cards.",
    highlights: [
      {
        category: "FEATURE",
        text: "Retina-scale 1200×630 HTML5 Canvas card renderer with zero external dependencies and instant client-side download.",
      },
      {
        category: "UI/UX",
        text: "Dedicated Markdown & HTML embed snippets modal with one-click copy and Shields.io status badges.",
      },
      {
        category: "TELEMETRY",
        text: "Explicit public API scope disclosure clarifying the exclusion of private contributions.",
      },
    ],
    architectureNote:
      "Rendered cards via hardware-accelerated Canvas with crossOrigin image handling for reliable avatar drawing.",
  },
  {
    version: "v2.2",
    codename: "Multi-Palette Matrix & Architectural Dark Mode",
    date: "July 2026",
    badge: "FEATURE RELEASE",
    badgeColor: "bg-primary/10 text-primary border-primary/30",
    summary:
      "Introduced token-harmonized accent palettes and a deep obsidian dark mode paired with crisp architectural light surfaces.",
    highlights: [
      {
        category: "UI/UX",
        text: "5 tokenized accent themes: Iris Indigo, Terminal Amber, Cobalt Telemetry, Matrix Emerald, and Swiss Vermilion.",
      },
      {
        category: "UI/UX",
        text: "High-contrast editorial typography pairing Outfit & Space Grotesk with JetBrains Mono for telemetry readouts.",
      },
      {
        category: "FEATURE",
        text: "Persistent client-side accent storage using HTML dataset attributes with zero hydration layout flash.",
      },
    ],
    architectureNote:
      "Utilized Tailwind CSS v4 design tokens and CSS variables mapped dynamically to document dataset attributes.",
  },
  {
    version: "v2.0",
    codename: "Dossier Intelligence & Developer Archetypes",
    date: "June 2026",
    badge: "MAJOR MILESTONE",
    badgeColor: "bg-amber-500/10 text-amber-500 border-amber-500/30",
    summary:
      "Elevated Gitlytics from a basic statistics viewer to an intelligent developer profiling and archival dossier system.",
    highlights: [
      {
        category: "TELEMETRY",
        text: "Algorithmic developer archetype categorization: Kernel Paladin, Open-Source Luminary, Dual-Stack Rogue, and Artisan Knight.",
      },
      {
        category: "FEATURE",
        text: "Star-to-Fork velocity analysis and Flagship Repositories Hall of Fame.",
      },
      {
        category: "TELEMETRY",
        text: "Account seniority metrics, aggregate code byte entropy, and public repository density calculations.",
      },
    ],
    architectureNote:
      "Consolidated multi-endpoint GitHub data fetching into parallel server-side proxies to optimize rate limits.",
  },
  {
    version: "v1.5",
    codename: "Linguistic Spectrum & Interactive Insights",
    date: "April 2026",
    badge: "FEATURE RELEASE",
    badgeColor: "bg-secondary text-muted-foreground border-border",
    summary:
      "Added multi-language byte aggregation, percentage distributions, and dynamic repository filtering by programming language.",
    highlights: [
      {
        category: "FEATURE",
        text: "Language byte aggregation across all public repositories with custom color mapping.",
      },
      {
        category: "FEATURE",
        text: "Interactive repository filtering by programming language with sort options for stars, forks, and update time.",
      },
      {
        category: "UI/UX",
        text: "Language breakdown donut chart with hover tooltips and proportional spectrum bar.",
      },
    ],
    architectureNote:
      "Implemented concurrent language byte fetching with normalized percentage distribution algorithms.",
  },
  {
    version: "v1.0",
    codename: "Genesis & Foundation",
    date: "January 2026",
    badge: "FOUNDATION",
    badgeColor: "bg-secondary text-muted-foreground border-border",
    summary:
      "The initial open-source release of Gitlytics, providing simple and accessible GitHub handle lookups.",
    highlights: [
      {
        category: "FEATURE",
        text: "Direct integration with official GitHub REST API v3 without requiring personal access tokens.",
      },
      {
        category: "UI/UX",
        text: "Basic user profile card displaying bio, follower count, and public repository list.",
      },
      {
        category: "RADAR",
        text: "Single-input username search bar with error handling for non-existent users.",
      },
    ],
    architectureNote:
      "Next.js App Router API route proxies designed to avoid leaking client IP addresses and manage standard GitHub API rate budgets.",
  },
];

export default function ChangelogPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pb-24">
      {/* Top Breadcrumb & Hero */}
      <section className="relative w-full border-b border-border bg-card/40 pt-12 pb-14 technical-grid overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors group cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>RETURN TO REPOSITORY DOSSIER</span>
          </Link>

          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm border border-border bg-secondary font-mono text-[11px] text-muted-foreground">
              <GitBranch className="h-3 w-3 text-primary" />
              <span>VERSION CHRONOLOGY & EVOLUTION</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground font-display">
              Gitlytics Architectural Timeline
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground font-sans max-w-2xl leading-relaxed">
              Tracing the platform from v1.0 foundational GitHub lookups through the v2.6 FlowForge operational engine, retro-pixel telemetry, and Global Repository Radar.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
        <div className="relative border-l-2 border-border/80 pl-6 sm:pl-10 space-y-12">
          {TIMELINE.map((item, idx) => (
            <motion.div
              key={item.version}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="relative group"
            >
              {/* Timeline Node Icon */}
              <div
                className={`absolute -left-[35px] sm:-left-[51px] top-1.5 h-6 w-6 rounded-full border-2 border-background flex items-center justify-center text-[10px] font-mono font-bold shadow-xs ${
                  idx === 0
                    ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                    : "bg-secondary text-muted-foreground border-border group-hover:border-primary group-hover:text-primary transition-colors"
                }`}
              >
                {idx === 0 ? "★" : item.version.replace("v", "")}
              </div>

              {/* Version Milestone Card */}
              <div className="surface-panel p-6 sm:p-7 rounded-xl border border-border bg-card/85 hover:border-primary/40 transition-all shadow-xs space-y-4">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xl sm:text-2xl font-extrabold font-mono text-foreground tracking-tight">
                      {item.version}
                    </span>
                    <span className="text-sm font-semibold text-muted-foreground font-display">
                      // {item.codename}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border font-semibold tracking-wide ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {item.date}
                    </span>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed">
                  {item.summary}
                </p>

                {/* Highlights List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {item.highlights.map((h, hIdx) => (
                    <div
                      key={hIdx}
                      className="p-2.5 rounded bg-secondary/40 border border-border/60 text-xs font-sans text-foreground/90 space-y-1"
                    >
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-secondary text-primary font-bold border border-border/80">
                        {h.category}
                      </span>
                      <p className="text-[11px] text-muted-foreground pt-0.5 leading-relaxed">
                        {h.text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Architecture Footnote */}
                <div className="pt-3 border-t border-border/60 flex items-start gap-2 text-[11px] font-mono text-muted-foreground">
                  <Cpu className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Architecture Note: {item.architectureNote}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
