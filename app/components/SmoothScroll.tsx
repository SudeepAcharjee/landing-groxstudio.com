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
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      // Periodically update lenis to ensure it catches any height changes from dynamic content
      const interval = setInterval(() => {
        lenis.emit();
      }, 1000);

      window.addEventListener('resize', () => {
        lenis.resize();
      });

      return () => {
        clearInterval(interval);
        lenis.destroy();
      };
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
