"use client";

import { motion } from "motion/react";

export function HeroPixelClusterLeft() {
  return (
    <div className="absolute left-0 bottom-0 pointer-events-none select-none z-10 hidden md:block max-w-[280px] lg:max-w-[340px] xl:max-w-[380px] w-full text-foreground/80 dark:text-foreground/75">
      <svg
        viewBox="0 0 400 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-xs"
        shapeRendering="crispEdges"
      >
        {/* ========================================================
            1. PIXEL ROCKET (Top Left)
            ======================================================== */}
        <motion.g
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Rocket Nose & Body */}
          <rect x="52" y="24" width="8" height="8" fill="currentColor" />
          <rect x="48" y="32" width="16" height="8" fill="currentColor" />
          <rect x="44" y="40" width="24" height="12" fill="currentColor" />
          {/* Porthole */}
          <rect x="48" y="52" width="16" height="16" fill="currentColor" />
          <rect x="52" y="56" width="8" height="8" fill="var(--background)" />
          {/* Lower Body */}
          <rect x="44" y="68" width="24" height="16" fill="currentColor" />
          {/* Left Fin */}
          <rect x="36" y="68" width="8" height="16" fill="currentColor" />
          <rect x="28" y="76" width="8" height="12" fill="currentColor" />
          {/* Right Fin */}
          <rect x="68" y="68" width="8" height="16" fill="currentColor" />
          <rect x="76" y="76" width="8" height="12" fill="currentColor" />
          {/* Exhaust Flames */}
          <rect x="48" y="84" width="16" height="6" fill="currentColor" />
          <rect x="52" y="90" width="8" height="6" fill="currentColor" />
          {/* Sparks around rocket */}
          <rect x="24" y="36" width="4" height="4" fill="currentColor" />
          <rect x="80" y="44" width="4" height="4" fill="currentColor" />
          <rect x="32" y="100" width="4" height="4" fill="currentColor" />
          <rect x="72" y="98" width="4" height="4" fill="currentColor" />
        </motion.g>

        {/* ========================================================
            2. PIXEL LIGHTNING BOLT
            ======================================================== */}
        <motion.g
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        >
          <path
            d="M104 70 H124 L114 90 H132 L98 128 L108 98 H92 Z"
            fill="currentColor"
          />
          {/* Tiny spark stars */}
          <rect x="136" y="74" width="4" height="4" fill="currentColor" />
          <rect x="88" y="112" width="4" height="4" fill="currentColor" />
        </motion.g>

        {/* ========================================================
            3. PIXEL CODE EDITOR WINDOW (Bottom Left)
            ======================================================== */}
        <g>
          {/* Window Outer Frame */}
          <rect x="80" y="220" width="96" height="80" fill="var(--background)" stroke="currentColor" strokeWidth="4" />
          {/* Title bar line */}
          <line x1="80" y1="236" x2="176" y2="236" stroke="currentColor" strokeWidth="3" />
          {/* Window dots */}
          <rect x="88" y="226" width="4" height="4" fill="currentColor" />
          <rect x="96" y="226" width="4" height="4" fill="currentColor" />
          <rect x="104" y="226" width="4" height="4" fill="currentColor" />
          {/* Code lines */}
          <rect x="92" y="246" width="28" height="4" fill="currentColor" />
          <rect x="92" y="254" width="48" height="4" fill="currentColor" />
          <rect x="100" y="262" width="40" height="4" fill="currentColor" />
          <rect x="108" y="270" width="32" height="4" fill="currentColor" />
          <rect x="92" y="278" width="56" height="4" fill="currentColor" />
          <rect x="92" y="286" width="20" height="4" fill="currentColor" />
        </g>

        {/* ========================================================
            4. PIXEL STAR / COIN (Far Left)
            ======================================================== */}
        <g>
          {/* Outer Gear Coin */}
          <circle cx="50" cy="220" r="32" fill="var(--background)" stroke="currentColor" strokeWidth="4" />
          {/* Inner circle */}
          <circle cx="50" cy="220" r="24" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
          {/* Dollar / Star glyph in center */}
          <text
            x="50"
            y="228"
            fontFamily="monospace"
            fontSize="24"
            fontWeight="bold"
            textAnchor="middle"
            fill="currentColor"
          >
            $
          </text>
          {/* Decorative notches */}
          <rect x="48" y="184" width="4" height="4" fill="currentColor" />
          <rect x="48" y="252" width="4" height="4" fill="currentColor" />
          <rect x="14" y="218" width="4" height="4" fill="currentColor" />
          <rect x="82" y="218" width="4" height="4" fill="currentColor" />
        </g>

        {/* ========================================================
            5. PIXEL ARTIST CANVAS / OCTOCAT SMILEY (Center-Bottom)
            ======================================================== */}
        <g>
          {/* Easel Stand Legs */}
          <line x1="184" y1="230" x2="160" y2="330" stroke="currentColor" strokeWidth="3" />
          <line x1="220" y1="230" x2="244" y2="330" stroke="currentColor" strokeWidth="3" />
          <line x1="202" y1="210" x2="202" y2="330" stroke="currentColor" strokeWidth="3" />
          {/* Easel Canvas Board */}
          <rect x="172" y="236" width="60" height="52" fill="var(--background)" stroke="currentColor" strokeWidth="4" />
          {/* Pixel Cat / Smiley Face on Canvas */}
          <rect x="186" y="248" width="6" height="6" fill="currentColor" />
          <rect x="212" y="248" width="6" height="6" fill="currentColor" />
          <rect x="184" y="262" width="6" height="4" fill="currentColor" />
          <rect x="190" y="266" width="24" height="4" fill="currentColor" />
          <rect x="214" y="262" width="6" height="4" fill="currentColor" />
        </g>

        {/* ========================================================
            6. PIXEL GIFT BOX / PACKAGE (Center-Left)
            ======================================================== */}
        <g>
          {/* Box Body */}
          <rect x="170" y="148" width="56" height="48" fill="var(--background)" stroke="currentColor" strokeWidth="4" />
          {/* Ribbon Horizontal */}
          <line x1="170" y1="172" x2="226" y2="172" stroke="currentColor" strokeWidth="4" />
          {/* Ribbon Vertical */}
          <line x1="198" y1="148" x2="198" y2="196" stroke="currentColor" strokeWidth="4" />
          {/* Ribbon Bow on top */}
          <path
            d="M198 148 C186 136 174 144 198 148 C222 144 210 136 198 148 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
        </g>

        {/* ========================================================
            7. PIXEL 3D ISOMETRIC CUBE / DIAMOND
            ======================================================== */}
        <g>
          <path
            d="M246 250 L274 234 L302 250 L274 266 Z"
            fill="var(--background)"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            d="M246 250 L246 282 L274 298 L274 266 Z"
            fill="var(--background)"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            d="M302 250 L302 282 L274 298 L274 266 Z"
            fill="var(--background)"
            stroke="currentColor"
            strokeWidth="3"
          />
          {/* Wireframe details */}
          <line x1="274" y1="266" x2="274" y2="298" stroke="currentColor" strokeWidth="2" />
        </g>

        {/* ========================================================
            8. PIXEL NOTIFICATION ENVELOPE / MAIL
            ======================================================== */}
        <g>
          <rect x="230" y="296" width="54" height="36" fill="var(--background)" stroke="currentColor" strokeWidth="3" />
          <path d="M230 296 L257 318 L284 296" fill="none" stroke="currentColor" strokeWidth="3" />
        </g>

        {/* Sparkles / Pixels */}
        <rect x="14" y="278" width="6" height="6" fill="currentColor" />
        <rect x="24" y="300" width="6" height="6" fill="currentColor" />
        <rect x="18" y="324" width="6" height="6" fill="currentColor" />
        <rect x="140" y="130" width="4" height="4" fill="currentColor" />
        <rect x="156" y="118" width="4" height="4" fill="currentColor" />
        <rect x="120" y="170" width="6" height="6" fill="currentColor" />
      </svg>
    </div>
  );
}

