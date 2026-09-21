import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, EyeOff, Server, HardDrive } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Gitlytics",
  description: "Gitlytics privacy commitments, zero-credential storage policy, and public GitHub API usage disclosure.",
};

export default function PrivacyPage() {
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
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            <span>DATA INTEGRITY & COMPLIANCE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-foreground">
            Privacy Policy
          </h1>
          <p className="text-base text-muted-foreground font-sans max-w-2xl leading-relaxed">
            Gitlytics is architected on a zero-knowledge, zero-credential foundation. We do not store, harvest, or monetize your developer identity.
          </p>
          <div className="text-[11px] font-mono text-muted-foreground pt-1">
            EFFECTIVE DATE: SEPTEMBER 2026 · VERSION 2.6
          </div>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
          <div className="surface-panel p-5 rounded-lg border border-border bg-card space-y-2">
            <Lock className="h-4 w-4 text-primary" />
            <h3 className="font-mono text-xs font-bold text-foreground uppercase">Zero Credential Storage</h3>
            <p className="text-xs text-muted-foreground font-sans leading-relaxed">
              We never ask for or store GitHub Personal Access Tokens, OAuth credentials, or account passwords.
            </p>
          </div>

          <div className="surface-panel p-5 rounded-lg border border-border bg-card space-y-2">
            <EyeOff className="h-4 w-4 text-primary" />
            <h3 className="font-mono text-xs font-bold text-foreground uppercase">Public Data Scope</h3>
            <p className="text-xs text-muted-foreground font-sans leading-relaxed">
              Only publicly accessible data provided by the official GitHub REST API v3 is retrieved and presented.
            </p>
          </div>

          <div className="surface-panel p-5 rounded-lg border border-border bg-card space-y-2">
            <HardDrive className="h-4 w-4 text-primary" />
            <h3 className="font-mono text-xs font-bold text-foreground uppercase">Local Preferences Only</h3>
            <p className="text-xs text-muted-foreground font-sans leading-relaxed">
              Preferences like your chosen theme and accent palette remain strictly inside your device&apos;s localStorage.
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8 font-sans text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold font-display text-foreground border-b border-border pb-2">
              1. Information We Access and Process
            </h2>
            <p>
              When you enter a GitHub username into Gitlytics, our server proxies a request to GitHub&apos;s publicly documented endpoints:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 font-mono text-xs text-foreground/90">
              <li>Public user profile data (name, username, bio, avatar URL, public repos, followers, created date)</li>
              <li>Public repository metadata (names, descriptions, star counts, fork counts, primary languages, topics)</li>
              <li>Public linguistic byte breakdowns via the repository language statistics endpoint</li>
            </ul>
            <p>
              <strong>Private repositories and private commit contributions are never accessed or stored</strong>, as Gitlytics executes queries without privileged authentication scope.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold font-display text-foreground border-b border-border pb-2">
              2. Temporary In-Memory Caching
            </h2>
            <p>
              To respect GitHub&apos;s hourly API rate-limiting thresholds and prevent duplicate requests, responses are retained in an ephemeral server-side in-memory cache for up to 10 minutes. This cache is automatically evicted and does not persist to any permanent database or third-party storage.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold font-display text-foreground border-b border-border pb-2">
              3. Analytics, Tracking & Cookies
            </h2>
            <p>
              Gitlytics does not use third-party analytics trackers, advertising pixels, or profiling cookies. We do not sell, rent, or trade any information about the profiles analyzed on this platform.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold font-display text-foreground border-b border-border pb-2">
              4. Open Source Transparency
            </h2>
            <p>
              Gitlytics is open-source software licensed under the MIT License. The complete source code, including all API route handlers and calculation utilities, is openly available for audit on GitHub.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
