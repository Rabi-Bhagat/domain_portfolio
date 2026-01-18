import { motion } from "framer-motion";
import Section from "../components/ui/Section";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <Section id="home" className="pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      <div className="flex flex-col items-center justify-center text-center z-10 relative">
        
        {/* Ambient Glows */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50 animate-pulse-slow"></div>
        <div className="absolute top-20 -right-40 w-96 h-96 bg-secondary/20 rounded-full blur-3xl opacity-50 animate-pulse-slow animation-delay-2000"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 relative"
        >
            <div className="inline-block px-4 py-1.5 mb-6 border border-white/10 rounded-full bg-slate-900/50 backdrop-blur-sm text-sm font-medium text-slate-300">
                🚀 Available for freelance work
            </div>

          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight leading-tight">
            Building <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-gradient-x">
              Digital Reality
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xl md:text-2xl text-slate-400 font-light max-w-2xl px-4 leading-relaxed mb-10"
        >
          I am <span className="text-white font-semibold">Rabi Bhagat</span>, a Full-Stack Developer crafting intuitive, high-performance web & mobile experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-6"
        >
          <a
            href="#projects"
            className="group relative px-8 py-4 bg-primary hover:bg-blue-600 text-white font-bold rounded-full transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 flex items-center justify-center gap-2 overflow-hidden"
          >
            <span className="relative z-10">View Projects</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
          <a
            href="#contact"
            className="px-8 py-4 bg-slate-900/50 border border-white/10 hover:border-white/30 text-white font-bold rounded-full transition-all backdrop-blur-sm hover:bg-slate-800/50 flex items-center justify-center"
          >
            Contact Me
          </a>
        </motion.div>
      </div>
    </Section>
  );
}
