"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import dynamic from "next/dynamic";

const BeanStoryCanvas = dynamic(() => import("./BeanStoryCanvas"), { ssr: false });

/* ─────────────────────────────────────────────────────────────────
   Step data — eyebrow labels are Latin (letter-spacing OK),
   titles and bodies are Hebrew (no letter-spacing)
───────────────────────────────────────────────────────────────── */
const STEPS = [
  {
    num: "01",
    eyebrow: "ORIGIN",
    title: "מהחוות לידינו",
    body: "פולים שנקלו באיטליה, לפי מסורת של למעלה מחמישה עשורים.\nמקור אחד. אמת אחת.",
    accent: "#3A8A22",
    glowColor: "rgba(46,118,26,0.09)",
    mobileCircle: "radial-gradient(circle, rgba(58,138,34,0.55) 0%, rgba(10,28,8,0.92) 60%)",
    mobileShadow: "0 0 70px rgba(58,138,34,0.14)",
  },
  {
    num: "02",
    eyebrow: "ROASTING",
    title: "קלייה מדויקת",
    body: "הקלייה מתבצעת בקלייה האיטלקית של CAFFÈ VERO, ברציפות ובדיוק.\nהארומה ממשיכה לאיתנו.",
    accent: "var(--gold)",
    glowColor: "rgba(200,161,101,0.10)",
    mobileCircle: "radial-gradient(circle, rgba(200,130,60,0.65) 0%, rgba(38,14,4,0.92) 60%)",
    mobileShadow: "0 0 90px rgba(200,130,60,0.2)",
  },
  {
    num: "03",
    eyebrow: "GRINDING",
    title: "טחינה רגע לפני",
    body: "מטחנות EUREKA ו-ECM טוחנות רגע לפני ההגשה.\nהטריות היא לא פינוק — היא תנאי.",
    accent: "var(--copper)",
    glowColor: "rgba(160,100,60,0.09)",
    mobileCircle: "radial-gradient(circle, rgba(140,78,28,0.60) 0%, rgba(24,10,4,0.93) 60%)",
    mobileShadow: "0 0 70px rgba(140,78,28,0.15)",
  },
  {
    num: "04",
    eyebrow: "EXTRACTION",
    title: "27 שניות של שלמות",
    body: "27 שניות. לחץ 9 בר, 93°.\nהקרמה — הסימן של קפה שנעשה נכון.",
    accent: "var(--cream)",
    glowColor: "rgba(200,180,150,0.04)",
    mobileCircle: "radial-gradient(circle, rgba(220,200,170,0.25) 0%, rgba(14,10,8,0.96) 60%)",
    mobileShadow: "0 0 50px rgba(200,180,150,0.07)",
  },
] as const;

type Step = (typeof STEPS)[number];

