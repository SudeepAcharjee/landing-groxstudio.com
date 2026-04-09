"use client";

import {
  Navbar as AceternityNavbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
  NavItem,
} from "@/components/ui/resizable-navbar";

import {
  useScroll,
  useMotionValueEvent,
  motion,
  AnimatePresence,
} from "framer-motion";

import { useState } from "react";
import Image from "next/image";
import { Josefin_Sans, Noto_Sans } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  display: "swap",
});

/* =========================
   ✅ FIXED LOGO COMPONENT
   ========================= */
const CustomLogo = () => (
  <Link href="/" className="flex items-center gap-2 group">
    <Image
      src="/logos/navlogo.png"
      alt="Grovio Logo"
      width={0}
      height={0}
      sizes="100vw"
      className="w-[65px] h-auto object-contain brightness-0 invert"
      priority
    />
  </Link>
);

export default function Navbar() {
  const navItems: NavItem[] = [
    { name: "About Us", link: "/about" },
    { name: "Services", link: "/our-services" },
    { name: "Our Works", link: "/our-works" },
    { name: "Testimonials", link: "#testimonials" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesExpanded, setIsServicesExpanded] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);

  /* =========================
     ✅ FIXED SCROLL HANDLING
     ========================= */
  const { scrollY } = useScroll(); // safe after layout fix

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 100);
  });

  if (pathname.startsWith("/leads")) return null;

  return (
    <div className={`relative w-full ${josefin.className}`}>
      <AceternityNavbar className="z-[100]">
        {/* ================= DESKTOP ================= */}
        <NavBody className="py-2 px-6">
          <div className="flex items-center gap-2">
            <CustomLogo />
          </div>

          <NavItems
            items={navItems}
            className={`text-[17px] font-medium text-white hover:text-gray-300 transition-colors ${notoSans.className}`}
          />

          <div className="flex items-center gap-4">
            <Link
              href="#booking"
              className="group relative flex items-center justify-between bg-white/[0.03] border border-white/10 hover:border-[#0066FF]/30 p-1.5 rounded-full transition-all duration-500 overflow-hidden min-w-[170px]"
            >
              {/* Animated BG */}
              <div className="absolute left-1.5 top-1.5 bottom-1.5 w-8 bg-[#0066FF] rounded-full group-hover:w-[calc(100%-12px)] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] z-0 shadow-[0_0_20px_rgba(0,102,255,0.3)]" />

              <div className="relative z-10 flex items-center w-full">
                <div className="flex items-center justify-center w-8 h-8 rounded-full">
                  <ArrowUpRight className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-500" />
                </div>

                <div className="flex-1 text-center pr-3 pl-1">
                  <span
                    className={`text-white text-[17px] font-medium tracking-tight ${notoSans.className}`}
                  >
                    Book a Call
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </NavBody>

        {/* ================= MOBILE ================= */}
        <MobileNav>
          <MobileNavHeader
            className={`${
              isScrolled
                ? "bg-black/90 backdrop-blur-md border-b border-white/5 shadow-2xl"
                : "bg-transparent"
            } transition-all duration-300`}
          >
            <CustomLogo />

            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            className={!isScrolled ? "backdrop-blur-none bg-black" : ""}
          >
            {navItems.map((item, idx) => {
              return (
                <div key={idx} className="w-full text-center">
                  <Link
                    href={item.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-neutral-300 hover:text-white block py-2 text-lg ${notoSans.className}`}
                  >
                    {item.name}
                  </Link>
                </div>
              );
            })}

            {/* CTA */}
            <div className="flex w-full flex-col gap-4 mt-8 px-4 items-center">
              <Link
                href="#booking"
                onClick={() => setIsMobileMenuOpen(false)}
                className="group relative flex items-center justify-between bg-white/[0.03] border border-white/10 hover:border-[#0066FF]/30 p-1.5 rounded-full transition-all duration-500 overflow-hidden w-[220px]"
              >
                <div className="absolute left-1.5 top-1.5 bottom-1.5 w-10 bg-[#0066FF] rounded-full group-hover:w-[calc(100%-12px)] transition-all duration-500" />

                <div className="relative z-10 flex items-center w-full">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full">
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </div>

                  <div className="flex-1 text-center pr-3 pl-1">
                    <span
                      className={`text-white text-[17px] font-medium ${notoSans.className}`}
                    >
                      Book a Call
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </AceternityNavbar>
    </div>
  );
}