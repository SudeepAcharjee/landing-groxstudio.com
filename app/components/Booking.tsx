"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Globe, Mail, Phone, ChevronLeft, ChevronRight, User, MessageSquare, ArrowRight, Sparkles } from "lucide-react";

const TIMES = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

export default function Booking() {
    const [mounted, setMounted] = useState(false);
    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState(28);
    const [selectedTime, setSelectedTime] = useState("");

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <section id="booking" className="relative py-10 px-6 md:px-12 md:pt-20 pt-10 overflow-hidden bg-black isolate">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-[450px_1fr] gap-12 items-center">
                    
                    {/* Left Side: Editorial Content */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                            <Sparkles className="w-4 h-4 text-[#0066FF]" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#0066FF]">Limited Availability</span>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-white text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight">
                                Let's build <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#00A3FF]">something</span> <br />
                                extraordinary.
                            </h2>
                            <p className="text-white/40 text-lg leading-relaxed max-w-md">
                                Secure your strategy session with our lead consultant. 45 minutes of pure focus on your brand's growth.
                            </p>
                        </div>

                        <div className="p-6 rounded-[32px] border border-white/5 bg-white/[0.02] backdrop-blur-sm space-y-6 relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-white/10 ring-4 ring-[#0066FF]/20">
                                    <Image 
                                        src="/images/lillyen.png" 
                                        alt="Lillyen White" 
                                        fill 
                                        sizes="56px"
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-lg">Lillyen White</h4>
                                    <p className="text-white/40 text-sm">Head of Strategy</p>
                                </div>
                            </div>

                            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                            <div className="space-y-4">
                                <div className="flex items-center gap-4 text-white/60 group">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#0066FF]/10 group-hover:text-[#0066FF] transition-all">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <span className="text-sm font-medium">Mon-Fri <b className="text-white ml-2">9:00 - 17:00 EST</b></span>
                                </div>
                                <div className="flex items-center gap-4 text-white/60 group">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#0066FF]/10 group-hover:text-[#0066FF] transition-all">
                                        <Globe className="w-5 h-5" />
                                    </div>
                                    <span className="text-sm font-medium">Digital <b className="text-white ml-2">Google Meet / Zoom</b></span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            {[Mail, Phone, MessageSquare].map((Icon, i) => (
                                <button key={i} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-[#0066FF] hover:border-[#0066FF]/30 hover:bg-[#0066FF]/5 hover:-translate-y-1 transition-all duration-300">
                                    <Icon size={20} />
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Side: Glassmorphic Scheduler */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative p-1 rounded-[48px] bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-3xl overflow-hidden group shadow-2xl z-10"
                    >
                        <div className="bg-neutral-950/80 rounded-[46px] p-8 md:p-10">
                            <AnimatePresence mode="wait">
                                {step === 1 ? (
                                    <motion.div 
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-white text-2xl font-bold tracking-tight">Select Date</h3>
                                                <p className="text-white/40 text-sm mt-1">July 2025</p>
                                            </div>
                                            <div className="flex gap-3">
                                                <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"><ChevronLeft size={20} /></button>
                                                <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"><ChevronRight size={20} /></button>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-7 gap-2">
                                            {/* Simplified Calendar Header */}
                                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                                                <div key={`${day}-${i}`} className="h-8 flex items-center justify-center text-[10px] font-bold text-white/20 uppercase tracking-widest">{day}</div>
                                            ))}
                                            
                                            {Array.from({ length: 5 }, (_, i) => (
                                                <div key={`empty-${i}`} className="h-10 md:h-12" />
                                            ))}
                                            {DAYS.map((day) => (
                                                <button 
                                                    key={day}
                                                    onClick={() => setSelectedDate(day)}
                                                    className={`h-10 md:h-12 rounded-2xl flex items-center justify-center text-sm font-bold transition-all relative overflow-hidden group/day ${
                                                        selectedDate === day 
                                                        ? "text-white shadow-xl" 
                                                        : "text-white/40 hover:text-white"
                                                    }`}
                                                >
                                                    {selectedDate === day && (
                                                        <motion.div layoutId="activeDay" className="absolute inset-0 bg-[#0066FF] -z-10" />
                                                    )}
                                                    {day}
                                                    {selectedDate !== day && <div className="absolute inset-0 bg-white/0 group-hover/day:bg-white/5 transition-colors -z-10" />}
                                                </button>
                                            ))}
                                        </div>

                                        <div className="space-y-4">
                                            <h4 className="text-white/60 text-xs font-bold uppercase tracking-widest px-1">Available Slots</h4>
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                                {TIMES.map((time) => (
                                                    <button 
                                                        key={time}
                                                        onClick={() => setSelectedTime(time)}
                                                        className={`py-3 rounded-2xl border flex items-center justify-center text-xs font-bold transition-all relative overflow-hidden ${
                                                            selectedTime === time 
                                                            ? "border-[#0066FF] text-white shadow-lg shadow-[#0066FF]/20" 
                                                            : "bg-white/5 border-white/5 text-white/40 hover:border-white/20 hover:text-white"
                                                        }`}
                                                    >
                                                        {selectedTime === time && (
                                                            <motion.div layoutId="activeTime" className="absolute inset-0 bg-[#0066FF]/10 -z-10" />
                                                        )}
                                                        {time}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <button 
                                            type="button"
                                            disabled={!selectedTime}
                                            onClick={() => setStep(2)}
                                            className="w-full h-16 rounded-3xl bg-white text-black font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-3 hover:bg-[#0066FF] hover:text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 disabled:opacity-20 disabled:grayscale disabled:scale-100 group shadow-2xl shadow-white/5"
                                        >
                                            Select & Continue
                                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.div 
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <button onClick={() => setStep(1)} className="inline-flex items-center gap-2 text-white/40 hover:text-white font-bold text-xs uppercase tracking-widest transition-colors group">
                                            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                            Back to Calendar
                                        </button>
                                        
                                        <div className="space-y-2">
                                            <h3 className="text-white text-3xl font-bold tracking-tight">Final Details</h3>
                                            <p className="text-white/40 text-sm">Please tell us a bit about yourself.</p>
                                        </div>
                                        
                                        <div className="space-y-5">
                                            <div className="space-y-2 group">
                                                <label className="text-white/40 text-[10px] uppercase font-black tracking-[0.2em] px-1 group-focus-within:text-[#0066FF] transition-colors">Full Name</label>
                                                <div className="relative">
                                                    <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-[#0066FF] transition-colors" />
                                                    <input 
                                                        type="text" 
                                                        placeholder="John Doe" 
                                                        className="w-full bg-white/5 border border-white/5 focus:border-[#0066FF]/50 focus:bg-white/10 rounded-2xl py-5 pl-14 pr-6 text-white text-sm outline-none transition-all placeholder:text-white/10"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2 group">
                                                <label className="text-white/40 text-[10px] uppercase font-black tracking-[0.2em] px-1 group-focus-within:text-[#0066FF] transition-colors">Email Address</label>
                                                <div className="relative">
                                                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-[#0066FF] transition-colors" />
                                                    <input 
                                                        type="email" 
                                                        placeholder="hello@company.com" 
                                                        className="w-full bg-white/5 border border-white/5 focus:border-[#0066FF]/50 focus:bg-white/10 rounded-2xl py-5 pl-14 pr-6 text-white text-sm outline-none transition-all placeholder:text-white/10"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2 group">
                                                <label className="text-white/40 text-[10px] uppercase font-black tracking-[0.2em] px-1 group-focus-within:text-[#0066FF] transition-colors">Phone Number</label>
                                                <div className="relative">
                                                    <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-[#0066FF] transition-colors" />
                                                    <input 
                                                        type="tel" 
                                                        placeholder="+1 (555) 000-0000" 
                                                        className="w-full bg-white/5 border border-white/5 focus:border-[#0066FF]/50 focus:bg-white/10 rounded-2xl py-5 pl-14 pr-6 text-white text-sm outline-none transition-all placeholder:text-white/10"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <button className="w-full h-16 rounded-3xl bg-[#0066FF] text-white font-extrabold text-sm uppercase tracking-wider hover:bg-[#0055DD] hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 shadow-2xl shadow-[#0066FF]/20 mt-4">
                                            Confirm Appointment
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}