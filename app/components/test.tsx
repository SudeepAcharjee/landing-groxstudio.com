"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const data = [
  {
    title: "First Section",
    description: "This is the first section content.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
  },
  {
    title: "Second Section",
    description: "This is the second section content.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  },
  {
    title: "Third Section",
    description: "This is the third section content.",
    image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
  },
  {
    title: "Fourth Section",
    description: "This is the fourth section content.",
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
  },
];

export default function StickyScroll() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Divide scroll into sections
  const imageIndex = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, 1, 2, 3, 3]
  );

  return (
    <div ref={ref} className="relative h-[300vh] bg-black text-white">
      <div className="sticky top-0 h-screen flex">
        
        {/* LEFT TEXT */}
        <div className="w-1/2 flex flex-col justify-center px-16 space-y-32">
          {data.map((item, i) => (
            <div key={i} className="h-screen flex flex-col justify-center">
              <h2 className="text-4xl font-bold mb-4">{item.title}</h2>
              <p className="text-lg text-gray-300 max-w-md">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* RIGHT IMAGE */}
        <div className="w-1/2 relative flex items-center justify-center">
          {data.map((item, i) => (
            <motion.img
              key={i}
              src={item.image}
              alt=""
              className="absolute w-[80%] h-[80%] object-cover rounded-2xl"
              style={{
                opacity: useTransform(
                  imageIndex,
                  [i - 0.5, i, i + 0.5],
                  [0, 1, 0]
                ),
              }}
            />
          ))}
        </div>

      </div>
    </div>
  );
}