import Section from "../components/ui/Section";
import { experience } from "../data/constants";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";

export default function Experience() {
  return (
    <Section id="experience" className="section-padding">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
          Education & Academics
        </h2>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-lg">
          Academic foundation and computer science engineering degree.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4">
        {experience.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card glass-card-hover p-6 md:p-10 group rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl relative overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-60 h-60 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3.5">
                <div className="p-3.5 rounded-2xl bg-secondary/10 text-secondary border border-secondary/20 shrink-0">
                  <GraduationCap size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                    {item.role}
                  </h3>
                  <h4 className="text-slate-700 dark:text-slate-300 font-semibold text-base">
                    {item.company}
                  </h4>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 text-xs font-bold text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20 shrink-0">
                <Calendar size={14} />
                <span>{item.date}</span>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mb-8">
              {item.desc}
            </p>

            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Key Subjects & Core Technical Areas
              </span>
              <div className="flex flex-wrap gap-2.5">
                {item.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800/90 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/80 shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
