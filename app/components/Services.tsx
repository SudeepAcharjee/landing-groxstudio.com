"use client";
import React from "react";
import { motion } from "framer-motion";
import { ChevronsRight, Plus } from "lucide-react";

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
        tags: ["Email Marketing", "Pay-Per-Click", "SEO", "Social Media Marketing"]
    },
    {
        id: "04",
        title: "UI/UX Design",
        tags: ["User Interface (UI)", "Wireframing", "Analysis", "Mobile App UI Design"]
    }
];

export default function Services() {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const scrollRef = React.useRef<HTMLDivElement>(null);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        const scrollPosition = target.scrollLeft;
        const itemWidth = target.offsetWidth * 0.85; // Roughly the width of one item on mobile
        const newIndex = Math.round(scrollPosition / itemWidth);
        if (newIndex !== activeIndex) {
            setActiveIndex(newIndex);
        }
    };

    return (
        <section id="services" className="relative bg-black py-20 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col items-center md:items-end md:flex-row justify-between gap-6 mb-10 md:mb-16 text-center md:text-left">
                    <div className="w-full md:w-auto">
                        <h2 className="text-white text-4xl md:text-6xl font-light tracking-tight">
                            Services that
                        </h2>
                        <h3 className="font-serif italic text-4xl md:text-6xl bg-gradient-to-r from-[#0066FF] to-white bg-clip-text text-transparent mt-1 md:mt-2">
                            are tailored
                        </h3>
                    </div>

                    <button className="group relative flex items-center justify-between bg-white/[0.03] border border-white/10 hover:border-[#0066FF]/30 p-1.5 rounded-full transition-all duration-500 overflow-hidden w-fit md:min-w-[200px] h-14 px-4 md:px-1.5 mx-auto md:mx-0">
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
                    </button>
                </div>

                <div 
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 pb-8 scrollbar-hide snap-x snap-mandatory"
                >
                    {SERVICES.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex-shrink-0 w-[85vw] md:w-auto snap-center bg-[#0f0f0f] border border-white/5 rounded-[32px] p-8 flex flex-col h-[420px] relative group hover:border-[#0066FF]/20 transition-all duration-500 overflow-hidden"
                        >
                            {/* Hover Glow Effect: Rising from bottom to center */}
                            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[120%] h-1/2 bg-[#0066FF]/30 blur-[100px] opacity-0 group-hover:opacity-100 translate-y-20 group-hover:translate-y-0 transition-all duration-700 ease-out pointer-events-none" />
                            
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

                            <button className="relative z-10 w-12 h-12 rounded-full bg-[#0066FF] flex items-center justify-center text-black hover:scale-110 transition-transform mt-8 shadow-[0_0_20px_rgba(0,102,255,0.3)]">
                                <Plus size={24} strokeWidth={3} />
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile Dot Indicators */}
                <div className="flex md:hidden justify-center items-center gap-2 mt-4">
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
        </section>
    );
}
