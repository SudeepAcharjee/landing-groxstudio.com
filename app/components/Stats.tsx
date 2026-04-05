"use client";
import React from "react";
import { motion } from "framer-motion";

const STATS = [
    { number: "200", unit: "+", label: "Successful Projects" },
    { number: "30", unit: "+", label: "Design Specialized Expert" },
    { number: "96", unit: "%", label: "Awards Winning Agency" },
    { number: "15", unit: "+", label: "Awards Received till Date" },
];

export default function Stats() {
    return (
        <section className="relative bg-black py-24 px-6 md:px-12 overflow-hidden">
            {/* Background Texture */}
            <div 
                className="absolute inset-0 z-0 opacity-40 pointer-events-none bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/images/bg-7.png')" }}
            />

            <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                
                {/* Left Column: Heading */}
                <div className="flex flex-col h-full justify-between items-center lg:items-start text-center lg:text-left">
                    <div>
                        <h2 className="text-white text-4xl md:text-6xl font-light tracking-tight">
                            Our Passion
                        </h2>
                        <h3 className="font-serif italic text-4xl md:text-6xl bg-gradient-to-r from-[#0066FF] to-[#FFFFFF] bg-clip-text text-transparent">
                            proven results
                        </h3>
                    </div>
                    
                    <div className="mt-8 lg:mt-32">
                        <span className="text-white font-mono text-sm opacity-90 border border-white/20 px-4 py-1.5 rounded-full inline-block">
                            [Since 2023]
                        </span>
                    </div>
                </div>

                {/* Right Column: Stat Cards */}
                <div className="grid grid-cols-2 gap-3 md:gap-6">
                    {STATS.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white/5 border border-white/5 rounded-2xl md:rounded-[32px] p-4 md:p-10 h-44 md:h-72 flex flex-col justify-between hover:bg-white/[0.08] transition-colors group"
                        >
                            <div className="flex items-start">
                                <span className="text-4xl md:text-7xl font-semibold text-white tracking-tighter">
                                    {stat.number}
                                </span>
                                <span className="text-xl md:text-4xl font-light text-[#0066FF] ml-1">
                                    {stat.unit}
                                </span>
                            </div>
                            
                            <p className="text-white/60 text-[10px] md:text-base font-medium leading-tight group-hover:text-white transition-colors">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
