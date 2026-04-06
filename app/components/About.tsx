"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative bg-black py-24 px-6 md:px-12 flex flex-col items-center justify-center text-center overflow-hidden min-h-screen"
    >
      {/* Background Radial Glow - More subtle for better blending */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[100vh] bg-[radial-gradient(circle_at_center,rgba(0,255,102,0.05)_0%,transparent_60%)] pointer-events-none z-0" />
      
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center gap-12 w-full">
        
        {/* Welcome Pill */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={isInView ? { opacity: 1, scale: 1 } : {}}
           transition={{ duration: 0.6 }}
           className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
        >
          <span className="text-white/60 text-xs md:text-sm font-light tracking-wide">
            Welcome to <span className="text-white font-medium">Grox Studio</span>
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
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-[14px] bg-white flex items-center justify-center p-2.5">
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4V20M12 4L8 8M12 4L16 8" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </span>
          </h2>
          
          <p className="text-white/50 text-base md:text-lg max-w-lg leading-relaxed mt-6">
            Partner with elite creative talent to amplify your brand presence with Grox Studio. High-fidelity design made accessible.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 px-8 py-3.5 bg-white text-black rounded-full font-semibold flex items-center gap-3 group transition-colors hover:bg-[#00ffd9]"
          >
            Start now
            <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-white">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-0.5 transition-transform">
                <path d="M2 6H10M10 6L6 2M10 6L6 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </motion.button>
        </motion.div>

        {/* Founder Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative w-full max-w-5xl aspect-[16/9] mt-12 group/card"
        >
          {/* Side Neon Glows - More subtle */}
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-[#00FF66] blur-[150px] opacity-[0.05] pointer-events-none group-hover/card:opacity-10 transition-opacity duration-1000" />
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#00FF66] blur-[150px] opacity-[0.05] pointer-events-none group-hover/card:opacity-10 transition-opacity duration-1000" />

          {/* Floating Founder Badge */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 px-6 py-2.5 rounded-full border border-white/10 bg-black/60 shadow-xl backdrop-blur-md flex items-center gap-4 min-w-[280px]">
            <div className="w-10 h-10 rounded-full bg-[#00FF66]/20 border border-[#00FF66]/40 flex items-center justify-center overflow-hidden">
               <Image 
                  src="/founder_about_section_1775458582082.png" 
                  alt="Founder" 
                  width={40} 
                  height={40} 
                  className="object-cover"
               />
            </div>
            <div className="text-left">
              <div className="text-white text-sm font-semibold tracking-wide">Pranjeet</div>
              <div className="text-white/40 text-[10px] md:text-xs uppercase tracking-widest font-light">Founder and CEO of Grox Studio</div>
            </div>
          </div>

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
            
            <div className="absolute inset-0 border-[1.5px] border-white/10 pointer-events-none rounded-[32px] md:rounded-[48px] box-border" />
          </div>

        </motion.div>
      </div>
    </section>
  );
}

