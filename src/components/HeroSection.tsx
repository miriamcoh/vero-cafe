"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import type { ControlsApi } from "./HeroCanvas";

/* Canvas never runs on the server */
const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

/* ─────────────────────────────────────────────────────────────────
   HeroSection

   Desktop (md+):  CSS grid — 55% canvas left | 45% text right
   Mobile:         Flex-col — 45svh canvas top | text below
   Total = 100svh.

   OrbitControls: drag to rotate, autoRotate resumes after 4 s idle.
   Ctrl / ⌘ + wheel: zoom in/out.
   Floating buttons: +  −  ↺
   Usage hint: "גרור לסיבוב" — disappears on first interaction.
───────────────────────────────────────────────────────────────── */
export default function HeroSection() {
  const controlsApiRef = useRef<ControlsApi | null>(null);
  const canvasWrapRef  = useRef<HTMLDivElement>(null);

  const [ready,       setReady]       = useState(false);
  const [hintVisible, setHintVisible] = useState(false);
  const [isGrabbing,  setIsGrabbing]  = useState(false);
  const hintDismissed = useRef(false);

  /* Show hint once the model is ready, auto-hide after 5 s */
  const handleReady = useCallback(() => {
    setReady(true);
    setHintVisible(true);
    setTimeout(() => setHintVisible(false), 5000);
  }, []);

  /* Dismiss hint on first interaction */
  const dismissHint = useCallback(() => {
    if (hintDismissed.current) return;
    hintDismissed.current = true;
    setHintVisible(false);
  }, []);

  /* Ctrl / ⌘ + wheel → zoom */
  useEffect(() => {
    const el = canvasWrapRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      e.stopPropagation();
      if (e.deltaY < 0) controlsApiRef.current?.zoomIn();
      else              controlsApiRef.current?.zoomOut();
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  /* Grab cursor */
  const onPointerDown = useCallback(() => {
    setIsGrabbing(true);
    dismissHint();
  }, [dismissHint]);
  const onPointerUp = useCallback(() => setIsGrabbing(false), []);

  return (
    <section
      dir="ltr"
      style={{
        height: "100svh",
        minHeight: 560,
        background: "#0E0A08",
        overflow: "hidden",
      }}
    >
      {/* Flex-col on mobile → 2-col grid on md+ */}
      <div
        className="flex flex-col md:grid h-full"
        style={{ gridTemplateColumns: "55% 45%" }}
      >

        {/* ── Canvas column ─────────────────────────────────────── */}
        <div
          ref={canvasWrapRef}
          className="relative flex-shrink-0 h-[45svh] md:h-full"
          style={{
            background: "#0E0A08",
            cursor: isGrabbing ? "grabbing" : ready ? "grab" : "default",
          }}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          {/* Poster glow — visible instantly while GLB loads */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 72% 80% at 48% 60%, #2a1408 0%, #0E0A08 68%)",
              zIndex: 0,
            }}
          />

          {/* Canvas: opacity 0 → 1 once model renders first frame */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: ready ? 1 : 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ position: "absolute", inset: 0, zIndex: 1 }}
          >
            <HeroCanvas onReady={handleReady} controlsApiRef={controlsApiRef} />
          </motion.div>

          {/* Floating orbit controls — +  −  ↺ */}
          <AnimatePresence>
            {ready && (
              <motion.div
                key="orbit-btns"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                style={{
                  position: "absolute",
                  bottom: 20,
                  right: 16,
                  zIndex: 10,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  pointerEvents: "all",
                }}
              >
                {ORBIT_BTNS.map(({ icon, label, action }) => (
                  <OrbitBtn
                    key={icon}
                    icon={icon}
                    ariaLabel={label}
                    onClick={() => action(controlsApiRef.current)}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Usage hint — "גרור לסיבוב" */}
          <AnimatePresence>
            {hintVisible && (
              <motion.div
                key="hint"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.4 }}
                style={{
                  position: "absolute",
                  bottom: 24,
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 10,
                  pointerEvents: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  background: "rgba(14,10,8,0.55)",
                  border: "1px solid rgba(200,161,101,0.12)",
                  backdropFilter: "blur(8px)",
                  padding: "6px 14px",
                  borderRadius: 20,
                }}
              >
                {/* drag icon SVG */}
                <svg
                  width="12" height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(200,161,101,0.55)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <path d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3M12 3v18" />
                </svg>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 11,
                    color: "rgba(200,161,101,0.55)",
                    whiteSpace: "nowrap",
                  }}
                >
                  גרור לסיבוב
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Fade edge at the bottom — mobile only */}
          <div
            className="md:hidden"
            style={{
              position: "absolute",
              inset: "auto 0 0 0",
              height: "38%",
              background: "linear-gradient(to bottom, transparent, #0E0A08)",
              pointerEvents: "none",
              zIndex: 2,
            }}
          />
        </div>

        {/* ── Text column ─────────────────────────────────────────── */}
        <div
          dir="rtl"
          className="flex-1 md:flex-none flex items-center overflow-hidden"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, #0E0A08 20%)",
            padding:
              "clamp(20px, 4vw, 56px) clamp(20px, 5vw, 72px) clamp(20px, 4vw, 56px)",
          }}
        >
          <TextContent />
        </div>
      </div>

      {/* Global hover styles for orbit buttons */}
      <style>{`
        .orbit-btn:hover {
          background: rgba(200,161,101,0.15) !important;
          border-color: rgba(200,161,101,0.45) !important;
          color: rgba(200,161,101,0.95) !important;
        }
        .orbit-btn:active {
          background: rgba(200,161,101,0.25) !important;
        }
        .hero-cta-primary:hover {
          background: var(--gold) !important;
          color: var(--espresso) !important;
          border-color: var(--gold) !important;
        }
        .hero-cta-ghost:hover { color: var(--parchment) !important; }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Orbit button config
───────────────────────────────────────────────────────────────── */
const ORBIT_BTNS = [
  {
    icon: "+",
    label: "הגדל",
    action: (api: ControlsApi | null) => api?.zoomIn(),
  },
  {
    icon: "−",
    label: "הקטן",
    action: (api: ControlsApi | null) => api?.zoomOut(),
  },
  {
    icon: "↺",
    label: "אפס זווית",
    action: (api: ControlsApi | null) => api?.reset(),
  },
] as const;

/* ─────────────────────────────────────────────────────────────────
   Floating orbit button
───────────────────────────────────────────────────────────────── */
function OrbitBtn({
  icon,
  ariaLabel,
  onClick,
}: {
  icon: string;
  ariaLabel: string;
  onClick: () => void;
}) {
  return (
    <button
      aria-label={ariaLabel}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className="orbit-btn"
      style={{
        width: 44,
        height: 44,
        borderRadius: "50%",
        background: "rgba(14,10,8,0.6)",
        border: "1px solid rgba(200,161,101,0.18)",
        color: "rgba(200,161,101,0.65)",
        fontSize: 16,
        cursor: "pointer",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background 0.2s, border-color 0.2s, color 0.2s",
        userSelect: "none",
      }}
    >
      {icon}
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Text — staggered reveal with animate (not whileInView)
   so it appears immediately on load without waiting for 3-D.
───────────────────────────────────────────────────────────────── */
function TextContent() {
  return (
    <div style={{ width: "100%", maxWidth: 460 }}>

      {/* Eyebrow */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
        className="eyebrow-latin"
        style={{ color: "var(--gold)", fontSize: 11, marginBottom: 18 }}
      >
        CAFFÈ VERO · יבואן בלעדי בישראל
      </motion.p>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.14, ease: "easeOut" }}
        style={{
          color: "var(--cream)",
          fontSize: "clamp(1.9rem, 4.2vw, 3.8rem)",
          lineHeight: 1.15,
          marginBottom: 18,
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
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.4, delay: 0.28, ease: "easeOut" }}
        style={{
          width: 36,
          height: 1,
          background: "rgba(200,161,101,0.65)",
          transformOrigin: "right",
          marginBottom: 18,
        }}
      />

      {/* Sub-headline */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.36, ease: "easeOut" }}
        style={{
          color: "var(--parchment)",
          fontSize: "clamp(13px, 1.25vw, 15px)",
          fontFamily: "var(--font-body)",
          maxWidth: 340,
          lineHeight: 1.85,
          marginBottom: "clamp(22px, 3vh, 34px)",
          textAlign: "right",
        }}
      >
        יבוא בלעדי. מכונות, מטחנות, פולי קפה
        <br />
        וקפסולות — תחת קורת גג אחת.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.46, ease: "easeOut" }}
        style={{ display: "flex", gap: 14, flexWrap: "wrap" }}
      >
        <button
          data-cursor="pointer"
          className="hero-cta-primary"
          style={{
            background: "transparent",
            border: "1px solid rgba(200,161,101,0.5)",
            color: "var(--gold)",
            padding: "12px 28px",
            minHeight: 44,
            fontSize: 12,
            fontFamily: "var(--font-body)",
            fontWeight: 600,
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
            padding: "12px 18px",
            minHeight: 44,
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
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="hidden md:flex flex-col items-start gap-2"
        style={{ marginTop: "clamp(22px, 3.5vh, 44px)" }}
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
            height: 26,
            background: "linear-gradient(to bottom, rgba(200,161,101,0.28), transparent)",
          }}
        />
      </motion.div>
    </div>
  );
}
