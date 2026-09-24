"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Only activate on pointer:fine (desktop/trackpad) devices
    if (!window.matchMedia("(pointer: fine)").matches) return;
    // Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setReady(true);

    let mouseX = -200, mouseY = -200;
    let ringX  = -200, ringY  = -200;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0)`;
      }
    };

    const loop = () => {
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate3d(${ringX - 14}px, ${ringY - 14}px, 0)`;
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    // Grow ring on interactive elements
    const onEnter = () => ringRef.current?.classList.add("cursor-hover");
    const onLeave = () => ringRef.current?.classList.remove("cursor-hover");

    window.addEventListener("mousemove", onMove, { passive: true });

    const attachHover = () => {
      document
        .querySelectorAll("a, button, [role='button'], [data-cursor='pointer']")
        .forEach((el) => {
          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onLeave);
        });
    };
    attachHover();

    // Re-attach on DOM mutations (dynamic elements)
    const observer = new MutationObserver(attachHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
    };
  }, []);

  if (!ready) return null;

  return (
    <>
      {/* Dot — snaps to mouse position instantly */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "var(--cream)",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
          willChange: "transform",
        }}
      />

      {/* Ring — lags behind for soft inertia effect */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="cursor-ring"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 28,
          height: 28,
          borderRadius: "50%",
          border: "1px solid rgba(200,161,101,0.65)",
          pointerEvents: "none",
          zIndex: 9998,
          willChange: "transform",
          transition: "width 0.22s ease, height 0.22s ease, border-color 0.22s ease, background 0.22s ease",
        }}
      />

      <style>{`
        .cursor-ring.cursor-hover {
          width: 50px !important;
          height: 50px !important;
          border-color: rgba(200,161,101,0.9) !important;
          background: rgba(200,161,101,0.06);
          margin: -11px;
        }
      `}</style>
    </>
  );
}
