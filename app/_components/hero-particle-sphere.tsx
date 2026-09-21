"use client";

import { useEffect, useRef } from "react";

interface HeroParticleSphereProps {
  fluxDynamics?: number; // 0.1 - 1.0
  processingThreads?: number; // 0.1 - 1.0
  density?: number; // 0.2 - 1.0
  accentColor?: string;
}

interface Particle3D {
  theta: number; // azimuthal angle
  phi: number; // polar angle
  baseRadius: number;
  size: number;
  alpha: number;
  noiseOffset: number;
}

export function HeroParticleSphere({
  fluxDynamics = 0.6,
  processingThreads = 0.8,
  density = 0.75,
  accentColor = "#6366f1",
}: HeroParticleSphereProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const propsRef = useRef({ fluxDynamics, processingThreads, density, accentColor });

  useEffect(() => {
    propsRef.current = { fluxDynamics, processingThreads, density, accentColor };
  }, [fluxDynamics, processingThreads, density, accentColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 540);
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

    // Generate particles on sphere using golden spiral
    const particleCount = Math.floor(650 * propsRef.current.density);
    const particles: Particle3D[] = [];
    const sphereRadius = Math.min(width, height) * 0.32;

    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / particleCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
      particles.push({
        theta,
        phi,
        baseRadius: sphereRadius + (Math.random() - 0.5) * 16,
        size: Math.random() > 0.85 ? 2.2 : Math.random() > 0.5 ? 1.6 : 1.1,
        alpha: Math.random() * 0.5 + 0.35,
        noiseOffset: Math.random() * Math.PI * 2,
      });
    }

    let rotX = 0.25;
    let rotY = 0;
    let time = 0;

    // Mouse drag interaction
    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;
      rotY += dx * 0.005;
      rotX += dy * 0.005;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const canvasEl = canvas;
    canvasEl.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    const fov = 400;

    const render = () => {
      time += 0.015 * propsRef.current.fluxDynamics;
      if (!isDragging) {
        rotY += 0.003 * propsRef.current.processingThreads;
        rotX += 0.0008 * propsRef.current.processingThreads;
      }

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Project particles to 2D
      const projected: Array<{
        x2d: number;
        y2d: number;
        z: number;
        size: number;
        alpha: number;
      }> = [];

      const currentFlux = propsRef.current.fluxDynamics;
      const currentRadius = Math.min(width, height) * 0.32;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Wave displacement on sphere surface
        const displacement =
          Math.sin(p.theta * 3 + time * 2) *
          Math.cos(p.phi * 3 + time) *
          (18 * currentFlux);

        const r = currentRadius + displacement;
        const x = r * Math.sin(p.phi) * Math.cos(p.theta);
        const y = r * Math.cos(p.phi);
        const z = r * Math.sin(p.phi) * Math.sin(p.theta);

        // 3D rotation around Y
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;

        // 3D rotation around X
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        // Depth perspective
        const scale = fov / (fov + z2 + 250);
        const x2d = cx + x1 * scale;
        const y2d = cy + y2 * scale;

        // Alpha based on depth (front particles glow, rear particles dim)
        const depthNorm = (z2 + currentRadius) / (currentRadius * 2); // 0 to 1
        const finalAlpha = Math.max(0.12, Math.min(0.95, p.alpha * (0.3 + depthNorm * 0.7)));

        projected.push({
          x2d,
          y2d,
          z: z2,
          size: p.size * scale,
          alpha: finalAlpha,
        });
      }

      // Sort by depth (back to front) for accurate rendering
      projected.sort((a, b) => a.z - b.z);

      // Render connecting lines between close front-facing particles
      ctx.lineWidth = 0.5;
      for (let i = 0; i < projected.length; i += 3) {
        const p1 = projected[i];
        if (p1.z < 0) continue; // only connect front half
        for (let j = i + 1; j < Math.min(i + 14, projected.length); j++) {
          const p2 = projected[j];
          if (p2.z < 0) continue;
          const dx = p1.x2d - p2.x2d;
          const dy = p1.y2d - p2.y2d;
          const distSq = dx * dx + dy * dy;
          if (distSq < 480) {
            const lineAlpha = (1 - distSq / 480) * 0.18 * p1.alpha;
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x2d, p1.y2d);
            ctx.lineTo(p2.x2d, p2.y2d);
            ctx.stroke();
          }
        }
      }

      // Render particles
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x2d, p.y2d, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Extra highlight on prominent front particles
        if (p.z > currentRadius * 0.4 && p.size > 1.8) {
          ctx.fillStyle = propsRef.current.accentColor;
          ctx.beginPath();
          ctx.arc(p.x2d, p.y2d, p.size * 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvasEl.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full cursor-grab active:cursor-grabbing select-none"
      title="Interactive 3D Telemetry Sphere — Drag to rotate"
    />
  );
}
