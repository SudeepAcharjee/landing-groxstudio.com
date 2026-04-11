"use client";

import { useEffect } from "react";
import Script from "next/script";

export default function SmoothScroll() {
  useEffect(() => {
    const startLenis = () => {
      // @ts-ignore
      const lenis = new window.Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    };

    // @ts-ignore
    if (window.Lenis) {
      startLenis();
    } else {
      window.addEventListener('lenis-ready', startLenis);
    }

    return () => {
      window.removeEventListener('lenis-ready', startLenis);
    };
  }, []);

  return (
    <Script 
      src="https://unpkg.com/lenis@1.1.18/dist/lenis.min.js" 
      strategy="afterInteractive"
      onLoad={() => {
        window.dispatchEvent(new Event('lenis-ready'));
      }}
    />
  );
}
