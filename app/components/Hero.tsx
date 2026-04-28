"use client";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import { CanvasText } from "@/components/ui/canvas-text";
import { ArrowUpRight, ChevronsRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { Noto_Sans } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });
    
    const boxScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

    // Smooth springs for buttery motion
    const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

    // Differentiated parallax intensites
    const agencyX = useTransform(springX, (val) => val * 1.5);
    const agencyY = useTransform(springY, (val) => val * 1.5);
    const expertX = useTransform(springX, (val) => val * -1.2);
    const expertY = useTransform(springY, (val) => val * -1.2);
    const innovativeX = useTransform(springX, (val) => val * 0.8);
    const innovativeY = useTransform(springY, (val) => val * 0.8);

    // Decorative rotation to make them feel "floating"
    const agencyRotate = useTransform(springX, (val) => val * 0.5);
    const expertRotate = useTransform(springX, (val) => val * -0.3);
    const innovativeRotate = useTransform(springX, (val) => val * 0.2);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 20; // Divide to lower the intensity
        const y = (e.clientY - top - height / 2) / 20;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };
    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative md:min-h-[100vh] min-h-[80vh] flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden px-4 pt-20"
        >
            {/* Background Image Optimized */}
            <div className="absolute inset-0 z-0 opacity-50 pointer-events-none" style={{ position: "absolute" }}>
                <Image
                    src="/images/fbg.png"
                    alt="Atmospheric Background"
                    fill
                    priority
                    quality={70}
                    sizes="100vw"
                    className="object-cover"
                />
            </div>

            <div className="relative z-10 w-full max-w-4xl">
                {/* Bounding Box Design */}
                <motion.div 
                    style={{ scale: boxScale }}
                    className="relative border border-transparent md:border-[#0066FF]/30 p-6 md:p-16 flex flex-col items-center justify-center min-h-[300px] md:min-h-[380px]"
                >
                    {/* Corner Squares */}
                    <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-[#0066FF] hidden md:block" />
                    <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-[#0066FF] hidden md:block" />
                    <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-[#0066FF] hidden md:block" />
                    <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-[#0066FF] hidden md:block" />

                    {/* Main Heading Text */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-center"
                    >
                        <h2
                            className={cn(
                                "group relative mx-auto mt-4 max-w-4xl text-center text-6xl font-semibold tracking-tight text-balance text-white sm:text-6xl md:text-5xl xl:text-5xl leading-[1.1]",
                            )}
                        >
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                className="inline-block"
                            >
                                We build
                            </motion.span>
                            <br />
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                className="inline-block mr-3"
                            >
                                MVP for your 
                            </motion.span>
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="inline-block font-bold"
                            >
                                <CanvasText
                                    text="Brand"
                                    backgroundClassName="bg-blue-600 dark:bg-blue-700"
                                    colors={[
                                        "rgba(0, 153, 255, 1)",
                                        "rgba(0, 153, 255, 0.9)",
                                        "rgba(0, 153, 255, 0.8)",
                                        "rgba(0, 153, 255, 0.7)",
                                        "rgba(0, 153, 255, 0.6)",
                                        "rgba(0, 153, 255, 0.5)",
                                        "rgba(0, 153, 255, 0.4)",
                                        "rgba(0, 153, 255, 0.3)",
                                        "rgba(0, 153, 255, 0.2)",
                                        "rgba(0, 153, 255, 0.1)",
                                    ]}
                                    lineGap={4}
                                    animationDuration={20}
                                />
                            </motion.span>
                        </h2>
                    </motion.div>

                    {/* Floating Badges */}
                    <motion.div
                        style={{ x: agencyX, y: agencyY, rotate: agencyRotate }}
                        initial={{ opacity: 0, scale: 0.8, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-[65%] left-2 md:-left-12 group pointer-events-none md:pointer-events-auto"
                    >
                        <div className="relative">
                            <div className="bg-[#0066FF] text-white px-3 py-1 rounded-full text-[12px] md:text-[20px] font-semibold flex items-center gap-1 shadow-lg shadow-[#0066FF]/20 transition-transform active:scale-95">
                                Branding
                            </div>
                            <svg className="absolute -right-2 top-0 -translate-y-1/2 w-4 h-4 text-[#0066FF]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M10 17l5-5-5-5v10z" />
                            </svg>
                        </div>
                    </motion.div>

                    <motion.div
                        style={{ x: expertX, y: expertY, rotate: expertRotate }}
                        initial={{ opacity: 0, scale: 0.8, y: -30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute md:top-[25%] top-[35%] -right-2 md:-right-10 group pointer-events-none md:pointer-events-auto"
                    >
                        <div className="relative">
                            <div className="bg-white text-black px-4 py-1.5 rounded-full text-[12px] md:text-[20px] font-semibold shadow-xl transition-transform active:scale-95">
                               Marketing
                            </div>
                            <svg className="absolute -left-2 top-0 -translate-y-1/2 w-4 h-4 text-white rotate-180" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M10 17l5-5-5-5v10z" />
                            </svg>
                        </div>
                    </motion.div>

                    <motion.div
                        style={{ x: innovativeX, y: innovativeY, rotate: innovativeRotate }}
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute -bottom-4 right-[1%] group pointer-events-none md:pointer-events-auto"
                    >
                        <div className="relative">
                            <div className="bg-[#FEF9C3] text-black px-4 py-1.5 rounded-full text-[12px] md:text-[20px] font-semibold shadow-xl transition-transform active:scale-95">
                                Software Development
                            </div>
                            <svg className="absolute -left-2 top-0 -translate-y-1/2 w-4 h-4 text-[#FEF9C3] rotate-180" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M10 17l5-5-5-5v10z" />
                            </svg>
                        </div>
                    </motion.div>

                    {/* Subtext Grid (Simplified as one text block for layout) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-12 text-[#ccc] text-[12px] md:text-lg uppercase font-medium text-center space-y-1 max-w-lg md:max-w-2xl px-4 select-none"
                    >
                        <p>We design and build websites, landing pages, and marketing assets that drive sales and qualified leads without hiring a full in-house team.  </p>
                    </motion.div>
                </motion.div>

                {/* CTA Button */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-12 flex justify-center"
                >
                    <Link
                      href="#booking"
                      className="group relative flex items-center justify-between bg-white/[0.03] border border-[#0066FF] hover:border-[#0066FF]/80 p-1.5 rounded-full transition-all duration-500 overflow-hidden min-w-[170px]"
                    >
                      {/* Animated BG */}
                      <div className="absolute left-1.5 top-1.5 bottom-1.5 w-8 bg-[#0066FF] rounded-full group-hover:w-[calc(100%-12px)] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] z-0 shadow-[0_0_20px_rgba(0,102,255,0.3)]" />

                      <div className="relative z-10 flex items-center w-full">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full">
                          <ArrowUpRight className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-500" />
                        </div>

                        <div className="flex-1 text-center pr-3 pl-1">
                          <span
                            className={`text-white text-[17px] font-medium tracking-tight ${notoSans.className}`}
                          >
                            Book a Call
                          </span>
                        </div>
                      </div>
                    </Link>
                </motion.div>
            </div>

            {/* Decorative Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0066FF] opacity-[0.03] blur-[150px] pointer-events-none" />
        </section>
    );
}
