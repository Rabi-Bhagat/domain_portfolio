import { useState } from "react";
import Section from "../components/ui/Section";
import { contactInfo, socialLinks } from "../data/constants";
import { Mail, Phone, Download, Send, CheckCircle, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import Toast from "../components/ui/Toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/xojjebba", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setToastMessage("Thank you! Your message has been sent successfully.");
        setToastType("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setToastMessage("Oops! Something went wrong while sending. Please try again.");
        setToastType("error");
      }
    } catch {
      setToastMessage("Network error sending message. Please try WhatsApp or direct email.");
      setToastType("error");
    } finally {
      setIsSubmitting(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    }
  };

  return (
    <Section id="contact" className="pb-20 pt-10 relative">
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}

      <div className="text-center mb-16 space-y-4 max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
          Get in{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent via-primary to-secondary">
            Touch
          </span>
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
          Have a project in mind, open position, or want to discuss full-stack opportunities? Feel free to reach out directly! 🙌
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 lg:gap-16">
        {/* Left Column: Contact Cards */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="glass-card p-6 md:p-8 space-y-8 relative overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 shadow-xl">
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Contact Information
              </h3>
              <div className="space-y-5">
                <motion.a
                  href={`mailto:${contactInfo.email}`}
                  whileHover={{ x: 6 }}
                  className="flex items-center gap-4 text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors group p-3.5 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent hover:border-slate-200 dark:hover:border-white/10"
                >
                  <div className="relative w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0 border border-primary/20">
                    <Mail size={22} />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Email Address</span>
                    <span className="text-base font-bold truncate block">{contactInfo.email}</span>
                  </div>
                </motion.a>

                <motion.a
                  href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                  whileHover={{ x: 6 }}
                  className="flex items-center gap-4 text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors group p-3.5 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent hover:border-slate-200 dark:hover:border-white/10"
                >
                  <div className="relative w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-300 shrink-0 border border-secondary/20">
                    <Phone size={22} />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Phone Contact</span>
                    <span className="text-base font-bold block">{contactInfo.phone}</span>
                  </div>
                </motion.a>

                {contactInfo.phoneAlt && (
                  <motion.a
                    href={`tel:${contactInfo.phoneAlt.replace(/\s/g, "")}`}
                    whileHover={{ x: 6 }}
                    className="flex items-center gap-4 text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors group p-3.5 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent hover:border-slate-200 dark:hover:border-white/10"
                  >
                    <div className="relative w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300 shrink-0 border border-accent/20">
                      <Phone size={22} />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Alternate Phone</span>
                      <span className="text-base font-bold block">{contactInfo.phoneAlt}</span>
                    </div>
                  </motion.a>
                )}
              </div>
            </div>

            {/* Social Channels */}
            <div className="pt-6 border-t border-slate-200 dark:border-white/10">
              <h4 className="text-slate-900 dark:text-white font-bold mb-4 text-sm uppercase tracking-wider">
                Connect on Social Platforms
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 shadow-md group transition-colors"
                    title={social.name}
                    aria-label={social.name}
                  >
                    <img
                      src={social.iconUrl}
                      alt={social.name}
                      loading="lazy"
                      decoding="async"
                      width="24"
                      height="24"
                      className="w-5 h-5 invert dark:invert-0 transition-transform group-hover:scale-110"
                    />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons Removed */}
        </motion.div>

        {/* Right Column: Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form
            onSubmit={handleSubmit}
            className="glass-card p-6 md:p-8 space-y-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xl"
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Send a Message
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white dark:bg-slate-950/60 border border-slate-300 dark:border-slate-700/80 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400 text-sm"
                  placeholder="e.g. Alex Johnson"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white dark:bg-slate-950/60 border border-slate-300 dark:border-slate-700/80 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400 text-sm"
                  placeholder="alex@example.com"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full bg-white dark:bg-slate-950/60 border border-slate-300 dark:border-slate-700/80 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none placeholder:text-slate-400 text-sm"
                  placeholder="Tell me about your project or job role..."
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-sm"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </Section>
  );
}
