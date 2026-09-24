import Link from "next/link";

export default function NotFound() {
  return (
    <main
      dir="rtl"
      style={{
        background: "var(--espresso)",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ghost watermark */}
      <p
        aria-hidden
        style={{
          position: "absolute",
          fontFamily: "var(--font-latin)",
          fontSize: "clamp(8rem, 28vw, 20rem)",
          fontWeight: 400,
          color: "rgba(200,161,101,0.04)",
          userSelect: "none",
          pointerEvents: "none",
          lineHeight: 1,
          letterSpacing: "-0.04em",
        }}
      >
        404
      </p>

      <div style={{ position: "relative", zIndex: 1 }}>
        <p
          style={{
            fontFamily: "var(--font-latin)",
            fontSize: 10,
            letterSpacing: "0.2em",
            color: "rgba(200,161,101,0.5)",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          CAFFÈ VERO
        </p>

        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(1.8rem, 5vw, 3.2rem)",
            fontWeight: 500,
            color: "var(--cream)",
            lineHeight: 1.2,
            marginBottom: 16,
          }}
        >
          הדף לא נמצא
        </h1>

        <div
          style={{
            width: 32, height: 1,
            background: "rgba(200,161,101,0.4)",
            margin: "0 auto 24px",
          }}
        />

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(12px, 1.2vw, 14px)",
            color: "var(--muted)",
            lineHeight: 1.8,
            marginBottom: 40,
            maxWidth: 340,
          }}
        >
          נראה שהדף שחיפשתם לא כאן — אבל הקפה שלנו בהחלט כן.
        </p>

        <Link
          href="/"
          data-cursor="pointer"
          style={{
            display: "inline-block",
            border: "1px solid rgba(200,161,101,0.4)",
            color: "var(--gold)",
            fontFamily: "var(--font-body)",
            fontSize: 13,
            padding: "14px 32px",
            textDecoration: "none",
            transition: "background 0.3s ease, color 0.3s ease",
          }}
        >
          חזרה לדף הבית
        </Link>
      </div>
    </main>
  );
}
