"use client";
import React from "react";
import { Variants, motion } from "framer-motion";
import { Search, PenTool, Rocket, BarChart3 } from "lucide-react";

const HeroSection: React.FC = () => {
  const mobileCards = [
    { title: "Discover", desc: "We analyze your current workflows and pain points.", icon: Search },
    { title: "Design", desc: "Build a tailored AI automation blueprint for your business.", icon: PenTool },
    { title: "Deploy", desc: "Implement and integrate solutions with minimal disruption.", icon: Rocket },
    { title: "Scale", desc: "Monitor, optimize, and expand automation as you grow.", icon: BarChart3 },
  ];

  const cardVariant = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    show: (i: number) => ({ opacity: 1, y: 0, scale: 1, transition: { delay: 0.14 * i, duration: 0.55, ease: "easeOut" } }),
  };

  return (
    <section className="relative w-full min-h-fit lg:min-h-[600px] bg-black py-10 px-6 md:px-12 md:pt-20 pt-10">
      <div
        className="
          px-6 pb-4 md:!px-8 lg:!px-0 lg:absolute lg:left-[101px] lg:top-[65px]
          w-full lg:w-[566px] h-auto lg:h-[201px]
          flex flex-col items-start gap-[16px]
        "
      >
        {/* count pill */}
        <div
          className="
            flex items-center justify-center gap-[10px]
            px-[20px] py-[10px]
            bg-[#0066FF]/10 border border-white/10
            rounded-[59px] w-fit
          "
        >
          <div
            className="
              w-[12px] h-[12px] rounded-full bg-[#0066FF]
              shadow-[0_0_16px_#0066FF,0_0_8.1px_#0066FF]
            "
          />
          <span className="text-[#0066FF] font-poppins font-normal text-[14px] sm:text-[16px] md:text-[20px] leading-[130%]">
            How it works
          </span>
        </div>

        {/* title */}
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 28 },
            show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="
            font-poppins font-light text-white
            text-2xl sm:text-3xl md:text-4xl lg:text-[54px]
            leading-[120%] md:leading-[69px]
            tracking-[-1px] md:tracking-[-3.69497px]
            max-w-full break-words
          "
        >
          Automation, Made Simple
        </motion.h1>
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
              Discover
            </span>
            <p className="text-[#9B96B0] font-roboto text-[16px] leading-[24px] w-[153px]">We analyze your current workflows and pain points.</p>
          </div>
        </motion.div>

        {/* Design */}
        <motion.div custom={1} variants={cardVariant as Variants} className="md:absolute md:left-[367px] md:top-[330px] w-[211px] h-[228px] flex flex-col items-center gap-2">
          <div className="flex flex-col items-center gap-2 text-center pb-5">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 font-roboto font-medium text-[18px] leading-[24px]">Design</span>
            <p className="text-[#9B96B0] font-roboto text-[16px] leading-[24px] w-[191px]">Build a tailored AI automation blueprint for your business.</p>
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
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 font-roboto font-medium text-[18px] leading-[24px]">Deploy</span>
          <p className="text-[#9B96B0] font-roboto text-[16px] leading-[24px] w-[191px] text-center">Implement and integrate solutions with minimal disruption.</p>
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
        }} className="md:absolute md:left-[1200px] md:top-[330px] w-[191px] h-[254px] flex flex-col items-center gap-2">
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 font-roboto font-medium text-[18px] leading-[24px]">Scale</span>
          <p className="text-[#9B96B0] font-roboto text-[16px] leading-[24px] w-[191px] text-center">Monitor, optimize, and expand automation as you grow.</p>
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