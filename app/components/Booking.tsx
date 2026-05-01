"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Globe, Mail, Phone, ChevronLeft, ChevronRight, User, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

const TIMES = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2).toString().padStart(2, '0');
    const minute = i % 2 === 0 ? "00" : "30";
    return `${hour}:${minute}`;
});

export default function Booking() {
    const [mounted, setMounted] = useState(false);
    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState(28);
    const [selectedTime, setSelectedTime] = useState("");
    const [viewDate, setViewDate] = useState(new Date(2025, 6, 1)); // Default to July 2025
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleBooking = async () => {
        if (!name || !email || !phone || !selectedDate || !selectedTime) return;
        setIsSubmitting(true);
        try {
            const bookingDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), selectedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            await addDoc(collection(db, "bookings"), {
                name,
                email,
                phone,
                date: bookingDate,
                time: selectedTime,
                status: "pending",
                createdAt: serverTimestamp()
            });
            setIsSuccess(true);
        } catch (err) {
            console.error("Booking error:", err);
            alert("Failed to confirm booking. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const nextMonth = () => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
    };

    const prevMonth = () => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
    };

    const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
    const startDay = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <section id="booking" className="relative py-10 px-4 md:px-0 md:pt-30 pt-10 overflow-hidden bg-black isolate">
            <div className="max-w-[1400px] mx-auto px-4 md:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    
                    {/* Left Side: Editorial Content */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                       

                        <div className="space-y-0">
                            <h2 className="text-white text-[1.75rem] xs:text-[2rem] md:text-[3.2rem] leading-[1.1] font-medium tracking-[-1px]">
                                Let's Talk 
                            </h2>
                            <h3 className="font-serif italic text-[1.75rem] xs:text-[2rem] md:text-[3.2rem] leading-[1.1] font-medium tracking-[-1px] bg-gradient-to-r from-[#0066FF] to-white bg-clip-text text-transparent">
                                About Your Business, 30 minutes.
                            </h3>
                            <p className="text-white/60 text-lg leading-relaxed max-w-xl pt-4">
                                Hop on a 30-minute call with our founder to share your vision, challenges, and goals. No pitches. No pressure. Just a real conversation to see if we’re the right fit to help you grow.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                {
                                    name: "Rahul Deka",
                                    role: "Co-Founder, Groxstudio",
                                    image: "/images/PP.png",
                                    linkedin: "https://www.linkedin.com/in/rahul-deka-7851a4289/",
                                    position: "center"
                                },
                                {
                                    name: "Debashis Majumdar ",
                                    role: "CMO & Co-Founder",
                                    image: "/images/dm.jpg",
                                    linkedin: "https://www.linkedin.com/in/mdebashis/",
                                    position: "top"
                                }
                            ].map((founder) => (
                                <div key={founder.name} className="p-4 rounded-[24px] border border-[#0066FF]/20 bg-white/[0.02] backdrop-blur-sm space-y-4 relative z-10 shadow-[0_0_20px_rgba(0,102,255,0.1)] group/founder">
                                    <div className="flex items-center gap-3">
                                        <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-white/10 ring-2 ring-[#0066FF]/10">
                                            <Image 
                                                src={founder.image} 
                                                alt={founder.name} 
                                                fill 
                                                sizes="48px"
                                                className="object-cover"
                                                style={{ objectPosition: founder.position }}
                                            />
                                        </div>
                                        <div className="flex-1 flex items-center justify-between gap-2">
                                            <div className="min-w-0">
                                                <h4 className="text-white font-bold text-sm truncate">{founder.name}</h4>
                                                <p className="text-white/50 text-[11px] truncate">{founder.role}</p>
                                            </div>
                                            <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#0066FF] transition-colors flex-shrink-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-4">
                            <a 
                                href="mailto:info@groxstudio.com"
                                aria-label="Email"
                                className="w-12 h-12 rounded-2xl bg-white/5 border border-[#0066FF]/20 flex items-center justify-center text-white/60 hover:text-[#0066FF] hover:border-[#0066FF]/50 hover:bg-[#0066FF]/10 hover:-translate-y-1 transition-all duration-300 shadow-[0_0_15px_rgba(0,102,255,0.05)] hover:shadow-[0_0_20px_rgba(0,102,255,0.2)]"
                            >
                                <Mail size={20} />
                            </a>
                            <a 
                                href="tel:+917086745746"
                                aria-label="Phone"
                                className="w-12 h-12 rounded-2xl bg-white/5 border border-[#0066FF]/20 flex items-center justify-center text-white/60 hover:text-[#0066FF] hover:border-[#0066FF]/50 hover:bg-[#0066FF]/10 hover:-translate-y-1 transition-all duration-300 shadow-[0_0_15px_rgba(0,102,255,0.05)] hover:shadow-[0_0_20px_rgba(0,102,255,0.2)]"
                            >
                                <Phone size={20} />
                            </a>
                            <a 
                                href="https://wa.me/917086745746"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="WhatsApp"
                                className="w-12 h-12 rounded-2xl bg-white/5 border border-[#0066FF]/20 flex items-center justify-center text-white/60 hover:text-[#0066FF] hover:border-[#0066FF]/50 hover:bg-[#0066FF]/10 hover:-translate-y-1 transition-all duration-300 shadow-[0_0_15px_rgba(0,102,255,0.05)] hover:shadow-[0_0_20px_rgba(0,102,255,0.2)]"
                            >
                                <IconBrandWhatsapp size={20} />
                            </a>
                        </div>
                    </motion.div>

                    {/* Right Side: Glassmorphic Scheduler */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative p-[1.5px] rounded-[48px] overflow-hidden group z-10"
                        style={{
                            boxShadow: "0 0 40px rgba(0,102,255,0.25), 0 0 80px rgba(0,102,255,0.15)"
                        }}
                    >
                        {/* Static subtle border base */}
                        <div className="absolute inset-0 bg-[#0066FF]/10 z-0" />

                        {/* Border Animation Beam (Moving Trail) */}
                        <div className="absolute inset-[-150%] z-0 bg-[conic-gradient(from_0deg_at_50%_50%,#0066ff00_0%,#0066ff00_50%,#0066FF_100%)] animate-[spin_6s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="bg-[#0a0a0a] backdrop-blur-3xl rounded-[46.5px] p-8 md:p-10 relative z-10 h-full">
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
                                                <p className="text-white/60 text-sm mt-1">{viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                                            </div>
                                            <div className="flex gap-3">
                                                <button onClick={prevMonth} aria-label="Previous Month" className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"><ChevronLeft size={20} /></button>
                                                <button onClick={nextMonth} aria-label="Next Month" className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"><ChevronRight size={20} /></button>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-7 gap-2">
                                            {/* Simplified Calendar Header */}
                                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                                                <div key={`${day}-${i}`} className="h-8 flex items-center justify-center text-[10px] font-bold text-white/20 uppercase tracking-widest">{day}</div>
                                            ))}
                                            
                                            {Array.from({ length: startDay }, (_, i) => (
                                                <div key={`empty-${i}`} className="h-10 md:h-12" />
                                            ))}
                                            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
                                                <button 
                                                    key={day}
                                                    onClick={() => setSelectedDate(day)}
                                                    className={`h-10 md:h-12 rounded-2xl flex items-center justify-center text-sm font-bold transition-all relative overflow-hidden group/day ${
                                                        selectedDate === day 
                                                        ? "text-white shadow-xl" 
                                                        : "text-white/60 hover:text-white"
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

                                         <div className="space-y-3">
                                            <style>{`
                                                .custom-scrollbar::-webkit-scrollbar {
                                                    height: 4px;
                                                }
                                                .custom-scrollbar::-webkit-scrollbar-track {
                                                    background: rgba(255, 255, 255, 0.05);
                                                    border-radius: 10px;
                                                }
                                                .custom-scrollbar::-webkit-scrollbar-thumb {
                                                    background: rgba(0, 102, 255, 0.3);
                                                    border-radius: 10px;
                                                }
                                                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                                                    background: rgba(0, 102, 255, 0.6);
                                                }
                                            `}</style>
                                            <div 
                                                className="flex overflow-x-auto gap-3 pb-4 select-none flex-nowrap snap-x snap-mandatory custom-scrollbar"
                                            >
                                                {TIMES.map((time) => (
                                                    <button 
                                                        key={time}
                                                        onClick={() => setSelectedTime(time)}
                                                        className={`flex-shrink-0 min-w-[85px] md:min-w-[95px] py-3 md:py-4 rounded-2xl border flex items-center justify-center text-xs md:text-sm font-bold transition-all relative overflow-hidden snap-center ${
                                                            selectedTime === time 
                                                            ? "border-[#0066FF] text-white shadow-lg shadow-[#0066FF]/20 bg-[#0066FF]/20" 
                                                            : "bg-white/5 border-white/5 text-white/60 hover:border-[#0066FF]/40 hover:text-white"
                                                        }`}
                                                    >
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
                                        <button onClick={() => setStep(1)} className="inline-flex items-center gap-2 text-white/60 hover:text-white font-bold text-xs uppercase tracking-widest transition-colors group">
                                            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                            Back to Calendar
                                        </button>
                                        
                                        <div className="space-y-2">
                                            <h3 className="text-white text-3xl font-bold tracking-tight">Final Details</h3>
                                            <p className="text-white/60 text-sm">Please tell us a bit about yourself.</p>
                                        </div>
                                        
                                        <div className="space-y-5">
                                            <div className="space-y-2 group">
                                                <label className="text-white/60 text-[10px] uppercase font-black tracking-[0.2em] px-1 group-focus-within:text-[#0066FF] transition-colors">Full Name</label>
                                                <div className="relative">
                                                    <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-[#0066FF] transition-colors" />
                                                    <input 
                                                        type="text" 
                                                        placeholder="John Doe" 
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        className="w-full bg-white/5 border border-[#0066FF]/10 focus:border-[#0066FF]/50 focus:bg-white/10 rounded-2xl py-5 pl-14 pr-6 text-white text-sm outline-none transition-all placeholder:text-white/10 focus:shadow-[0_0_20px_rgba(0,102,255,0.1)]"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2 group">
                                                <label className="text-white/60 text-[10px] uppercase font-black tracking-[0.2em] px-1 group-focus-within:text-[#0066FF] transition-colors">Email Address</label>
                                                <div className="relative">
                                                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-[#0066FF] transition-colors" />
                                                    <input 
                                                        type="email" 
                                                        placeholder="hello@company.com" 
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        className="w-full bg-white/5 border border-[#0066FF]/10 focus:border-[#0066FF]/50 focus:bg-white/10 rounded-2xl py-5 pl-14 pr-6 text-white text-sm outline-none transition-all placeholder:text-white/10 focus:shadow-[0_0_20px_rgba(0,102,255,0.1)]"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2 group">
                                                <label className="text-white/60 text-[10px] uppercase font-black tracking-[0.2em] px-1 group-focus-within:text-[#0066FF] transition-colors">Phone Number</label>
                                                <div className="relative">
                                                    <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-[#0066FF] transition-colors" />
                                                    <input 
                                                        type="tel" 
                                                        placeholder="+1 (555) 000-0000" 
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value)}
                                                        className="w-full bg-white/5 border border-[#0066FF]/10 focus:border-[#0066FF]/50 focus:bg-white/10 rounded-2xl py-5 pl-14 pr-6 text-white text-sm outline-none transition-all placeholder:text-white/10 focus:shadow-[0_0_20px_rgba(0,102,255,0.1)]"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <button 
                                            onClick={handleBooking}
                                            disabled={isSubmitting || !name || !email || !phone}
                                            className="w-full h-16 rounded-3xl bg-[#0066FF] disabled:opacity-50 text-white font-extrabold text-sm uppercase tracking-wider hover:bg-[#0055DD] hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 shadow-2xl shadow-[#0066FF]/20 mt-4 flex items-center justify-center"
                                        >
                                            {isSubmitting ? "Confirming..." : "Confirm Appointment"}
                                        </button>
                                    </motion.div>
                                )}
                                {isSuccess && step === 2 && (
                                    <div className="absolute inset-0 bg-[#0a0a0a] z-50 flex flex-col items-center justify-center rounded-[46.5px] p-8 text-center">
                                        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                                            <CheckCircle2 className="w-10 h-10 text-green-500" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h3>
                                        <p className="text-white/60 mb-6">We'll reach out to you to confirm your {selectedTime} slot.</p>
                                        <button onClick={() => {setIsSuccess(false); setStep(1); setName(""); setEmail(""); setPhone("");}} className="text-[#0066FF] hover:underline font-bold text-sm uppercase tracking-wider">
                                            Book Another
                                        </button>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}