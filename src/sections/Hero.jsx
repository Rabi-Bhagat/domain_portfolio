import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown, Download } from "lucide-react";
import Section from "../components/layout/Section";
import Button3D from "../components/ui/Button3D";
import Magnetic from "../components/ui/Magnetic";
import Logo3D from "../components/ui/Logo3D";
import Typewriter from "../components/ui/Typewriter";
import CountUp from "../components/ui/CountUp";
import { heroRoles, resumeUrl, socialLinks, stats } from "../data/constants";

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <Section id="home" className="overflow-hidden pt-28 pb-14 sm:pt-32 md:pb-20">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.h1
          initial="hidden"
          animate="show"
          variants={{
            show: { transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: 0.1 } },
          }}
          className="font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl"
        >
          {["Rabi", "Prasad", "Bhagat"].map((word, index) => (
            <motion.span
              key={word}
              variants={{
                hidden: { opacity: 0, y: 28 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={`mr-3 inline-block last:mr-0 ${
                index === 2 ? "text-primary" : ""
              }`}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-base sm:text-lg"
        >
          <span className="text-slate-500 dark:text-slate-400">I build as a</span>
          <Typewriter words={heroRoles} className="font-semibold text-primary" />
        </motion.div>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg"
        >
          I&apos;m a Computer Science & Engineering student at Maharishi Markandeshwar
          University, focused on building clean, high-performance web applications and
          dependable backend systems. I care about thoughtful interfaces, solid
          architecture, and the details that make software feel effortless.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Magnetic className="w-full sm:w-auto">
            <Button3D href="#projects" variant="primary" size="lg" glow className="w-full sm:w-auto">
              Explore Projects
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button3D>
          </Magnetic>

          <Button3D
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto"
          >
            Download Resume <Download className="h-4 w-4" />
          </Button3D>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          {socialLinks.map((social) => (
            <div key={social.name} className="group/social flex flex-col items-center gap-1">
              <Logo3D
                src={social.iconUrl}
                alt={social.name}
                color={social.color}
                size="lg"
                href={social.link}
                showGlow
              />
              <span className="text-[11px] font-semibold text-slate-600 transition-colors group-hover/social:text-primary dark:text-slate-400">
                {social.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.7 }}
        className="mx-auto mt-14 grid max-w-3xl grid-cols-3 gap-3 sm:gap-6"
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="glass-card rounded-2xl px-2 py-4 text-center shadow-lg sm:px-4 sm:py-5"
          >
            <div className="font-display text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl md:text-4xl">
              <CountUp value={stat.value} suffix={stat.suffix} />
            </div>
            <div className="mt-1 text-[10px] font-medium leading-snug text-slate-600 dark:text-slate-300 sm:text-xs md:text-sm">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="mt-12 flex justify-center"
      >
        <button
          type="button"
          onClick={() =>
            document.getElementById("about")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" })
          }
          className="group flex flex-col items-center gap-1.5 rounded-xl text-slate-500 transition-colors hover:text-slate-900 focus-ring dark:text-slate-400 dark:hover:text-white"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.25em]">Scroll to explore</span>
          <motion.span
            animate={reduce ? undefined : { y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300/70 dark:border-white/15"
          >
            <ChevronDown size={16} />
          </motion.span>
        </button>
      </motion.div>
    </Section>
  );
}
