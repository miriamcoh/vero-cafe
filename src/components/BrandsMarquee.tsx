"use client";

const BRANDS = [
  "ECM",
  "EUREKA",
  "BIALETTI",
  "VICTORIA ARDUINO",
  "NUOVA SIMONELLI",
  "BEEM",
  "REMIDAG",
  "BRAVILOR",
  "CREMA PRO",
  "LOISON",
  "VILLAGE CANDLE",
];

export default function BrandsMarquee() {
  return (
    <section
      dir="ltr"
      style={{
        background: "var(--espresso)",
        borderTop: "1px solid var(--layer-2)",
        borderBottom: "1px solid var(--layer-2)",
        padding: "22px 0",
        overflow: "hidden",
      }}
    >
      <div className="marquee-track">
        {/* Duplicate twice for seamless loop */}
        {[0, 1].map((pass) => (
          <div key={pass} className="marquee-inner" aria-hidden={pass === 1}>
            {BRANDS.map((brand) => (
              <span key={brand} className="marquee-brand">
                {brand}
                <span className="marquee-sep">·</span>
              </span>
            ))}
          </div>
        ))}
      </div>

      <style>{`
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-scroll 40s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-inner {
          display: flex;
          align-items: center;
          gap: 0;
          flex-shrink: 0;
        }
        .marquee-brand {
          font-family: var(--font-latin);
          font-style: italic;
          font-weight: 300;
          font-size: 13px;
          color: rgba(200,161,101,0.35);
          white-space: nowrap;
          padding: 0 8px;
          transition: color 0.3s ease;
          cursor: default;
        }
        .marquee-brand:hover {
          color: var(--cream);
        }
        .marquee-sep {
          margin-left: 8px;
          color: rgba(200,161,101,0.18);
          font-style: normal;
        }
      `}</style>
    </section>
  );
}
