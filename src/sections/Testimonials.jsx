import Section from "../components/ui/Section";
import { testimonials } from "../data/constants";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function Testimonials() {
  return (
    <Section id="testimonials" className="section-padding">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          What People <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-primary">Say</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Kind words from clients, colleagues and mentors.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((t, index) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="glass-card glass-card-hover p-6 md:p-8 relative overflow-hidden flex flex-col"
          >
            <Quote
              size={40}
              className="absolute top-4 right-4 opacity-10"
              style={{ color: t.color }}
            />
            <p className="text-slate-300 leading-relaxed mb-8 flex-grow">
              "{t.quote}"
            </p>
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shrink-0"
                style={{ backgroundColor: t.color }}
              >
                {t.name.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-white">{t.name}</div>
                <div className="text-sm text-slate-500">{t.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
