"use client";

import { motion } from "framer-motion";

/* Moka silhouette SVG — inline, no image dependency */
function MokaSilhouette({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 60 100"
      width="44"
      height="74"
      fill="none"
      aria-hidden
      style={{ opacity: 0.22 }}
    >
      {/* Base */}
      <path
        d="M18 70 Q10 70 8 60 L10 40 Q12 32 20 30 L40 30 Q48 32 50 40 L52 60 Q50 70 42 70 Z"
        fill={color}
      />
      {/* Funnel/filter */}
      <rect x="22" y="28" width="16" height="8" rx="2" fill={color} />
      {/* Top chamber */}
      <path
        d="M22 20 Q20 14 24 10 L36 10 Q40 14 38 20 Z"
        fill={color}
      />
      {/* Spout */}
      <path
        d="M38 22 Q50 20 52 14"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Handle */}
      <path
        d="M10 55 Q4 55 4 62 Q4 70 10 70"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

const COLLABS = [
  {
    id: "dg",
    brand: "Dolce & Gabbana",
    tagline: "אמנות איטלקית פוגשת קפה איטלקי",
    bg: "radial-gradient(ellipse 80% 80% at 30% 40%, rgba(220,210,190,0.18) 0%, rgba(8,5,3,0.98) 100%)",
    border: "rgba(220,210,190,0.25)",
    accent: "#dcd2be",
  },
  {
    id: "stranger",
    brand: "Stranger Things",
    tagline: "המקינטה מגיעה מה-Upside Down",
    bg: "radial-gradient(ellipse 80% 80% at 60% 40%, rgba(30,50,100,0.45) 0%, rgba(8,5,3,0.98) 100%)",
    border: "rgba(100,130,200,0.25)",
    accent: "#6482c8",
  },
  {
    id: "squid",
    brand: "Squid Game",
    tagline: "הפינק הכי מסוכן שתשתה",
    bg: "radial-gradient(ellipse 80% 80% at 40% 55%, rgba(220,40,80,0.35) 0%, rgba(8,5,3,0.98) 100%)",
    border: "rgba(220,40,80,0.25)",
    accent: "#dc2850",
  },
  {
    id: "bridgerton",
    brand: "Bridgerton",
    tagline: "כוס קפה בסגנון ריג'נסי",
    bg: "radial-gradient(ellipse 80% 80% at 50% 35%, rgba(180,120,110,0.4) 0%, rgba(8,5,3,0.98) 100%)",
    border: "rgba(200,161,101,0.3)",
    accent: "#c8a165",
  },
  {
    id: "tnf",
    brand: "The North Face",
    tagline: "קפה לשביל ההרים",
    bg: "radial-gradient(ellipse 80% 80% at 35% 50%, rgba(30,90,50,0.45) 0%, rgba(8,5,3,0.98) 100%)",
    border: "rgba(60,150,80,0.25)",
    accent: "#3c9650",
  },
  {
    id: "mckenzie",
    brand: "MacKenzie-Childs",
    tagline: "כל שחרית היא פסטיבל",
    bg: "radial-gradient(ellipse 80% 80% at 55% 45%, rgba(160,90,150,0.35) 0%, rgba(8,5,3,0.98) 100%)",
    border: "rgba(200,130,190,0.25)",
    accent: "#c882be",
  },
  {
    id: "mercato",
    brand: "Mercato della Frutta",
    tagline: "שוק הירקות בכוס הקפה שלך",
    bg: "radial-gradient(ellipse 80% 80% at 45% 40%, rgba(200,100,20,0.4) 0%, rgba(8,5,3,0.98) 100%)",
    border: "rgba(200,100,20,0.3)",
    accent: "#c86414",
  },
] as const;

export default function BialettiSection() {
  return (
    <section
      id="bialetti"
      dir="rtl"
      style={{
        background: "var(--espresso)",
        padding: "80px 0",
        borderTop: "1px solid var(--layer-2)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: 52 }}
        >
          <p
            className="eyebrow-latin"
            style={{ color: "var(--gold)", fontSize: 10, marginBottom: 12 }}
          >
            SPECIAL EDITIONS
          </p>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 300,
              color: "var(--cream)",
              lineHeight: 1.2,
              marginBottom: 14,
            }}
          >
            Bialetti <span style={{ color: "var(--gold)" }}>×</span> העולם
          </h2>
          <p
            style={{
              color: "var(--muted)",
              fontFamily: "var(--font-body)",
              fontSize: "clamp(12px, 1.2vw, 14px)",
              maxWidth: 460,
              lineHeight: 1.85,
            }}
          >
            המקינטה האייקונית לובשת פנים חדשות בשיתופי פעולה עם מותגי תרבות ואופנה עולמיים.
          </p>
        </motion.div>

        {/* Collabs grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          style={{ gap: 2 }}
        >
          {COLLABS.map(({ id, brand, tagline, bg, border, accent }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.07 }}
              data-cursor="pointer"
              className="bialetti-tile"
              style={{
                background: bg,
                border: `1px solid ${border}`,
                padding: "32px 24px",
                minHeight: 200,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
              }}
            >
              <MokaSilhouette color={accent} />

              <div style={{ marginTop: "auto" }}>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    fontWeight: 400,
                    color: "var(--cream)",
                    marginBottom: 6,
                    lineHeight: 1.3,
                  }}
                >
                  {brand}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 11,
                    color: "var(--muted)",
                    lineHeight: 1.6,
                  }}
                >
                  {tagline}
                </p>
              </div>

              {/* Hover accent line */}
              <div
                className="bialetti-accent-line"
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: accent,
                  opacity: 0,
                  transition: "opacity 0.35s ease",
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .bialetti-tile { transition: transform 0.35s ease; }
        .bialetti-tile:hover { transform: translateY(-3px); }
        .bialetti-tile:hover .bialetti-accent-line { opacity: 0.6 !important; }
      `}</style>
    </section>
  );
}
