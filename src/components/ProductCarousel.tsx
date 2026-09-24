"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PRODUCTS = [
  {
    id: "vero-viaggio",
    category: "פולי קפה",
    name: "CAFFÈ VERO Viaggio",
    sub: "500 גרם",
    price: "₪50",
    gradient: "radial-gradient(ellipse 80% 80% at 40% 55%, rgba(110,55,15,0.85) 0%, rgba(31,23,18,1) 100%)",
    accent: "var(--gold)",
  },
  {
    id: "eureka-mignon",
    category: "מטחנות",
    name: "EUREKA Mignon Specialita",
    sub: "כרום · מקצועית",
    price: "₪2,390",
    gradient: "radial-gradient(ellipse 70% 70% at 55% 45%, rgba(180,170,160,0.25) 0%, rgba(31,23,18,1) 100%)",
    accent: "var(--cream)",
  },
  {
    id: "ecm-vtitan",
    category: "מטחנות",
    name: "ECM V-Titan 64",
    sub: "On-Demand · מקצועי",
    price: "₪5,790",
    gradient: "radial-gradient(ellipse 70% 70% at 45% 50%, rgba(60,60,65,0.7) 0%, rgba(31,23,18,1) 100%)",
    accent: "var(--parchment)",
  },
  {
    id: "bialetti-moka",
    category: "Bialetti",
    name: "Bialetti Moka Exclusive",
    sub: "3 כוסות · כחול פסטל",
    price: "₪191",
    gradient: "radial-gradient(ellipse 70% 70% at 50% 40%, rgba(80,110,160,0.5) 0%, rgba(31,23,18,1) 100%)",
    accent: "#90aadc",
  },
  {
    id: "loison-cookies",
    category: "LOISON",
    name: "עוגיות חמאה LOISON",
    sub: "מארז פח · 120 גרם",
    price: "₪40",
    gradient: "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(160,130,50,0.55) 0%, rgba(31,23,18,1) 100%)",
    accent: "var(--copper)",
  },
] as const;

type FloatingBean = { id: number; x: number };

export default function ProductCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [beans, setBeans] = useState<FloatingBean[]>([]);

  function addBeanAnimation(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const newBean: FloatingBean = { id: Date.now(), x };
    setBeans((prev) => [...prev, newBean]);
    setTimeout(() => {
      setBeans((prev) => prev.filter((b) => b.id !== newBean.id));
    }, 900);
  }

  function scrollBy(dir: "left" | "right") {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({ left: dir === "left" ? 320 : -320, behavior: "smooth" });
  }

  return (
    <section
      id="products"
      dir="rtl"
      style={{
        background: "var(--espresso)",
        padding: "var(--section-py) 0",
        overflow: "hidden",
      }}
    >
      {/* Floating bean particles */}
      <AnimatePresence>
        {beans.map((bean) => (
          <motion.div
            key={bean.id}
            initial={{ opacity: 1, y: 0, scale: 1 }}
            animate={{ opacity: 0, y: -80, scale: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
            style={{
              position: "fixed",
              left: bean.x - 6,
              bottom: "5vh",
              zIndex: 9999,
              width: 12,
              height: 18,
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              background: "radial-gradient(circle at 35% 35%, var(--gold), var(--copper))",
              pointerEvents: "none",
            }}
          />
        ))}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 md:px-16">

        {/* Header row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: 36,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p
              className="eyebrow-latin"
              style={{ color: "var(--gold)", fontSize: 10, marginBottom: 10 }}
            >
              FEATURED PRODUCTS
            </p>
            <h2
              style={{
                fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)",
                fontWeight: 500,
                color: "var(--cream)",
                lineHeight: 1.2,
              }}
            >
              מוצרים נבחרים
            </h2>
          </motion.div>

          {/* Arrow buttons */}
          <div dir="ltr" style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => scrollBy("right")}
              aria-label="הקודם"
              data-cursor="pointer"
              style={{
                width: 40, height: 40,
                border: "1px solid var(--layer-2)",
                background: "transparent",
                color: "var(--muted)",
                cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "border-color 0.25s, color 0.25s",
              }}
              className="carousel-arrow"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <button
              onClick={() => scrollBy("left")}
              aria-label="הבא"
              data-cursor="pointer"
              style={{
                width: 40, height: 40,
                border: "1px solid var(--layer-2)",
                background: "transparent",
                color: "var(--muted)",
                cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "border-color 0.25s, color 0.25s",
              }}
              className="carousel-arrow"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable track */}
        <div
          ref={trackRef}
          style={{
            display: "flex",
            gap: 16,
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            paddingBottom: 4,
          }}
          className="carousel-hide-scrollbar"
        >
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              style={{
                flex: "0 0 280px",
                scrollSnapAlign: "start",
                background: product.gradient,
                border: "1px solid var(--layer-2)",
                borderRadius: 12,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              {/* Visual area */}
              <div
                style={{
                  height: 200,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                {/* Abstract product silhouette */}
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    border: `1px solid ${product.accent}`,
                    opacity: 0.25,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: product.accent,
                    opacity: 0.12,
                  }}
                />
              </div>

              {/* Text area */}
              <div style={{ padding: "20px 20px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                <p
                  className="eyebrow-latin"
                  style={{ fontSize: 9, color: product.accent, marginBottom: 8, opacity: 0.8 }}
                >
                  {product.category}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 14,
                    fontWeight: 400,
                    color: "var(--cream)",
                    lineHeight: 1.4,
                    marginBottom: 4,
                  }}
                >
                  {product.name}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 11,
                    color: "var(--muted)",
                    marginBottom: 16,
                    flex: 1,
                  }}
                >
                  {product.sub}
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    dir="ltr"
                    style={{
                      fontFamily: "var(--font-latin)",
                      fontSize: 22,
                      fontWeight: 500,
                      color: "var(--gold)",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {product.price}
                  </span>
                  <button
                    onClick={addBeanAnimation}
                    data-cursor="pointer"
                    className="add-to-cart-btn"
                    style={{
                      background: "var(--gold)",
                      border: "1px solid var(--gold)",
                      color: "#0E0A08",
                      fontFamily: "var(--font-body)",
                      fontSize: 12,
                      fontWeight: 600,
                      padding: "9px 16px",
                      cursor: "pointer",
                      borderRadius: 6,
                      transition: "opacity 0.25s",
                    }}
                  >
                    הוסף לסל
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .carousel-hide-scrollbar::-webkit-scrollbar { display: none; }
        .carousel-arrow:hover { border-color: var(--gold) !important; color: var(--gold) !important; }
        .add-to-cart-btn:hover { opacity: 0.82; }
      `}</style>
    </section>
  );
}
