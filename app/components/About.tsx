"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  const videoWidth = useTransform(scrollYProgress, [0, 1], ["50%", "100%"]);

  return (
    <section
      id="about"
      ref={containerRef}
      style={{ position: "relative" }}
      className="bg-black px-2 md:px-12 pt-10 flex flex-col items-center justify-start md:justify-center text-center overflow-hidden min-h-fit md:min-h-screen pb-10 md:pb-30"
    >
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center gap-12 w-full">

        {/* Large Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center w-full max-w-6xl"
        >
          <h2 className="text-white text-[1.75rem] xs:text-[2rem] md:text-[3.5rem] leading-[1.1] font-medium tracking-[-1px] text-balance">
            About us
          </h2>
          
          <div className="flex flex-col gap-6 mt-8 w-full max-w-5xl text-center">
            <p className="text-[1.125rem] md:text-[1.25rem] text-white/70 tracking-tight leading-relaxed">
              We started Grox Studio because we kept seeing the same thing — good businesses stuck with bad results. A freelancer who went quiet. An agency that looked great on calls but delivered nothing real. So we built the team we wish existed.
            </p>
            <p className="text-[1.125rem] md:text-[1.25rem] text-white/70 tracking-tight leading-relaxed">
              At Grox Studio, we help founders build their MVP, take their business online, and grow their brand — all in one place. No handoffs. No confusion. No chasing 5 different people for 5 different things.
            </p>
            <p className="text-[1.125rem] md:text-[1.25rem] text-white/70 tracking-tight leading-relaxed font-medium text-white/90">
              We work like your in-house team. We learn your business, think about your growth, and execute like we have skin in the game.
            </p>
          </div>
        </motion.div>

        {/* Founder Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          style={{ width: videoWidth }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative w-full aspect-video mt-12 mx-auto rounded-[32px] md:rounded-[48px] shadow-[0_0_100px_rgba(0,102,255,0.6)]"
        >
          {/* Dedicated overflow masking layer to squash browser clipping artifacts */}
          <div className="absolute inset-0 w-full h-full overflow-hidden rounded-[32px] md:rounded-[48px] p-[1.5px] isolate transform-gpu">
            {/* Static subtle border base */}
            <div className="absolute inset-0 bg-[#0066FF]/20 z-0" />
            
            {/* Animated Blue Gradient Border Layer (Comet Trail) */}
            <div className="absolute inset-[-100%] z-0 bg-[conic-gradient(from_0deg_at_50%_50%,#0066ff00_0%,#0066ff00_50%,#0066FF_100%)] animate-[spin_6s_linear_infinite]" />
            
            {/* Image Container */}
            <div className="w-full h-full rounded-[30.5px] md:rounded-[46.5px] overflow-hidden relative z-10" style={{ position: "relative" }}>
              <Image
                src="/logos/gwbe.png"
                alt="About background"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                quality={70}
                className="object-contain"
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

