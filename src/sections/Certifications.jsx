import Section from "../components/ui/Section";
import { certifications } from "../data/constants";
import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";

export default function Certifications() {
  return (
    <Section id="certifications" className="section-padding">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
          Certifications &{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-secondary">
            Achievements
          </span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg">
          Professional training and internships that shaped my skills.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {certifications.map((cert, index) => (
          <motion.a
            key={cert.title + cert.org}
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="glass-card glass-card-hover p-6 md:p-8 flex items-start gap-5 group relative overflow-hidden"
          >
            <div
              className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
              style={{ backgroundColor: cert.color }}
            ></div>

            <div
              className="relative z-10 w-14 h-14 rounded-xl flex items-center justify-center border border-slate-200 dark:border-white/10 shrink-0"
              style={{ backgroundColor: `${cert.color}22` }}
            >
              {cert.iconUrl ? (
                <img
                  src={cert.iconUrl}
                  alt={cert.org}
                  loading="lazy"
                  decoding="async"
                  width="32"
                  height="32"
                  className="w-8 h-8 object-contain"
                />
              ) : (
                <Award size={28} style={{ color: cert.color }} />
              )}
            </div>

            <div className="relative z-10 flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: cert.color }}>
                  {cert.org}
                </span>
                <span className="text-xs text-slate-500">{cert.date}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                {cert.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">
                {cert.desc}
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline underline-offset-4 decoration-accent/50">
                View Credential <ExternalLink size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </Section>
  );
}
