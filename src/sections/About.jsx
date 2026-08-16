import Section from "../components/ui/Section";
import { motion } from "framer-motion";
import profilePic from "../assets/profile-pic.jpg";
import { GraduationCap, Code2, Rocket, Award } from "lucide-react";

export default function About() {
  const highlights = [
    {
      icon: GraduationCap,
      title: "B.Tech in CSE",
      subtitle: "2023 - 2027 • MMU",
      color: "text-blue-500"
    },
    {
      icon: Code2,
      title: "MERN & Flutter",
      subtitle: "Full-Stack & Mobile",
      color: "text-emerald-500"
    },
    {
      icon: Rocket,
      title: "9+ Built Projects",
      subtitle: "Web, APIs & Mobile",
      color: "text-purple-500"
    },
    {
      icon: Award,
      title: "Multiple Internships",
      subtitle: "CodeAlpha & CodSoft",
      color: "text-amber-500"
    }
  ];

  return (
    <Section id="about" className="py-20 relative">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
        {/* Left Column: Text & Metrics */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              About <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-accent">Me</span>
            </h2>

            <div className="glass-card p-6 md:p-8 space-y-5 text-slate-600 dark:text-slate-300 text-lg leading-relaxed shadow-xl relative overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

              <p>
                I am a passionate software developer currently pursuing my <span className="text-slate-900 dark:text-white font-bold">B.Tech in Computer Science & Engineering (2023–2027)</span> at Maharishi Markandeshwar University.
              </p>

              <p>
                My focus centers on engineering responsive, high-performance web applications and mobile solutions. I specialize in the <span className="text-primary font-bold">MERN Stack (MongoDB, Express.js, React, Node.js)</span> alongside <span className="text-accent font-bold">Flutter, Python, and C++</span>.
              </p>

              <p>
                I love turning complex problems into elegant, user-friendly digital products with clean architectures and interactive experiences.
              </p>
            </div>
          </motion.div>

          {/* Metric Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="glass-card p-4 rounded-2xl border border-slate-200 dark:border-white/10 flex items-center gap-3">
                  <div className={`p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 ${item.color} shrink-0`}>
                    <Icon size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">{item.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{item.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Right Column: Profile Visual */}
        <motion.div
          className="relative flex justify-center lg:justify-end"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative w-72 h-72 sm:w-88 sm:h-88 md:w-96 md:h-96 group">
            {/* Background Glow Orbs */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary via-purple-600 to-accent rounded-[2.5rem] rotate-6 opacity-60 group-hover:opacity-90 transition-opacity duration-500 blur-2xl"></div>
            <div className="absolute inset-0 bg-gradient-to-bl from-secondary to-accent rounded-[2.5rem] -rotate-6 opacity-60 group-hover:opacity-90 transition-opacity duration-500 blur-2xl delay-100"></div>

            {/* Picture Frame */}
            <div className="absolute inset-2 bg-slate-100 dark:bg-slate-900 rounded-[2rem] border-2 border-slate-300 dark:border-white/20 overflow-hidden z-10 shadow-2xl transition-all duration-500 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent z-20 pointer-events-none"></div>
              <img
                src={profilePic}
                alt="Rabi Bhagat"
                loading="lazy"
                decoding="async"
                width="640"
                height="800"
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-4 left-4 right-4 z-30 p-3 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10 text-white text-center">
                <span className="font-bold text-sm block">Rabi Bhagat</span>
                <span className="text-xs text-slate-300">Full-Stack Engineer</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
