import { motion } from "framer-motion";

export default function Section({ id, children, className = "" }) {
  return (
    <section
      id={id}
      className={`min-h-screen w-full flex flex-col justify-center items-center px-6 py-20 relative z-10 ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-6xl w-full"
      >
        {children}
      </motion.div>
    </section>
  );
}
