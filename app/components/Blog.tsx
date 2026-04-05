"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronsRight, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const BLOGS = [
    {
        id: "01",
        date: "Jun 10, 2025",
        title: "The Ultimate Guide to Simplifying Your Digital Strategy",
        image: "/images/proj-1.png"
    },
    {
        id: "02",
        date: "Jun 12, 2025",
        title: "How to Create a User-Centric Website in 5 Simple Steps",
        image: "/images/proj-2.png"
    },
    {
        id: "03",
        date: "Jun 15, 2025",
        title: "The Power of Minimalism in Modern Web Design",
        image: "/images/proj-3.png"
    },
    {
        id: "04",
        date: "Jun 18, 2025",
        title: "The Psychology of Color in Brand Design: What to Know",
        image: "/images/proj-4.png"
    },
    {
        id: "05",
        date: "Jun 20, 2025",
        title: "Maximizing Your ROI Through Effective UI/UX Audits",
        image: "/images/proj-5.png"
    }
];

export default function Blog() {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const scrollRef = React.useRef<HTMLDivElement>(null);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        const scrollPosition = target.scrollLeft;
        const itemWidth = target.offsetWidth * 0.85; // Roughly the width of one card on mobile
        const newIndex = Math.round(scrollPosition / itemWidth);
        if (newIndex !== activeIndex) {
            setActiveIndex(newIndex);
        }
    };

    return (
        <section id="case-studies" className="bg-black py-20 px-6 md:px-12 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col items-center md:items-end md:flex-row justify-between gap-6 mb-12 md:mb-16 text-center md:text-left">
                    <div className="w-full md:w-auto">
                        <h2 className="text-white text-4xl md:text-6xl font-light tracking-tight leading-none">
                            Our Digital
                        </h2>
                        <h3 className="font-serif italic text-4xl md:text-6xl bg-gradient-to-r from-[#0066FF] to-white bg-clip-text text-transparent mt-1 md:mt-2">
                            Case Studies
                        </h3>
                    </div>

                    <button className="group relative flex items-center justify-between bg-white/[0.03] border border-white/10 hover:border-[#0066FF]/30 p-1.5 rounded-full transition-all duration-500 overflow-hidden w-fit md:min-w-[200px] h-14 px-4 md:px-1.5 mt-2 md:mt-0 mx-auto md:mx-0">
                        <div className="absolute left-1.5 top-1.5 bottom-1.5 w-11 bg-[#0066FF] rounded-full group-hover:w-[calc(100%-12px)] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] z-0 shadow-[0_0_20px_rgba(0,102,255,0.3)]" />
                        <div className="relative z-10 flex items-center w-full gap-4">
                            <div className="flex items-center justify-center w-11 h-11 rounded-full overflow-hidden transition-all duration-500">
                                <ChevronsRight className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-500 mr-5 md:mr-0" />
                            </div>
                            <div className="flex-1 text-center pr-4 md:pr-6 whitespace-nowrap">
                                <span className="text-white text-base font-semibold tracking-tight select-none">
                                    View More
                                </span>
                            </div>
                        </div>
                    </button>
                </div>

                <div 
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex overflow-x-auto gap-6 md:gap-8 pb-12 scrollbar-hide snap-x snap-mandatory items-stretch"
                >
                    {BLOGS.map((blog, index) => (
                        <motion.div 
                            key={blog.id} 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative flex-shrink-0 w-[85vw] md:w-[450px] snap-center"
                        >
                            <div className="relative aspect-[4/3] rounded-[24px] md:rounded-[32px] overflow-hidden mb-6 border border-white/5 group-hover:border-white/20 transition-all duration-500 bg-white/[0.03]">
                                <Image
                                    src={blog.image}
                                    alt={blog.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            <div className="space-y-4 px-2">
                                <div className="flex items-center gap-3">
                                    <span className="text-[#0066FF] text-[10px] font-bold uppercase tracking-wider bg-[#0066FF]/10 px-3 py-1 rounded-full border border-[#0066FF]/20">
                                        Article
                                    </span>
                                    <span className="text-white/40 text-[11px] font-medium uppercase tracking-[0.1em]">
                                        {blog.date}
                                    </span>
                                </div>
                                <h4 className="text-white text-xl md:text-2xl font-light leading-tight group-hover:text-white/90 transition-colors line-clamp-2">
                                    {blog.title}
                                </h4>
                                <button className="flex items-center gap-2 text-[#0066FF] text-sm font-bold group/btn">
                                    Read Full Blog
                                    <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile Dot Indicators */}
                <div className="flex md:hidden justify-center items-center gap-2 mt-4">
                    {BLOGS.map((_, index) => (
                        <div
                            key={index}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                activeIndex === index ? "w-8 bg-[#0066FF]" : "w-1.5 bg-white/20"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
