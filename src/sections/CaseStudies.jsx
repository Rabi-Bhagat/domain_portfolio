import Section from "../components/ui/Section";
import { caseStudies } from "../data/constants";
import { motion } from "framer-motion";
import { Lightbulb, Wrench, TrendingUp, ExternalLink } from "lucide-react";

export default function CaseStudies() {
  return (
    <Section id="case-studies" className="section-padding">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          Case <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-tertiary">Studies</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          A closer look at how I approach real-world problems — from idea to shipped product.
        </p>
      </div>

      <div className="space-y-16 max-w-5xl mx-auto">
        {caseStudies.map((cs, index) => (
          <motion.div
            key={cs.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className={`flex flex-col md:flex-row gap-8 md:gap-12 items-center ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            <div className="md:w-1/2 relative group w-full">
              <div className="absolute -inset-1 bg-gradient-to-tr from-primary/30 to-secondary/30 rounded-2xl blur-lg opacity-60"></div>
              <a
                href={cs.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block rounded-2xl overflow-hidden border border-white/10 group-hover:scale-[1.02] transition-transform duration-500"
              >
                <img
                  src={cs.image}
                  alt={cs.name}
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="450"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end p-5">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-white glass-card px-4 py-2 rounded-lg">
                    View Live <ExternalLink size={15} />
                  </span>
                </div>
              </a>
            </div>

            <div className="md:w-1/2 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-accent">
                  {cs.role}
                </span>
                <h3 className="text-3xl font-bold text-white mt-1">{cs.name}</h3>
                <p className="text-sm text-slate-500 mt-1 font-mono">{cs.stack}</p>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <Lightbulb size={18} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm mb-1">The Problem</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{cs.problem}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center shrink-0">
                    <Wrench size={18} className="text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm mb-1">The Solution</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{cs.solution}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                    <TrendingUp size={18} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm mb-1">The Result</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{cs.result}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
