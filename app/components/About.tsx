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
      className="relative bg-black py-10 px-6 md:px-12 md:pt-20 pt-10 flex flex-col items-center justify-center text-center overflow-hidden min-h-screen"
    >
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center gap-12 w-full">
        
        {/* Welcome Pill */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={isInView ? { opacity: 1, scale: 1 } : {}}
           transition={{ duration: 0.6 }}
           className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
        >
          <span className="text-white/60 text-xs md:text-sm font-light tracking-wide">
            About <span className="text-white font-medium">Grox Studio</span>
          </span>
        </motion.div>

        {/* Large Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center gap-4 max-w-4xl"
        >
          <h2 className="text-white text-4xl md:text-6xl font-light tracking-tight leading-[1] text-balance">
            Scale Your Brand Impact <br />
            Without <span className="relative inline-flex items-center gap-4">
              Complexity
            </span>
          </h2>
          
          <p className="text-white/50 text-base md:text-lg max-w-xl leading-relaxed mt-6">
            Partner with us to amplify your brand presence with Grox Studio.
          </p>
        </motion.div>

        {/* Founder Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          style={{ width: videoWidth }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative w-full h-[300px] md:h-[500px] lg:h-[650px] mt-12 group/card mx-auto"
        >
          {/* Image Block */}
          <div className="w-full h-full rounded-[32px] md:rounded-[48px] overflow-hidden border border-white/10 relative shadow-[0_0_80px_rgba(0,0,0,0.5)]">
            <Image
              src="/founder_about_section_1775458582082.png"
              alt="Grox Studio Founder"
              fill
              className="object-cover transition-transform duration-[2000ms] group-hover/card:scale-105"
            />
            
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
            
          </div>

        </motion.div>
      </div>
    </section>
  );
}