export function HeroPixelClusterRight() {
  return (
    <div className="absolute right-0 bottom-0 pointer-events-none select-none z-10 hidden md:block max-w-[280px] lg:max-w-[340px] xl:max-w-[380px] w-full text-foreground/80 dark:text-foreground/75">
      <svg
        viewBox="0 0 400 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-xs"
        shapeRendering="crispEdges"
      >
        {/* ========================================================
            1. PIXEL HEADPHONE DEVELOPER (Top Right)
            ======================================================== */}
        <motion.g
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Headphone Band */}
          <path
            d="M312 84 C312 50 376 50 376 84"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
          />
          {/* Headphone Left Ear Cup */}
          <rect x="306" y="76" width="8" height="20" rx="3" fill="currentColor" />
          {/* Headphone Right Ear Cup */}
          <rect x="374" y="76" width="8" height="20" rx="3" fill="currentColor" />

          {/* Head / Face */}
          <circle cx="344" cy="90" r="28" fill="var(--background)" stroke="currentColor" strokeWidth="4" />
          {/* Hair bangs */}
          <path
            d="M322 74 C330 68 358 68 366 74"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
          />
          {/* Eyes (Smiling Arcs) */}
          <path d="M330 88 C332 84 336 84 338 88" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M350 88 C352 84 356 84 358 88" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          {/* Smile */}
          <path d="M338 100 C341 106 347 106 350 100" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />

          {/* Body / Shoulders */}
          <path
            d="M322 118 C310 134 310 148 310 148 H378 C378 148 378 134 366 118 Z"
            fill="var(--background)"
            stroke="currentColor"
            strokeWidth="3"
          />
        </motion.g>

        {/* ========================================================
            2. PIXEL HANDSHAKE (Open Source Collaboration)
            ======================================================== */}
        <g>
          {/* Left Hand Sleeve */}
          <rect x="180" y="174" width="24" height="20" fill="currentColor" />
          {/* Right Hand Sleeve */}
          <rect x="256" y="174" width="24" height="20" fill="currentColor" />
          {/* Clasping Hands */}
          <path
            d="M204 178 L220 192 L230 184 L224 178 Z"
            fill="var(--background)"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            d="M256 178 L240 192 L230 184 L236 178 Z"
            fill="var(--background)"
            stroke="currentColor"
            strokeWidth="3"
          />
          {/* Thumbs and grip lines */}
          <line x1="216" y1="184" x2="244" y2="184" stroke="currentColor" strokeWidth="3" />
        </g>

        {/* ========================================================
            3. PIXEL BINARY TERMINAL BLOCK (10101 01011 >_<)
            ======================================================== */}
        <g>
          <rect x="188" y="230" width="68" height="54" fill="var(--background)" stroke="currentColor" strokeWidth="4" />
          {/* Header Bar */}
          <line x1="188" y1="242" x2="256" y2="242" stroke="currentColor" strokeWidth="2" />
          {/* 10101 */}
          <text
            x="222"
            y="256"
            fontFamily="monospace"
            fontSize="12"
            fontWeight="bold"
            textAnchor="middle"
            fill="currentColor"
            letterSpacing="2"
          >
            10101
          </text>
          {/* 01011 */}
          <text
            x="222"
            y="268"
            fontFamily="monospace"
            fontSize="12"
            fontWeight="bold"
            textAnchor="middle"
            fill="currentColor"
            letterSpacing="2"
          >
            01011
          </text>
          {/* >_< emote */}
          <text
            x="222"
            y="280"
            fontFamily="monospace"
            fontSize="11"
            fontWeight="bold"
            textAnchor="middle"
            fill="currentColor"
          >
            &gt;_&lt;
          </text>
        </g>

        {/* ========================================================
            4. PIXEL GLOBE WITH STARS (Center-Right)
            ======================================================== */}
        <g>
          <circle cx="330" cy="226" r="32" fill="var(--background)" stroke="currentColor" strokeWidth="4" />
          {/* Longitude and Latitude curves */}
          <ellipse cx="330" cy="226" rx="16" ry="32" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="298" y1="226" x2="362" y2="226" stroke="currentColor" strokeWidth="2" />
          {/* Pixel continents */}
          <rect x="316" y="206" width="10" height="8" fill="currentColor" />
          <rect x="332" y="214" width="14" height="12" fill="currentColor" />
          <rect x="320" y="234" width="12" height="10" fill="currentColor" />
        </g>

        {/* ========================================================
            5. RETRO CRT COMPUTER MONITOR (Bottom Right)
            ======================================================== */}
        <g>
          {/* CRT Monitor Housing */}
          <rect x="312" y="280" width="70" height="54" rx="4" fill="var(--background)" stroke="currentColor" strokeWidth="4" />
          {/* Inner Screen */}
          <rect x="320" y="288" width="54" height="38" rx="2" fill="var(--background)" stroke="currentColor" strokeWidth="2" />
          {/* Pixel Smile Face on Screen */}
          <rect x="334" y="300" width="4" height="4" fill="currentColor" />
          <rect x="356" y="300" width="4" height="4" fill="currentColor" />
          <path d="M336 312 C342 318 348 318 354 312" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* Monitor Stand */}
          <rect x="338" y="334" width="18" height="6" fill="currentColor" />
          <rect x="330" y="340" width="34" height="4" fill="currentColor" />
        </g>

        {/* ========================================================
            6. PIXEL ARTIST COLOR PALETTE
            ======================================================== */}
        <g>
          <path
            d="M260 300 C260 286 288 286 296 296 C304 306 304 330 288 336 C272 342 260 318 260 300 Z"
            fill="var(--background)"
            stroke="currentColor"
            strokeWidth="3"
          />
          {/* Thumb hole */}
          <circle cx="288" cy="326" r="3" fill="currentColor" />
          {/* Paint dollops */}
          <circle cx="272" cy="298" r="3" fill="currentColor" />
          <circle cx="282" cy="295" r="3" fill="currentColor" />
          <circle cx="292" cy="304" r="3" fill="currentColor" />
        </g>

        {/* ========================================================
            7. STACKED WORKSPACE DRAWERS / BLOCKS
            ======================================================== */}
        <g>
          <rect x="276" y="162" width="48" height="68" fill="var(--background)" stroke="currentColor" strokeWidth="3" />
          <line x1="276" y1="184" x2="324" y2="184" stroke="currentColor" strokeWidth="2" />
          <line x1="276" y1="206" x2="324" y2="206" stroke="currentColor" strokeWidth="2" />
          {/* Drawer knobs */}
          <rect x="298" y="172" width="6" height="3" fill="currentColor" />
          <rect x="298" y="194" width="6" height="3" fill="currentColor" />
          <rect x="298" y="214" width="6" height="3" fill="currentColor" />
        </g>

        {/* Decorative Floating Stars & Pixels */}
        <rect x="300" y="130" width="4" height="4" fill="currentColor" />
        <rect x="312" y="142" width="4" height="4" fill="currentColor" />
        <rect x="264" y="138" width="5" height="5" fill="currentColor" />
        <rect x="180" y="218" width="5" height="5" fill="currentColor" />
        <rect x="168" y="270" width="4" height="4" fill="currentColor" />
      </svg>
    </div>
  );
}