/* ─────────────────────────────────────────────────────────────────
   Step indicator — thin gold lines, vertical or horizontal
───────────────────────────────────────────────────────────────── */
function StepIndicator({
  active,
  direction,
}: {
  active: number;
  direction: "vertical" | "horizontal";
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: direction === "vertical" ? "column" : "row",
        gap: direction === "vertical" ? 10 : 8,
        alignItems: "center",
      }}
    >
      {STEPS.map((_, i) => (
        <div
          key={i}
          style={{
            width: direction === "vertical" ? 1 : i === active ? 24 : 7,
            height: direction === "vertical" ? (i === active ? 32 : 12) : 1,
            background: i === active ? "var(--gold)" : "rgba(200,161,101,0.22)",
            transition: "all 0.4s ease",
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Shared text content
───────────────────────────────────────────────────────────────── */
function StepText({ step, mobile = false }: { step: Step; mobile?: boolean }) {
  return (
    <>
      {/* Eyebrow — Latin label, letter-spacing allowed */}
      <p
        className="eyebrow-latin"
        style={{
          color: step.accent,
          fontSize: 9,
          marginBottom: mobile ? 14 : 24,
        }}
      >
        {step.eyebrow}
      </p>

      {/* Ghost step number watermark */}
      <p
        style={{
          fontFamily: "var(--font-latin)",
          fontSize: mobile ? "5rem" : "clamp(5rem, 13vw, 10rem)",
          fontWeight: 300,
          lineHeight: 0.85,
          color: "rgba(200,161,101,0.05)",
          marginBottom: mobile ? -14 : -18,
          userSelect: "none",
          letterSpacing: "-0.02em",
        }}
      >
        {step.num}
      </p>

      {/* Headline */}
      <h2
        style={{
          fontSize: mobile
            ? "clamp(1.5rem, 6vw, 2rem)"
            : "clamp(1.8rem, 4.2vw, 3.5rem)",
          fontWeight: 300,
          lineHeight: 1.2,
          color: "var(--cream)",
          marginBottom: 18,
          textAlign: "right",
        }}
      >
        {step.title}
      </h2>

      {/* Accent rule */}
      <div
        style={{
          width: 28,
          height: 1,
          background: step.accent,
          opacity: 0.5,
          marginBottom: 18,
          marginRight: 0,
        }}
      />

      {/* Body — Hebrew, no letter-spacing */}
      <p
        style={{
          color: "var(--parchment)",
          fontFamily: "var(--font-body)",
          fontSize: mobile ? 13 : "clamp(13px, 1.25vw, 15px)",
          lineHeight: 2,
          maxWidth: 380,
          textAlign: "right",
          whiteSpace: "pre-line",
        }}
      >
        {step.body}
      </p>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Main section — 400 vh tall, sticky inner viewport
───────────────────────────────────────────────────────────────── */
export default function BeanToCupSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepRef    = useRef<number>(0);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const s = Math.min(3, Math.floor(v * 4));
    stepRef.current = s;
    if (s !== activeStep) setActiveStep(s);
  });

  const step = STEPS[activeStep];

  return (
    <section
      ref={sectionRef}
      dir="ltr"
      style={{ height: "400vh", position: "relative" }}
    >
      {/* ── Sticky viewport ──────────────────────────────────────── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100svh",
          minHeight: 560,
          overflow: "hidden",
          background: "var(--espresso)",
        }}
      >
        {/* Ambient glow — colour shifts per step */}
        <AnimatePresence>
          <motion.div
            key={`glow-${activeStep}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background: `radial-gradient(ellipse 55% 55% at 28% 52%, ${step.glowColor} 0%, transparent 65%)`,
            }}
          />
        </AnimatePresence>

        {/* ── Desktop layout ─────────────────────────────────────── */}
        <div
          className="hidden md:flex"
          style={{ height: "100%" }}
        >
          {/* Left — 3-D bean canvas */}
          <div style={{ flex: "0 0 46%", position: "relative" }}>
            <BeanStoryCanvas stepRef={stepRef} />
          </div>

          {/* Right — text panel */}
          <div
            dir="rtl"
            style={{
              flex: "1 1 0",
              display: "flex",
              alignItems: "center",
              padding: "0 clamp(28px, 4vw, 64px) 0 20px",
              position: "relative",
            }}
          >
            {/* Step indicator — far right edge */}
            <div
              style={{
                position: "absolute",
                right: "clamp(12px, 2vw, 28px)",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <StepIndicator active={activeStep} direction="vertical" />
            </div>

            {/* Animated text */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`dtext-${activeStep}`}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ width: "100%" }}
              >
                <StepText step={step} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Mobile layout ──────────────────────────────────────── */}
        <div
          className="md:hidden flex flex-col"
          style={{ height: "100%" }}
        >
          {/* CSS circle visual — no extra WebGL context on mobile */}
          <div
            style={{
              flex: "0 0 38svh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`circle-${activeStep}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.2, opacity: 0 }}
                transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
                style={{
                  width: 110,
                  height: 110,
                  borderRadius: "50%",
                  background: step.mobileCircle,
                  boxShadow: step.mobileShadow,
                }}
              />
            </AnimatePresence>

            {/* Watermark number */}
            <p
              style={{
                position: "absolute",
                fontFamily: "var(--font-latin)",
                fontSize: "6rem",
                fontWeight: 300,
                color: "rgba(200,161,101,0.04)",
                userSelect: "none",
                pointerEvents: "none",
              }}
            >
              {step.num}
            </p>
          </div>

          {/* Step dots */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "10px 0",
            }}
          >
            <StepIndicator active={activeStep} direction="horizontal" />
          </div>

          {/* Text */}
          <div
            dir="rtl"
            style={{
              flex: 1,
              display: "flex",
              alignItems: "flex-start",
              padding: "14px 24px 20px",
              overflow: "hidden",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`mtext-${activeStep}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                style={{ width: "100%" }}
              >
                <StepText step={step} mobile />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Scroll progress bar — bottom of sticky viewport */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
            background: "var(--layer-2)",
            zIndex: 3,
          }}
        >
          <motion.div
            style={{
              height: "100%",
              background: "linear-gradient(to right, var(--copper), var(--gold))",
              transformOrigin: "left",
              scaleX: scrollYProgress,
            }}
          />
        </div>
      </div>
    </section>
  );
}
