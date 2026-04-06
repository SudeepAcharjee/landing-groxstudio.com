"use client";

import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

const PROJECTS = [
  {
    id: "01",
    title: "Futuristic Frames",
    description:
      "Innovative designs that are stunning but also strategically aligned with the goals and values of our team and clients. We push boundaries to create immersive digital experiences.",
    image: "/images/proj-1.png",
    color: "#0066FF",
  },
  {
    id: "02",
    title: "Minimalist Vision",
    description:
      "Vision is clear to craft designs that are stunning but also strategically aligned with the goals and values of our team and clients. Focus on simplicity and clarity in every pixel.",
    image: "/images/proj-2.png",
    color: "#00FF66",
  },
  {
    id: "03",
    title: "Design Portfolio Website",
    description:
      "Portfolio reveals the core of our creative excellence and strategic design thinking applied to real-world problems. Elevating brands through meaningful design.",
    image: "/images/proj-3.png",
    color: "#FF3366",
  },
  {
    id: "04",
    title: "Organic Minimalism",
    description:
      "Exploring the intersection of technology and nature through soft, organic digital forms and intuitive user interfaces. Crafted for high-impact brand presence.",
    image: "/images/proj-4.png",
    color: "#FFCC00",
  },
  {
    id: "05",
    title: "Digital Ecosystems",
    description:
      "Building scalable digital ecosystems that connect brands with their audience in a seamless, high-performance environment. Future-proof solutions for global industries.",
    image: "/images/proj-5.png",
    color: "#9900FF",
  },
];

export default function Showcase() {
  return (
    <section className="bg-black py-10 px-6 md:px-12 md:pt-20 pt-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-white text-4xl md:text-6xl font-light tracking-tight leading-[0.9]">
          Our Creative
        </h2>
        <h3 className="font-serif italic text-4xl md:text-6xl bg-gradient-to-r from-[#0066FF] to-white bg-clip-text text-transparent mt-2">
          showcase
        </h3>
      </div>
      <StickyScroll content={PROJECTS} />
    </section>
  );
}

