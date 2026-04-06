"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

import Link from "next/link";
import React, { useRef, useState } from "react";


interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

export interface NavItem {
  name: string;
  link: string;
  subItems?: { name: string; link: string }[];
  sections?: {
    title?: string;
    items: { name: string; link: string }[];
  }[];
}

interface NavItemsProps {
  items: NavItem[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      // Use fixed by default to ensure stickiness against the viewport, sticky requires a proper scroll parent
      className={cn("fixed inset-x-0 top-0 z-40 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
            child as React.ReactElement<{ visible?: boolean }>,
            { visible },
          )
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "60%" : "100%",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      style={{
        minWidth: "min(800px, 100%)",
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-[1425px] flex-row items-center justify-between self-start rounded-full bg-transparent px-4 py-4 lg:flex dark:bg-transparent",
        visible && "bg-black/80 backdrop-blur-md border border-white/10",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-white transition duration-200 hover:text-gray-300 lg:flex lg:space-x-2",
        className,
      )}
    >
      {items.map((item, idx) => {
        const hasDropdown = (item.subItems && item.subItems.length > 0) || (item.sections && item.sections.length > 0);
        
        return (
          <div
            key={`link-container-${idx}`}
            onMouseEnter={() => setHovered(idx)}
            className="relative py-1"
          >
            <Link
              onClick={onItemClick}
              className={cn(
                "relative px-4 py-2 text-white/70 transition-colors flex items-center gap-1 group",
                hovered === idx && "text-white"
              )}
              href={item.link}
            >
              {hovered === idx && (
                <motion.div
                  layoutId="hovered"
                  className="absolute inset-0 h-full w-full rounded-full bg-white/10 backdrop-blur-sm border border-white/5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
              <span className="relative z-20">{item.name}</span>
              {hasDropdown && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={cn(
                    "relative z-20 transition-transform duration-200",
                    hovered === idx ? "rotate-180 text-white" : "text-white/70"
                  )}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              )}
            </Link>

            <AnimatePresence>
              {(hasDropdown) && hovered === idx && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className={cn(
                    "absolute top-full left-1/2 -translate-x-1/2 pt-2 z-[110]",
                    item.sections 
                      ? (item.sections.length > 1 ? "w-[650px]" : "w-[320px]") 
                      : "w-64"
                  )}
                >
                  <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-[0_20px_70px_rgba(0,0,0,0.6)] p-6">
                    {item.sections ? (
                      <div className={cn(
                        "grid gap-10",
                        item.sections.length > 1 ? "grid-cols-2" : "grid-cols-1"
                      )}>
                        {item.sections.map((section, sIdx) => (
                          <div key={`section-${sIdx}`} className="flex flex-col gap-4">
                            {section.title && (
                              <h3 className="text-[13px] uppercase tracking-[0.25em] text-zinc-500 font-bold px-4 pt-2">
                                {section.title}
                              </h3>
                            )}
                            <div className="flex flex-col gap-1">
                              {section.items.map((sub, ssIdx) => (
                                <Link
                                  key={`sub-${ssIdx}`}
                                  href={sub.link}
                                  onClick={onItemClick}
                                  className="block px-4 py-3 text-[17px] font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/80 rounded-2xl transition-all duration-200"
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        {item.subItems?.map((sub, sIdx) => (
                          <Link
                            key={`sub-${sIdx}`}
                            href={sub.link}
                            onClick={onItemClick}
                            className="block px-4 py-3 text-[17px] font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/80 rounded-2xl transition-all duration-200"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <div
      className={cn(
        "relative z-50 mx-auto flex w-full flex-col items-center justify-between bg-transparent px-0 py-2 lg:hidden transition-all duration-300",
        visible && "bg-black/80 backdrop-blur-md dark:bg-neutral-950/80",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "fixed inset-x-0 top-0 z-[70] flex w-full flex-row items-center justify-between px-6 py-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "absolute inset-x-0 top-0 h-screen z-[60] flex w-full flex-col items-center justify-center gap-8 bg-black px-4",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return isOpen ? (
    <IconX className="text-white" onClick={onClick} />
  ) : (
    <IconMenu2 className="text-white" onClick={onClick} />
  );
};

export const NavbarLogo = () => {
  return (
    <a
      href="/"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1"
    >
      <img
        src="/logos/navlogo.png"
        alt="Grox Logo"
        width={70}
        className="object-contain brightness-0 invert"
        style={{ height: "auto" }}
      />
    </a>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
    | React.ComponentPropsWithoutRef<"a">
    | React.ComponentPropsWithoutRef<"button">
  )) => {
  const baseStyles =
    "px-4 py-2 rounded-md font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center text-sm";

  const variantStyles = {
    primary:
      "bg-white text-black shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    secondary: "bg-transparent shadow-none text-white",
    dark: "bg-zinc-950 text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    gradient:
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};
