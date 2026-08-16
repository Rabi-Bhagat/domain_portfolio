import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Section from "../components/ui/Section";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import Button3D from "../components/ui/Button3D";
import { heroRoles, stats, socialLinks } from "../data/constants";

function useTypewriter(words, typeSpeed = 80, deleteSpeed = 40, pause = 1800) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];

    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }

    if (deleting && text === "") {
      const t = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      }, typeSpeed);
      return () => clearTimeout(t);
    }

    const t = setTimeout(
      () => {
        setText(
          deleting
            ? current.slice(0, text.length - 1)
            : current.slice(0, text.length + 1),
        );
      },
      deleting ? deleteSpeed : typeSpeed,
    );

    return () => clearTimeout(t);
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pause]);

  return text;
}

export default function Hero() {
  const typedRole = useTypewriter(heroRoles);

  return (
    <Section
      id="home"
      className="pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden"
    >
      <div className="flex flex-col items-center justify-center text-center z-10 relative">
        {/* Ambient Glows */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50 animate-pulse-slow pointer-events-none"></div>
        <div className="absolute top-20 -right-40 w-96 h-96 bg-secondary/20 rounded-full blur-3xl opacity-50 animate-pulse-slow animation-delay-2000 pointer-events-none"></div>

        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs md:text-sm font-semibold shadow-lg shadow-emerald-500/5 backdrop-blur-md"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
          <span>Available for Roles & Freelance Projects</span>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6 relative max-w-4xl"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
            Engineering <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-gradient-x bg-[length:200%_auto]">
              Digital Experiences
            </span>
          </h1>
        </motion.div>

        {/* Typewriter Roles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg sm:text-2xl md:text-3xl text-slate-700 dark:text-slate-200 font-semibold font-mono mb-4 min-h-[2em] flex items-center justify-center gap-1"
        >
          <span className="text-accent">&gt;</span>
          <span className="text-slate-900 dark:text-white">{typedRole}</span>
          <span className="caret-blink text-primary font-bold">|</span>
        </motion.div>

        {/* Bio Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg md:text-xl text-slate-600 dark:text-slate-300 font-normal max-w-2xl px-4 leading-relaxed mb-10"
        >
          Hi, I am <span className="text-slate-900 dark:text-white font-bold">Rabi Bhagat</span> — a B.Tech Computer Science student specializing in building high-impact full-stack web applications, scalable backends, and mobile apps.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-6 mb-12"
        >
          <Button3D href="#projects" variant="primary" size="lg">
            Explore Live Demos
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button3D>
          <Button3D href="#contact" variant="secondary" size="lg">
            Get In Touch
          </Button3D>
        </motion.div>

        {/* Social Links Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="flex gap-4 mb-14"
        >
          {socialLinks.map((social) => (
            <motion.a
              key={social.name}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -4 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="w-12 h-12 rounded-2xl glass-card flex items-center justify-center border-slate-200 dark:border-white/10 hover:border-primary/50 dark:hover:border-white/30 shadow-lg transition-colors group"
              title={social.name}
              aria-label={social.name}
            >
              <img
                src={social.iconUrl}
                alt={social.name}
                loading="lazy"
                decoding="async"
                width="22"
                height="22"
                className="w-5 h-5 object-contain transition-transform group-hover:scale-110 invert dark:invert-0"
              />
            </motion.a>
          ))}
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="grid grid-cols-3 gap-4 md:gap-8 w-full max-w-xl px-2"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass-card px-4 py-5 rounded-2xl text-center border border-slate-200/80 dark:border-white/10 shadow-lg"
            >
              <div className="text-3xl md:text-4xl font-black text-gradient">
                {stat.value}
                {stat.suffix}
              </div>
              <div className="text-xs md:text-sm text-slate-600 dark:text-slate-300 font-medium mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
            onClick={() =>
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <span className="text-xs font-semibold tracking-widest uppercase">Scroll Down</span>
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}
