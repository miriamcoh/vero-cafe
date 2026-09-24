import type { Metadata, Viewport } from "next";
import { Frank_Ruhl_Libre, Assistant, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "./LenisProvider";
import CustomCursor from "@/components/CustomCursor";

/* ─── Fonts ──────────────────────────────────────────────────────── */

const headingFont = Frank_Ruhl_Libre({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const bodyFont = Assistant({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

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

/* ─── Viewport / theme-color ─────────────────────────────────────── */
export const viewport: Viewport = {
  themeColor: "#0E0A08",
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
      // Inline bg prevents ANY white flash before the stylesheet is parsed
      style={{ backgroundColor: "#0E0A08" }}
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
