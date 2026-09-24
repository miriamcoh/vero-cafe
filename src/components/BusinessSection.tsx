"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BUSINESS_TYPES = [
  { id: "cafe",    label: "בית קפה / מסעדה" },
  { id: "hotel",   label: "מלון / אירוח"      },
  { id: "office",  label: "משרד / היי-טק"    },
  { id: "factory", label: "מפעל / מוסד"       },
  { id: "other",   label: "אחר"               },
];

const ICONS = [
  {
    id: "cafe",
    label: "בתי קפה ומסעדות",
    sub: "פתרון מלא מהמכונה עד הפול",
    path: "M18 8h1a4 4 0 010 8h-1 M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z M6 1v3 M10 1v3 M14 1v3",
  },
  {
    id: "hotel",
    label: "מלונות ואירוח",
    sub: "חוויית קפה ברמת 5 כוכבים",
    path: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  },
  {
    id: "office",
    label: "משרדים",
    sub: "מכונות לסביבת עבודה מודרנית",
    path: "M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16",
  },
  {
    id: "factory",
    label: "מפעלים ומוסדות",
    sub: "ספקייה שוטפת ושירות מלא",
    path: "M2 20h20 M4 20V10l6-6 6 6v10 M10 20v-6h4v6",
  },
] as const;

export default function BusinessSection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    type: "",
    phone: "",
    email: "",
    message: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      id="business"
      dir="rtl"
      className="section-warm py-20 lg:py-[140px] px-6 md:px-16"
    >
      <div className="max-w-7xl mx-auto">

        {/* Grid: left copy + right form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left — B2B copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85 }}
          >
            <p
              className="eyebrow-latin"
              style={{ color: "var(--gold)", fontSize: 10, marginBottom: 16 }}
            >
              B2B SOLUTIONS
            </p>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                fontWeight: 500,
                color: "var(--cream)",
                lineHeight: 1.2,
                marginBottom: 20,
              }}
            >
              קפה לעסק שלך —
              <br />
              <span style={{ color: "var(--gold)" }}>מהמקור.</span>
            </h2>

            <div
              style={{
                width: 28, height: 1,
                background: "rgba(200,161,101,0.5)",
                marginBottom: 24,
              }}
            />

            <p
              style={{
                color: "var(--parchment)",
                fontFamily: "var(--font-body)",
                fontSize: "clamp(13px, 1.2vw, 15px)",
                lineHeight: 2,
                marginBottom: 40,
                maxWidth: 460,
              }}
            >
              כיבואן בלעדי של CAFFÈ VERO, אנחנו מציעים לעסקים פתרון שלם:
              מכונה, פולים, תחזוקה וליווי אישי. מחירי יבואן, ללא מתווכים.
            </p>

            {/* Icons grid */}
            <div className="grid grid-cols-2 gap-5">
              {ICONS.map(({ id, label, sub, path }) => (
                <div key={id} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div
                    style={{
                      flexShrink: 0,
                      width: 36, height: 36,
                      border: "1px solid var(--layer-2)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d={path} />
                    </svg>
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--cream)", marginBottom: 2 }}>
                      {label}
                    </p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--muted)", lineHeight: 1.6 }}>
                      {sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — lead form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.1 }}
            style={{
              background: "var(--layer-1)",
              border: "1px solid var(--layer-2)",
              padding: "40px 32px",
              position: "relative",
            }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: 340,
                    gap: 20,
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      width: 48, height: 48,
                      border: "1px solid var(--gold)",
                      borderRadius: "50%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
                      fontWeight: 400,
                      color: "var(--cream)",
                    }}
                  >
                    תודה — נחזור אליך בהקדם.
                  </p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--muted)", lineHeight: 1.7 }}>
                    פניות נענות בדרך כלל תוך יום עסקים.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ display: "flex", flexDirection: "column", gap: 18 }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 14,
                      color: "var(--cream)",
                      marginBottom: 6,
                    }}
                  >
                    השאירו פרטים ונחזור אליכם
                  </p>

                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="שם מלא"
                    required
                    className="b2b-input"
                    style={inputStyle}
                  />

                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    required
                    className="b2b-input"
                    style={{ ...inputStyle, appearance: "none" as const }}
                  >
                    <option value="" disabled>סוג עסק</option>
                    {BUSINESS_TYPES.map((t) => (
                      <option key={t.id} value={t.id}>{t.label}</option>
                    ))}
                  </select>

                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="טלפון"
                    required
                    dir="ltr"
                    type="tel"
                    className="b2b-input"
                    style={{ ...inputStyle, textAlign: "right" }}
                  />

                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="דוא&quot;ל"
                    type="email"
                    dir="ltr"
                    className="b2b-input"
                    style={{ ...inputStyle, textAlign: "right" }}
                  />

                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="ספרו לנו על הצורך שלכם (לא חובה)"
                    rows={3}
                    className="b2b-input"
                    style={{ ...inputStyle, resize: "none" }}
                  />

                  <button
                    type="submit"
                    data-cursor="pointer"
                    className="b2b-submit"
                    style={{
                      background: "transparent",
                      border: "1px solid rgba(200,161,101,0.4)",
                      color: "var(--gold)",
                      fontFamily: "var(--font-body)",
                      fontSize: 13,
                      padding: "14px 24px",
                      cursor: "pointer",
                      transition: "background 0.3s, color 0.3s, border-color 0.3s",
                    }}
                  >
                    שלחו פנייה
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>

      <style>{`
        .b2b-input {
          background: var(--layer-2) !important;
          border: 1px solid transparent !important;
          color: var(--cream) !important;
          font-family: var(--font-body) !important;
          font-size: 13px !important;
          padding: 12px 14px !important;
          outline: none !important;
          width: 100% !important;
          transition: border-color 0.25s !important;
        }
        .b2b-input::placeholder { color: var(--muted) !important; }
        .b2b-input:focus { border-color: rgba(200,161,101,0.35) !important; }
        .b2b-submit:hover {
          background: var(--gold) !important;
          color: var(--espresso) !important;
          border-color: var(--gold) !important;
        }
      `}</style>
    </section>
  );
}

const inputStyle: React.CSSProperties = {
  background: "var(--layer-2)",
  border: "1px solid transparent",
  color: "var(--cream)",
  fontFamily: "var(--font-body)",
  fontSize: 13,
  padding: "12px 14px",
  outline: "none",
  width: "100%",
};
