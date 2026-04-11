"use client";

import React, { useRef, useState } from "react";
import { useScroll, useMotionValueEvent, motion, AnimatePresence, useTransform, useSpring } from "framer-motion";
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
  header?: React.ReactNode;
}

export const StickyScroll = ({ content, containerClassName, header }: StickyScrollProps) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [itemHeight, setItemHeight] = useState(450);

  React.useEffect(() => {
    const handleResize = () => {
      setItemHeight(window.innerWidth < 1024 ? 300 : 450);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Calculate the y translation for the text scroll track
  // Responsive item height ensures alignment on mobile and desktop
  const yTranslate = useTransform(scrollYProgress, [0, 1], [0, -(content.length - 1) * itemHeight]);
  const smoothY = useSpring(yTranslate, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardIndex = Math.floor(latest * content.length);
    setActiveCard(Math.min(cardIndex, content.length - 1));
  });

  return (
    <div 
      ref={ref} 
      className={cn("relative w-full", containerClassName)}
      style={{ height: `${(content.length + 0.5) * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        {/* Static Background Glow */}
        <div 
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] blur-[150px] rounded-full pointer-events-none z-0 opacity-[0.05]"
          style={{ backgroundColor: "#0066FF" }} 
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full flex flex-col lg:flex-row items-center justify-start pt-16 lg:pt-0 lg:justify-between gap-10 lg:gap-24 relative z-10">
          {/* Mobile Image Gallery (Top) */}
          <div className="lg:hidden w-full relative h-[30vh] rounded-2xl overflow-hidden z-20 mb-4">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeCard}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0"
              >
                <Image
                  src={content[activeCard].image}
                  alt={content[activeCard].title}
                  fill
                  sizes="(max-width: 1023px) calc(100vw - 48px), 50vw"
                  className="object-cover"
                  quality={60}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Left Column: Vertical Sliding Content Track */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            {header && <div className="mb-8 lg:mb-12 relative z-30">{header}</div>}
            
            <div className="relative h-[300px] md:h-[450px] overflow-hidden mask-fade-y">
              <motion.div
                style={{ y: smoothY }}
                className="w-full"
              >
                {content.map((item, index) => (
                  <div 
                    key={index}
                    className="h-[300px] md:h-[450px] flex flex-col justify-center"
                  >
                    <motion.h2
                      animate={{
                        opacity: activeCard === index ? 1 : 0.1,
                        scale: activeCard === index ? 1 : 0.95,
                        filter: activeCard === index ? "blur(0px)" : "blur(4px)",
                      }}
                      className="text-white text-[1.75rem] xs:text-[2rem] md:text-[2.875rem] leading-[34px] xs:leading-[40px] md:leading-[50px] font-medium tracking-[-1px] text-balance mb-4 md:mb-6"
                    >
                      {item.title}
                    </motion.h2>
                    <motion.p
                      animate={{
                        opacity: activeCard === index ? 1 : 0.1,
                      }}
                      className="text-sm md:text-lg text-white/50 leading-relaxed max-w-md mb-6 md:mb-8"
                    >
                      {item.description}
                    </motion.p>
                    
                    <motion.div
                      animate={{
                        opacity: activeCard === index ? 1 : 0,
                        y: activeCard === index ? 0 : 20,
                      }}
                      className="flex justify-center lg:justify-start"
                    >
                      <button className="group relative flex items-center justify-between bg-transparent border border-[#0066FF]/40 hover:border-[#0066FF] p-1.5 rounded-full transition-colors duration-500 overflow-hidden w-fit md:min-w-[160px] h-10 md:h-12 mt-2 md:mt-4">
                        <div className="absolute left-1.5 top-1.5 bottom-1.5 w-7 md:w-9 bg-[#0066FF] rounded-full group-hover:w-[calc(100%-12px)] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] z-0 shadow-[0_0_20px_rgba(0,102,255,0.3)]" />
                        <div className="relative z-10 flex items-center w-full gap-2 md:gap-3">
                            <div className="flex items-center justify-center w-7 h-7 md:w-9 md:h-9 rounded-full overflow-hidden transition-all duration-500">
                                <ChevronsRight className="w-3 h-3 md:w-4 md:h-4 text-white group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="flex-1 text-center pr-2 md:pr-3">
                                <span className="text-white text-xs md:text-sm font-semibold tracking-tight select-none">
                                    View Details
                                </span>
                            </div>
                        </div>
                      </button>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Desktop Right Column: Content Gallery */}
          <div
            className="hidden lg:block w-1/2 relative h-[55vh] rounded-[32px] overflow-hidden z-10 lg:mt-30"
            style={{
              border: "1px solid rgba(0, 102, 255, 0.35)",
              boxShadow:
                "0 0 0 1px rgba(0,102,255,0.15), 0 0 30px 4px rgba(0,102,255,0.25), 0 0 80px 10px rgba(0,102,255,0.12)",
            }}
          >
            <AnimatePresence mode="popLayout">
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
                  sizes="50vw"
                  className="object-cover"
                  quality={60}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              </motion.div>
            </AnimatePresence>
            
            {/* Visual Accent */}
            <div 
              className="absolute inset-0 pointer-events-none z-20 opacity-30"
              style={{ 
                background: `radial-gradient(circle at bottom right, ${content[activeCard].color || "#0066FF"}33, transparent 50%)` 
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
