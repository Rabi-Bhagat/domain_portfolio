import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "../ui/ThemeToggle";
import useScrollSpy from "../../hooks/useScrollSpy";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";
import { resumeUrl } from "../../data/constants";

const LINKS = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Credentials", id: "certifications" },
  { label: "Contact", id: "contact" },
];

const IDS = ["home", ...LINKS.map((link) => link.id)];

export default function Navbar({ dark, setDark }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useScrollSpy(IDS);
  useLockBodyScroll(open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (event, id) => {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: "smooth" });
      setOpen(false);
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-line bg-canvas/85 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between gap-4">
        <a
          href="#home"
          onClick={(event) => go(event, "home")}
          className="flex items-center gap-2.5 text-sm font-semibold text-ink focus-ring rounded-lg"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink text-[10px] font-bold text-canvas">
            RB
          </span>
          <span className="hidden sm:inline">Rabi Bhagat</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Sections">
          {LINKS.map((link) => {
            const isActive = active === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(event) => go(event, link.id)}
                aria-current={isActive ? "true" : undefined}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors focus-ring ${
                  isActive ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {isActive && <span className="mr-1.5 inline-block h-1 w-1 rounded-full bg-primary align-middle" />}
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full border border-line px-3.5 py-1.5 text-xs font-medium text-ink transition-colors hover:border-primary hover:text-primary sm:inline-block"
          >
            Resume
          </a>
          <ThemeToggle dark={dark} onToggle={() => setDark(!dark)} />

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink md:hidden focus-ring"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-canvas md:hidden"
            aria-label="Mobile sections"
          >
            <div className="shell flex flex-col py-4">
              {LINKS.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(event) => go(event, link.id)}
                  className="border-b border-line py-3 text-sm text-ink last:border-0"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
