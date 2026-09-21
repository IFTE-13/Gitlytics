import Link from "next/link";
import { ArrowLeft, Scale, ExternalLink } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "License — Gitlytics",
  description: "Gitlytics open-source MIT license and copyright terms.",
};

export default function LicensePage() {
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
            <Scale className="h-3.5 w-3.5 text-primary" />
            <span>OPEN SOURCE SOFTWARE TERMS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-foreground">
            MIT License
          </h1>
          <p className="text-base text-muted-foreground font-sans max-w-2xl leading-relaxed">
            Gitlytics is free, open-source software built for the developer community.
          </p>
        </div>

        {/* License Box */}
        <div className="my-8 surface-panel p-6 sm:p-8 rounded-lg border border-border bg-card font-mono text-xs leading-relaxed text-muted-foreground space-y-4 shadow-xs">
          <div className="text-foreground font-bold pb-2 border-b border-border">
            Copyright (c) 2026 Gitlytics Contributors
          </div>
          <p>
            Permission is hereby granted, free of charge, to any person obtaining a copy
            of this software and associated documentation files (the &quot;Software&quot;), to deal
            in the Software without restriction, including without limitation the rights
            to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
            copies of the Software, and to permit persons to whom the Software is
            furnished to do so, subject to the following conditions:
          </p>
          <p>
            The above copyright notice and this permission notice shall be included in all
            copies or substantial portions of the Software.
          </p>
          <p className="uppercase text-muted-foreground/80">
            THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
            IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
            FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
            AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
            LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
            OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
            SOFTWARE.
          </p>
        </div>

        {/* Source repository link */}
        <div className="flex items-center justify-between text-xs font-mono text-muted-foreground pt-4 border-t border-border">
          <span>SOURCE REPOSITORY: GITHUB</span>
          <Link
            href="https://github.com/IFTE-13/Gitlytics"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline inline-flex items-center gap-1"
          >
            <span>VIEW ON GITHUB</span>
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </main>
  );
}
