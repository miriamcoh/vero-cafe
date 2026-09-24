"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import LoadingScreen from "./LoadingScreen";

/* Dynamic import — Canvas never runs on the server */
const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

/* ─────────────────────────────────────────────────────────────────
   HeroSection
   Layout (desktop):  Canvas fills full height → text in right 48%
   Layout (mobile):   Canvas 45svh top → text below, scrollable
───────────────────────────────────────────────────────────────── */
export default function HeroSection() {
  const mouseRef  = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [canvasReady, setCanvasReady] = useState(false);
  const [showCanvas, setShowCanvas]   = useState(false);

  // Track normalised mouse position (−1…+1 per axis)
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth)  * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const handleCanvasReady = useCallback(() => setCanvasReady(true), []);
  const handleLoadingDone = useCallback(() => setShowCanvas(true), []);

  /* Start loading canvas immediately; keep loading screen until both
     the canvas fires onCreated AND the progress bar has run its course */
  const loadingDone = canvasReady && showCanvas;

  return (
    <section
      dir="ltr"
      className="relative w-full overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 110% 80% at 30% 60%, #1A100A 0%, var(--espresso) 65%)",
      }}
    >
      {/* ── Loading screen ──────────────────────────────────────── */}
      <AnimatePresence>
        {!loadingDone && (
          <LoadingScreen onDone={handleLoadingDone} />
        )}
      </AnimatePresence>

      {/* ── Desktop layout: full-height split ────────────────────── */}
      <div
        className="hidden md:block relative"
        style={{ height: "100svh", minHeight: 560 }}
      >
        {/* 3-D Canvas — fills the whole section */}
        <div className="absolute inset-0 z-0">
          <HeroCanvas mouseRef={mouseRef} onReady={handleCanvasReady} />
        </div>

        {/* Right-side gradient — gives text legibility without hiding machine */}
        <div
          className="absolute inset-y-0 right-0 z-[1] pointer-events-none"
          style={{
            width: "56%",
            background:
              "linear-gradient(to right, transparent 0%, rgba(14,10,8,0.82) 38%, rgba(14,10,8,0.96) 100%)",
          }}
        />

        {/* Text panel — right 48%, vertically centred */}
        <DesktopText />
      </div>

      {/* ── Mobile layout: stacked ───────────────────────────────── */}
      <div className="md:hidden flex flex-col">
        {/* Canvas top portion */}
        <div style={{ height: "48svh", position: "relative" }}>
          <HeroCanvas mouseRef={mouseRef} onReady={handleCanvasReady} />
          {/* Bottom fade into background */}
          <div
            style={{
              position: "absolute",
              inset: "auto 0 0 0",
              height: "40%",
              background:
                "linear-gradient(to bottom, transparent, var(--espresso))",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Text below canvas */}
        <MobileText />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Desktop text panel (absolutely positioned in the hero)
───────────────────────────────────────────────────────────────── */
function DesktopText() {
  return (
    <div className="absolute inset-0 z-10 flex items-center pointer-events-none">
      <div className="w-full max-w-7xl mx-auto px-8 md:px-16">
        <div
          dir="rtl"
          className="ml-auto w-full md:w-[48%] flex flex-col items-start pointer-events-auto"
        >
          <TextContent />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Mobile text block (in document flow, below the canvas)
───────────────────────────────────────────────────────────────── */
function MobileText() {
  return (
    <div
      dir="rtl"
      style={{
        padding: "32px 24px 56px",
        background: "var(--espresso)",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <TextContent />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Shared text content with staggered Framer Motion reveals
───────────────────────────────────────────────────────────────── */
function TextContent() {
  return (
    <>
      {/* Eyebrow — Latin, letter-spacing OK */}
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="eyebrow-latin"
        style={{ color: "var(--gold)", fontSize: 11, marginBottom: 20 }}
      >
        CAFFÈ VERO · יבואן בלעדי בישראל
      </motion.p>

      {/* Headline — Frank Ruhl Libre (applied via CSS h1 rule) */}
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.85, delay: 0.12, ease: "easeOut" }}
        style={{
          color: "var(--cream)",
          fontSize: "clamp(2rem, 4.5vw, 3.8rem)",
          lineHeight: 1.15,
          marginBottom: 20,
          textAlign: "right",
        }}
      >
        חמישה עשורים
        <br />
        של קפה איטלקי.
      </motion.h1>

      {/* Gold rule */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.28, ease: "easeOut" }}
        style={{
          width: 40,
          height: 1,
          background: "rgba(200,161,101,0.65)",
          transformOrigin: "right",
          marginBottom: 20,
        }}
      />

      {/* Sub-headline */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.38, ease: "easeOut" }}
        style={{
          color: "var(--parchment)",
          fontSize: "clamp(13px, 1.3vw, 15px)",
          fontFamily: "var(--font-body)",
          maxWidth: 360,
          lineHeight: 1.85,
          marginBottom: 36,
          textAlign: "right",
        }}
      >
        יבוא בלעדי. מכונות, מטחנות, פולי קפה
        <br />
        וקפסולות — תחת קורת גג אחת.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, delay: 0.5, ease: "easeOut" }}
        style={{ display: "flex", gap: 16, flexWrap: "wrap" }}
      >
        <button
          data-cursor="pointer"
          className="hero-cta-primary"
          style={{
            background: "transparent",
            border: "1px solid rgba(200,161,101,0.5)",
            color: "var(--gold)",
            padding: "14px 32px",
            minHeight: 48,
            fontSize: 12,
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            cursor: "pointer",
            transition: "background 0.3s ease, color 0.3s ease, border-color 0.3s ease",
          }}
        >
          לחנות
        </button>
        <button
          data-cursor="pointer"
          className="hero-cta-ghost"
          style={{
            background: "transparent",
            border: "1px solid transparent",
            color: "var(--muted)",
            padding: "14px 20px",
            minHeight: 48,
            fontSize: 12,
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            cursor: "pointer",
            transition: "color 0.3s ease",
          }}
        >
          פתרונות לעסקים
        </button>
      </motion.div>

      {/* Scroll hint — desktop only */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.85 }}
        className="hidden md:flex flex-col items-start gap-2"
        style={{ marginTop: 40 }}
      >
        <span
          style={{
            color: "rgba(200,161,101,0.28)",
            fontSize: 9,
            fontFamily: "var(--font-latin)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          SCROLL
        </span>
        <div
          style={{
            width: 1,
            height: 28,
            background: "linear-gradient(to bottom, rgba(200,161,101,0.28), transparent)",
          }}
        />
      </motion.div>
    </>
  );
}

/* Hover styles for CTA buttons */
// (applied as global <style> to avoid inline style limitations)
const _styles = `
  .hero-cta-primary:hover {
    background: var(--gold) !important;
    color: var(--espresso) !important;
    border-color: var(--gold) !important;
  }
  .hero-cta-ghost:hover {
    color: var(--parchment) !important;
  }
`;

// Inject once — works because this module is only loaded client-side
if (typeof document !== "undefined") {
  const tag = document.createElement("style");
  tag.textContent = _styles;
  document.head.appendChild(tag);
}
