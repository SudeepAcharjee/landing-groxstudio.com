"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { ChevronsRight } from "lucide-react";

const SERVICES = [
    {
        id: "01",
        title: "Brand Strategy",
        tags: ["Development", "Brand Guidelines", "Analysis", "Rebranding Services"]
    },
    {
        id: "02",
        title: "Web Design",
        tags: ["Development", "Custom Website", "Web Solutions", "Responsive Web"]
    },
    {
        id: "03",
        title: "Digital Marketing",
        tags: ["Email Marketing", "Pay-Per-Click", "SEO", "SMM"]
    },
    {
        id: "04",
        title: "UI/UX Design",
        tags: ["User Interface", "Wireframing", "Analysis", "Mobile App UI"]
    }
];

export default function Services() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Horizontal transform for mobile: move from 0 to about -75%
    // Using [0, 1] range to finish exactly when the section unpins
    const x = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "-75%" : "0%"]);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!isMobile) return;
        const index = Math.min(Math.floor(latest * SERVICES.length), SERVICES.length - 1);
        if (index !== activeIndex) {
            setActiveIndex(index);
        }
    });

    return (
        <section 
            id="services" 
            ref={containerRef} 
            className="relative bg-black md:py-20 py-0 md:h-auto h-[150vh] overflow-visible"
        >
            {/* Large Atmospheric Background Glows - Fixed relative to the viewport during scroll */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="sticky top-0 h-screen w-full overflow-hidden">
                    <motion.div 
                        animate={{
                            opacity: [0.15, 0.25, 0.15],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/30 blur-[150px] rounded-full"
                    />
                    <motion.div 
                        animate={{
                            opacity: [0.1, 0.2, 0.1],
                            scale: [1.1, 1, 1.1],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/20 blur-[130px] rounded-full"
                    />
                </div>
            </div>

            <div className="sticky top-0 h-screen md:relative md:h-auto flex flex-col justify-center overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10 w-full px-6 md:px-12">
                    <div className="flex flex-col items-center md:items-end md:flex-row justify-between gap-6 mb-4 md:mb-16 text-center md:text-left">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="w-full md:w-auto"
                        >
                            <h2 className="text-white text-[1.75rem] xs:text-[2rem] md:text-[2.875rem] leading-[34px] xs:leading-[40px] md:leading-[50px] font-medium tracking-[-1px] text-balance">
                                Services that
                            </h2>
                            <h3 className="font-serif italic text-[1.75rem] xs:text-[2rem] md:text-[2.875rem] leading-[34px] xs:leading-[40px] md:leading-[50px] font-medium tracking-[-1px] bg-gradient-to-r from-[#0066FF] to-white bg-clip-text text-transparent text-balance">
                                are tailored
                            </h3>
                        </motion.div>

                        <motion.button 
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="group relative flex items-center justify-between bg-white/[0.03] border border-[#0066FF] hover:border-[#0066FF]/80 p-1.5 rounded-full transition-colors duration-500 overflow-hidden w-fit md:min-w-[200px] h-14 px-4 md:px-1.5 mx-auto md:mx-0"
                        >
                            <div className="absolute left-1.5 top-1.5 bottom-1.5 w-11 bg-[#0066FF] rounded-full group-hover:w-[calc(100%-12px)] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] z-0 shadow-[0_0_20px_rgba(0,102,255,0.3)]" />
                            <div className="relative z-10 flex items-center w-full gap-4">
                                <div className="flex items-center justify-center w-11 h-11 rounded-full overflow-hidden transition-all duration-500">
                                    <ChevronsRight className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-500 mr-5 md:mr-0" />
                                </div>
                                <div className="flex-1 text-center pr-4 md:pr-6">
                                    <span className="text-white text-base font-semibold tracking-tight select-none">
                                        View Service
                                    </span>
                                </div>
                            </div>
                        </motion.button>
                    </div>

                    <div className="relative">
                        <motion.div 
                            style={{ x: isMobile ? x : 0 }}
                            className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 pb-8 w-max md:w-auto"
                        >
                            {SERVICES.map((service, index) => (
                                <motion.div
                                    key={service.id}
                                    variants={{
                                        hidden: { opacity: 0, scale: 0.95 },
                                        show: (i: number) => ({
                                            opacity: 1,
                                            scale: 1,
                                            transition: {
                                                delay: i * 0.15,
                                                duration: 0.6,
                                                ease: [0.215, 0.61, 0.355, 1],
                                            },
                                        }),
                                    }}
                                    custom={index}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true, amount: 0.1 }}
                                    className="flex-shrink-0 w-[85vw] md:w-auto relative group h-[420px] rounded-[32px] isolate"
                                >
                                    <div className="absolute inset-0 rounded-[32px] bg-black/40 shadow-[0_0_40px_rgba(0,102,255,0.08)] z-0 group-hover:bg-black/60 transition-colors duration-500" />

                                    <div className="absolute inset-0 w-full h-full overflow-hidden rounded-[32px] p-[1.5px] pointer-events-none z-[1]">
                                        <div className="absolute inset-0 bg-[#0066FF]/10 z-0" />
                                        <div className="absolute inset-[-150%] z-0 bg-[conic-gradient(from_0deg_at_50%_50%,#0066ff00_0%,#0066ff00_50%,#0066FF_100%)] animate-[spin_6s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    </div>

                                    <div className="absolute inset-[1.5px] rounded-[30.5px] bg-[#0f0f0f] p-8 flex flex-col z-10 transition-colors duration-500 group-hover:bg-[#121212] overflow-hidden">
                                        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[120%] h-1/2 bg-[#0066FF]/20 blur-[80px] opacity-0 group-hover:opacity-100 translate-y-20 group-hover:translate-y-0 transition-all duration-700 ease-out pointer-events-none" />
                                            
                                        <span className="relative z-10 text-white/20 font-semibold text-2xl mb-8">
                                            {service.id}
                                        </span>

                                        <h4 className="relative z-10 text-white text-4xl font-light leading-tight mb-8 max-w-[180px]">
                                            {service.title}
                                        </h4>

                                        <div className="relative z-10 grid grid-cols-2 gap-2 mb-auto">
                                            {service.tags.map((tag) => (
                                                <span 
                                                    key={tag} 
                                                    className="inline-flex items-center justify-center px-3 py-2 rounded-full border border-white/30 text-white text-[10px] font-medium hover:bg-white/5 hover:text-white transition-colors cursor-default text-center leading-tight h-full"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <button className="relative text-white z-10 mt-8 w-fit px-6 py-3 rounded-full bg-[#0066FF] flex items-center gap-2 text-black font-semibold text-sm hover:pr-8 transition-all group/view shadow-[0_0_20px_rgba(0,102,255,0.3)]">
                                            View
                                            <ChevronsRight size={16} className="group-hover/view:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    <div className="flex md:hidden justify-center items-center gap-2 mt-2">
                        {SERVICES.map((_, index) => (
                            <div
                                key={index}
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                    activeIndex === index ? "w-8 bg-[#0066FF]" : "w-1.5 bg-white/20"
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
