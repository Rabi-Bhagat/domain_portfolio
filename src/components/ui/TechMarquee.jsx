import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Logo3D from "./Logo3D";

const techs = [
  { name: "LeetCode", icon: "https://cdn.simpleicons.org/leetcode/FFA116", color: "#FFA116" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "#61DAFB" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", color: "#339933" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", color: "#47A248" },
  { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", color: "#828282" },
  { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg", color: "#02569B" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", color: "#06B6D4" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", color: "#F7DF1E" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", color: "#3776AB" },
  { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", color: "#00599C" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", color: "#F05032" },
  { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg", color: "#FFCA28" },
];

export default function TechMarquee() {
  const doubled = [...techs, ...techs];

  return (
    <section className="relative z-10 py-10 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center gap-6"
      >
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
          <Sparkles size={14} className="text-accent" />
          Tech Stack & Problem Solving Frameworks
        </div>

        <div className="relative w-full max-w-6xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] py-2">
          <div className="marquee-track flex items-center gap-6 sm:gap-8 w-max px-5">
            {doubled.map((tech, i) => (
              <div
                key={tech.name + i}
                className="flex items-center gap-3 glass-card px-4 py-2.5 rounded-2xl whitespace-nowrap border border-slate-200 dark:border-white/10 hover:border-primary/50 dark:hover:border-white/30 transition-all duration-300 shadow-md hover:shadow-xl group"
                title={tech.name}
              >
                <Logo3D
                  src={tech.icon}
                  alt={tech.name}
                  color={tech.color}
                  size="sm"
                  showGlow={true}
                  containerClassName="shrink-0"
                />
                <span className="text-slate-800 dark:text-slate-200 font-bold text-sm group-hover:text-primary transition-colors">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
