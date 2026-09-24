"use client";

import { motion } from "framer-motion";

const BRANCHES = [
  {
    id: "maalia",
    num: "01",
    name: "מעיליא",
    sub: "אזור התעשייה מעיליא",
    badge: "סניף ראשי",
    badgeColor: "var(--gold)",
  },
  {
    id: "carmiel",
    num: "02",
    name: "כרמיאל",
    sub: "",
    badge: null,
    badgeColor: "",
  },
  {
    id: "nazareth",
    num: "03",
    name: "נצרת",
    sub: "",
    badge: "טלפוני בלבד",
    badgeColor: "var(--muted)",
  },
  {
    id: "kafr-yasif",
    num: "04",
    name: "כפר יאסיף",
    sub: "",
    badge: null,
    badgeColor: "",
  },
  {
    id: "jerusalem",
    num: "05",
    name: "ירושלים",
    sub: "",
    badge: null,
    badgeColor: "",
  },
] as const;

export default function BranchesSection() {
  return (
    <section
      id="branches"
      dir="rtl"
      className="section-warm py-20 px-6 md:px-16"
    >
      <div className="max-w-5xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left — branch list */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ marginBottom: 44 }}
            >
              <p
                className="eyebrow-latin"
                style={{ color: "var(--gold)", fontSize: 10, marginBottom: 14 }}
              >
                OUR LOCATIONS
              </p>
              <h2
                style={{
                  fontSize: "clamp(1.8rem, 4vw, 3rem)",
                  fontWeight: 300,
                  color: "var(--cream)",
                  lineHeight: 1.2,
                }}
              >
                סניפים ברחבי הארץ
              </h2>
            </motion.div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              {BRANCHES.map(({ id, num, name, sub, badge, badgeColor }, i) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.08 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                    padding: "20px 0",
                    borderBottom: "1px solid var(--layer-2)",
                  }}
                >
                  {/* Number */}
                  <span
                    dir="ltr"
                    style={{
                      fontFamily: "var(--font-latin)",
                      fontSize: 11,
                      color: "rgba(200,161,101,0.35)",
                      letterSpacing: "0.05em",
                      flexShrink: 0,
                      width: 28,
                    }}
                  >
                    {num}
                  </span>

                  {/* Name + sub */}
                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "clamp(1rem, 2vw, 1.2rem)",
                        fontWeight: 300,
                        color: "var(--cream)",
                        lineHeight: 1.3,
                      }}
                    >
                      {name}
                    </p>
                    {sub && (
                      <p
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: 11,
                          color: "var(--muted)",
                          marginTop: 2,
                        }}
                      >
                        {sub}
                      </p>
                    )}
                  </div>

                  {/* Badge */}
                  {badge && (
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 10,
                        color: badgeColor,
                        border: `1px solid ${badgeColor}`,
                        padding: "3px 8px",
                        opacity: 0.7,
                        flexShrink: 0,
                      }}
                    >
                      {badge}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — contact card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.15 }}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                background: "var(--layer-1)",
                border: "1px solid var(--layer-2)",
                padding: "44px 36px",
              }}
            >
              <p
                className="eyebrow-latin"
                style={{ color: "var(--gold)", fontSize: 9, marginBottom: 20 }}
              >
                CONTACT US
              </p>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                  fontWeight: 300,
                  color: "var(--cream)",
                  lineHeight: 1.5,
                  marginBottom: 28,
                }}
              >
                יש לכם שאלה?<br />
                <span style={{ color: "var(--gold)" }}>אנחנו ממש כאן.</span>
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <a
                  href="tel:049978836"
                  dir="ltr"
                  data-cursor="pointer"
                  className="branch-contact-link"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    color: "var(--parchment)",
                    textDecoration: "none",
                    transition: "color 0.25s",
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.02 1.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>
                  </svg>
                  <span style={{ fontFamily: "var(--font-latin)", fontSize: 14, letterSpacing: "0.04em" }}>
                    04-9978836
                  </span>
                </a>

                <a
                  href="mailto:info@vero-cafe.co.il"
                  dir="ltr"
                  data-cursor="pointer"
                  className="branch-contact-link"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    color: "var(--parchment)",
                    textDecoration: "none",
                    transition: "color 0.25s",
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <span style={{ fontFamily: "var(--font-latin)", fontSize: 13 }}>
                    info@vero-cafe.co.il
                  </span>
                </a>
              </div>

              <div
                style={{
                  marginTop: 36,
                  paddingTop: 28,
                  borderTop: "1px solid var(--layer-2)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 11,
                    color: "var(--muted)",
                    lineHeight: 1.9,
                  }}
                >
                  שעות פעילות:
                  <br />
                  א–ה 9:00–18:00 · ו׳ 9:00–14:00
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      <style>{`.branch-contact-link:hover { color: var(--gold) !important; }`}</style>
    </section>
  );
}
