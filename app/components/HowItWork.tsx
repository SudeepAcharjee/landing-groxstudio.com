"use client";
import React from "react";
import { Variants, motion } from "framer-motion";
import { Search, PenTool, Rocket, BarChart3 } from "lucide-react";

const HeroSection: React.FC = () => {
  const mobileCards = [
    { title: "Idea", desc: "We refine your idea and build a strategic roadmap for success.", icon: Search },
    { title: "Build", desc: "We design and develop a fast, scalable MVP ready for market.", icon: PenTool },
    { title: "Market", desc: "We launch targeted campaigns to attract your first users.", icon: Rocket },
    { title: "Scale", desc: "We use data-driven marketing to grow your brand exponentially.", icon: BarChart3 },
  ];

  const cardVariant = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    show: (i: number) => ({ opacity: 1, y: 0, scale: 1, transition: { delay: 0.14 * i, duration: 0.55, ease: "easeOut" } }),
  };

  return (
    <section className="relative w-full min-h-fit lg:min-h-[600px] bg-black py-10 px-6 md:px-12 md:pt-20">
      <div
        className="
          px-6 pb-4 md:!px-8 lg:!px-0 lg:absolute lg:left-[101px] lg:top-[65px]
          w-full lg:w-[566px] h-auto lg:h-[201px]
          flex flex-col items-start gap-[16px]
        "
      >
        {/* count pill */}
        <div
          
        >
          <div
            className="
             
            "
          />
         
        </div>

        {/* title */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 28 },
            show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
        >
          <h2 className="text-white text-[1.75rem] xs:text-[2rem] md:text-[2.875rem] leading-[34px] xs:leading-[40px] md:leading-[50px] font-medium tracking-[-1px] text-balance">
          Our process of 
          </h2>
          <h3 className="font-serif italic text-[1.75rem] xs:text-[2rem] md:text-[2.875rem] leading-[34px] xs:leading-[40px] md:leading-[50px] font-medium tracking-[-1px] bg-gradient-to-r from-[#0066FF] to-white bg-clip-text text-transparent text-balance">
            Work at GroxStudio
          </h3>
        </motion.div>
      </div>

      {/* ---------- DESKTOP: absolute-positioned cards ---------- */}
      <motion.div initial="hidden" animate="show" className="hidden lg:block">
        {/* Discover */}
        <motion.div custom={0} className="md:absolute md:left-[84px] md:top-[330px] w-[153px] h-[226px] flex flex-col items-center gap-4">
          <div
            className="w-[115px] h-[106px] rounded-[25px] border border-white/10 shadow-[0_0_16px_rgba(0,102,255,0.4),0_0_8px_rgba(0,102,255,0.2)] bg-black/40 flex items-center justify-center backdrop-blur-sm"
          >
            <Search className="w-10 h-10 text-[#0066FF]" />
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 font-roboto font-medium text-[18px] leading-[24px]">
              Idea
            </span>
            <p className="text-[#9B96B0] font-roboto text-[16px] leading-[24px] w-[153px]">We refine your idea and build a strategic roadmap for success.</p>
          </div>
        </motion.div>

        {/* Design */}
        <motion.div custom={1} variants={cardVariant as Variants} className="md:absolute md:left-[367px] md:top-[330px] w-[211px] h-[228px] flex flex-col items-center gap-2">
          <div className="flex flex-col items-center gap-2 text-center pb-5">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 font-roboto font-medium text-[18px] leading-[24px]">Build</span>
            <p className="text-[#9B96B0] font-roboto text-[16px] leading-[24px] w-[191px]">We design and develop a fast, scalable MVP ready for market.</p>
          </div>
          <div
            className="w-[100px] h-[98px] rounded-[25px] border border-white/10 shadow-[0_0_16px_rgba(0,102,255,0.4),0_0_8px_rgba(0,102,255,0.2)] bg-black/40 flex items-center justify-center backdrop-blur-sm"
          >
            <PenTool className="w-9 h-9 text-[#0066FF]" />
          </div>
        </motion.div>

        {/* Deploy */}
        <motion.div custom={2} variants={{
          hidden: { opacity: 0, y: 28, scale: 0.8 },
          show: (i: number) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { delay: i * 0.1, duration: 0.6, ease: "easeInOut" },
          }),
        }} className="md:absolute md:left-[736px] md:top-[330px] w-[191px] h-[214px] flex flex-col items-center gap-2">
          <div
            className="w-[100px] h-[98px] rounded-[25px] border border-white/10 shadow-[0_0_16px_rgba(0,102,255,0.4),0_0_8px_rgba(0,102,255,0.2)] bg-black/40 flex items-center justify-center backdrop-blur-sm"
          >
            <Rocket className="w-9 h-9 text-[#0066FF]" />
          </div>
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 font-roboto font-medium text-[18px] leading-[24px]">Market</span>
          <p className="text-[#9B96B0] font-roboto text-[16px] leading-[24px] w-[191px] text-center">We launch targeted campaigns to attract your first users.</p>
        </motion.div>

        {/* Scale */}
        <motion.div custom={3} variants={{
          hidden: { opacity: 0, y: 20, scale: 0.8 },
          show: (i: number) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
          }),
        }} className="md:absolute md:left-[1200px] md:top-[330px] w-[191px] h-[254px] flex flex-col items-center gap-2 pr-16">
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 font-roboto font-medium text-[18px] leading-[24px]">Scale</span>
          <p className="text-[#9B96B0] font-roboto text-[16px] leading-[24px] w-[191px] text-center">We use data-driven marketing to grow your brand exponentially.</p>
          <div
            className="w-[100px] h-[98px] rounded-[25px] border border-white/10 shadow-[0_0_16px_rgba(0,102,255,0.4),0_0_8px_rgba(0,102,255,0.2)] bg-black/40 flex items-center justify-center backdrop-blur-sm"
          >
            <BarChart3 className="w-9 h-9 text-[#0066FF]" />
          </div>
        </motion.div>
      </motion.div>

      {/* ---------- MOBILE/TABLET: horizontal cards ---------- */}
      <div className="lg:hidden mt-8 px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8">
          {mobileCards.map((c, i) => (
            <motion.div
              key={c.title}
              custom={i}
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.9 },
                show: (i: number) => ({
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
                }),
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="flex flex-col items-center gap-3 bg-white/[0.02] border border-white/5 rounded-2xl md:rounded-3xl p-4 md:p-8"
            >
              <div
                className="w-12 h-12 md:w-20 md:h-20 rounded-xl md:rounded-2xl border border-white/10 shadow-[0_0_20px_rgba(0,102,255,0.3)] bg-black/40 flex items-center justify-center translate-y-2 md:translate-y-0"
              >
                <c.icon className="w-5 h-5 md:w-8 md:h-8 text-[#0066FF]" />
              </div>
              <div className="text-center space-y-1">
                <span className="text-white font-medium text-base md:text-xl">
                  {c.title}
                </span>
                <p className="text-[#9B96B0] text-[10px] md:text-base leading-relaxed max-w-full mx-auto">
                  {c.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <svg className="hidden lg:block absolute left-[237px] top-[363.5px]" width="921" height="125" viewBox="0 0 921 125" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 112C60.9571 112 62.5923 10.0001 144.352 0.499268M341.665 0.499268C399.442 0.499268 398.897 124 485.562 124M711.764 124C812.056 121.001 827.339 0.499039 920 0.499271" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="15 15" opacity="0.2" />
      </svg>
    </section>
  );
};

export default HeroSection;