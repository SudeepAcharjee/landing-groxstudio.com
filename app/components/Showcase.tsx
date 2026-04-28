"use client";

import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

const PROJECTS = [
  {
    id: "01",
    title: "App/web development",
    description:
      "We build websites, landing pages, and MVPs that are clean, fast, and built to grow with your business. You bring the idea. We handle the rest.",
    image: "/images/4.png",
    color: "#0066FF",
  },
  {
    id: "02",
    title: "Branding & Design",
    description:
      "From brand identity to social creatives, packaging to pitch decks — we create visuals that stop the scroll, build instant trust, and make your brand impossible to ignore.",
    image: "/images/3.png",
    color: "#00FF66",
  },
  {
    id: "03",
    title: "Social media management",
    description:
      "We handle everything — scripting, shooting, editing, posting, and engagement. You stay focused on your business. We keep your audience growing.",
    image: "/images/2.png",
    color: "#FF3366",
  },
  {
    id: "04",
    title: "Performance marketing",
    description:
      "We create Meta and Google ad campaigns with sharp creatives, tested hooks, and clear strategy. Every rupee you spend is tracked, optimized, and working toward real returns.",
    image: "/images/1.png",
    color: "#FFCC00",
  },
];

export default function Showcase() {
  const showcaseHeader = (
    <div>
      <h2 className="text-white text-[1.75rem] xs:text-[2rem] md:text-[2.875rem] leading-[34px] xs:leading-[40px] md:leading-[50px] font-medium tracking-[-1px] text-balance ">
        Our Portfolio
      </h2>
      <h3 className="font-serif italic text-[1.75rem] xs:text-[2rem] md:text-[2.875rem] leading-[34px] xs:leading-[40px] md:leading-[50px] font-medium tracking-[-1px] bg-gradient-to-r from-[#0066FF] to-white bg-clip-text text-transparent text-balance">
        showcase
      </h3>
    </div>
  );

  return (
    <section id="our-works" className="bg-black py-0">
      <StickyScroll content={PROJECTS} header={showcaseHeader} />
    </section>
  );
}

