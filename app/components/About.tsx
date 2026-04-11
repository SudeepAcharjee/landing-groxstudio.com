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
      className="bg-black px-6 md:px-12 pt-20 flex flex-col items-center justify-center text-center overflow-hidden min-h-screen pb-30"
    >
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center gap-12 w-full">

        {/* Large Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center  max-w-4xl"
        >
          <h2 className="text-white text-[1.75rem] xs:text-[2rem] md:text-[2.875rem] leading-[34px] xs:leading-[40px] md:leading-[50px] font-medium tracking-[-1px] text-balance">
            Scale Your Brand Impact
          </h2>
          
          <p className="text-[1rem] md:text-[1.125rem] text-[#A3A3A3] tracking-[-1px] max-w-xl leading-relaxed mt-6">
            Partner with us to amplify your brand presence with Grox Studio.
          </p>
        </motion.div>

        {/* Founder Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          style={{ width: videoWidth }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative w-full h-[300px] md:h-[500px] lg:h-[650px] mt-12 mx-auto rounded-[32px] md:rounded-[48px] shadow-[0_0_100px_rgba(0,102,255,0.6)]"
        >
          {/* Dedicated overflow masking layer to squash browser clipping artifacts */}
          <div className="absolute inset-0 w-full h-full overflow-hidden rounded-[32px] md:rounded-[48px] p-[1.5px] isolate transform-gpu">
            {/* Static subtle border base */}
            <div className="absolute inset-0 bg-[#0066FF]/20 z-0" />
            
            {/* Animated Blue Gradient Border Layer (Comet Trail) */}
            <div className="absolute inset-[-100%] z-0 bg-[conic-gradient(from_0deg_at_50%_50%,#0066ff00_0%,#0066ff00_50%,#0066FF_100%)] animate-[spin_6s_linear_infinite]" />
            
            {/* Image Container */}
            <div className="w-full h-full rounded-[30.5px] md:rounded-[46.5px] overflow-hidden relative z-10">
              <Image
                src="/images/abg.png"
                alt="About background"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

