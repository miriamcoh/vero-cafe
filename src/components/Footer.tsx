"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const NAV_COL = [
  { label: "קפה",          href: "#craft"    },
  { label: "קפסולות",      href: "#specs"    },
  { label: "מכונות קפה",   href: "#specs"    },
  { label: "מטחנות",       href: "#specs"    },
  { label: "Bialetti",     href: "#bialetti" },
  { label: "לעסקים",       href: "#business" },
  { label: "אודות",        href: "#story"    },
];

const LEGAL = [
  { label: "תקנון",       href: "#" },
  { label: "פרטיות",      href: "#" },
  { label: "נגישות",      href: "#" },
  { label: "קנייה בטוחה", href: "#" },
];

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0  },
};

export default function Footer() {
  return (
    <footer
      dir="rtl"
      style={{
        background: "var(--espresso)",
        borderTop: "1px solid var(--layer-2)",
      }}
    >
      {/* ── Main columns ─────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 md:px-16 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Col 1 — Brand */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-5"
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 32, height: 32, borderRadius: "50%",
                  overflow: "hidden", background: "var(--layer-1)", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <Image
                  src="/logo.png"
                  alt="CAFFÈ VERO"
                  width={32} height={32}
                  className="brightness-0 invert opacity-60"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <span
                className="eyebrow-latin"
                style={{ color: "var(--parchment)", fontWeight: 400, fontSize: 11 }}
              >
                CAFFÈ VERO
              </span>
            </div>

            <p
              style={{
                color: "var(--muted)",
                fontFamily: "var(--font-body)",
                fontSize: 12,
                lineHeight: 1.9,
                maxWidth: 200,
              }}
            >
              אמניזיה יבוא ושיווק בע&quot;מ —<br />
              יבואן בלעדי של CAFFÈ VERO בישראל.
            </p>

            <p
              style={{
                color: "rgba(200,161,101,0.35)",
                fontFamily: "var(--font-latin)",
                fontSize: 9,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Est. Italy · 50+ Years
            </p>
          </motion.div>

          {/* Col 2 — Navigation */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.08 }}
            className="flex flex-col gap-4"
          >
            <p
              style={{
                color: "var(--cream)",
                fontFamily: "var(--font-body)",
                fontSize: 11,
                marginBottom: 4,
              }}
            >
              ניווט
            </p>
            {NAV_COL.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                data-cursor="pointer"
                className="footer-link"
                style={{
                  color: "var(--muted)",
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  textDecoration: "none",
                  transition: "color 0.25s",
                }}
              >
                {label}
              </a>
            ))}
          </motion.div>

          {/* Col 3 — Contact */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.16 }}
            className="flex flex-col gap-4"
          >
            <p
              style={{
                color: "var(--cream)",
                fontFamily: "var(--font-body)",
                fontSize: 11,
                marginBottom: 4,
              }}
            >
              יצירת קשר
            </p>

            <a
              href="tel:049978836"
              dir="ltr"
              data-cursor="pointer"
              className="footer-link"
              style={{
                color: "var(--muted)",
                fontFamily: "var(--font-latin)",
                fontSize: 13,
                textDecoration: "none",
                letterSpacing: "0.04em",
                transition: "color 0.25s",
              }}
            >
              04-9978836
            </a>

            <a
              href="tel:049575688"
              dir="ltr"
              data-cursor="pointer"
              className="footer-link"
              style={{
                color: "var(--muted)",
                fontFamily: "var(--font-latin)",
                fontSize: 12,
                textDecoration: "none",
                letterSpacing: "0.04em",
                transition: "color 0.25s",
              }}
            >
              04-9575688 <span style={{ fontFamily: "var(--font-body)", fontSize: 11 }}>(פקס)</span>
            </a>

            <a
              href="mailto:info@vero-cafe.co.il"
              dir="ltr"
              data-cursor="pointer"
              className="footer-link"
              style={{
                color: "var(--muted)",
                fontFamily: "var(--font-latin)",
                fontSize: 12,
                textDecoration: "none",
                transition: "color 0.25s",
              }}
            >
              info@vero-cafe.co.il
            </a>

            <div
              style={{
                width: 24, height: 1,
                background: "var(--layer-2)",
                marginTop: 4,
              }}
            />

            <p
              style={{
                color: "var(--muted)",
                fontFamily: "var(--font-body)",
                fontSize: 11,
                lineHeight: 1.8,
              }}
            >
              א–ה 9:00–18:00
              <br />
              ו׳ 9:00–14:00
            </p>
          </motion.div>

          {/* Col 4 — Social */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.24 }}
            className="flex flex-col gap-4"
          >
            <p
              style={{
                color: "var(--cream)",
                fontFamily: "var(--font-body)",
                fontSize: 11,
                marginBottom: 4,
              }}
            >
              עקבו אחרינו
            </p>

            <a
              href="https://www.instagram.com/caffevero.il"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="pointer"
              className="footer-social-link"
              dir="ltr"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                color: "var(--muted)",
                textDecoration: "none",
                transition: "color 0.25s",
              }}
            >
              {/* Instagram icon */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4.5"/>
                <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
              </svg>
              <span style={{ fontFamily: "var(--font-latin)", fontSize: 12, letterSpacing: "0.03em" }}>
                @caffevero.il
              </span>
            </a>

            <a
              href="https://www.facebook.com/CaffeVeroIsrael"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="pointer"
              className="footer-social-link"
              dir="ltr"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                color: "var(--muted)",
                textDecoration: "none",
                transition: "color 0.25s",
              }}
            >
              {/* Facebook icon */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
              </svg>
              <span style={{ fontFamily: "var(--font-latin)", fontSize: 12, letterSpacing: "0.03em" }}>
                CaffeVeroIsrael
              </span>
            </a>

            <div style={{ marginTop: 20 }}>
              <p
                style={{
                  color: "rgba(200,161,101,0.3)",
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  lineHeight: 1.8,
                }}
              >
                סניפים ברחבי הארץ —<br />
                מעיליא, כרמיאל, נצרת,<br />
                כפר יאסיף, ירושלים
              </p>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────────── */}
      <div
        style={{
          borderTop: "1px solid var(--layer-2)",
          padding: "16px 0",
        }}
      >
        <div
          className="max-w-6xl mx-auto px-6 md:px-16"
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <p
            style={{
              color: "var(--layer-3)",
              fontFamily: "var(--font-body)",
              fontSize: 10,
            }}
          >
            © {new Date().getFullYear()} אמניזיה יבוא ושיווק בע&quot;מ. כל הזכויות שמורות.
          </p>

          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {LEGAL.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                data-cursor="pointer"
                className="footer-link"
                style={{
                  color: "var(--layer-3)",
                  fontFamily: "var(--font-body)",
                  fontSize: 10,
                  textDecoration: "none",
                  transition: "color 0.25s",
                }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .footer-link:hover { color: var(--gold) !important; }
        .footer-social-link:hover { color: var(--gold) !important; }
      `}</style>
    </footer>
  );
}
