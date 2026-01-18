import { useState } from "react";
import Section from "../components/ui/Section";
import { contactInfo, socialLinks } from "../data/constants";
import { Mail, Phone, Download, Send } from "lucide-react";
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
        setToastMessage("Message sent successfully!");
        setToastType("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setToastMessage("Oops! Something went wrong.");
        setToastType("error");
      }
    } catch (error) {
      setToastMessage("Error sending message. Please try again.");
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

      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          Get in{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-primary">
            Touch
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Have a project in mind or just want to say hi? I'd love to hear from
          you.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="glass-card p-8 space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                Contact Information
              </h3>
              <div className="space-y-6">
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-4 text-slate-300 hover:text-white transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-800/50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 border border-slate-700 group-hover:border-primary/50">
                    <Mail size={22} />
                  </div>
                  <span className="text-lg">{contactInfo.email}</span>
                </a>
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="flex items-center gap-4 text-slate-300 hover:text-white transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-800/50 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-300 border border-slate-700 group-hover:border-secondary/50">
                    <Phone size={22} />
                  </div>
                  <span className="text-lg">{contactInfo.phone}</span>
                </a>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5">
              <h4 className="text-white font-semibold mb-4">
                Connect with me
              </h4>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-slate-800/80 flex items-center justify-center hover:bg-slate-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20"
                    style={{ color: social.color }}
                    title={social.name}
                  >
                    <img
                      src={social.iconUrl}
                      alt={social.name}
                      className="w-6 h-6 filter hover:brightness-125"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <a
            href="/resume.pdf"
            download
            className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-blue-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all transform hover:-translate-y-1"
          >
            <Download size={20} /> Download Resume
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form
            onSubmit={handleSubmit}
            className="glass-card p-8 md:p-10 space-y-6"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-slate-400 text-sm font-medium mb-2 pl-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-slate-600"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-slate-400 text-sm font-medium mb-2 pl-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-slate-600"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-slate-400 text-sm font-medium mb-2 pl-1">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all resize-none placeholder:text-slate-600"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white text-slate-900 font-bold py-4 rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send Message"}{" "}
              <Send
                size={18}
                className={`group-hover:translate-x-1 transition-transform ${
                  isSubmitting ? "hidden" : ""
                }`}
              />
            </button>
          </form>
        </motion.div>
      </div>
    </Section>
  );
}
