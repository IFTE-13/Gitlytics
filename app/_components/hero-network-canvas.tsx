"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  pulsePhase: number;
}

interface Packet {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
}

export function HeroNetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 480);
    let dpr = window.devicePixelRatio || 1;

    const resize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Mouse coordinates
    const mouse = { x: -1000, y: -1000, active: false };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const parent = canvas.parentElement;
    parent?.addEventListener("mousemove", handleMouseMove);
    parent?.addEventListener("mouseleave", handleMouseLeave);

    // Generate Nodes
    const nodeCount = Math.min(48, Math.floor((width * height) / 14000));
    const nodes: Node[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() > 0.85 ? 3 : Math.random() > 0.5 ? 2 : 1.5,
        baseAlpha: Math.random() * 0.4 + 0.15,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    // Active data packets travelling between nodes
    const packets: Packet[] = [];
    const maxPackets = 12;

    const connectionDistance = 140;

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    let lastTime = performance.now();

    const render = (time: number) => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const dt = Math.min(64, time - lastTime);
      lastTime = time;

      // Detect dark mode from document
      const isDark = document.documentElement.classList.contains("dark");
      const computedStyle = getComputedStyle(document.documentElement);
      const primaryColor = computedStyle.getPropertyValue("--primary").trim() || "#6366f1";

      ctx.clearRect(0, 0, width, height);

      // Node update & draw
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        if (!prefersReducedMotion) {
          n.x += n.vx * (dt / 16);
          n.y += n.vy * (dt / 16);

          // Wrap around edges softly
          if (n.x < -20) n.x = width + 20;
          if (n.x > width + 20) n.x = -20;
          if (n.y < -20) n.y = height + 20;
          if (n.y > height + 20) n.y = -20;

          // Mouse influence
          if (mouse.active) {
            const dx = mouse.x - n.x;
            const dy = mouse.y - n.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120 && dist > 0) {
              const force = (120 - dist) / 120;
              n.x -= (dx / dist) * force * 0.8;
              n.y -= (dy / dist) * force * 0.8;
            }
          }

          n.pulsePhase += 0.02;
        }

        // Draw node
        const pulse = Math.sin(n.pulsePhase) * 0.25 + 0.75;
        const alpha = n.baseAlpha * pulse;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(255, 255, 255, ${alpha * 0.6})`
          : `rgba(15, 23, 42, ${alpha * 0.5})`;
        ctx.fill();
      }

      // Connect nearby nodes with branch lines
      const validConnections: [number, number][] = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            validConnections.push([i, j]);
            const alpha = (1 - dist / connectionDistance) * (isDark ? 0.14 : 0.09);

            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = isDark
              ? `rgba(255, 255, 255, ${alpha})`
              : `rgba(15, 23, 42, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Manage data packets
      if (!prefersReducedMotion && validConnections.length > 0) {
        if (packets.length < maxPackets && Math.random() < 0.08) {
          const randomConn = validConnections[Math.floor(Math.random() * validConnections.length)];
          packets.push({
            fromNode: randomConn[0],
            toNode: randomConn[1],
            progress: 0,
            speed: 0.008 + Math.random() * 0.012,
          });
        }

        for (let pIdx = packets.length - 1; pIdx >= 0; pIdx--) {
          const p = packets[pIdx];
          p.progress += p.speed * (dt / 16);

          if (p.progress >= 1) {
            packets.splice(pIdx, 1);
            continue;
          }

          const n1 = nodes[p.fromNode];
          const n2 = nodes[p.toNode];
          if (!n1 || !n2) {
            packets.splice(pIdx, 1);
            continue;
          }

          const px = n1.x + (n2.x - n1.x) * p.progress;
          const py = n1.y + (n2.y - n1.y) * p.progress;

          // Glowing packet dot in accent color
          ctx.beginPath();
          ctx.arc(px, py, 1.75, 0, Math.PI * 2);
          ctx.fillStyle = primaryColor;
          ctx.shadowColor = primaryColor;
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      parent?.removeEventListener("mousemove", handleMouseMove);
      parent?.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none z-0 opacity-80 transition-opacity duration-700"
    />
  );
}
