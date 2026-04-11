"use client";

import Image from "next/image";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const BRANDS = [
  "/images/Brands/Logo1.png",
  "/images/Brands/Logo2.png",
  "/images/Brands/Logo3.png",
  "/images/Brands/Logo4.png",
  "/images/Brands/Logo5.png",
  "/images/Brands/Logo6.png",
  "/images/Brands/Logo7.png",
  "/images/Brands/Logo9.png",
  "/images/Brands/Logo10.png",
  "/images/Brands/Logo11.png",
  "/images/Brands/Logo12.png",
  "/images/Brands/Logo13.png",
  "/images/Brands/Logo15.png",
  "/images/Brands/Logo16.png",
  "/images/Brands/Logo17.png",
  "/images/Brands/Logo18.png",
  "/images/Brands/Logo19.png",
  "/images/Brands/Logo20.png",
];

export default function BrandLogos() {
  return (
    <section className={`relative bg-black pt-10 md:pt-20 pb-10 md:pb-20 overflow-hidden ${poppins.className}`}>
      <div className="relative z-10 max-w-screen-2xl mx-auto">
        <h2 className="text-center text-xl md:text-3xl mb-8 md:mb-8 tracking-tight px-4 text-white">
          Trusted By
        </h2>

        {/* Unified Infinite horizontal scroll for all screens */}
        <style>{`
          @keyframes marquee-slide {
            from { transform: translateX(0%); }
            to { transform: translateX(-50%); }
          }
          .animate-marquee-slide {
            animation: marquee-slide 30s linear infinite;
          }
        `}</style>
        <div className="w-full overflow-hidden relative group">
          <div className="flex w-max items-center will-change-transform animate-marquee-slide group-hover:[animation-play-state:paused]">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-16 md:gap-32 pr-16 md:pr-32 shrink-0 items-center">
                {BRANDS.map((src, idx) => (
                  <div
                    key={`${i}-${idx}`}
                    className="flex items-center justify-center h-8 sm:h-10 md:h-14 w-24 sm:w-28 md:w-40 px-2 sm:px-4 shrink-0"
                  >
                    <Image
                      src={src}
                      alt="Brand Logo"
                      width={160}
                      height={64}
                      quality={50}
                      className="max-h-full max-w-full object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
