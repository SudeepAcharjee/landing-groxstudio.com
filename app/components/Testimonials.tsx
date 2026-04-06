"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Yomi Denzel",
    role: "E-Commerce 2.0",
    image: "/testimonial_people_grid_1775459683682.png",
    description: "The creative impact Grox Studio brought to our e-commerce platform was immediate. Their design team understands how to scale brands without the typical overhead.",
    color: "from-blue-600/20 to-indigo-600/20"
  },
  {
    id: 2,
    name: "Timothée Moiroux",
    role: "Investissement Immobillier",
    image: "/testimonial_people_2_1775459727256.png",
    description: "Transitioning our real estate portfolio to a premium digital experience was handled flawlessly. They've perfected the balance of aesthetics and functionality.",
    color: "from-indigo-600/20 to-purple-600/20"
  },
  {
    id: 3,
    name: "David Sequiera",
    role: "Closing",
    image: "/testimonial_people_grid_1775459683682.png",
    description: "Exceptional design that strategically aligns with business goals. They didn't just make things look good; they helped us close more deals with better UX.",
    color: "from-purple-600/20 to-pink-600/20"
  },
  {
    id: 4,
    name: "Manuel Ravier",
    role: "Investissement Immobillier",
    image: "/testimonial_people_2_1775459727256.png",
    description: "Grox Studio is the partner you need when you're at the top of your game. Their work speaks for itself—modern, cinematic, and incredibly effective.",
    color: "from-pink-600/20 to-rose-600/20"
  },
];

export default function Testimonials() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      setScrollProgress(progress);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth / 2 : clientWidth / 2;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-black py-32 px-6 md:px-12 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] bg-[radial-gradient(circle_at_center,rgba(0,102,255,0.03)_0%,transparent_70%)] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <h2 className="text-white text-4xl md:text-6xl font-light tracking-tight leading-[1.2] max-w-3xl">
            Partnered with most of the <br />
            <span className="font-serif italic bg-gradient-to-r from-[#0066FF] to-blue-400 bg-clip-text text-transparent italic">
              top people at each industry
            </span>
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          {/* Navigation Arrows */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-20 w-12 h-12 rounded-full border border-white/10 bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#0066FF] transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
             onClick={() => scroll('right')}
             className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-20 w-12 h-12 rounded-full border border-white/10 bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#0066FF] transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Cards Scrollable Row */}
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-10"
            style={{ scrollbarWidth: 'none' }}
          >
            {TESTIMONIALS.map((item) => (
              <motion.div
                key={item.id}
                className="flex-none w-[280px] md:w-[320px] aspect-[3/4] rounded-[24px] overflow-hidden bg-zinc-900 border border-white/5 relative group/card snap-center cursor-pointer"
              >
                {/* Default State: Portrait with Backdrop */}
                <div className="absolute inset-0 z-0">
                  <div className={`absolute inset-0 bg-gradient-to-b ${item.color} z-0`} />
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    fill 
                    className="object-cover object-top z-10 transition-transform duration-700 group-hover/card:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-20" />
                </div>

                {/* Info Text (Always visible at bottom) */}
                <div className="absolute bottom-0 left-0 right-0 p-8 z-30 transition-all duration-500 group-hover/card:translate-y-[-20px]">
                  <h3 className="text-white text-xl md:text-2xl font-semibold mb-1">{item.name}</h3>
                  <p className="text-white/40 text-xs uppercase tracking-widest">{item.role}</p>
                </div>

                {/* Hover State: Grid & Description */}
                <div className="absolute inset-0 bg-[#0066FF] translate-y-full group-hover/card:translate-y-0 transition-transform duration-500 z-40 p-10 flex flex-col justify-center">
                  {/* Grid Pattern Background */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none" 
                    style={{ 
                      backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                      backgroundSize: '40px 40px'
                    }} 
                  />
                  
                  <div className="relative z-10">
                    <h3 className="text-white text-2xl font-bold mb-4">{item.name}</h3>
                    <p className="text-white/40 text-xs uppercase tracking-widest mb-6">{item.role}</p>
                    <p className="text-white/90 text-sm md:text-base leading-relaxed line-clamp-6">
                      "{item.description}"
                    </p>
                  </div>

                  {/* Play Button Icon for 'Video' Feel (as requested) */}
                  <div className="mt-8 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                        <path d="M13 7L1 13V1L13 7Z" />
                      </svg>
                    </div>
                    <span className="text-white text-xs font-medium uppercase tracking-widest">Play Testimonial</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-12 max-w-md mx-auto h-[1px] bg-white/10 relative overflow-hidden">
          <motion.div 
            className="absolute left-0 top-0 bottom-0 bg-[#0066FF] transition-all duration-300"
            style={{ width: `${Math.max(25, scrollProgress)}%` }}
          />
        </div>
      </div>
    </section>
  );
}
