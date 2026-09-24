"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "קפה",         href: "#craft"   },
  { label: "קפסולות",     href: "#specs"   },
  { label: "מכונות קפה",  href: "#specs"   },
  { label: "מטחנות",      href: "#specs"   },
  { label: "Bialetti",    href: "#bialetti"},
  { label: "לעסקים",      href: "#business"},
  { label: "אודות",       href: "#story"   },
];

export default function Header() {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        dir="ltr"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 32px",
          transition: "background 0.5s ease, border-color 0.5s ease",
          background: scrolled ? "rgba(8,5,3,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(18px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(18px)" : "none",
          borderBottom: scrolled ? "1px solid var(--layer-2)" : "1px solid transparent",
        }}
      >
        {/* ── Brand ─────────────────────────────────────────── */}
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
              width={32} height={32} priority
              className="brightness-0 invert"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <span
            className="eyebrow-latin"
            style={{ color: "var(--parchment)", fontWeight: 300, fontSize: 12 }}
          >
            CAFFÈ VERO
          </span>
        </div>

        {/* ── Desktop nav ────────────────────────────────────── */}
        <nav
          dir="rtl"
          className="hidden lg:flex items-center"
          style={{ gap: 28 }}
        >
          {NAV_ITEMS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              data-cursor="pointer"
              className="header-nav-link"
              style={{
                color: "var(--muted)",
                fontSize: 12,
                fontFamily: "var(--font-body)",
                textDecoration: "none",
                transition: "color 0.25s",
              }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* ── Right: phone + cart + CTA ──────────────────────── */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* Phone — desktop only */}
          <a
            href="tel:049978836"
            className="hidden lg:block"
            dir="ltr"
            style={{
              color: "var(--muted)",
              fontSize: 11,
              fontFamily: "var(--font-latin)",
              textDecoration: "none",
              letterSpacing: "0.04em",
              transition: "color 0.25s",
            }}
          >
            04-9978836
          </a>

          {/* Cart icon */}
          <button
            data-cursor="pointer"
            aria-label="עגלת קניות"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "6px",
              color: "var(--parchment)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
          </button>

          {/* CTA button — desktop only */}
          <button
            data-cursor="pointer"
            className="header-buy-btn hidden lg:block"
            style={{
              background: "transparent",
              border: "1px solid rgba(200,161,101,0.4)",
              color: "var(--gold)",
              padding: "8px 20px",
              minHeight: 38,
              fontSize: 12,
              cursor: "pointer",
              transition: "background 0.3s ease, color 0.3s ease, border-color 0.3s ease",
              fontFamily: "var(--font-body)",
              fontWeight: 400,
            }}
          >
            צור קשר
          </button>

          {/* Hamburger — mobile only */}
          <button
            data-cursor="pointer"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="פתח תפריט"
            className="lg:hidden"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "6px",
              display: "flex",
              flexDirection: "column",
              gap: 5,
              alignItems: "flex-end",
            }}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              style={{ display: "block", width: 22, height: 1, background: "var(--parchment)", transformOrigin: "center" }}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              style={{ display: "block", width: 16, height: 1, background: "var(--parchment)" }}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              style={{ display: "block", width: 22, height: 1, background: "var(--parchment)", transformOrigin: "center" }}
            />
          </button>
        </div>

        {/* Hover styles */}
        <style>{`
          .header-nav-link:hover { color: var(--cream) !important; }
          .header-buy-btn:hover {
            background: var(--gold) !important;
            color: var(--espresso) !important;
            border-color: var(--gold) !important;
          }
        `}</style>
      </header>

      {/* ── Mobile full-screen overlay menu ─────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            dir="rtl"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 199,
              background: "rgba(8,5,3,0.97)",
              backdropFilter: "blur(24px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              padding: "80px 32px 40px",
              gap: 8,
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setMenuOpen(false);
            }}
          >
            {NAV_ITEMS.map(({ label, href }, i) => (
              <motion.a
                key={label}
                href={href}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  color: "var(--cream)",
                  fontSize: "clamp(1.6rem, 6vw, 2.2rem)",
                  fontWeight: 300,
                  textDecoration: "none",
                  padding: "10px 0",
                  borderBottom: "1px solid var(--layer-2)",
                  width: "100%",
                  transition: "color 0.2s",
                }}
                className="mobile-nav-link"
              >
                {label}
              </motion.a>
            ))}

            {/* Contact info in mobile menu */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 8 }}
            >
              <a
                href="tel:049978836"
                dir="ltr"
                style={{ color: "var(--muted)", fontSize: 13, fontFamily: "var(--font-latin)", textDecoration: "none" }}
              >
                04-9978836
              </a>
              <a
                href="mailto:info@vero-cafe.co.il"
                dir="ltr"
                style={{ color: "var(--muted)", fontSize: 13, fontFamily: "var(--font-latin)", textDecoration: "none" }}
              >
                info@vero-cafe.co.il
              </a>
            </motion.div>

            <style>{`.mobile-nav-link:hover { color: var(--gold) !important; }`}</style>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
