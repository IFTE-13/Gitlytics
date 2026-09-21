"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Download,
  Sparkles,
  Layers,
  ShieldAlert,
  Code2,
  Check,
} from "lucide-react";
import { motion } from "motion/react";
import type { GitHubUser, GitHubRepo, Language } from "@/lib/types";
import { ReadmeEmbedModal } from "@/components/readme-embed-modal";

export type CardVariant = "dossier" | "cyber" | "rpg" | "swiss";

interface GitcardSectionProps {
  userData: GitHubUser | null;
  repos: GitHubRepo[];
  languages: Language[];
}

export function GitcardSection({
  userData,
  repos,
  languages,
}: GitcardSectionProps) {
  const [variant, setVariant] = useState<CardVariant>("dossier");
  const [isReadmeModalOpen, setIsReadmeModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const username = userData?.login || "developer";
  const userDisplayName = userData?.name || username;
  const totalStars = repos.reduce((sum, r) => sum + r.stars, 0);
  const totalForks = repos.reduce((sum, r) => sum + r.forks, 0);
  const totalRepos = userData?.public_repos || repos.length;
  const followers = userData?.followers || 0;
  const topLanguage = languages.length > 0 ? languages[0].name : "Plain Text";

  // Calculate Developer Archetype
  const computeArchetype = () => {
    const langCounts: Record<string, number> = {};
    repos.forEach((r) => {
      if (r.language) langCounts[r.language] = (langCounts[r.language] || 0) + 1;
    });
    const hasSystems = ["Rust", "C", "C++", "Go", "Zig"].some((l) => (langCounts[l] || 0) > 1);
    const hasWeb = ["TypeScript", "JavaScript", "HTML", "CSS"].some((l) => (langCounts[l] || 0) > 2);

    if (followers > 5000 || totalStars > 5000) return { title: "Open-Source Luminary", tier: "TIER 01", class: "Luminary Sage" };
    if (hasSystems && hasWeb) return { title: "Polyglot Systems Engineer", tier: "POLYGLOT", class: "Dual-Stack Rogue" };
    if (hasSystems) return { title: "Systems Architect", tier: "COMPILED", class: "Kernel Paladin" };
    if (totalRepos > 30) return { title: "Prolific Codebase Creator", tier: "FOUNDER", class: "Forge Master" };
    return { title: "Software Craftsman", tier: "ENGINEER", class: "Artisan Knight" };
  };

  const archetype = computeArchetype();
  const accountYear = userData?.created_at ? new Date(userData.created_at).getFullYear() : 2026;
  const tenureYears = Math.max(1, new Date().getFullYear() - accountYear);
  const developerLevel = Math.min(99, Math.floor(Math.sqrt(totalStars * 1.5) + totalRepos * 0.4 + tenureYears * 2));

  // Draw Card onto Canvas
  const drawCard = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 1200;
    const H = 630;
    canvas.width = W;
    canvas.height = H;

    const avatarImg = new Image();
    avatarImg.crossOrigin = "anonymous";
    avatarImg.onload = () => renderScene(avatarImg);
    avatarImg.onerror = () => renderScene(null);
    avatarImg.src = userData?.avatar_url || "";

    function renderScene(img: HTMLImageElement | null) {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);

      // 1. DOSSIER
      if (variant === "dossier") {
        ctx.fillStyle = "#090d16";
        ctx.fillRect(0, 0, W, H);

        ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
        ctx.lineWidth = 1;
        for (let x = 0; x < W; x += 30) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, H);
          ctx.stroke();
        }
        for (let y = 0; y < H; y += 30) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(W, y);
          ctx.stroke();
        }

        ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
        ctx.lineWidth = 2;
        ctx.strokeRect(30, 30, W - 60, H - 60);

        ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
        ctx.fillRect(30, 30, W - 60, 50);

        ctx.font = "bold 14px monospace";
        ctx.fillStyle = "#6366f1";
        ctx.fillText("● GITLYTICS // REPO TELEMETRY DOSSIER", 54, 62);

        ctx.font = "12px monospace";
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        ctx.fillText(`MEMBER SINCE ${accountYear}  ·  PUBLIC ARCHIVE DATA`, W - 380, 62);

        const avX = 60, avY = 110, avS = 130;
        if (img) {
          ctx.save();
          ctx.beginPath();
          ctx.rect(avX, avY, avS, avS);
          ctx.clip();
          ctx.drawImage(img, avX, avY, avS, avS);
          ctx.restore();
          ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
          ctx.lineWidth = 2;
          ctx.strokeRect(avX, avY, avS, avS);
        }

        ctx.font = "bold 36px sans-serif";
        ctx.fillStyle = "#f8fafc";
        ctx.fillText(userDisplayName, 220, 150);

        ctx.font = "bold 18px monospace";
        ctx.fillStyle = "#818cf8";
        ctx.fillText(`@${username}`, 220, 185);

        ctx.font = "bold 13px monospace";
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.fillText(`ARCHETYPE // ${archetype.tier} — ${archetype.title.toUpperCase()}`, 220, 220);

        const stats = [
          { label: "STARS RECEIVED", val: totalStars.toLocaleString() },
          { label: "NETWORK FORKS", val: totalForks.toLocaleString() },
          { label: "PUBLIC REPOSITORIES", val: totalRepos.toLocaleString() },
          { label: "COMMUNITY FOLLOWERS", val: followers.toLocaleString() },
        ];

        const cardW = 260, cardY = 270;
        stats.forEach((st, idx) => {
          const cardX = 60 + idx * 276;
          ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
          ctx.fillRect(cardX, cardY, cardW, 110);
          ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
          ctx.strokeRect(cardX, cardY, cardW, 110);

          ctx.font = "bold 11px monospace";
          ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
          ctx.fillText(st.label, cardX + 16, cardY + 34);

          ctx.font = "bold 34px monospace";
          ctx.fillStyle = "#ffffff";
          ctx.fillText(st.val, cardX + 16, cardY + 82);
        });

        ctx.font = "bold 12px monospace";
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        ctx.fillText("LINGUISTIC SPECTRUM (TOP LANGUAGES BY BYTE VOLUME)", 60, 430);

        const barX = 60, barY = 445, barW = W - 120, barH = 24;
        let curX = barX;
        languages.slice(0, 6).forEach((lang) => {
          const segW = Math.max(8, (lang.percentage / 100) * barW);
          ctx.fillStyle = lang.color || "#818cf8";
          ctx.fillRect(curX, barY, segW, barH);
          curX += segW;
        });

        let legX = 60;
        languages.slice(0, 5).forEach((lang) => {
          ctx.fillStyle = lang.color || "#818cf8";
          ctx.beginPath();
          ctx.arc(legX + 6, 500, 5, 0, Math.PI * 2);
          ctx.fill();

          ctx.font = "bold 12px monospace";
          ctx.fillStyle = "#ffffff";
          ctx.fillText(`${lang.name} ${lang.percentage}%`, legX + 18, 504);
          legX += ctx.measureText(`${lang.name} ${lang.percentage}%`).width + 36;
        });

        ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
        ctx.beginPath();
        ctx.moveTo(60, 545);
        ctx.lineTo(W - 60, 545);
        ctx.stroke();

        ctx.font = "11px monospace";
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.fillText("PUBLIC CODEBASE SCOPE · PRIVATE CONTRIBUTIONS EXCLUDED PER GITHUB REST API SCOPE", 60, 575);
        ctx.fillText("GITLYTICS.VERCEL.APP", W - 230, 575);
      }

      // 2. CYBER MATRIX
      else if (variant === "cyber") {
        ctx.fillStyle = "#05070c";
        ctx.fillRect(0, 0, W, H);

        ctx.strokeStyle = "rgba(56, 189, 248, 0.08)";
        ctx.lineWidth = 1;
        for (let y = 0; y < H; y += 40) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(W, y);
          ctx.stroke();
        }

        ctx.strokeStyle = "#0284c7";
        ctx.lineWidth = 2;
        ctx.strokeRect(36, 36, W - 72, H - 72);

        const corners = [[36, 36], [W - 36, 36], [36, H - 36], [W - 36, H - 36]];
        ctx.fillStyle = "#38bdf8";
        corners.forEach(([cx, cy]) => ctx.fillRect(cx - 5, cy - 5, 10, 10));

        ctx.font = "bold 15px monospace";
        ctx.fillStyle = "#38bdf8";
        ctx.fillText("> SYS_DIAGNOSTIC_V2 // ID: 0x" + username.toUpperCase(), 60, 75);
        ctx.fillStyle = "#f59e0b";
        ctx.fillText(`STATUS: ONLINE [PUBLIC_GROUND_TRUTH]`, W - 390, 75);

        const avX = 60, avY = 110, avS = 130;
        if (img) {
          ctx.save();
          ctx.drawImage(img, avX, avY, avS, avS);
          ctx.restore();
          ctx.strokeStyle = "#38bdf8";
          ctx.lineWidth = 2;
          ctx.strokeRect(avX - 2, avY - 2, avS + 4, avS + 4);
        }

        ctx.font = "bold 40px monospace";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(userDisplayName.toUpperCase(), 220, 155);

        ctx.font = "bold 18px monospace";
        ctx.fillStyle = "#38bdf8";
        ctx.fillText(`// @${username.toUpperCase()} · CLASS: ${archetype.class.toUpperCase()}`, 220, 195);

        ctx.font = "13px monospace";
        ctx.fillStyle = "#f59e0b";
        ctx.fillText(`PRIMARY_CORE: ${topLanguage.toUpperCase()} · TENURE: ${tenureYears} CYCLES`, 220, 225);

        const metrics = [
          { label: "STAR_GRAVITY", val: totalStars.toLocaleString(), pct: Math.min(100, Math.round((totalStars / 500) * 100)) },
          { label: "NETWORK_FORKS", val: totalForks.toLocaleString(), pct: Math.min(100, Math.round((totalForks / 200) * 100)) },
          { label: "REPOSITORIES", val: totalRepos.toString(), pct: Math.min(100, Math.round((totalRepos / 40) * 100)) },
          { label: "COMMUNITY_REACH", val: followers.toLocaleString(), pct: Math.min(100, Math.round((followers / 200) * 100)) },
        ];

        metrics.forEach((m, idx) => {
          const boxX = 60 + idx * 276;
          const boxY = 270;
          ctx.fillStyle = "rgba(8, 47, 73, 0.3)";
          ctx.fillRect(boxX, boxY, 260, 130);
          ctx.strokeStyle = "rgba(56, 189, 248, 0.3)";
          ctx.strokeRect(boxX, boxY, 260, 130);

          ctx.font = "bold 11px monospace";
          ctx.fillStyle = "#38bdf8";
          ctx.fillText(`[${m.label}]`, boxX + 16, boxY + 30);

          ctx.font = "bold 32px monospace";
          ctx.fillStyle = "#ffffff";
          ctx.fillText(m.val, boxX + 16, boxY + 75);

          const totalBlocks = 12;
          const filled = Math.max(1, Math.round((m.pct / 100) * totalBlocks));
          let bar = "[";
          for (let b = 0; b < totalBlocks; b++) bar += b < filled ? "█" : "░";
          bar += `] ${m.pct}%`;

          ctx.font = "11px monospace";
          ctx.fillStyle = "#f59e0b";
          ctx.fillText(bar, boxX + 16, boxY + 108);
        });

        ctx.font = "bold 12px monospace";
        ctx.fillStyle = "#38bdf8";
        ctx.fillText("COMPILED_BYTE_SPECTRUM:", 60, 445);

        let curLx = 60;
        languages.slice(0, 5).forEach((lang) => {
          ctx.fillStyle = "rgba(56, 189, 248, 0.15)";
          const txt = `${lang.name.toUpperCase()}: ${lang.percentage}%`;
          ctx.font = "bold 12px monospace";
          const tw = ctx.measureText(txt).width + 24;
          ctx.fillRect(curLx, 465, tw, 28);
          ctx.strokeStyle = lang.color || "#38bdf8";
          ctx.strokeRect(curLx, 465, tw, 28);

          ctx.fillStyle = "#ffffff";
          ctx.fillText(txt, curLx + 12, 484);
          curLx += tw + 12;
        });

        ctx.font = "11px monospace";
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.fillText("! PUBLIC REPOSITORIES ONLY · PRIVATE REPOS EXCLUDED // GITLYTICS v2.6", 60, 565);
        ctx.fillText("AUTHENTIC GITHUB TELEMETRY", W - 270, 565);
      }

      // 3. RPG ADVENTURER
      else if (variant === "rpg") {
        ctx.fillStyle = "#0c0a17";
        ctx.fillRect(0, 0, W, H);

        ctx.strokeStyle = "#d97706";
        ctx.lineWidth = 3;
        ctx.strokeRect(36, 36, W - 72, H - 72);
        ctx.strokeStyle = "rgba(217, 119, 6, 0.3)";
        ctx.strokeRect(44, 44, W - 88, H - 88);

        ctx.fillStyle = "#d97706";
        ctx.fillRect(60, 60, 160, 32);
        ctx.font = "bold 14px sans-serif";
        ctx.fillStyle = "#0c0a17";
        ctx.fillText(`LVL ${developerLevel} HERO`, 90, 82);

        ctx.font = "bold 16px monospace";
        ctx.fillStyle = "#fde68a";
        ctx.fillText(`GUILD ARCHIVE: ${userData?.company || "OPEN SOURCE REALM"}`, 240, 82);

        const avX = 60, avY = 115, avS = 130;
        if (img) {
          ctx.save();
          ctx.drawImage(img, avX, avY, avS, avS);
          ctx.restore();
          ctx.strokeStyle = "#d97706";
          ctx.lineWidth = 2;
          ctx.strokeRect(avX, avY, avS, avS);
        }

        ctx.font = "bold 38px serif";
        ctx.fillStyle = "#fef3c7";
        ctx.fillText(userDisplayName, 220, 155);

        ctx.font = "bold 18px monospace";
        ctx.fillStyle = "#f59e0b";
        ctx.fillText(`Class: ${archetype.class}  (@${username})`, 220, 190);

        ctx.font = "14px sans-serif";
        ctx.fillStyle = "rgba(254, 243, 199, 0.7)";
        ctx.fillText(`Special Skill: ${topLanguage} Resonance  ·  Tenure: ${tenureYears} Years in Code Realm`, 220, 225);

        const rpgStats = [
          { stat: "STR // STAR GRAVITY", val: totalStars.toLocaleString(), desc: "Force of community influence" },
          { stat: "DEX // FORK LEVERAGE", val: totalForks.toLocaleString(), desc: "Downstream derivative branches" },
          { stat: "INT // MANA ARCHIVE", val: `${totalRepos} Tomes`, desc: "Public repositories mastered" },
          { stat: "WIS // FELLOWSHIP", val: `${followers.toLocaleString()} Allies`, desc: "Subscribed quest followers" },
        ];

        rpgStats.forEach((st, idx) => {
          const cardX = 60 + idx * 276;
          const cardY = 270;
          ctx.fillStyle = "rgba(217, 119, 6, 0.08)";
          ctx.fillRect(cardX, cardY, 260, 120);
          ctx.strokeStyle = "rgba(217, 119, 6, 0.35)";
          ctx.strokeRect(cardX, cardY, 260, 120);

          ctx.font = "bold 12px monospace";
          ctx.fillStyle = "#f59e0b";
          ctx.fillText(st.stat, cardX + 16, cardY + 30);

          ctx.font = "bold 28px serif";
          ctx.fillStyle = "#ffffff";
          ctx.fillText(st.val, cardX + 16, cardY + 70);

          ctx.font = "11px sans-serif";
          ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
          ctx.fillText(st.desc, cardX + 16, cardY + 98);
        });

        ctx.font = "bold 13px monospace";
        ctx.fillStyle = "#fde68a";
        ctx.fillText("LANGUAGE MASTERY & GRIMOIRE:", 60, 440);

        let tX = 60;
        languages.slice(0, 5).forEach((lang) => {
          ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
          const nameTxt = `✦ ${lang.name} (${lang.percentage}%)`;
          ctx.font = "12px sans-serif";
          const tw = ctx.measureText(nameTxt).width + 24;
          ctx.fillRect(tX, 460, tw, 28);
          ctx.strokeStyle = "#d97706";
          ctx.strokeRect(tX, 460, tw, 28);

          ctx.fillStyle = "#fef3c7";
          ctx.fillText(nameTxt, tX + 12, 479);
          tX += tw + 12;
        });

        ctx.font = "11px monospace";
        ctx.fillStyle = "rgba(217, 119, 6, 0.7)";
        ctx.fillText("HERO METRICS FORGED FROM PUBLIC REALM API · PRIVATE ACTIVITIES UNCHARTED", 60, 565);
        ctx.fillText("CARD #GL-2026-" + username.toUpperCase().slice(0, 6), W - 260, 565);
      }

      // 4. SWISS MODERNIST
      else {
        ctx.fillStyle = "#f8f9fa";
        ctx.fillRect(0, 0, W, H);

        ctx.fillStyle = "#e11d48";
        ctx.fillRect(0, 0, 16, H);

        ctx.font = "bold 13px monospace";
        ctx.fillStyle = "#090d16";
        ctx.fillText("GITLYTICS / INTERNATIONAL DEVELOPER DOSSIER", 60, 65);
        ctx.fillStyle = "#64748b";
        ctx.fillText(`YEAR: ${accountYear}  ·  PUBLIC API VERIFIED`, W - 320, 65);

        ctx.strokeStyle = "#090d16";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(60, 80);
        ctx.lineTo(W - 60, 80);
        ctx.stroke();

        const avX = 60, avY = 110, avS = 130;
        if (img) {
          ctx.save();
          ctx.drawImage(img, avX, avY, avS, avS);
          ctx.restore();
          ctx.strokeStyle = "#090d16";
          ctx.lineWidth = 2;
          ctx.strokeRect(avX, avY, avS, avS);
        }

        ctx.font = "900 44px sans-serif";
        ctx.fillStyle = "#090d16";
        ctx.fillText(userDisplayName, 220, 155);

        ctx.font = "bold 20px monospace";
        ctx.fillStyle = "#e11d48";
        ctx.fillText(`github.com/${username}`, 220, 195);

        ctx.font = "bold 14px sans-serif";
        ctx.fillStyle = "#64748b";
        ctx.fillText(`${archetype.title.toUpperCase()}  ·  ${userData?.location || "GLOBAL"}`, 220, 225);

        const stats = [
          { label: "STAR ACCUMULATION", val: totalStars.toLocaleString() },
          { label: "NETWORK FORKS", val: totalForks.toLocaleString() },
          { label: "CODEBASES ANALYZED", val: totalRepos.toString() },
          { label: "SUBSCRIBED FOLLOWERS", val: followers.toLocaleString() },
        ];

        stats.forEach((st, idx) => {
          const cardX = 60 + idx * 276;
          const cardY = 270;
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(cardX, cardY, 260, 130);
          ctx.strokeStyle = "#e2e8f0";
          ctx.lineWidth = 1;
          ctx.strokeRect(cardX, cardY, 260, 130);

          ctx.fillStyle = "#e11d48";
          ctx.fillRect(cardX, cardY, 260, 4);

          ctx.font = "bold 11px monospace";
          ctx.fillStyle = "#64748b";
          ctx.fillText(st.label, cardX + 16, cardY + 34);

          ctx.font = "900 36px sans-serif";
          ctx.fillStyle = "#090d16";
          ctx.fillText(st.val, cardX + 16, cardY + 85);
        });

        ctx.font = "bold 12px monospace";
        ctx.fillStyle = "#090d16";
        ctx.fillText("PRIMARY CODE VOLUMES (MEASURED IN SOURCE BYTES):", 60, 445);

        let swX = 60;
        languages.slice(0, 5).forEach((lang) => {
          ctx.fillStyle = "#090d16";
          ctx.fillRect(swX, 465, 8, 26);

          ctx.font = "bold 13px monospace";
          ctx.fillStyle = "#090d16";
          const txt = `${lang.name}: ${lang.percentage}%`;
          ctx.fillText(txt, swX + 16, 483);
          swX += ctx.measureText(txt).width + 36;
        });

        ctx.strokeStyle = "#e2e8f0";
        ctx.beginPath();
        ctx.moveTo(60, 535);
        ctx.lineTo(W - 60, 535);
        ctx.stroke();

        ctx.font = "11px monospace";
        ctx.fillStyle = "#64748b";
        ctx.fillText("NOTE: PRIVATE COMMITS ARE EXCLUDED AS DATA IS DERIVED FROM PUBLIC GITHUB REST API.", 60, 565);
        ctx.fillText("GITLYTICS.VERCEL.APP", W - 220, 565);
      }
    }
  }, [variant, userData, repos, languages, username, userDisplayName, totalStars, totalForks, totalRepos, followers, topLanguage, archetype, accountYear, tenureYears, developerLevel]);

  useEffect(() => {
    drawCard();
  }, [drawCard]);

  // Export functions
  const downloadImage = (format: "png" | "jpg") => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setIsExporting(true);

    const mime = format === "png" ? "image/png" : "image/jpeg";
    const quality = format === "jpg" ? 0.95 : undefined;
    const dataUrl = canvas.toDataURL(mime, quality);

    const link = document.createElement("a");
    link.download = `gitcard.${format}`;
    link.href = dataUrl;
    link.click();
    setIsExporting(false);
    setDownloadSuccess(format.toUpperCase());
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <motion.section
      id="gitcard-generator-section"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6"
    >
      <div className="surface-panel rounded-lg border border-border bg-card p-6 sm:p-8 shadow-xs">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-border gap-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-primary/10 text-primary">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-foreground tracking-tight">
                Gitcard Generator // Collectible Profile Specimen
              </h3>
              <p className="text-xs text-muted-foreground font-sans">
                Render and export high-resolution stat cards formatted for your GitHub profile README
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-secondary text-[11px] font-mono text-muted-foreground">
              <ShieldAlert className="h-3.5 w-3.5 text-amber-500" />
              <span>PUBLIC SCOPE ONLY</span>
            </span>
          </div>
        </div>

        {/* Variant Selector Tabs */}
        <div className="space-y-3 pt-5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-primary" />
              <span>Select Card Design Aesthetic:</span>
            </label>
            <span className="text-[10px] font-mono text-muted-foreground">
              4 BESPOKE CREATIVE THEMES
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { id: "dossier", name: "Telemetry Dossier", desc: "Editorial architectural blueprint" },
              { id: "cyber", name: "Cyber Matrix", desc: "Obsidian terminal HUD & meters" },
              { id: "rpg", name: "RPG Adventurer", desc: "Hero level, class & grimoire" },
              { id: "swiss", name: "Swiss Modernist", desc: "Bold international typography" },
            ].map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setVariant(v.id as CardVariant)}
                className={`p-3 text-left rounded-lg border transition-all cursor-pointer ${
                  variant === v.id
                    ? "border-primary bg-primary/10 text-foreground ring-1 ring-primary/40 shadow-xs"
                    : "border-border bg-secondary/30 text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <div className="font-mono text-xs font-bold text-foreground">
                  {v.name}
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5 font-sans">
                  {v.desc}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Live Canvas Preview */}
        <div className="my-6 rounded-lg border border-border overflow-hidden bg-secondary/30 flex items-center justify-center p-3 sm:p-5 shadow-inner">
          <canvas
            ref={canvasRef}
            className="w-full h-auto rounded max-h-[380px] object-contain shadow-lg"
          />
        </div>

        {/* Export & Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border">
          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            {/* Export as PNG */}
            <button
              type="button"
              onClick={() => downloadImage("png")}
              disabled={isExporting}
              className="px-4 py-2.5 rounded bg-primary text-primary-foreground font-mono text-xs font-bold hover:opacity-90 active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              {downloadSuccess === "PNG" ? (
                <>
                  <Check className="h-3.5 w-3.5 text-primary-foreground" />
                  <span>Downloaded gitcard.png</span>
                </>
              ) : (
                <>
                  <Download className="h-3.5 w-3.5" />
                  <span>Export as PNG</span>
                </>
              )}
            </button>

            {/* Export as JPG */}
            <button
              type="button"
              onClick={() => downloadImage("jpg")}
              disabled={isExporting}
              className="px-4 py-2.5 rounded border border-border bg-secondary text-foreground font-mono text-xs font-semibold hover:bg-card active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
            >
              {downloadSuccess === "JPG" ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Downloaded gitcard.jpg</span>
                </>
              ) : (
                <>
                  <Download className="h-3.5 w-3.5" />
                  <span>Export as JPG</span>
                </>
              )}
            </button>

            {/* Trigger Markdown/HTML Embed Modal */}
            <button
              type="button"
              onClick={() => setIsReadmeModalOpen(true)}
              className="px-4 py-2.5 rounded border border-primary/40 bg-primary/10 text-primary font-mono text-xs font-bold hover:bg-primary/20 transition-all flex items-center gap-2 cursor-pointer shadow-2xs"
            >
              <Code2 className="h-3.5 w-3.5" />
              <span>Add to GitHub Profile README</span>
            </button>
          </div>

          <div className="text-[11px] font-mono text-muted-foreground flex items-center gap-1.5 self-start sm:self-center">
            <ShieldAlert className="h-3.5 w-3.5 text-amber-500 shrink-0" />
            <span>Raw ground truth · Private contributions excluded</span>
          </div>
        </div>
      </div>

      {/* Markdown / HTML Embed Modal */}
      <ReadmeEmbedModal
        open={isReadmeModalOpen}
        onOpenChange={setIsReadmeModalOpen}
        username={username}
      />
    </motion.section>
  );
}
