import { useState, useEffect, useRef } from "react";
import { Menu, X, Download, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import ThemeToggle from "../ui/ThemeToggle";
import useScrollSpy from "../../hooks/useScrollSpy";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";
import { resumeUrl, socialLinks } from "../../data/constants";

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Certifications", href: "#certifications" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const SECTION_IDS = NAV_LINKS.map((link) => link.href.replace("#", ""));

export default function Navbar({ dark, setDark }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScroll = useRef(0);
  const activeSection = useScrollSpy(SECTION_IDS);
  const reduce = useReducedMotion();

  useLockBodyScroll(isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (reduce) return;

    const handleDirection = () => {
      const current = window.scrollY;

      if (isOpen || current < 120) {
        setHidden(false);
      } else if (current > lastScroll.current + 6) {
        setHidden(true);
      } else if (current < lastScroll.current - 6) {
        setHidden(false);
      }

      lastScroll.current = current;
    };

    window.addEventListener("scroll", handleDirection, { passive: true });
    return () => window.removeEventListener("scroll", handleDirection);
  }, [isOpen, reduce]);

  const handleClick = (event, href) => {
    event.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      const offsetTop = element.offsetTop - 88;
      window.scrollTo({ top: offsetTop, behavior: reduce ? "auto" : "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <motion.nav
      initial={false}
      animate={{ y: hidden && !reduce && !isOpen ? "-110%" : 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      onFocusCapture={() => setHidden(false)}
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled || isOpen
          ? "border-b border-slate-200/80 bg-white/80 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80"
          : "bg-transparent py-2"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <motion.a
          href="#home"
          whileHover={reduce ? undefined : { scale: 1.03 }}
          whileTap={reduce ? undefined : { scale: 0.97 }}
          className="group flex items-center gap-2.5 rounded-xl focus-ring"
          onClick={(event) => handleClick(event, "#home")}
        >
          <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl border border-white/30 bg-primary text-xs font-black tracking-tighter text-white shadow-lg shadow-primary/40 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
            <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="relative z-10">RB</span>
          </span>
          <span className="font-display text-lg font-black tracking-tight text-slate-900 dark:text-white sm:text-xl">
            Rabi Bhagat
          </span>
        </motion.a>

        <div className="hidden items-center gap-1 rounded-full border border-slate-200/60 bg-slate-100/60 p-1.5 backdrop-blur-md dark:border-white/5 dark:bg-slate-800/40 lg:flex">
          {NAV_LINKS.map((link) => {
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId;

            return (
              <a
                key={link.name}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                onClick={(event) => handleClick(event, link.href)}
                className={`relative rounded-full px-3.5 py-2 text-xs font-semibold transition-colors focus-ring ${
                  isActive
                    ? "text-white"
                    : "text-slate-600 hover:bg-slate-200/50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full bg-primary shadow-md shadow-primary/30"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <span className="hidden items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 2xl:inline-flex">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            Available
          </span>

          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 focus-ring"
          >
            Resume <Download size={14} />
          </a>

          <ThemeToggle dark={dark} onToggle={() => setDark(!dark)} />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle dark={dark} onToggle={() => setDark(!dark)} />
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            className="rounded-xl border border-slate-200 bg-slate-100 p-2 text-slate-700 transition-colors hover:text-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 focus-ring"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden absolute left-0 top-full w-full overflow-hidden border-t border-slate-200 bg-white/95 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/95"
          >
            <div className="flex max-h-[75vh] flex-col gap-1.5 overflow-y-auto p-4">
              {NAV_LINKS.map((link, index) => {
                const sectionId = link.href.replace("#", "");
                const isActive = activeSection === sectionId;

                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={reduce ? false : { opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.035, duration: 0.25 }}
                    onClick={(event) => handleClick(event, link.href)}
                    aria-current={isActive ? "page" : undefined}
                    className={`rounded-xl px-4 py-3 text-base font-semibold transition-colors ${
                      isActive
                        ? "bg-primary text-white shadow-md shadow-primary/25"
                        : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5"
                    }`}
                  >
                    {link.name}
                  </motion.a>
                );
              })}

              <div className="mt-3 grid grid-cols-2 gap-2 border-t border-slate-200 pt-3 dark:border-white/10">
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white dark:bg-white dark:text-slate-900"
                >
                  Resume <Download size={15} />
                </a>
                <a
                  href="#contact"
                  onClick={(event) => handleClick(event, "#contact")}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white"
                >
                  Contact <ArrowUpRight size={15} />
                </a>
              </div>

              <div className="mt-2 flex flex-wrap gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-slate-200 bg-white/60 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:border-white/10 dark:bg-slate-800/60 dark:text-slate-300"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
