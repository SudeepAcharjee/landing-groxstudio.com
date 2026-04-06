"use client";

import React, { useRef, useState } from "react";
import { useScroll, useMotionValueEvent, motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ChevronsRight } from "lucide-react";

interface StickyScrollItem {
  id?: string;
  title: string;
  description: string;
  image: string;
  color?: string;
}

interface StickyScrollProps {
  content: StickyScrollItem[];
  containerClassName?: string;
}

export const StickyScroll = ({ content, containerClassName }: StickyScrollProps) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Determine which card is currently active based on scroll progress
    const cardsBreakpoints = content.map((_, index) => index / content.length);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  return (
    <div 
      ref={ref} 
      className={cn("relative flex w-full max-w-7xl mx-auto px-6 lg:px-12 items-start justify-between gap-10 lg:gap-24", containerClassName)}
    >
      {/* Static Background Glow */}
      <div 
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] blur-[150px] rounded-full pointer-events-none z-0 opacity-[0.05]"
        style={{ backgroundColor: "#0066FF" }} 
      />

      {/* Left: Scrollable Text List */}
      <div className="w-full lg:w-1/2 relative z-10">
        <div className="py-[30vh]">
          {content.map((item, index) => (
            <div key={item.title + index} className="mb-32 lg:mb-40 last:mb-0">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl font-light tracking-tight text-white mb-6"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                transition={{ duration: 0.5 }}
                className="text-base md:text-lg text-white/50 leading-relaxed max-w-md mb-8"
              >
                {item.description}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, height: 0, overflow: "hidden" }}
                animate={{
                  opacity: activeCard === index ? 1 : 0,
                  height: activeCard === index ? "auto" : 0,
                }}
                transition={{ duration: 0.4 }}
              >
                 <button className="group relative flex items-center justify-between bg-white/[0.03] border border-white/10 hover:border-[#0066FF]/30 p-1.5 rounded-full transition-colors duration-500 overflow-hidden w-fit md:min-w-[160px] h-12 mt-4 px-3 md:px-1.5">
                   <div className="absolute left-1.5 top-1.5 bottom-1.5 w-9 bg-[#0066FF] rounded-full group-hover:w-[calc(100%-12px)] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] z-0 shadow-[0_0_20px_rgba(0,102,255,0.3)]" />
                   <div className="relative z-10 flex items-center w-full gap-3">
                       <div className="flex items-center justify-center w-9 h-9 rounded-full overflow-hidden transition-all duration-500">
                           <ChevronsRight className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-500 mr-2 md:mr-0" />
                       </div>
                       <div className="flex-1 text-center pr-3">
                           <span className="text-white text-sm font-semibold tracking-tight select-none">
                               View Deatils
                           </span>
                       </div>
                   </div>
                 </button>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Sticky Image Gallery representing the active card */}
      <div className="hidden lg:block w-1/2 sticky top-[20vh] h-[60vh] rounded-[32px] overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.4)] z-10 bg-black/50">
         <AnimatePresence mode="wait">
            <motion.div
              key={activeCard}
              initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={content[activeCard].image}
                alt={content[activeCard].title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
            </motion.div>
          </AnimatePresence>
          
          {/* Static Project Color Accent Overlay */}
          <div 
            className="absolute inset-0 pointer-events-none z-20 opacity-30"
            style={{ 
              background: `radial-gradient(circle at bottom right, rgba(0, 102, 255, 0.2), transparent 50%)` 
            }}
          />
      </div>
    </div>
  );
};
