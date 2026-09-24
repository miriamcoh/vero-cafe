"use client";

import { motion } from "framer-motion";

/* ── Specs data ───────────────────────────────────────────── */
const specs = [
  {
    label: "מכונות קפה",
    value: "Machines",
    desc:  "Delonghi, JURA, Philips, Gaggia, ECM, Breville, Nuova Simonelli, Victoria Arduino — ביתי, משרדי ומקצועי",
  },
  {
    label: "מטחנות קפה",
    value: "Grinders",
    desc:  "EUREKA Mignon, ECM V-Titan, Rancilio — יבוא בלעדי, טחינה מדויקת לכל שיטת הכנה",
  },
  {
    label: "פולי קפה וקפסולות",
    value: "Coffee",
    desc:  "Caffè Vero, Mokarico, Caffè Italia, La Tazza d'Oro, Bialetti — קלייה איטלקית מסורתית",
  },
  {
    label: "Bialetti & LOISON",
    value: "Lifestyle",
    desc:  "מקינטות מהדורות מיוחדות, עוגיות חמאה LOISON, Village Candle — מתנות ואביזרים",
  },
];

/* ── Feature blocks ───────────────────────────────────────── */
const features = [
  {
    title: "ייעוץ אישי",
    body:  "הצוות שלנו עוזר לכם לבחור את הפתרון המתאים — ביתי, משרדי, בית קפה או מלון. מידת המחויבות שלנו זהה לכולם.",
  },
  {
    title: "יבוא ישיר מאיטליה",
    body:  "כיבואן בלעדי של CAFFÈ VERO אנחנו מביאים את הקפה ישירות מהמקור. ללא מתווכים — בטעם ובמחיר.",
  },
  {
    title: "שירות לעסקים ולפרטיים",
    body:  "בתי קפה, מלונות, משרדים ומפעלים — פתרון מלא: מכונה, קפה, שירות ותחזוקה, תחת קורת גג אחת.",
  },
];

/* ── Shared fade-up variant ───────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0  },
};

/* ── Spec card ────────────────────────────────────────────── */
function SpecCard({
  label,
  value,
  desc,
  index,
}: {
  label: string;
  value: string;
  desc:  string;
  index: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative p-6 border border-[#1e1a14] hover:border-[#e6c27a]/30 transition-colors duration-500 bg-[#0f0b06]"
    >
      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#e6c27a]/40" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#e6c27a]/40" />
      {/* Hebrew label — no letter-spacing */}
      <p style={{ fontSize: 10, color: "var(--muted)", marginBottom: 12, fontFamily: "var(--font-body)" }}>{label}</p>
      <p className="text-3xl font-medium tracking-tight mb-2" style={{ color: "var(--gold)" }}>{value}</p>
      <p className="text-xs leading-5" style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}>{desc}</p>
    </motion.div>
  );
}

/* ── Feature block ────────────────────────────────────────── */
function FeatureBlock({
  title,
  body,
  index,
}: {
  title: string;
  body:  string;
  index: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
      className="border-r border-[#2a2318] pr-8 py-2"
    >
      <h3 className="text-lg font-medium mb-3" style={{ color: "var(--parchment)" }}>{title}</h3>
      <p className="text-sm leading-7" style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}>{body}</p>
    </motion.div>
  );
}

/* ── Main section ─────────────────────────────────────────── */
export default function SpecsSection() {
  return (
    <section
      id="specs"
      className="section-warm pt-32 pb-24 px-6 md:px-16 lg:px-24"
    >
      {/* Heading */}
      <div className="max-w-7xl mx-auto mb-20">
        {/* Hebrew eyebrow — no letter-spacing */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          style={{ fontSize: 11, color: "var(--gold)", marginBottom: 16, fontFamily: "var(--font-body)" }}
        >
          מה אנחנו מציעים
        </motion.p>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-[clamp(2rem,6vw,5rem)] font-medium leading-tight"
          style={{ color: "var(--cream)" }}
        >
          הכל תחת קורת גג
          <br />
          <span style={{ color: "var(--gold)" }}>אחת.</span>
        </motion.h2>
      </div>

      {/* Spec grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#120805] mb-24">
        {specs.map((s, i) => (
          <SpecCard key={s.label} {...s} index={i} />
        ))}
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto mb-20 flex items-center gap-6">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#2a2318] to-transparent" />
        <span className="text-[#2a2318] text-lg">◆</span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#2a2318] to-transparent" />
      </div>

      {/* Feature blocks */}
      <div id="craft" className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 mb-28">
        {features.map((f, i) => (
          <FeatureBlock key={f.title} {...f} index={i} />
        ))}
      </div>

      <CtaBlock />
    </section>
  );
}

/* ── CTA block ────────────────────────────────────────────── */
function CtaBlock() {
  const corners = [
    "top-0 right-0 border-t border-r",
    "top-0 left-0 border-t border-l",
    "bottom-0 right-0 border-b border-r",
    "bottom-0 left-0 border-b border-l",
  ];

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="max-w-7xl mx-auto text-center border border-[#1e1a14] p-16 relative overflow-hidden"
    >
      {corners.map((cls, i) => (
        <div key={i} className={`absolute w-8 h-8 border-[#e6c27a]/50 ${cls}`} />
      ))}

      {/* Latin brand mark — letter-spacing OK */}
      <p className="eyebrow-latin" style={{ color: "var(--muted)", fontSize: 9, marginBottom: 24 }}>
        Vero Cafe · Israel
      </p>
      {/* Hebrew heading — no letter-spacing */}
      <h2 className="text-[clamp(1.8rem,5vw,3.5rem)] font-medium mb-4" style={{ color: "var(--cream)" }}>
        מוכנים למכונה החדשה?
      </h2>
      <p className="text-sm mb-10 max-w-md mx-auto leading-7" style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}>
        בואו לחנות שלנו, נייעץ לכם בחינם ונמצא יחד את המכונה המושלמת
        עם <span style={{ color: "var(--gold)" }}>פולים טריים</span> ושירות מלא.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <motion.button
          data-cursor="pointer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="px-10 py-4 text-xs font-medium transition-colors duration-300"
          style={{ background: "var(--gold)", color: "var(--espresso)", minHeight: 48 }}
        >
          לקטלוג המכונות
        </motion.button>
        <motion.button
          data-cursor="pointer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="px-10 py-4 border text-xs transition-all duration-300 specs-cta-ghost"
          style={{ borderColor: "rgba(245,237,226,0.35)", color: "var(--cream)", minHeight: 48 }}
        >
          צרו קשר
        </motion.button>
      </div>
      <style>{`.specs-cta-ghost:hover { border-color: rgba(200,161,101,0.4) !important; color: var(--gold) !important; }`}</style>
    </motion.div>
  );
}
