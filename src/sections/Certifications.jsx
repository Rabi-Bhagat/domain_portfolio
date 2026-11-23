import { useState, useMemo } from "react";
import Section from "../components/layout/Section";
import SectionHeading from "../components/layout/SectionHeading";
import FilterPill from "../components/ui/FilterPill";
import SpotlightCard from "../components/ui/SpotlightCard";
import { achievements } from "../data/constants";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Award,
  Briefcase,
  CheckCircle2,
  ExternalLink,
  FileText,
  Search,
  Star,
  Trophy,
} from "lucide-react";
import CertificateModal from "../components/modals/CertificateModal";

const typeIcons = {
  hackathon: Trophy,
  internship: Briefcase,
  certification: FileText,
};

export default function Certifications() {
  const [activeType, setActiveType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);
  const reduce = useReducedMotion();

  const categories = useMemo(
    () => [
      { key: "all", label: "All credentials", count: achievements.length },
      {
        key: "hackathon",
        label: "Hackathons",
        count: achievements.filter((item) => item.type === "hackathon").length,
      },
      {
        key: "internship",
        label: "Internships & LORs",
        count: achievements.filter((item) => item.type === "internship").length,
      },
      {
        key: "certification",
        label: "Certifications",
        count: achievements.filter((item) => item.type === "certification").length,
      },
    ],
    []
  );

  const filteredAchievements = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return achievements.filter((item) => {
      const matchesType = activeType === "all" || item.type === activeType;
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.org.toLowerCase().includes(query) ||
        item.desc.toLowerCase().includes(query) ||
        (item.badge && item.badge.toLowerCase().includes(query)) ||
        (item.certId && item.certId.toLowerCase().includes(query));

      return matchesType && matchesSearch;
    });
  }, [activeType, searchQuery]);

  return (
    <Section id="certifications" className="section-padding relative">
      <SectionHeading
        eyebrow="Proof of work"
        title="Achievements &"
        highlight="Certifications"
        subtitle="Verified national hackathons, GDG awards, internship appointment letters, LORs, and professional certifications."
      />

      <div className="mx-auto mb-10 max-w-4xl space-y-6">
        <div className="mx-auto max-w-md">
          <label htmlFor="credential-search" className="sr-only">
            Search credentials
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
              <Search size={18} />
            </div>
            <input
              id="credential-search"
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search by title, org (Cisco, Google, EY)..."
              className="w-full rounded-2xl border border-slate-300 bg-white/80 py-3.5 pl-11 pr-16 text-sm text-slate-900 shadow-lg backdrop-blur-xl transition-all placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-white"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-xs font-semibold text-slate-400 hover:text-primary focus-ring rounded"
              >
                Clear
              </button>
            ) : (
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {achievements.length} total
              </span>
            )}
          </div>
        </div>

        <div
          className="flex flex-wrap justify-center gap-2.5"
          role="group"
          aria-label="Filter credentials by type"
        >
          {categories.map((category) => (
            <FilterPill
              key={category.key}
              active={activeType === category.key}
              onClick={() => setActiveType(category.key)}
              layoutId="credentials-filter-pill"
            >
              {category.label}
              <span className="text-[10px] opacity-75">({category.count})</span>
            </FilterPill>
          ))}
        </div>
      </div>

      <div className="mx-auto mb-6 flex max-w-7xl items-center justify-between px-2 text-sm text-slate-500 dark:text-slate-400">
        <span>
          Showing{" "}
          <strong className="text-slate-900 dark:text-white">
            {filteredAchievements.length}
          </strong>{" "}
          credential{filteredAchievements.length !== 1 ? "s" : ""}
        </span>
        {searchQuery && (
          <span className="text-xs">
            Filter: &ldquo;<span className="font-semibold text-primary">{searchQuery}</span>&rdquo;
          </span>
        )}
      </div>

      {filteredAchievements.length === 0 ? (
        <div className="glass-card mx-auto max-w-xl rounded-3xl py-16 text-center">
          <Award size={44} className="mx-auto mb-4 text-slate-400" />
          <h3 className="mb-2 text-xl font-bold text-slate-800 dark:text-white">
            No credentials match that search
          </h3>
          <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
            Try a different organization or clear the filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveType("all");
              setSearchQuery("");
            }}
            className="rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-blue-600 focus-ring"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <motion.div
          layout
          onMouseLeave={() => setHoveredId(null)}
          className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredAchievements.map((cert) => {
              const Icon = typeIcons[cert.type] || Award;
              const certKey = cert.id || cert.title;
              const isHovered = hoveredId === certKey;
              const isFeatured =
                cert.badge &&
                /top|winner|national|recognized/i.test(cert.badge);

              return (
                <motion.div
                  layout
                  key={certKey}
                  initial={reduce ? false : { opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  onMouseEnter={() => setHoveredId(certKey)}
                  onClick={() => setSelectedCert(cert)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelectedCert(cert);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`View credential: ${cert.title}`}
                  className="group relative h-full cursor-pointer rounded-3xl focus-ring"
                >
                  {isHovered && (
                    <motion.div
                      layoutId="credential-moving-frame"
                      className="pointer-events-none absolute -inset-1 z-0 rounded-3xl bg-primary/20 blur-md dark:bg-primary/30"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  )}

                  <SpotlightCard
                    className="glass-card relative z-10 flex h-full flex-col justify-between rounded-3xl border border-slate-200 p-6 shadow-xl transition-transform duration-300 group-hover:-translate-y-1 dark:border-white/10"
                    color={`${cert.color || "#3b82f6"}22`}
                  >
                    <div>
                      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                          <span
                            className="h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ backgroundColor: cert.color || "#3b82f6" }}
                          />
                          <Icon size={12} className="text-slate-500 dark:text-slate-400" />
                          {cert.org}
                        </span>

                        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                          {cert.date}
                        </span>
                      </div>

                      <h3 className="mb-3 flex items-start justify-between gap-2 font-display text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-primary dark:text-white">
                        <span>{cert.title}</span>
                        <ExternalLink
                          size={15}
                          className="mt-1 shrink-0 text-primary opacity-0 transition-opacity group-hover:opacity-100"
                        />
                      </h3>

                      <div className="mb-3 flex flex-wrap gap-1.5">
                        <span className="rounded-md border border-slate-200 bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                          {cert.category}
                        </span>

                        {cert.badge && (
                          <span className="inline-flex items-center gap-1 rounded-md border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                            {isFeatured ? <Star size={10} className="fill-current" /> : <CheckCircle2 size={10} />}
                            {cert.badge}
                          </span>
                        )}
                      </div>

                      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        {cert.desc}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between gap-2 border-t border-slate-200 pt-4 font-mono text-[10px] text-slate-500 dark:border-white/10 dark:text-slate-400">
                      {cert.certId && (
                        <span className="truncate">
                          ID:{" "}
                          <strong className="text-slate-800 dark:text-slate-200">
                            {cert.certId}
                          </strong>
                        </span>
                      )}
                      <span className="ml-auto flex shrink-0 items-center gap-1 font-sans text-[10px] font-bold text-primary">
                        View credential <ExternalLink size={11} />
                      </span>
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}

      {selectedCert && (
        <CertificateModal
          achievement={selectedCert}
          achievements={filteredAchievements}
          onClose={() => setSelectedCert(null)}
          onSelect={setSelectedCert}
        />
      )}
    </Section>
  );
}
