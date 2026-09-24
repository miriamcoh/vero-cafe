import type { Metadata } from "next";
import { Frank_Ruhl_Libre, Assistant, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "./LenisProvider";
import CustomCursor from "@/components/CustomCursor";

/* ─── Fonts ──────────────────────────────────────────────────────── */

// Headline font: elegant Hebrew serif for large display text
const headingFont = Frank_Ruhl_Libre({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "700"],
  variable: "--font-heading",
  display: "swap",
});

// Body font: clean, legible Hebrew sans-serif for body copy
const bodyFont = Assistant({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400"],
  variable: "--font-body",
  display: "swap",
});

// Latin display font: Cormorant Garamond for brand names and eyebrow labels
const latinFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-latin",
  display: "swap",
});

/* ─── Metadata ───────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "CAFFÈ VERO | יבואן בלעדי — קפה איטלקי, מכונות ומטחנות",
  description:
    "אמניזיה יבוא ושיווק — יבואן בלעדי של CAFFÈ VERO בישראל. מכונות קפה, מטחנות, פולי קפה, קפסולות, Bialetti ועוד.",
  openGraph: {
    title: "CAFFÈ VERO | יבואן בלעדי בישראל",
    description:
      "אמניזיה יבוא ושיווק — יבואן בלעדי של CAFFÈ VERO בישראל. מכונות, מטחנות, פולי קפה, קפסולות ועוד.",
    locale: "he_IL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CAFFÈ VERO | יבואן בלעדי בישראל",
    description: "אמניזיה יבוא ושיווק — יבואן בלעדי של CAFFÈ VERO בישראל.",
  },
};

/* ─── Root layout ────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${headingFont.variable} ${bodyFont.variable} ${latinFont.variable} h-full`}
    >
      <body className="min-h-full antialiased">
        <LenisProvider>
          <CustomCursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
