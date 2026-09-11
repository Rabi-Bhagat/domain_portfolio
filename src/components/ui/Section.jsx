import { motion } from "framer-motion";

export default function Section({ id, children, className = "" }) {
  return (
    <section
      id={id}
      className={`min-h-screen w-full flex flex-col justify-center items-center px-4 sm:px-6 md:px-12 py-16 md:py-24 relative z-10 ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl w-full"
      >
        {children}
      </motion.div>
    </section>
  );
}
