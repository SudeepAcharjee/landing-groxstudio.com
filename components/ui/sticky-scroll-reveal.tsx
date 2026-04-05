"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

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
  header?: React.ReactNode;
}

export const StickyScroll = ({ content, containerClassName, header }: StickyScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Total scroll length is based on items
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate the y-translation for the scrolling text column
  // We move the list from 0 to - (N-1) * 100%
  const textY = useTransform(
    scrollYProgress, 
    [0, 1], 
    ["0%", `-${(content.length - 1) * 100.5}%`] // Small offset adjustment for precision
  );

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Calculate the approximate index based on scroll progress
      // Increase sensitivity by multiplying with content.length
      const index = Math.min(
        Math.floor(latest * content.length * 1.01), 
        content.length - 1
      );
      if (index !== activeIndex && index >= 0) {
        setActiveIndex(index);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, activeIndex, content.length]);

  return (
    <div 
      ref={containerRef} 
      className={cn("relative w-full", containerClassName)}
      style={{ height: `${content.length * 100}vh` }}
    >
      {/* Background Glow */}
      <div 
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] blur-[150px] rounded-full opacity-10 transition-colors duration-1000 pointer-events-none z-0"
        style={{ backgroundColor: content[activeIndex]?.color || "#0066FF" }} 
      />

      {/* Sticky Container (Pinned Section) */}
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full h-full flex flex-col justify-center relative z-10">
          
          {/* Header (Pinned as part of the sticky container) */}
          {header && (
            <div className="absolute top-12 left-6 md:left-12 z-20">
              {header}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center w-full">
            
            {/* Left: 'Scrolling' Text Column */}
            <div className="relative h-[400px] md:h-[500px] flex flex-col justify-center overflow-hidden order-2 lg:order-1 pt-20 lg:pt-0">
              <motion.div 
                style={{ y: textY }}
                className="flex flex-col"
              >
                {content.map((item, index) => (
                  <div 
                    key={index} 
                    className="h-[400px] md:h-[500px] flex flex-col justify-center gap-6"
                  >
                     {item.id && (
                      <span className={cn(
                        "font-bold text-7xl md:text-[8rem] leading-none tracking-tighter select-none transition-all duration-700",
                        activeIndex === index ? "text-white/25" : "text-white/5 opacity-40 blur-[1px]"
                      )}>
                        {item.id}
                      </span>
                    )}
                    
                    <h2 className={cn(
                      "text-white text-5xl md:text-7xl font-light tracking-tight leading-[0.9] transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]",
                      activeIndex === index ? "opacity-100 translate-x-0" : "opacity-20 -translate-x-8 blur-[2px]"
                    )}>
                      {item.title}
                    </h2>
                    
                    <p className={cn(
                      "text-white/60 text-lg md:text-xl max-w-md leading-relaxed transition-all duration-1000 delay-100 ease-[cubic-bezier(0.23,1,0.32,1)] mt-2",
                      activeIndex === index ? "opacity-100 translate-x-0 scale-100" : "opacity-10 -translate-x-4 scale-95 blur-[1px]"
                    )}>
                      {item.description}
                    </p>

                    <div 
                      className="h-1 w-24 rounded-full transition-all duration-1000 ease-in-out"
                      style={{ 
                        backgroundColor: item.color || "#0066FF",
                        width: activeIndex === index ? 96 : 0,
                        opacity: activeIndex === index ? 1 : 0
                      }}
                    />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: Fixed/Pinned Image Column */}
            <div className="relative w-full aspect-[4/3] lg:aspect-[1/1] xl:aspect-[4/3] rounded-[48px] overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.5)] bg-[#0a0a0a] order-1 lg:order-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 1.15, filter: "blur(25px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.05, filter: "blur(25px)" }}
                  transition={{ 
                    duration: 0.8, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={content[activeIndex].image}
                    alt={content[activeIndex].title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
                </motion.div>
              </AnimatePresence>
              
              {/* Decorative Glow based on project color */}
              <div 
                className="absolute inset-0 rounded-[48px] border-[1.5px] border-white/10 pointer-events-none z-20 transition-colors duration-1000"
                style={{ boxShadow: `inset 0 0 60px ${content[activeIndex].color || "#0066FF"}15` }}
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
