"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Copy,
  Check,
  Info,
  Terminal,
  ExternalLink,
  Code2,
} from "lucide-react";

interface ReadmeEmbedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  username: string;
}

export function ReadmeEmbedModal({
  open,
  onOpenChange,
  username,
}: ReadmeEmbedModalProps) {
  const [activeTab, setActiveTab] = useState<"card" | "hosted">("card");
  const [copiedMd, setCopiedMd] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [copiedBadge, setCopiedBadge] = useState(false);

  const cleanUser = username || "developer";
  const markdownSnippet = `[![Gitcard](./gitcard.png)](https://gitlytics.vercel.app/?u=${cleanUser})`;
  const htmlSnippet = `<p align="center">\n  <a href="https://gitlytics.vercel.app/?u=${cleanUser}">\n    <img src="./gitcard.png" alt="${cleanUser}'s Gitcard Stats" width="600" />\n  </a>\n</p>`;
  const badgeSnippet = `[![Gitlytics Profile](https://img.shields.io/badge/Gitlytics-@${cleanUser}-6366f1?style=for-the-badge&logo=github)](https://gitlytics.vercel.app/?u=${cleanUser})`;

  const copyToClipboard = (text: string, type: "md" | "html" | "badge") => {
    navigator.clipboard.writeText(text);
    if (type === "md") {
      setCopiedMd(true);
      setTimeout(() => setCopiedMd(false), 2000);
    } else if (type === "html") {
      setCopiedHtml(true);
      setTimeout(() => setCopiedHtml(false), 2000);
    } else {
      setCopiedBadge(true);
      setTimeout(() => setCopiedBadge(false), 2000);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-5 sm:p-7 bg-background border-border shadow-2xl">
        <DialogHeader className="border-b border-border pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/10 text-primary">
              <Code2 className="h-4 w-4" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold font-display text-foreground">
                Add to GitHub Profile README
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground font-sans mt-0.5">
                Embed your custom Gitcard into your GitHub profile
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Tab switcher matching the reference */}
        <div className="pt-2 space-y-4">
          <div className="grid grid-cols-2 rounded-lg border border-border bg-secondary/40 p-1">
            <button
              type="button"
              onClick={() => setActiveTab("card")}
              className={`py-2 text-xs font-mono font-bold rounded transition-colors cursor-pointer ${
                activeTab === "card"
                  ? "bg-card text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              1. Your Card (gitcard.png)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("hosted")}
              className={`py-2 text-xs font-mono font-bold rounded transition-colors cursor-pointer ${
                activeTab === "hosted"
                  ? "bg-card text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              2. Hosted Web Badge
            </button>
          </div>

          {activeTab === "card" ? (
            <div className="space-y-4">
              {/* How to show card in 2 steps */}
              <div className="p-4 rounded-lg border border-primary/25 bg-primary/5 space-y-2 text-xs font-sans">
                <div className="flex items-center gap-2 font-mono font-bold text-foreground">
                  <Info className="h-4 w-4 text-primary shrink-0" />
                  <span>How to show your personal card in 2 steps:</span>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-muted-foreground pl-1 leading-relaxed">
                  <li>
                    Click <strong className="text-foreground">Export as PNG</strong> in the Gitcard section and save as{" "}
                    <code className="px-1.5 py-0.5 rounded bg-secondary font-mono text-[11px] text-foreground">
                      gitcard.png
                    </code>
                    .
                  </li>
                  <li>
                    Upload{" "}
                    <code className="px-1.5 py-0.5 rounded bg-secondary font-mono text-[11px] text-foreground">
                      gitcard.png
                    </code>{" "}
                    to your{" "}
                    <code className="px-1.5 py-0.5 rounded bg-secondary font-mono text-[11px] text-foreground">
                      {cleanUser}/{cleanUser}
                    </code>{" "}
                    repo, then paste the snippet below into your{" "}
                    <code className="px-1.5 py-0.5 rounded bg-secondary font-mono text-[11px] text-foreground">
                      README.md
                    </code>
                    .
                  </li>
                </ol>
              </div>

              {/* Markdown Snippet */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-foreground flex items-center gap-1.5">
                    <Terminal className="h-3.5 w-3.5 text-primary" />
                    <span>Markdown Snippet</span>
                  </span>
                  <span className="text-[11px] text-muted-foreground">Standard GitHub README</span>
                </div>
                <div className="flex items-center justify-between gap-3 p-3 rounded border border-border bg-secondary/60 font-mono text-xs text-foreground overflow-x-auto">
                  <code className="truncate text-primary">
                    {markdownSnippet}
                  </code>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(markdownSnippet, "md")}
                    className="px-3 py-1.5 rounded bg-card border border-border text-foreground hover:bg-secondary flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer text-xs font-semibold shadow-2xs"
                  >
                    {copiedMd ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                        <span className="text-emerald-500">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Markdown</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* HTML Embed (Centered & Resized) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-foreground flex items-center gap-1.5">
                    <Terminal className="h-3.5 w-3.5 text-primary" />
                    <span>HTML Embed (Centered & Resized)</span>
                  </span>
                  <span className="text-[11px] text-muted-foreground">Custom alignment</span>
                </div>
                <div className="flex items-start justify-between gap-3 p-3 rounded border border-border bg-secondary/60 font-mono text-xs text-foreground">
                  <pre className="overflow-x-auto text-muted-foreground text-[11px] leading-relaxed">
{htmlSnippet}
                  </pre>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(htmlSnippet, "html")}
                    className="px-3 py-1.5 rounded bg-card border border-border text-foreground hover:bg-secondary flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer text-xs font-semibold shadow-2xs"
                  >
                    {copiedHtml ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                        <span className="text-emerald-500">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy HTML</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Tab 2: Hosted Web Badge */
            <div className="space-y-3 p-4 rounded-lg border border-border bg-secondary/30 text-xs font-mono">
              <p className="text-muted-foreground font-sans">
                Link directly to your live Gitlytics intelligence report using a badge:
              </p>
              <div className="p-3 rounded bg-card border border-border text-primary break-all">
                {badgeSnippet}
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(badgeSnippet, "badge")}
                className="px-3 py-1.5 rounded bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity cursor-pointer flex items-center gap-1.5"
              >
                {copiedBadge ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-300" />
                    <span>Badge Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Badge Snippet</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Footer Preview Link */}
          <div className="pt-2 text-center text-xs font-mono text-muted-foreground">
            Preview live profile link:{" "}
            <a
              href={`https://gitlytics.vercel.app/?u=${cleanUser}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline inline-flex items-center gap-1"
            >
              <span>{`https://gitlytics.vercel.app/?u=${cleanUser}`}</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
