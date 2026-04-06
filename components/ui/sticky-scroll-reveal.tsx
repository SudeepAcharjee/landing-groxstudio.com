"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);


  // Calculate the active index based on raw scroll position
  useEffect(() => {
    const container = containerRef.current;
    const pin = pinRef.current;
    if (!container || !pin) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        pin: pin,
        pinSpacing: true,
        scrub: true,
        onUpdate: (self) => {
          // Update the active index for image and text changes
          const rawProgress = self.progress;
          const index = Math.min(
            Math.floor(rawProgress * content.length * 1.01), 
            content.length - 1
          );
          if (index >= 0 && index !== activeIndex) {
            setActiveIndex(index);
          }
        }
      });
    });

    return () => ctx.revert();
  }, [content.length, activeIndex]);

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

      {/* Sticky Container (Pinned Section via GSAP) */}
      <div ref={pinRef} className="h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-1 w-full relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center w-full">
            
            {/* Left: Synchronized Text Column */}
            <div className="relative h-[320px] md:h-[400px] flex flex-col justify-center overflow-hidden order-2 lg:order-1">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeIndex}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ 
                    duration: 0.6, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  className="flex flex-col gap-4"
                >
                    <h2 className="text-white text-4xl md:text-6xl font-light tracking-tight leading-[1]">
                      {content[activeIndex].title}
                    </h2>
                    
                    <p className="text-white/50 text-base md:text-lg max-w-md leading-relaxed">
                      {content[activeIndex].description}
                    </p>

                    <button
                      className="flex items-center gap-3 text-white font-semibold text-sm group/btn mt-2"
                    >
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover/btn:bg-[#0066FF] group-hover/btn:border-transparent transition-all duration-500">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-500 group-hover/btn:rotate-45">
                          <path d="M4.5 13.5L13.5 4.5M13.5 4.5H6.75M13.5 4.5V11.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span>View Case Study</span>
                    </button>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Fixed/Pinned Image Column */}
            <div className="relative w-full aspect-square mt-20 overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.5)] bg-[#0a0a0a] order-1 lg:order-2 group/img">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
                  transition={{ 
                    duration: 0.7, 
                    ease: [0.19, 1, 0.22, 1] 
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={content[activeIndex].image}
                    alt={content[activeIndex].title}
                    fill
                    className="object-cover group-hover/img:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                </motion.div>
              </AnimatePresence>
              
              {/* Project Color Accent Overlay */}
              <div 
                className="absolute inset-0 pointer-events-none z-20 transition-all duration-1000 opacity-30"
                style={{ 
                  background: `radial-gradient(circle at bottom right, ${content[activeIndex].color || "#0066FF"}33, transparent 70%)` 
                }}
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
