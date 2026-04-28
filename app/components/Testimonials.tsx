"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";

const VideoCard = ({ item }: { item: { id: string, src: string, poster: string } }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      className="flex-none w-[220px] sm:w-[260px] md:w-[300px] aspect-[9/16] rounded-3xl overflow-hidden relative group shrink-0"
      style={{
        border: "1px solid rgba(0,102,255,0.4)",
        boxShadow: "0 0 20px rgba(0,102,255,0.3), 0 0 40px rgba(0,102,255,0.1)",
      }}
    >
      <video
        ref={videoRef}
        src={item.src}
        loop
        playsInline
        muted
        poster={item.poster}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Play / Pause icon — center on hover */}
      <button
        onClick={togglePlay}
        className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        <div 
          className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center transition-all duration-300 border border-[#0066FF]/50 shadow-[0_0_20px_rgba(0,102,255,0.4)]"
        >
          {isPlaying ? (
            /* Pause icon */
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="blur-[1.5px]">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            /* Play icon */
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="blur-[1.5px]">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
        </div>
      </button>
    </div>
  );
};

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  
  const [videos, setVideos] = useState<{id: string, src: string, poster: string}[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const q = query(collection(db, "testimonials"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, src: doc.data().src, poster: doc.data().poster }));
        setVideos(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };
    fetchVideos();
  }, []);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (!trackRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
    trackRef.current.style.cursor = "grabbing";
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    trackRef.current.scrollLeft = scrollLeft.current - walk;
  }, []);

  const stopDrag = useCallback(() => {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
  }, []);

  return (
    <section className="bg-black py-10 px-0 md:pt-30 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] bg-[radial-gradient(circle_at_center,rgba(0,102,255,0.03)_0%,transparent_70%)] pointer-events-none z-0" />

      <div className="relative z-10">
        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-12 px-6">
          <h2 className="text-white text-[1.75rem] xs:text-[2rem] md:text-[2.875rem] leading-[34px] xs:leading-[40px] md:leading-[50px] font-medium tracking-[-1px] text-balance">
            Partnered with most of the
          </h2>
          <h3 className="font-serif italic text-[1.75rem] xs:text-[2rem] md:text-[2.875rem] leading-[34px] xs:leading-[40px] md:leading-[50px] font-medium tracking-[-1px] bg-gradient-to-r from-[#0066FF] to-white bg-clip-text text-transparent text-balance">
            top people at each industry
          </h3>
        </div>

        {/* Hide scrollbar for webkit */}
        <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>

        {/* Drag-to-scroll video track */}
        <div
          ref={trackRef}
          className="no-scrollbar flex justify-center gap-4 sm:gap-6 px-6 md:px-20 overflow-x-auto pb-6 select-none pt-10"
          style={{
            cursor: "grab",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
        >
          {videos.length > 0 ? (
            videos.map((item) => (
              <VideoCard key={item.id} item={item} />
            ))
          ) : (
            <div className="text-white/50 w-full text-center py-10 font-medium">Loading testimonials...</div>
          )}
        </div>
      </div>
    </section>
  );
}
