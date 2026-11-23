import { useEffect, useRef, useState } from "react";
import Section from "../components/layout/Section";
import SectionHeading from "../components/layout/SectionHeading";
import StatusPill from "../components/ui/StatusPill";
import Logo3D from "../components/ui/Logo3D";
import Toast from "../components/ui/Toast";
import { availability, contactInfo, resumeUrl, socialLinks } from "../data/constants";
import {
  Check,
  Code2,
  Copy,
  Download,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const EMPTY_FORM = { name: "", email: "", message: "", _gotcha: "" };

function validateField(name, value) {
  if (!value.trim()) return "This field is required.";
  if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return "Enter a valid email address.";
  }
  if (name === "message" && value.trim().length < 10) {
    return "Please add at least 10 characters.";
  }
  return "";
}

export default function Contact() {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [copied, setCopied] = useState(false);
  const toastTimer = useRef();
  const reduce = useReducedMotion();

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 5000);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    if (errors[name]) {
      setErrors((previous) => ({ ...previous, [name]: "" }));
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    if (name === "_gotcha") return;
    setErrors((previous) => ({ ...previous, [name]: validateField(name, value) }));
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactInfo.email);
      setCopied(true);
      showToast("Email address copied to clipboard.", "success");
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast("Could not copy automatically. Please select the email manually.", "error");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validation = {};
    ["name", "email", "message"].forEach((field) => {
      const message = validateField(field, formData[field]);
      if (message) validation[field] = message;
    });

    setErrors(validation);

    if (Object.keys(validation).length > 0) {
      showToast("Please fix the highlighted fields.", "error");
      return;
    }

    if (formData._gotcha) {
      setFormData(EMPTY_FORM);
      showToast("Thank you! Your message has been sent successfully.", "success");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/xojjebba", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setFormData(EMPTY_FORM);
        setErrors({});
        showToast("Thank you! Your message has been sent successfully.", "success");
      } else {
        showToast("Something went wrong while sending. Please try again.", "error");
      }
    } catch {
      showToast("Network error. Please use email or WhatsApp instead.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClasses = (field) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 transition-all placeholder:text-slate-400 focus:outline-none focus:ring-2 dark:bg-slate-950/60 dark:text-white ${
      errors[field]
        ? "border-rose-400 focus:border-rose-400 focus:ring-rose-400/20 dark:border-rose-500/60"
        : "border-slate-300 focus:border-primary focus:ring-primary/20 dark:border-slate-700/80"
    }`;

  return (
    <Section id="contact" className="pb-20 pt-10 relative">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <SectionHeading
        eyebrow="Contact"
        title="Let's build"
        highlight="something useful"
        subtitle="Have a project, an open role, or a full-stack problem worth discussing? I would love to hear about it."
      />

      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-5"
        >
          <div className="glass-card relative overflow-hidden rounded-3xl p-6 shadow-xl md:p-7">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
            <StatusPill status={availability.status} tone={availability.tone} />
            <h3 className="mt-4 font-display text-xl font-bold text-slate-900 dark:text-white">
              Available for the right opportunity
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {availability.detail}. I usually reply within one working day.
            </p>

            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 focus-ring"
              >
                <Download size={14} /> Download resume
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/60 px-4 py-2.5 text-xs font-bold text-slate-700 transition-colors hover:border-primary/40 hover:text-primary dark:border-white/10 dark:bg-slate-900/50 dark:text-slate-200 focus-ring"
              >
                <Mail size={14} /> Email directly
              </a>
            </div>

            <p className="mt-4 flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
              <MapPin size={12} /> India / Nepal · Remote friendly
            </p>
          </div>

          <div className="glass-card space-y-2 rounded-3xl p-4 shadow-xl md:p-5">
            <div className="flex items-center justify-between gap-3 rounded-2xl p-3 transition-colors hover:bg-slate-100/70 dark:hover:bg-white/5">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                  <Mail size={18} />
                </span>
                <div className="min-w-0">
                  <span className="block text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Email
                  </span>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="block truncate text-sm font-bold text-slate-900 hover:text-primary dark:text-white focus-ring rounded"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>
              <button
                type="button"
                onClick={copyEmail}
                aria-label="Copy email address"
                title="Copy email address"
                className="shrink-0 rounded-xl border border-slate-200 bg-white/60 p-2 text-slate-500 transition-colors hover:text-primary dark:border-white/10 dark:bg-slate-900/50 dark:text-slate-400 focus-ring"
              >
                {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
              </button>
            </div>

            <a
              href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-3 rounded-2xl p-3 transition-colors hover:bg-slate-100/70 dark:hover:bg-white/5 focus-ring"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-secondary/20 bg-secondary/10 text-secondary">
                <Phone size={18} />
              </span>
              <div>
                <span className="block text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Phone
                </span>
                <span className="block text-sm font-bold text-slate-900 dark:text-white">
                  {contactInfo.phone}
                </span>
              </div>
            </a>

            <a
              href={contactInfo.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-3 transition-colors hover:bg-amber-500/10 focus-ring"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-500/25 bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <Code2 size={18} />
              </span>
              <div className="min-w-0">
                <span className="block text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  LeetCode
                </span>
                <span className="block truncate text-sm font-bold text-slate-900 dark:text-white">
                  {contactInfo.leetcodeHandle}
                </span>
              </div>
              <ExternalLink size={14} className="ml-auto shrink-0 text-amber-500" />
            </a>
          </div>

          <div className="glass-card rounded-3xl p-5 shadow-xl">
            <h4 className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              Connect
            </h4>
            <div className="flex flex-wrap items-center gap-4">
              {socialLinks.map((social) => (
                <div key={social.name} className="flex flex-col items-center gap-1">
                  <Logo3D
                    src={social.iconUrl}
                    alt={social.name}
                    color={social.color}
                    size="lg"
                    href={social.link}
                    showGlow
                  />
                  <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-400">
                    {social.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <form
            onSubmit={handleSubmit}
            noValidate
            className="glass-card space-y-5 rounded-3xl p-6 shadow-xl md:p-8"
          >
            <div>
              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                Send a message
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                No spam, no newsletter. Just a direct reply.
              </p>
            </div>

            {["name", "email", "message"].map((field) => (
              <div key={field}>
                <label
                  htmlFor={`contact-${field}`}
                  className="mb-2 block text-[10px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-300"
                >
                  {field === "name" ? "Your name" : field === "email" ? "Email address" : "Message"}
                </label>

                {field === "message" ? (
                  <textarea
                    id={`contact-${field}`}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows="4"
                    aria-invalid={Boolean(errors[field])}
                    aria-describedby={errors[field] ? `contact-${field}-error` : undefined}
                    className={`${fieldClasses(field)} resize-none`}
                    placeholder="Tell me about your project, role, or idea..."
                  />
                ) : (
                  <input
                    id={`contact-${field}`}
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={Boolean(errors[field])}
                    aria-describedby={errors[field] ? `contact-${field}-error` : undefined}
                    className={fieldClasses(field)}
                    placeholder={field === "email" ? "alex@example.com" : "e.g. Alex Johnson"}
                  />
                )}

                {errors[field] && (
                  <p id={`contact-${field}-error`} className="mt-1.5 text-[11px] font-semibold text-rose-500">
                    {errors[field]}
                  </p>
                )}
              </div>
            ))}

            <div className="hidden" aria-hidden="true">
              <label htmlFor="contact-website">Leave this field empty</label>
              <input
                id="contact-website"
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                value={formData._gotcha}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60 focus-ring"
            >
              {isSubmitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Sending...
                </>
              ) : (
                <>
                  Send message
                  <Send size={16} className="transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>

            <p className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400">
              <ShieldCheck size={12} /> Your details are only used to reply to this message.
            </p>
          </form>
        </motion.div>
      </div>
    </Section>
  );
}
