"use client";

import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

const PROJECTS = [
  {
    id: "01",
    title: "Futuristic Frames",
    description:
      "Innovative designs that are stunning but also strategically aligned with the goals and values of our team and clients. We push boundaries to create immersive digital experiences.",
    image: "/images/1.png",
    color: "#0066FF",
  },
  {
    id: "02",
    title: "Minimalist Vision",
    description:
      "Vision is clear to craft designs that are stunning but also strategically aligned with the goals and values of our team and clients. Focus on simplicity and clarity in every pixel.",
    image: "/images/2.png",
    color: "#00FF66",
  },
  {
    id: "03",
    title: "Design Portfolio Website",
    description:
      "Portfolio reveals the core of our creative excellence and strategic design thinking applied to real-world problems. Elevating brands through meaningful design.",
    image: "/images/3.png",
    color: "#FF3366",
  },
  {
    id: "04",
    title: "Organic Minimalism",
    description:
      "Exploring the intersection of technology and nature through soft, organic digital forms and intuitive user interfaces. Crafted for high-impact brand presence.",
    image: "/images/4.png",
    color: "#FFCC00",
  },
];

export default function Showcase() {
  const showcaseHeader = (
    <div>
      <h2 className="text-white text-[1.75rem] xs:text-[2rem] md:text-[2.875rem] leading-[34px] xs:leading-[40px] md:leading-[50px] font-medium tracking-[-1px] text-balance ">
        Our Creative
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

