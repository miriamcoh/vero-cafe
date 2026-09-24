"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface Props {
  onDone: () => void;
}

export default function LoadingScreen({ onDone }: Props) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setExiting(true);
            setTimeout(onDone, 600);
          }, 200);
          return 100;
        }
        // Accelerate toward 100 with a stall near the end (waits for canvas)
        const step = p < 70 ? 3 : p < 90 ? 1.5 : 0.5;
        return Math.min(100, p + step);
      });
    }, 25);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            background: "var(--espresso)",
            zIndex: 9500,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 36,
          }}
        >
          {/* Brand mark */}
          <div style={{ textAlign: "center", direction: "ltr" }}>
            <p
              className="eyebrow-latin"
              style={{ color: "var(--gold)", fontSize: 13, marginBottom: 10 }}
            >
              VERO CAFE
            </p>
            <p
              style={{
                color: "var(--muted)",
                fontSize: 10,
                fontFamily: "var(--font-latin)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              IMPORTATORE ESCLUSIVO &middot; ITALIA
            </p>
          </div>

          {/* Espresso-fill progress bar */}
          <div
            style={{
              width: 140,
              height: 1,
              background: "var(--layer-2)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <motion.div
              animate={{ scaleX: progress / 100 }}
              transition={{ duration: 0.05, ease: "linear" }}
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(to right, var(--copper), var(--gold))`,
                transformOrigin: "left",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
