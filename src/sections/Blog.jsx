import Section from "../components/ui/Section";
import { blogPosts } from "../data/constants";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";

export default function Blog() {
  return (
    <Section id="insights" className="section-padding">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          Latest <span className="bg-clip-text text-transparent bg-gradient-to-r from-tertiary to-accent">Insights</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Notes, learnings and behind-the-scenes of what I build.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {blogPosts.map((post, index) => (
          <motion.a
            key={post.title}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="glass-card glass-card-hover p-6 md:p-8 group relative overflow-hidden flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">
                {post.tag}
              </span>
              <span className="text-xs text-slate-500">{post.date}</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors flex items-start gap-2">
              {post.title}
              <ArrowUpRight
                size={18}
                className="shrink-0 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-accent"
              />
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-grow">
              {post.excerpt}
            </p>
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
              <Clock size={13} /> {post.readTime}
            </span>
          </motion.a>
        ))}
      </div>
    </Section>
  );
}
