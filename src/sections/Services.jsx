import Section from "../components/ui/Section";
import { services } from "../data/constants";
import { motion } from "framer-motion";
import { CheckCircle2, Rocket } from "lucide-react";
import Button3D from "../components/ui/Button3D";

export default function Services() {
  return (
    <Section id="services" className="section-padding">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          What I <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Offer</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Services I provide to turn your ideas into real, working products.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="glass-card glass-card-hover p-6 md:p-8 group relative overflow-hidden"
          >
            <div
              className="absolute -top-16 -right-16 w-44 h-44 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
              style={{ backgroundColor: service.color }}
            ></div>

            <div className="relative z-10 flex items-start gap-5">
              <div
                className="w-14 h-14 rounded-xl p-2.5 flex items-center justify-center border border-white/10 shrink-0"
                style={{ backgroundColor: `${service.color}22` }}
              >
                <img
                  src={service.iconUrl}
                  alt={service.title}
                  loading="lazy"
                  decoding="async"
                  width="40"
                  height="40"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {service.desc}
                </p>
              </div>
            </div>

            <ul className="relative z-10 grid sm:grid-cols-1 gap-2 mt-2">
              {service.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-sm text-slate-300"
                >
                  <CheckCircle2 size={16} className="text-accent shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mt-12"
      >
        <Button3D href="#contact" variant="gradient" size="md">
          Start a Project <Rocket size={18} />
        </Button3D>
      </motion.div>
    </Section>
  );
}
