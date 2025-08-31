import React from "react";

/**
 * ToolingFoundation
 * A self‑contained React component that recreates the feel of Next.js’s
 * “Built on a foundation of fast, production‑grade tooling” section:
 *  – Animated diagonal line grid (SVG) in the background
 *  – Soft gradient glows
 *  – Heading + three feature cards (React, Turbopack, SWC)
 *  – Accessible, responsive, and framework‑agnostic (pure React + Tailwind)
 *
 * Drop this into any React app that has Tailwind. No external assets.
 */
export default function ToolingFoundation() {
  return (
    <section className="relative isolate mx-auto my-12 max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 p-8 shadow-xl">
      {/* BACKGROUND LAYERS */}
      <GradientGlows />
      <AnimatedLines />

      {/* CONTENT */}
      <div className="relative z-10">
        <header className="mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">Powered by</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Built on a foundation of fast, <span className="text-neutral-300">production‑grade tooling</span>
          </h2>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            title="React"
            subtitle="The library for web and native UIs"
            body="Next.js is built on the latest React features, including Server Components and Actions."
            badge="Core"
          />
          <FeatureCard
            title="Turbopack"
            subtitle="Incremental bundler, written in Rust"
            body="Optimized for JavaScript and TypeScript. Built into Next.js for a blazing‑fast dev experience."
            badge="Bundler"
          />
          <FeatureCard
            title="SWC"
            subtitle="Speedy Web Compiler"
            body="An extensible Rust‑based platform used for compilation and minification in Next.js."
            badge="Compiler"
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ title, subtitle, body, badge }: { title: string; subtitle: string; body: string; badge: string }) {
  return (
    <article className="group relative overflow-hidden rounded-xl border border-white/10 bg-neutral-900/60 p-5 backdrop-blur transition-transform duration-300 hover:-translate-y-0.5 hover:border-white/20">
      {/* subtle hover highlight */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden>
        <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-br from-white/10 to-transparent" />
      </div>

      <div className="mb-3 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-widest text-neutral-400">
        <span className="rounded-full border border-white/10 bg-neutral-800 px-2 py-0.5">{badge}</span>
        <span className="text-neutral-500">{subtitle}</span>
      </div>

      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-neutral-300">{body}</p>
    </article>
  );
}

/**
 * AnimatedLines – diagonal animated line mesh using SVG.
 *  – Uses stroke-dasharray and stroke-dashoffset for a subtle motion.
 *  – Light parallax via transform on hover.
 */
function AnimatedLines() {
  const lines = Array.from({ length: 22 });

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <div className="absolute -inset-24 rotate-[30deg]">
        <svg viewBox="0 0 1200 800" className="h-full w-full">
          <defs>
            {/* Gradient stroke */}
            <linearGradient id="strokeFade" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.0)" />
              <stop offset="30%" stopColor="rgba(255,255,255,0.25)" />
              <stop offset="70%" stopColor="rgba(255,255,255,0.12)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.0)" />
            </linearGradient>
            {/* Mask to fade edges */}
            <radialGradient id="edgeMask" cx="50%" cy="50%" r="65%">
              <stop offset="70%" stopColor="white" />
              <stop offset="100%" stopColor="black" />
            </radialGradient>
            <mask id="softMask">
              <rect width="1200" height="800" fill="url(#edgeMask)" />
            </mask>
          </defs>

          <g mask="url(#softMask)">
            {lines.map((_, i) => {
              const y = i * (800 / lines.length);
              const speed = 24 + (i % 5) * 4; // slight variance per line
              const dash = 280 + (i % 7) * 20;
              return (
                <g key={i} className="motion-safe:[animation:dashmove_var_--t_linear_infinite]" style={{
                  // @ts-ignore — custom property used in CSS below
                  ['--t' as any]: `${speed}s`,
                }}>
                  <line x1="-100" y1={y} x2="1300" y2={y} stroke="url(#strokeFade)" strokeWidth={1}
                        strokeDasharray={dash} strokeDashoffset={dash}
                  />
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* Hover parallax */}
      <div className="absolute inset-0 transition-transform duration-500 will-change-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />

      {/* Custom keyframes via Tailwind utility */}
      <style>{`
        @keyframes dashmove { to { stroke-dashoffset: 0; } }
        .[animation\\:dashmove_var_--t_linear_infinite] { animation: dashmove var(--t) linear infinite; }
      `}</style>
    </div>
  );
}

/**
 * Soft gradient glows behind the lines to emulate the subtle lighting.
 */
function GradientGlows() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-white/10 to-transparent blur-2xl" />
      <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-tr from-white/10 to-transparent blur-3xl" />
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
        <div className="mx-auto h-40 w-[90%] rounded-full bg-white/5 blur-2xl" />
      </div>
    </div>
  );
}