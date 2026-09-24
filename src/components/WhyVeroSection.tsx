"use client";

import { motion } from "framer-motion";

const PROMISES = [
  {
    id: "exclusive",
    title: "יבוא בלעדי",
    body: "אנחנו היבואן הרשמי של CAFFÈ VERO בישראל. אין מתווכים — המקור בידינו.",
    // Shield + check icon
    icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  },
  {
    id: "solution",
    title: "פתרון מלא",
    body: "מכונה, מטחנה, פולים, קפסולות ותחזוקה — הכל ממקור אחד, ללא ריצות.",
    // Package icon
    icon: "M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z",
  },
  {
    id: "price",
    title: "מחירי יבואן",
    body: "ישירות מהמחסן שלנו — ללא שרשרת הפצה. המחיר ההוגן הוא לא הטבה, הוא עיקרון.",
    // Tag icon
    icon: "M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z M7 7h.01",
  },
  {
    id: "service",
    title: "שירות אישי",
    body: "אמיר ועלאא בונים יחסים ארוכי טווח. כשמשהו לא עובד — אנחנו עונים.",
    // User icon
    icon: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
  },
] as const;

export default function WhyVeroSection() {
  return (
    <section
      id="why"
      dir="rtl"
      style={{
        background: "var(--espresso)",
        padding: "80px 0",
        borderTop: "1px solid var(--layer-2)",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: 56 }}
        >
          <p
            className="eyebrow-latin"
            style={{ color: "var(--gold)", fontSize: 10, marginBottom: 14 }}
          >
            WHY VERO
          </p>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 500,
              color: "var(--cream)",
              lineHeight: 1.2,
            }}
          >
            למה Vero
          </h2>
        </motion.div>

        {/* 2×2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ background: "var(--layer-2)" }}>
          {PROMISES.map(({ id, title, body, icon }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              style={{
                background: "var(--layer-1)",
                padding: "40px 36px",
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: 44, height: 44,
                  border: "1px solid var(--layer-2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg
                  width="18" height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--gold)"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={icon} />
                </svg>
              </div>

              <div>
                <h3
                  style={{
                    fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
                    fontWeight: 500,
                    color: "var(--cream)",
                    marginBottom: 10,
                    lineHeight: 1.3,
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "clamp(12px, 1.1vw, 14px)",
                    color: "var(--muted)",
                    lineHeight: 1.9,
                  }}
                >
                  {body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
