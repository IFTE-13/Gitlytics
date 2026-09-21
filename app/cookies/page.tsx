import Link from "next/link";
import { ArrowLeft, Cookie, HardDrive, CheckCircle2, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie & Storage Policy — Gitlytics",
  description: "Gitlytics disclosure on browser cookies, local storage keys, and zero-tracking commitment.",
};

export default function CookiesPage() {
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
            <Cookie className="h-3.5 w-3.5 text-primary" />
            <span>STORAGE & PREFERENCES SPECIFICATION</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-foreground">
            Cookie & Storage Policy
          </h1>
          <p className="text-base text-muted-foreground font-sans max-w-2xl leading-relaxed">
            Gitlytics operates on a cookie-free, privacy-preserving standard. We do not use third-party tracking, advertising, or profiling cookies.
          </p>
          <div className="text-[11px] font-mono text-muted-foreground pt-1">
            STATUS: ZERO THIRD-PARTY TRACKING COOKIES
          </div>
        </div>

        {/* Highlight Card */}
        <div className="my-8 p-5 rounded-lg border border-primary/25 bg-primary/5 flex items-start gap-4">
          <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="text-sm font-bold font-mono text-foreground uppercase tracking-wider">
              No Traditional Tracking Cookies Used
            </h3>
            <p className="text-xs text-muted-foreground font-sans leading-relaxed">
              When you browse Gitlytics, we do not issue tracking cookies, marketing beacons, or session monitors to follow your activity across the web. The only data written to your browser is client-side <code>localStorage</code> to remember your selected aesthetic preferences.
            </p>
          </div>
        </div>

        {/* Storage Keys Table */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold font-display text-foreground border-b border-border pb-2 flex items-center gap-2">
            <HardDrive className="h-4 w-4 text-primary" />
            <span>Local Storage Key Inventory</span>
          </h2>
          <p className="text-sm text-muted-foreground font-sans">
            The table below outlines all keys stored in your browser&apos;s HTML5 <code>localStorage</code>:
          </p>

          <div className="surface-panel overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="border-b border-border text-muted-foreground uppercase text-[10px] tracking-wider bg-secondary/40">
                  <th className="py-3 px-4 font-semibold">Key Identifier</th>
                  <th className="py-3 px-4 font-semibold">Purpose</th>
                  <th className="py-3 px-4 font-semibold">Possible Values</th>
                  <th className="py-3 px-4 font-semibold">Retention</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                <tr>
                  <td className="py-3 px-4 font-bold text-foreground">gitlytics-accent</td>
                  <td className="py-3 px-4 text-muted-foreground font-sans text-xs">
                    Persists your chosen accent theme palette to prevent visual flicker on reload.
                  </td>
                  <td className="py-3 px-4 text-primary">iris, amber, cobalt, emerald, vermilion</td>
                  <td className="py-3 px-4 text-muted-foreground">Persistent until cleared</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-foreground">theme</td>
                  <td className="py-3 px-4 text-muted-foreground font-sans text-xs">
                    Persists your color mode preference (managed by next-themes).
                  </td>
                  <td className="py-3 px-4 text-primary">dark, light, system</td>
                  <td className="py-3 px-4 text-muted-foreground">Persistent until cleared</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* How to clear storage */}
        <div className="mt-12 surface-panel p-6 rounded-lg border border-border bg-card space-y-3 font-sans text-sm text-muted-foreground">
          <h3 className="font-display font-bold text-base text-foreground">
            How to Clear Local Storage
          </h3>
          <p>
            You can clear your stored preferences at any time through your browser&apos;s developer tools or settings menu:
          </p>
          <ol className="list-decimal list-inside space-y-1 pl-2 text-xs font-mono text-foreground/80">
            <li>Press <kbd className="px-1.5 py-0.5 rounded border border-border bg-secondary">F12</kbd> or <kbd className="px-1.5 py-0.5 rounded border border-border bg-secondary">Cmd+Opt+I</kbd> to open Developer Tools.</li>
            <li>Navigate to the <strong>Application</strong> or <strong>Storage</strong> tab.</li>
            <li>Select <strong>Local Storage</strong> and click <strong>Clear All</strong>.</li>
          </ol>
        </div>
      </div>
    </main>
  );
}
