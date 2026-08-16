import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ dark, setDark }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Certifications", href: "#certifications" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // ScrollSpy algorithm
      const sections = navLinks.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i]);
        if (sectionEl && sectionEl.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
      setActiveSection(targetId);
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/10 shadow-lg"
          : "bg-transparent py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <a
          href="#home"
          className="text-2xl font-black relative group flex items-center gap-2"
          onClick={(e) => handleClick(e, "#home")}
        >
          <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary via-secondary to-accent flex items-center justify-center text-white text-sm font-bold shadow-md shadow-primary/30">
            RB
          </span>
          <span className="bg-gradient-to-r from-slate-900 via-primary to-accent dark:from-white dark:via-blue-400 dark:to-accent bg-clip-text text-transparent tracking-tight">
            Rabi Bhagat
          </span>
        </a>

        {/* Desktop Menu Links */}
        <div className="hidden lg:flex items-center space-x-1 bg-slate-100/60 dark:bg-slate-800/40 p-1.5 rounded-full border border-slate-200/60 dark:border-white/5 backdrop-blur-md">
          {navLinks.map((link) => {
            const sectionId = link.href.substring(1);
            const isActive = activeSection === sectionId;

            return (
              <a
                key={link.name}
                href={link.href}
                className={`text-xs font-semibold px-4 py-2 rounded-full transition-all duration-300 relative ${
                  isActive
                    ? "text-white bg-primary shadow-md shadow-primary/30 font-bold"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5"
                }`}
                onClick={(e) => handleClick(e, link.href)}
              >
                {link.name}
              </a>
            );
          })}
        </div>

        {/* Desktop Theme Switcher */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => setDark(!dark)}
            className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all border border-slate-200 dark:border-slate-700 shadow-sm"
            title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle theme"
          >
            {dark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-slate-700" />}
          </button>
        </div>

        {/* Mobile Actions */}
        <div className="lg:hidden flex items-center gap-3">
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors border border-slate-200 dark:border-slate-700"
            aria-label="Toggle theme"
          >
            {dark ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} />}
          </button>

          <button
            className="p-2 rounded-xl text-slate-700 dark:text-slate-100 hover:text-primary transition-colors focus:outline-none bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border-t border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-2">
              {navLinks.map((link) => {
                const sectionId = link.href.substring(1);
                const isActive = activeSection === sectionId;

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`text-base font-semibold px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-white font-bold"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
                    }`}
                    onClick={(e) => handleClick(e, link.href)}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
