import Section from "../components/ui/Section";
import { experience } from "../data/constants";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";

export default function Experience() {
  return (
    <Section id="experience" className="section-padding">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          Experience & <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-tertiary">Education</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          My academic and professional journey.
        </p>
      </div>

      <div className="max-w-3xl mx-auto relative px-4">
        {/* Timeline Line (Vertical) */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-800 -translate-x-1/2 md:translate-x-0"></div>

        <div className="space-y-12">
            {experience.map((item, index) => (
                <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className={`relative flex flex-col md:flex-row gap-8 ${
                        index % 2 === 0 ? "md:flex-row-reverse" : ""
                    }`}
                >
                    {/* Timeline Dot */}
                    <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-slate-900 -translate-x-1/2 md:translate-x-1/2 mt-6 z-10 shadow-[0_0_10px_rgba(14,165,233,0.5)]"></div>

                    {/* Content Card */}
                    <div className="ml-12 md:ml-0 md:w-1/2 glass-card p-6 md:p-8 hover:bg-slate-800/60 transition-colors group">
                        <div className="flex items-center gap-3 mb-2">
                             {item.role.includes("Student") || item.role.includes("B.Tech") ? (
                                <GraduationCap className="text-secondary" size={24} />
                             ) : (
                                <Briefcase className="text-primary" size={24} />
                             )}
                             <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{item.role}</h3>
                        </div>
                        <h4 className="text-slate-300 font-medium mb-4">{item.company}</h4>
                        <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                            <Calendar size={14} />
                            <span>{item.date}</span>
                        </div>
                        <p className="text-slate-400 mb-4 leading-relaxed">
                            {item.desc}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {item.skills.map((skill) => (
                                <span key={skill} className="px-2 py-1 bg-slate-900/50 rounded text-xs text-slate-300 border border-slate-700">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </Section>
  );
}
