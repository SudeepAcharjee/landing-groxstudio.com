"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, MapPin, Globe, Mail, Phone, ChevronLeft, ChevronRight, User, Calendar as CalendarIcon, MessageSquare } from "lucide-react";

export default function Booking() {
    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState(28);
    const [selectedTime, setSelectedTime] = useState("");
    
    const times = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    return (
        <section className="bg-black py-24 px-6 md:px-12">
            <div className="max-w-6xl mx-auto bg-[#0a0a0a] border border-white/5 rounded-[40px] overflow-hidden shadow-3xl">
                <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr]">
                    
                    {/* Left Panel: Info */}
                    <div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-white/5 bg-[#0f0f0f]/50 flex flex-col items-center text-center lg:items-start lg:text-left">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#0066FF]">
                                <Image 
                                    src="/images/lillyen.png" 
                                    alt="Lillyen White" 
                                    fill 
                                    className="object-cover"
                                />
                            </div>
                            <div className="text-left">
                                <h4 className="text-white font-bold text-lg leading-tight">Lillyen White</h4>
                                <p className="text-[#0066FF] text-xs font-medium uppercase tracking-wider">Strategic Partner</p>
                            </div>
                        </div>

                        <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight mb-6">
                            Book Your <br />
                            <span className="text-[#0066FF]">Breakthrough</span> Session
                        </h2>

                        <p className="text-white/40 text-sm leading-relaxed mb-10 max-w-[280px] mx-auto lg:mx-0">
                            Need brand growth? Get expert advice, tailored strategies, and market smarter with confidence.
                        </p>

                        <div className="space-y-6 mb-12 w-full flex flex-col items-center lg:items-start">
                            <div className="flex items-center gap-4 text-white/60">
                                <Clock className="w-5 h-5 text-[#0066FF]" />
                                <span className="text-sm font-medium">Monday-Friday <b className="text-white">9:00 - 17:00</b></span>
                            </div>
                            <div className="flex items-center gap-4 text-white/60">
                                <MapPin className="w-5 h-5 text-[#0066FF]" />
                                <span className="text-sm font-medium">USA <b className="text-white">New York</b></span>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            {[Globe, Mail, MessageSquare].map((Icon, i) => (
                                <button key={i} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-[#0066FF] hover:border-[#0066FF]/30 transition-all duration-300">
                                    <Icon size={18} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Panel: Selection */}
                    <div className="p-8 md:p-12 relative">
                        <AnimatePresence mode="wait">
                            {step === 1 ? (
                                <motion.div 
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="h-full flex flex-col"
                                >
                                    <div className="flex items-center justify-between mb-10">
                                        <h3 className="text-white text-xl font-bold flex items-center gap-3">
                                            <CalendarIcon className="w-5 h-5 text-[#0066FF]" />
                                            Select Date & Time
                                        </h3>
                                        <div className="flex gap-2">
                                            <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white"><ChevronLeft size={18} /></button>
                                            <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white"><ChevronRight size={18} /></button>
                                        </div>
                                    </div>

                                    <div className="mb-10">
                                        <div className="flex justify-between items-center mb-6">
                                            <span className="text-white/60 text-sm font-bold">July 2025</span>
                                        </div>
                                        <div className="grid grid-cols-7 gap-1 md:gap-2">
                                            {/* Simplified Calendar Days */}
                                            {Array.from({ length: 5 }, (_, i) => (
                                                <div key={`empty-${i}`} className="h-10 md:h-12" />
                                            ))}
                                            {days.map((day) => (
                                                <button 
                                                    key={day}
                                                    onClick={() => setSelectedDate(day)}
                                                    className={`h-10 md:h-12 rounded-xl flex items-center justify-center text-sm font-bold transition-all ${
                                                        selectedDate === day 
                                                        ? "bg-[#0066FF] text-white shadow-lg shadow-[#0066FF]/30" 
                                                        : "text-white/40 hover:bg-white/5 hover:text-white"
                                                    }`}
                                                >
                                                    {day}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mb-10">
                                        <h4 className="text-white/60 text-xs font-bold uppercase tracking-widest mb-6">Available Times</h4>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                                            {times.map((time) => (
                                                <button 
                                                    key={time}
                                                    onClick={() => setSelectedTime(time)}
                                                    className={`py-3 rounded-xl border flex items-center justify-center text-xs font-bold transition-all ${
                                                        selectedTime === time 
                                                        ? "bg-[#0066FF] text-white border-transparent shadow-lg shadow-[#0066FF]/30" 
                                                        : "bg-white/5 border-white/5 text-white/60 hover:border-white/20 hover:text-white"
                                                    }`}
                                                >
                                                    {time}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <button 
                                        disabled={!selectedTime}
                                        onClick={() => setStep(2)}
                                        className="mt-auto w-full py-4 rounded-2xl bg-white text-black font-bold hover:bg-[#0066FF] hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed group"
                                    >
                                        Next Step
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.div 
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="h-full flex flex-col"
                                >
                                    <button onClick={() => setStep(1)} className="flex items-center gap-2 text-white/40 hover:text-white font-bold text-sm mb-10 group">
                                        <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                                        Back to Details
                                    </button>
                                    
                                    <h3 className="text-white text-3xl font-bold mb-8">Finalize Your <span className="text-[#0066FF]">Booking</span></h3>
                                    
                                    <div className="space-y-6 mb-12">
                                        <div className="space-y-2">
                                            <label className="text-white/40 text-[10px] uppercase font-bold tracking-widest px-1">Full Name</label>
                                            <div className="relative group">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-[#0066FF] transition-colors" />
                                                <input 
                                                    type="text" 
                                                    placeholder="Lillyen White" 
                                                    className="w-full bg-white/5 border border-white/5 focus:border-[#0066FF]/30 focus:bg-white/10 rounded-2xl py-4 pl-12 pr-6 text-white text-sm outline-none transition-all"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-white/40 text-[10px] uppercase font-bold tracking-widest px-1">Email Address</label>
                                            <div className="relative group">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-[#0066FF] transition-colors" />
                                                <input 
                                                    type="email" 
                                                    placeholder="lillyen@agency.com" 
                                                    className="w-full bg-white/5 border border-white/5 focus:border-[#0066FF]/30 focus:bg-white/10 rounded-2xl py-4 pl-12 pr-6 text-white text-sm outline-none transition-all"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-white/40 text-[10px] uppercase font-bold tracking-widest px-1">Phone Number</label>
                                            <div className="relative group">
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-[#0066FF] transition-colors" />
                                                <input 
                                                    type="tel" 
                                                    placeholder="+1 (555) 000-0000" 
                                                    className="w-full bg-white/5 border border-white/5 focus:border-[#0066FF]/30 focus:bg-white/10 rounded-2xl py-4 pl-12 pr-6 text-white text-sm outline-none transition-all"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <button className="mt-auto w-full py-4 rounded-2xl bg-[#0066FF] text-white font-bold hover:bg-[#0055DD] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-xl shadow-[#0066FF]/20">
                                        Confirm Booking
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    );
}
