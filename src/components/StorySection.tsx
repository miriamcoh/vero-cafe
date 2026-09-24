"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const STATS = [
  { value: "יבואן בלעדי", label: "של CAFFÈ VERO בישראל" },
  { value: "שירות מלא",   label: "מכונה, קפה, תחזוקה" },
  { value: "מקור אחד",    label: "קלייה איטלקית מסורתית" },
];

export default function StorySection() {
  return (
    <section
      id="story"
      className="section-warm py-20 lg:py-[140px] px-6 md:px-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">

        {/* Hebrew eyebrow — no letter-spacing */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          style={{ fontSize: 11, color: "var(--gold)", marginBottom: 16, fontFamily: "var(--font-body)" }}
        >
          הסיפור שלנו
        </motion.p>

        {/* Desktop: two-column. Mobile: stacked */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-20 mb-20">

          {/* Left — large "50+" display number */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1 }}
            className="flex-shrink-0 flex flex-col items-start"
          >
            <p
              style={{
                fontFamily: "var(--font-latin)",
                fontSize: "clamp(5rem, 14vw, 9rem)",
                fontWeight: 400,
                lineHeight: 0.9,
                color: "var(--gold)",
                opacity: 0.18,
                userSelect: "none",
              }}
            >
              50+
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 11,
                color: "var(--muted)",
                marginTop: 8,
              }}
            >
              שנות קלייה איטלקית
            </p>
          </motion.div>

          {/* Right — Amir & Alaa story */}
          <div dir="rtl" className="flex-1">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.15 }}
              className="text-[clamp(1.8rem,5vw,4rem)] font-medium leading-tight mb-8"
              style={{ color: "var(--cream)" }}
            >
              חברה גדולה
              <br />
              <span style={{ color: "var(--gold)" }}>ברוח של בית קטן.</span>
            </motion.h2>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.25 }}
              style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 520 }}
            >
              <p
                style={{
                  color: "var(--parchment)",
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(13px, 1.2vw, 15px)",
                  lineHeight: 2,
                  textAlign: "right",
                }}
              >
                אמיר ועלאא נכנסו לעולם הקפה מתוך עשייה — ורק אז גילו את התשוקה.
                מה שהתחיל כייבוא הפך לשליחות: לבנות בית.
              </p>
              <p
                style={{
                  color: "var(--parchment)",
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(13px, 1.2vw, 15px)",
                  lineHeight: 2,
                  textAlign: "right",
                }}
              >
                אמניזיה יבוא ושיווק בע"מ היא היבואנית והמשווקת הרשמית והבלעדית
                בישראל של תערובות הקפה האיטלקיות CAFFÈ VERO — מותג עם מוניטין
                בינלאומי של למעלה מחמישה עשורים.
              </p>
              <p
                style={{
                  color: "var(--muted)",
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(12px, 1.1vw, 14px)",
                  lineHeight: 2,
                  textAlign: "right",
                }}
              >
                הם מאמינים שיחס אנושי הוא הלב של השירות — ולא תוספת לו.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Stat pills */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.35 }}
          dir="rtl"
          className="grid grid-cols-1 sm:grid-cols-3 gap-px"
          style={{ background: "var(--layer-2)" }}
        >
          {STATS.map((stat) => (
            <div
              key={stat.value}
              style={{
                background: "var(--layer-1)",
                padding: "28px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              <p
                style={{
                  color: "var(--cream)",
                  fontSize: "clamp(1rem, 2vw, 1.3rem)",
                  fontWeight: 400,
                  lineHeight: 1.2,
                }}
              >
                {stat.value}
              </p>
              <p
                style={{
                  color: "var(--muted)",
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  lineHeight: 1.6,
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
