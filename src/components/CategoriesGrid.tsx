"use client";

import { motion } from "framer-motion";

const CATEGORIES = [
  {
    id: "coffee-beans",
    label: "פולי קפה",
    sub: "Caffè Vero · Mokarico · La Tazza d'Oro",
    span: "col-span-2",
    gradient: "radial-gradient(ellipse 80% 80% at 30% 50%, rgba(120,60,20,0.7) 0%, rgba(8,5,3,0.95) 100%)",
    accent: "var(--gold)",
  },
  {
    id: "capsules",
    label: "קפסולות",
    sub: "תואמות Nespresso",
    span: "",
    gradient: "radial-gradient(ellipse 70% 70% at 60% 40%, rgba(80,40,10,0.75) 0%, rgba(8,5,3,0.97) 100%)",
    accent: "var(--copper)",
  },
  {
    id: "accessories",
    label: "אביזרי בריסטה",
    sub: "Crema Pro · כלי הגשה",
    span: "",
    gradient: "radial-gradient(ellipse 65% 65% at 40% 55%, rgba(60,50,40,0.8) 0%, rgba(8,5,3,0.97) 100%)",
    accent: "var(--parchment)",
  },
  {
    id: "machines",
    label: "מכונות קפה",
    sub: "ECM · Victoria Arduino · Nuova Simonelli",
    span: "col-span-2",
    gradient: "radial-gradient(ellipse 75% 75% at 65% 45%, rgba(30,20,15,0.9) 0%, rgba(8,5,3,0.98) 100%)",
    accent: "var(--cream)",
  },
  {
    id: "grinders",
    label: "מטחנות",
    sub: "EUREKA Mignon · ECM V-Titan",
    span: "",
    gradient: "radial-gradient(ellipse 70% 70% at 35% 60%, rgba(100,70,30,0.65) 0%, rgba(8,5,3,0.97) 100%)",
    accent: "var(--gold)",
  },
  {
    id: "bialetti",
    label: "Bialetti",
    sub: "מקינטות · מהדורות מיוחדות",
    span: "",
    gradient: "radial-gradient(ellipse 65% 65% at 50% 50%, rgba(180,40,20,0.35) 0%, rgba(8,5,3,0.97) 100%)",
    accent: "#e05040",
  },
  {
    id: "loison",
    label: "LOISON",
    sub: "עוגיות חמאה · מארזי מתנה",
    span: "",
    gradient: "radial-gradient(ellipse 65% 65% at 55% 45%, rgba(160,130,60,0.5) 0%, rgba(8,5,3,0.97) 100%)",
    accent: "var(--copper)",
  },
  {
    id: "business",
    label: "לעסקים",
    sub: "בתי קפה · מלונות · משרדים",
    span: "",
    gradient: "radial-gradient(ellipse 70% 70% at 40% 55%, rgba(20,25,30,0.9) 0%, rgba(8,5,3,0.98) 100%)",
    accent: "var(--parchment)",
  },
] as const;

export default function CategoriesGrid() {
  return (
    <section
      id="categories"
      dir="rtl"
      style={{
        background: "var(--espresso)",
        padding: "80px 0",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-16">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: 48 }}
        >
          <p
            className="eyebrow-latin"
            style={{ color: "var(--gold)", fontSize: 10, marginBottom: 12 }}
          >
            CATEGORIES
          </p>
          <h2
            style={{
              fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)",
              fontWeight: 500,
              color: "var(--cream)",
              lineHeight: 1.2,
            }}
          >
            כל מה שצריך לקפה מושלם
          </h2>
        </motion.div>

        {/* Asymmetric grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          style={{ gap: 2 }}
        >
          {CATEGORIES.map(({ id, label, sub, span, gradient, accent }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className={`category-tile ${span === "col-span-2" ? "sm:col-span-2" : ""}`}
              data-cursor="pointer"
              style={{
                background: gradient,
                border: "1px solid var(--layer-2)",
                padding: span === "col-span-2" ? "44px 36px" : "36px 28px",
                minHeight: span === "col-span-2" ? 180 : 140,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                transition: "transform 0.35s ease, border-color 0.35s ease",
              }}
            >
              {/* Hover overlay */}
              <div className="category-overlay" />

              <p
                className="eyebrow-latin"
                style={{
                  fontSize: 9,
                  color: accent,
                  opacity: 0.7,
                  marginBottom: 8,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {sub}
              </p>
              <h3
                style={{
                  fontSize: span === "col-span-2"
                    ? "clamp(1.3rem, 2.5vw, 1.8rem)"
                    : "clamp(1.1rem, 2vw, 1.4rem)",
                  fontWeight: 500,
                  color: "var(--cream)",
                  lineHeight: 1.2,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {label}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .category-tile { transition: transform 0.35s ease, border-color 0.35s ease; }
        .category-tile:hover { transform: scale(1.015); border-color: var(--layer-3) !important; }
        .category-overlay {
          position: absolute;
          inset: 0;
          background: rgba(200,161,101,0.04);
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .category-tile:hover .category-overlay { opacity: 1; }
      `}</style>
    </section>
  );
}
