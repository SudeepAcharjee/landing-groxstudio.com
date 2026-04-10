"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Yomi Denzel",
    role: "E-Commerce 2.0",
    video: "https://www.w3schools.com/html/mov_bbb.mp4", // Replace with real video URL
    image: "/images/lillyen.png"
  },
  {
    id: 2,
    name: "Timothée Moiroux",
    role: "Investissement Immobillier",
    video: "https://www.w3schools.com/html/mov_bbb.mp4", // Replace with real video URL
    image: "/images/lillyen.png"
  },
  {
    id: 3,
    name: "David Sequiera",
    role: "Closing",
    video: "https://www.w3schools.com/html/mov_bbb.mp4", // Replace with real video URL
    image: "/images/lillyen.png"
  },
  {
    id: 4,
    name: "Manuel Ravier",
    role: "Investissement Immobillier",
    video: "https://www.w3schools.com/html/mov_bbb.mp4", // Replace with real video URL
    image: "/images/lillyen.png"
  },
];

const TestimonialVideoCard = ({ item }: { item: any }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Attempt autoplay safely
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be blocked by the browser if not muted, but we are muted by default.
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="flex-none w-[260px] md:w-[320px] aspect-[9/16] rounded-3xl overflow-hidden bg-[#111] border border-white/5 relative group shrink-0 shadow-2xl py-10 px-6 md:px-12 md:pt-20 pt-10">
      <video
        ref={videoRef}
        src={item.video}
        loop
        playsInline
        muted={isMuted} // Muted by default so autoplay works everywhere
        poster={item.image}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      
      {/* Bottom Gradient for Text Legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

      {/* Info Content */}
      <div className="absolute bottom-16 left-4 right-4 z-20 pointer-events-none">
         <h3 className="text-white text-lg font-bold shadow-black drop-shadow-md">{item.name}</h3>
         <p className="text-white/70 text-[10px] uppercase tracking-widest font-semibold">{item.role}</p>
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-30">
        <button
          onClick={togglePlay}
          className="px-4 py-2.5 bg-black/50 hover:bg-black/80 border border-white/10 backdrop-blur-md rounded-xl text-[10px] font-bold tracking-widest text-[#e0e0e0] transition-colors"
        >
          {isPlaying ? 'PAUSE' : 'PLAY'}
        </button>
        <button
          onClick={toggleMute}
          className="px-4 py-2.5 bg-black/50 hover:bg-black/80 border border-white/10 backdrop-blur-md rounded-xl text-[10px] font-bold tracking-widest text-[#e0e0e0] transition-colors"
        >
          {isMuted ? 'SOUND OFF' : 'SOUND ON'}
        </button>
      </div>
    </div>
  );
};

export default function Testimonials() {
  // We duplicate the array to allow infinite seamless marquee scrolling
  const scrollItems = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="bg-black py-10 px-6 md:px-12 md:pt-20 pt-10 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] bg-[radial-gradient(circle_at_center,rgba(0,102,255,0.03)_0%,transparent_70%)] pointer-events-none z-0" />

      {/* Embedded Style for Marquee Animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-[100vw] mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20 px-6">
          <h2 className="text-white text-4xl md:text-6xl font-light tracking-tight leading-[1.2] max-w-3xl">
            Partnered with most of the <br />
            <span className="font-serif italic bg-gradient-to-r from-[#0066FF] to-white bg-clip-text text-transparent">
              top people at each industry
            </span>
          </h2>
        </div>

        {/* Endless Marquee Carousel */}
        <div className="relative w-full overflow-hidden flex items-center">
          
          {/* Subtle fade edges for the carousel */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

          {/* Scrolling Track */}
          <div className="flex animate-marquee gap-6 sm:gap-8 px-6 min-w-max pb-10">
            {scrollItems.map((item, idx) => (
              <TestimonialVideoCard key={`${item.id}-${idx}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
