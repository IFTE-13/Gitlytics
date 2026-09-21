import Link from "next/link";
import { ArrowLeft, HelpCircle, ShieldAlert, Sparkles, Terminal, Code2, Database, Key } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions — Gitlytics",
  description: "Common questions about Gitlytics telemetry, metric computations, private contributions, and Gitcard README embeds.",
};

const FAQ_ITEMS = [
  {
    q: "Why are my private contributions and repositories not shown?",
    badge: "API SCOPE",
    a: "Gitlytics queries GitHub's public REST API v3 without requiring you to provide a Personal Access Token or grant OAuth permissions. Because public queries can only access publicly visible repositories, private repositories and commits to private codebases cannot be indexed. This design choice ensures complete zero-knowledge security—we never store or handle your private GitHub credentials.",
  },
  {
    q: "How is the Developer Archetype determined?",
    badge: "ALGORITHM",
    a: "Gitlytics synthesizes an archetype by inspecting your public repositories' primary languages, topic tags, stargazer reach, and repository volume. For example, heavy usage of compiled languages (C, C++, Rust, Go) classifies a profile as 'Systems Architect', whereas high community star gravity (>5,000 stars) earns 'Open-Source Luminary'. Profiles with diverse multi-runtime stacks are identified as 'Polyglot Systems Engineers'.",
  },
  {
    q: "How do I embed my Gitcard into my GitHub profile README?",
    badge: "GITCARD GUIDE",
    a: "Search your username on Gitlytics, open the Developer Dossier, and click 'EXPORT GITCARD'. Select your preferred card variant (Telemetry Dossier, Cyber Matrix, RPG Adventurer, or Swiss Modernist), then click 'Export as PNG' to save gitcard.png. Upload that image file into your special GitHub profile repository (e.g. yourname/yourname), then copy and paste the provided Markdown or HTML snippet into your README.md.",
  },
  {
    q: "What is the difference between Star Gravity and Fork Leverage?",
    badge: "METRICS",
    a: "Star Gravity represents total community endorsement and discovery across all your public repositories, including your average stars per repository. Fork Leverage measures derivative utility—how many downstream developers and teams have cloned or branched your codebases to build upon your work.",
  },
  {
    q: "What are GitHub API rate limits and how does Gitlytics manage them?",
    badge: "TELEMETRY",
    a: "GitHub enforces a limit of 60 requests per hour for unauthenticated IP queries. To protect this budget and deliver instant response times, Gitlytics proxies queries through an in-memory cached server-side layer with a 10-minute Time-To-Live (TTL). If you encounter rate-limiting errors, the limit resets automatically at the top of the hour.",
  },
  {
    q: "How does Language Byte Density differ from simple repository counts?",
    badge: "DATA VISUALIZATION",
    a: "Counting repositories by language can be deceptive (e.g., a tiny single-file shell script counting the same as a 100,000-line Rust codebase). Gitlytics queries GitHub's byte-level language endpoints to calculate the true source code byte volume, offering an authentic representation of your linguistic footprint.",
  },
];

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pb-24 technical-grid">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
        {/* Navigation back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>BACK TO GITLYTICS DASHBOARD</span>
        </Link>

        {/* Page Header */}
        <div className="space-y-3 pb-8 border-b border-border">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-secondary text-xs font-mono text-muted-foreground">
            <HelpCircle className="h-3.5 w-3.5 text-primary" />
            <span>KNOWLEDGE BASE & DOCUMENTATION</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-foreground">
            Frequently Asked Questions
          </h1>
          <p className="text-base text-muted-foreground font-sans max-w-2xl leading-relaxed">
            Everything you need to know about Gitlytics telemetry calculations, data boundaries, Gitcard README generation, and rate limits.
          </p>
        </div>

        {/* Prominent Public Scope Notice Box */}
        <div className="my-8 p-5 rounded-lg border border-amber-500/30 bg-amber-500/5 flex items-start gap-4">
          <ShieldAlert className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="text-sm font-bold font-mono text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              Public Data Boundary Disclosure
            </h3>
            <p className="text-xs text-muted-foreground font-sans leading-relaxed">
              Gitlytics uses the official GitHub REST API v3 under public scope. Private repositories, commits made to private client/enterprise projects, and organization-restricted codebases are <strong>never indexed or aggregated</strong>. All statistics represent verifiable, open-source ground truth.
            </p>
          </div>
        </div>

        {/* FAQ Accordion / Cards */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="surface-panel p-6 rounded-lg border border-border bg-card space-y-2.5"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary text-primary font-bold">
                  {item.badge}
                </span>
                <span className="text-[11px] font-mono text-muted-foreground">
                  0{idx + 1}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold font-display text-foreground">
                {item.q}
              </h2>
              <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                {item.a}
              </p>
            </div>
          ))}
        </div>

        {/* Need more help */}
        <div className="mt-12 p-6 rounded-lg border border-border bg-secondary/30 text-center space-y-2 font-mono text-xs">
          <p className="text-foreground font-bold">HAVE AN UNRESOLVED INQUIRY OR FEATURE SUGGESTION?</p>
          <p className="text-muted-foreground font-sans text-xs">
            Open an issue on the official{" "}
            <Link
              href="https://github.com/IFTE-13/Gitlytics"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:opacity-80"
            >
              Gitlytics GitHub repository
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
