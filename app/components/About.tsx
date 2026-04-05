"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronsRight } from "lucide-react";

export default function About() {
    const aboutText = `Growaz is not just another design agency it's a creative and also innovative to helping businesses amplify their growth through exceptional design solutions. At Growaz, the mission is clear to craft designs that are stunning but also strategically aligned with the goals and values of our team and clients`;
    const words = aboutText.split(" ");
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    return (
        <section
            id="about"
            ref={containerRef}
            className="relative bg-black py-24 px-6 md:px-12 flex flex-col items-center justify-center text-center overflow-hidden min-h-[80vh]"
        >
            {/* Background Image Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 pointer-events-none"
                style={{ backgroundImage: "url('/images/bg-1.jpg')" }}
            />

            <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center gap-8">
                {/* Header Label */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-white text-lg md:text-xl tracking-[0.2em] uppercase font-medium flex items-center gap-2"
                >
                    About
                    <Image
                        src="/logos/Grox-footer.png"
                        alt="Grox"
                        width={60}
                        height={16}
                        className="brightness-0 invert"
                        style={{ height: "auto" }}
                    />
                </motion.div>

                {/* Animated Body Text - Word by Word Reveal */}
                <div className="text-white text-2xl md:text-4xl lg:text-4xl font-semibold tracking-tight max-w-6xl leading-[1.2] flex flex-wrap justify-center">
                    {words.map((word, i) => {
                        const start = i / words.length;
                        const end = start + 1 / words.length;
                        // Use a opacity transform that depends on scroll
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const opacity = useTransform(scrollYProgress, [start * 0.5, end * 1.5], [0, 1]);

                        return (
                            <motion.span
                                key={i}
                                style={{ opacity }}
                                className="mr-3 mb-2"
                            >
                                {word}
                            </motion.span>
                        );
                    })}
                </div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-8"
                >
                    <button className="group relative flex items-center justify-between bg-white/[0.03] border border-white/10 hover:border-[#0066FF]/30 p-1.5 rounded-full transition-all duration-500 overflow-hidden min-w-[200px]">
                        <div className="absolute left-1.5 top-1.5 bottom-1.5 w-12 bg-[#0066FF] rounded-full group-hover:w-[calc(100%-12px)] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] z-0 shadow-[0_0_20px_rgba(0,102,255,0.3)]" />
                        <div className="relative z-10 flex items-center w-full">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full overflow-hidden transition-all duration-500">
                                <ChevronsRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="flex-1 text-center pr-6">
                                <span className="text-white text-lg font-semibold tracking-tight select-none">
                                    About us
                                </span>
                            </div>
                        </div>
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
