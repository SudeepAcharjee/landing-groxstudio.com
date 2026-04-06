"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black relative isolate z-20 text-white pt-32 pb-12 px-6 md:px-16 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Top Section: Three Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 mb-15">
          
          {/* Column 1: Navigation */}
          <div className="flex flex-col gap-3">
            {["Home", "Works", "Services", "About", "Pricing", "Contact us"].map((item) => (
              <Link 
                key={item} 
                href="#" 
                className="text-white hover:text-white/60 text-base transition-colors w-fit font-medium"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Column 2: Follow us */}
          <div className="flex flex-col items-center">
            <h4 className="text-white text-base mb-8 font-medium">Follow us</h4>
            <div className="flex flex-col gap-1 mb-10 text-center">
              <a href="mailto:mail@studio.com" className="text-white/60 hover:text-white transition-colors text-sm">mail@studio.com</a>
              <a href="tel:+910123456789" className="text-white/60 hover:text-white transition-colors text-sm">+91 0123456789</a>
            </div>
            
            {/* Social Icons Custom SVGs */}
            <div className="flex items-center gap-4">
              {[1, 2, 3, 4].map((i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-12 h-12 rounded-[14px] bg-[#1a1a1a] flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
                >
                  {i === 1 && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="20" y1="12" x2="22" y2="12"/><line x1="2" y1="12" x2="4" y2="12"/></svg>
                  )}
                  {i === 2 && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                  )}
                  {i === 3 && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                  )}
                  {i === 4 && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="11" cy="11" r="3"/><path d="m16 16 3.5 3.5"/></svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: Address */}
          <div className="flex flex-col md:items-end md:text-right">
            <h4 className="text-white text-base mb-8 font-medium">Address</h4>
            <div className="text-white/60 text-sm leading-relaxed max-w-[200px]">
              <p>#21, North Street,</p>
              <p>Velachery,</p>
              <p>Chennai.</p>
            </div>
          </div>
        </div>

        {/* Middle Section: Legal Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 pb-10 border-t border-white/5 text-sm text-white/60 mb-0">
          <p>© {currentYear} Studio. All Rights Reserved.</p>
          <div className="md:text-center">
            <Link href="#" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
          <div className="md:text-right">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>

        {/* Bottom Section: Massive Logo */}
        <div className="relative w-full -mt-2">
          <div className="relative w-full h-[20vw] min-h-[120px] max-h-[400px]">
            <Image 
              src="/logos/Grox Ai web.png" 
              alt="Grox Studio Logo" 
              fill 
              className="object-contain object-center"
            />
          </div>
        </div>

      </div>
    </footer>
  );
}
