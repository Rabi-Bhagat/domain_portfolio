import Section from "../components/ui/Section";
import { motion } from "framer-motion";
import profilePic from "../assets/profile-pic.jpg";

export default function About() {
  return (
    <Section id="about" className="py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="space-y-8">
          <motion.div
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
          >
             <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                About <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-accent">Me</span>
             </h2>
             
             <div className="glass-card p-8 space-y-5 text-slate-300 text-lg leading-relaxed shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10"></div>
                
                <p>
                  I’m a dedicated developer pursuing my <span className="text-white font-semibold">B.Tech in CSE (2023–2027)</span> at Maharishi Markandeshwar University.
                </p>
                <p>
                  My passion lies in building responsive, user-centric web and mobile applications. 
                  I specialize in <span className="text-primary font-bold">Flutter, Python, and Modern Web Technologies</span>.
                </p>
                <p>
                  I’m driven by curiosity, always learning new technologies to create innovative solutions that solve real-world problems.
                </p>
             </div>
          </motion.div>
        </div>

        {/* Visual/Image */}
        <motion.div 
            className="relative flex justify-center mt-12 md:mt-0"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <div className="relative w-64 h-64 md:w-80 md:h-80 group">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary to-purple-600 rounded-[2rem] rotate-6 opacity-60 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"></div>
                <div className="absolute inset-0 bg-gradient-to-bl from-secondary to-accent rounded-[2rem] -rotate-6 opacity-60 group-hover:opacity-100 transition-opacity duration-500 blur-2xl delay-100"></div>
                
                <div className="absolute inset-2 bg-slate-900 rounded-[1.5rem] border-2 border-white/20 overflow-hidden z-10 shadow-[0_0_40px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_60px_rgba(59,130,246,0.3)] transition-all duration-500 relative">
                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-20"></div>
                     <img 
                        src={profilePic} 
                        alt="Rabi Bhagat" 
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                     />
                </div>
            </div>
        </motion.div>
      </div>
    </Section>
  );
}
