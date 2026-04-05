"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, AlignRight } from "lucide-react";

const NAV_LINKS = [
    { name: "Home", href: "/" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Case Studies", href: "#case-studies" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav 
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b ${
                scrolled 
                ? "bg-black/80 backdrop-blur-xl border-white/10 py-4" 
                : "bg-transparent border-transparent py-6"
            }`}
        >
            <div className="w-full px-4 md:px-12 flex items-center justify-between">
                {/* Logo Section */}
                <Link href="/" className="relative z-[160] flex items-center flex-shrink-0">
                    <Image
                        src="/logos/navlogo.png"
                        alt="Grox Logo"
                        width={100}
                        height={32}
                        className="object-contain brightness-0 invert" 
                        style={{ height: "auto" }}
                        priority
                    />
                </Link>

                {/* Navigation Links - Desktop */}
                <div className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="relative text-sm font-medium text-white/70 hover:text-white transition-all group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#0066FF] transition-all duration-300 group-hover:w-full group-hover:shadow-[0_0_10px_#0066FF]" />
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <Link
                        href="#contact"
                        className="hidden md:block px-6 py-2 rounded-full bg-[#0066FF] text-white text-sm font-bold transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(0,102,255,0.4)] active:scale-95"
                    >
                        Start Project
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden relative z-[160] w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white transition-all hover:bg-white/10"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <AlignRight size={24} strokeWidth={2} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed inset-0 z-[140] bg-black flex flex-col pt-32 px-10 md:hidden h-screen w-full"
                    >
                        <div className="flex flex-col gap-6">
                            {NAV_LINKS.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-5xl md:text-6xl font-light text-white hover:text-[#0066FF] transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Link
                                href="#contact"
                                onClick={() => setIsMenuOpen(false)}
                                className="mt-12 w-full h-16 flex items-center justify-center rounded-full bg-[#0066FF] text-white font-bold text-xl"
                            >
                                Estimate Project
                            </Link>
                        </motion.div>
                        
                        {/* Branding watermark inside menu */}
                        <div className="mt-auto pb-10">
                            <p className="text-white/20 text-sm font-medium tracking-widest uppercase">
                                Grox Studio [Since 2023]
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
