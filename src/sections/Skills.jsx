import Section from "../components/ui/Section";
import { skills } from "../data/constants";
import { motion } from "framer-motion";

export default function Skills() {
  return (
    <Section id="skills" className="pb-20 relative z-10">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          My <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Skills</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          A collection of technologies I use to build performant applications.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 px-4">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            viewport={{ once: true }}
            className="glass-card p-6 flex flex-col items-center justify-center hover:bg-slate-800/80 transition-all duration-300 group hover:-translate-y-1 hover:shadow-primary/20 hover:shadow-lg"
          >
            <div className="w-14 h-14 mb-4 relative flex items-center justify-center">
              <img 
                src={skill.iconUrl} 
                alt={skill.name} 
                className="w-full h-full object-contain filter group-hover:brightness-125 transition-all duration-300"
              />
            </div>
            <h3 className="text-slate-200 font-medium text-lg group-hover:text-white transition-colors">{skill.name}</h3>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
