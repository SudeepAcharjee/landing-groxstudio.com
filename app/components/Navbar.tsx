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
import { useScroll, useMotionValueEvent, motion, AnimatePresence } from "framer-motion";
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

// Custom Logo Component moved outside to prevent re-creation during render
const CustomLogo = () => (
  <Link href="/" className="flex items-center gap-2 group">
    <Image
      src="/logos/navlogo.png"
      alt="Grovio Logo"
      width={100}
      height={32}
      className="object-contain brightness-0 invert"
      priority
    />
  </Link>
);

export default function Navbar() {
  const navItems: NavItem[] = [
    {
      name: "About Us",
      link: "/about",
    },
    {
      name: "Services",
      link: "/our-services",
    },
    {
      name: "Our Works",
      link: "/our-works",
    },
    {
      name: "Testimonials",
      link: "#testimonials",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesExpanded, setIsServicesExpanded] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 100);
  });

  if (pathname.startsWith('/leads')) return null;

  return (
    <div className={`relative w-full ${josefin.className}`}>
      <AceternityNavbar className="z-[100]">
        {/* Desktop Navigation */}
        <NavBody className="py-2 px-6">
          <div className="flex items-center gap-2">
            <CustomLogo />
          </div>

          <NavItems items={navItems} className={`text-[17px] font-medium text-white hover:text-gray-300 transition-colors ${notoSans.className}`} />

          <div className="flex items-center gap-4">
            {/* Contact Us Button - Styled as requested */}
            {/* Book a Call Button - Styled exactly as requested */}
            <Link
              href="#booking"
              className="group relative flex items-center justify-between bg-white/[0.03] border border-white/10 hover:border-[#0066FF]/30 p-1.5 rounded-full transition-all duration-500 overflow-hidden min-w-[170px]"
            >
              {/* Expanding Background from the icon circle */}
              <div className="absolute left-1.5 top-1.5 bottom-1.5 w-8 bg-[#0066FF] rounded-full group-hover:w-[calc(100%-12px)] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] z-0 shadow-[0_0_20px_rgba(0,102,255,0.3)]" />

              <div className="relative z-10 flex items-center w-full">
                <div className="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden transition-all duration-500">
                  <ArrowUpRight className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-1 text-center pr-3 pl-1">
                  <span className={`text-white text-[17px] font-medium tracking-tight select-none ${notoSans.className}`}>
                    Book a Call
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader className={`${isScrolled ? "bg-black/90 backdrop-blur-md border-b border-white/5 shadow-2xl" : "bg-transparent"} transition-all duration-300`}>
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
              const hasDropdown = item.sections && item.sections.length > 0;
              const isExpanded = item.name === "Services" && isServicesExpanded;

              return (
                <div key={`mobile-link-container-${idx}`} className="w-full text-center">
                  {hasDropdown ? (
                    <div className="flex flex-col items-center">
                      <button
                        onClick={() => setIsServicesExpanded(!isServicesExpanded)}
                        className={`flex items-center gap-2 text-neutral-300 hover:text-white py-2 text-lg ${notoSans.className}`}
                      >
                        <span>{item.name}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </button>
                      <AnimatePresence mode="wait">
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden w-full flex flex-col items-center bg-white/5 rounded-2xl mt-2 py-2 gap-2"
                          >
                            {item.sections?.map((section, sIdx) => {
                              const sectionLabel = section.title || (sIdx === 0 ? "Marketing" : "Software Development");
                              const isSectionExpanded = expandedSection === sectionLabel;

                              return (
                                <div key={`mob-sec-${sIdx}`} className="w-full flex flex-col items-center">
                                  <button
                                    onClick={() => setExpandedSection(isSectionExpanded ? null : sectionLabel)}
                                    className="w-full py-3 flex items-center justify-center gap-2 text-zinc-500 font-bold uppercase tracking-widest text-[11px]"
                                  >
                                    {sectionLabel}
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="14"
                                      height="14"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className={`transition-transform duration-200 ${isSectionExpanded ? "rotate-180" : ""}`}
                                    >
                                      <path d="m6 9 6 6 6-6" />
                                    </svg>
                                  </button>
                                  <AnimatePresence>
                                    {isSectionExpanded && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden flex flex-col items-center gap-2 pb-4"
                                      >
                                        {section.items.map((sub, ssIdx) => (
                                          <Link
                                            key={`mob-sub-${ssIdx}`}
                                            href={sub.link}
                                            onClick={() => {
                                              setIsMobileMenuOpen(false);
                                              setIsServicesExpanded(false);
                                              setExpandedSection(null);
                                            }}
                                            className="text-neutral-400 hover:text-white py-1 text-sm"
                                          >
                                            {sub.name}
                                          </Link>
                                        ))}
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.link}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`relative text-neutral-300 hover:text-white block py-2 text-lg ${notoSans.className}`}
                    >
                      <span className="block">{item.name}</span>
                    </Link>
                  )}
                </div>
              );
            })}
            <div className="flex w-full flex-col gap-4 mt-8 px-4 items-center">
              <Link
                href="#booking"
                onClick={() => setIsMobileMenuOpen(false)}
                className="group relative flex items-center justify-between bg-white/[0.03] border border-white/10 hover:border-[#0066FF]/30 p-1.5 rounded-full transition-all duration-500 overflow-hidden w-[220px]"
              >
                <div className="absolute left-1.5 top-1.5 bottom-1.5 w-10 bg-[#0066FF] rounded-full group-hover:w-[calc(100%-12px)] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] z-0 shadow-[0_0_20px_rgba(0,102,255,0.3)]" />

                <div className="relative z-10 flex items-center w-full">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden transition-all duration-500">
                    <ArrowUpRight className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex-1 text-center pr-3 pl-1">
                    <span className={`text-white text-[17px] font-medium tracking-tight select-none ${notoSans.className}`}>
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
