import { useRef, useState } from "react";
import Section from "../components/layout/Section";
import SectionHeading from "../components/layout/SectionHeading";
import Reveal from "../components/ui/Reveal";
import Toast from "../components/ui/Toast";
import { availability, contactInfo, location, resumeUrl, socialLinks } from "../data/constants";
import { ArrowUpRight, Check, Copy, Download, Mail, MapPin, Send } from "lucide-react";

const EMPTY = { name: "", email: "", message: "", _gotcha: "" };

function validate(name, value) {
  if (!value.trim()) return "Required";
  if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email";
  if (name === "message" && value.trim().length < 10) return "At least 10 characters";
  return "";
}

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState(null);
  const [copied, setCopied] = useState(false);
  const timer = useRef();

  const notify = (message, type = "success") => {
    setToast({ message, type });
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(null), 5000);
  };

  const change = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
    if (errors[name]) setErrors((previous) => ({ ...previous, [name]: "" }));
  };

  const blur = (event) => {
    const { name, value } = event.target;
    if (name === "_gotcha") return;
    setErrors((previous) => ({ ...previous, [name]: validate(name, value) }));
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactInfo.email);
      setCopied(true);
      notify("Email copied.");
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      notify("Could not copy. Select the address manually.", "error");
    }
  };

  const submit = async (event) => {
    event.preventDefault();

    const next = {};
    ["name", "email", "message"].forEach((field) => {
      const message = validate(field, form[field]);
      if (message) next[field] = message;
    });
    setErrors(next);

    if (Object.keys(next).length > 0) {
      notify("Please fix the highlighted fields.", "error");
      return;
    }

    if (form._gotcha) {
      setForm(EMPTY);
      notify("Message sent.");
      return;
    }

    setSending(true);

    try {
      const response = await fetch("https://formspree.io/f/xojjebba", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      });

      if (response.ok) {
        setForm(EMPTY);
        setErrors({});
        notify("Message sent. I will reply soon.");
      } else {
        notify("Something went wrong. Please try email instead.", "error");
      }
    } catch {
      notify("Network error. Please use email instead.", "error");
    } finally {
      setSending(false);
    }
  };

  const fieldClass = (field) =>
    `w-full rounded-lg border bg-transparent px-3.5 py-2.5 text-sm text-ink placeholder:text-faint transition-colors focus:outline-none ${
      errors[field] ? "border-red-400" : "border-line focus:border-primary"
    }`;

  return (
    <Section id="contact">
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}

      <SectionHeading
        index="06"
        eyebrow="Contact"
        title="Let's work together"
        subtitle="Have a project, an open role, or a full-stack problem worth discussing? I would like to hear about it."
      />

      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal className="space-y-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-faint">
              Availability
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm text-ink">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              {availability.status}
            </p>
            <p className="mt-1 text-xs text-muted">{availability.detail}</p>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-faint">
              Based in
            </p>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-ink">
              <MapPin size={14} className="text-primary" /> {location}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-faint">
              Email
            </p>
            <div className="mt-2 flex items-center gap-2">
              <a
                href={`mailto:${contactInfo.email}`}
                className="text-sm text-ink hover:text-primary"
              >
                {contactInfo.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                aria-label="Copy email address"
                className="rounded-md p-1 text-muted transition-colors hover:text-primary"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-faint">
              Elsewhere
            </p>
            <ul className="mt-2 space-y-1.5">
              {socialLinks.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
                  >
                    {social.name}
                    <ArrowUpRight size={12} className="text-faint group-hover:text-primary" />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
                >
                  Resume <Download size={12} className="text-faint group-hover:text-primary" />
                </a>
              </li>
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <form onSubmit={submit} noValidate className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-muted"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  value={form.name}
                  onChange={change}
                  onBlur={blur}
                  aria-invalid={Boolean(errors.name)}
                  className={fieldClass("name")}
                  placeholder="Your name"
                />
                {errors.name && <p className="mt-1 text-[11px] text-red-400">{errors.name}</p>}
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-muted"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={change}
                  onBlur={blur}
                  aria-invalid={Boolean(errors.email)}
                  className={fieldClass("email")}
                  placeholder="you@example.com"
                />
                {errors.email && <p className="mt-1 text-[11px] text-red-400">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-muted"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows="6"
                value={form.message}
                onChange={change}
                onBlur={blur}
                aria-invalid={Boolean(errors.message)}
                className={`${fieldClass("message")} resize-none`}
                placeholder="What would you like to build?"
              />
              {errors.message && (
                <p className="mt-1 text-[11px] text-red-400">{errors.message}</p>
              )}
            </div>

            <div className="hidden" aria-hidden="true">
              <label htmlFor="contact-company">Leave empty</label>
              <input
                id="contact-company"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                value={form._gotcha}
                onChange={change}
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="flex items-center gap-1.5 text-[11px] text-faint">
                <Mail size={12} /> Replies within one working day
              </p>

              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 focus-ring"
              >
                {sending ? (
                  <>
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Sending
                  </>
                ) : (
                  <>
                    Send message <Send size={14} />
                  </>
                )}
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
