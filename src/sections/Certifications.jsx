import React, { useState, useMemo } from 'react';
import Section from "../components/ui/Section";
import { achievements } from "../data/constants";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Search, Trophy, Briefcase, FileText, CheckCircle2, ExternalLink } from "lucide-react";
import Button3D from "../components/ui/Button3D";
import CertificateModal from "../components/ui/CertificateModal";

export default function Certifications() {
  const [activeType, setActiveType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredId, setHoveredId] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedCert, setSelectedCert] = useState(null);

  // Categories & counts
  const categories = useMemo(() => [
    { key: "all", label: "All Credentials", count: achievements.length, icon: Award },
    { key: "hackathon", label: "🏆 Hackathons & Competitions", count: achievements.filter(a => a.type === "hackathon").length, icon: Trophy },
    { key: "internship", label: "💼 Internships & LORs", count: achievements.filter(a => a.type === "internship").length, icon: Briefcase },
    { key: "certification", label: "📜 Certifications & Tech", count: achievements.filter(a => a.type === "certification").length, icon: FileText },
  ], []);

  // Filter logic
  const filteredAchievements = useMemo(() => {
    return achievements.filter(item => {
      const matchesType = activeType === "all" || item.type === activeType;
      const query = searchQuery.toLowerCase().trim();
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

  const handleMouseMove = (e, certId) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <Section id="certifications" className="section-padding relative">
      {/* Header */}
      <div className="text-center mb-10 space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
          Achievements & Certifications
        </h2>
        <p className="text-slate-600 dark:text-slate-300 max-w-3xl mx-auto text-lg leading-relaxed">
          Verified details of national hackathons, GDG awards, internship appointment letters, LORs, and professional certifications.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="max-w-4xl mx-auto mb-12 space-y-6">
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, organization (Cisco, Google, EY, Bluestock)..."
            className="w-full pl-11 pr-4 py-3.5 bg-white/80 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700/80 rounded-2xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 backdrop-blur-xl transition-all shadow-lg text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs text-slate-400 hover:text-slate-200"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <Button3D
              key={cat.key}
              onClick={() => setActiveType(cat.key)}
              variant={activeType === cat.key ? "primary" : "secondary"}
              size="sm"
            >
              {cat.label} <span className="ml-1 opacity-80 text-xs">({cat.count})</span>
            </Button3D>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-8 max-w-7xl mx-auto text-sm text-slate-500 dark:text-slate-400 px-2">
        <span>Showing <strong className="text-slate-900 dark:text-white">{filteredAchievements.length}</strong> credential{filteredAchievements.length !== 1 ? 's' : ''}</span>
        {searchQuery && (
          <span className="text-xs">
            Filter: "<span className="text-primary font-semibold">{searchQuery}</span>"
          </span>
        )}
      </div>

      {/* Grid of Achievement Detail Cards with Gliding Motion Box */}
      <motion.div
        layout
        onMouseLeave={() => setHoveredId(null)}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto relative"
      >
        <AnimatePresence>
          {filteredAchievements.map((cert) => {
            const Icon = cert.type === "hackathon" ? Trophy : cert.type === "internship" ? Briefcase : Award;
            const certKey = cert.id || cert.title;
            const isHovered = hoveredId === certKey;

            return (
              <motion.div
                layout
                key={certKey}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => setHoveredId(certKey)}
                onMouseMove={(e) => handleMouseMove(e, certKey)}
                onClick={() => setSelectedCert(cert)}
                className="h-full relative group cursor-pointer"
              >
                {/* Smooth Gliding Motion Box that moves from card to card */}
                {isHovered && (
                  <motion.div
                    layoutId="credentialMovingHoverBox"
                    className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 dark:from-primary/40 dark:via-purple-500/40 dark:to-accent/40 blur-md pointer-events-none z-0"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 28,
                    }}
                  />
                )}

                <div className="glass-card p-6 flex flex-col group relative overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 shadow-xl h-full justify-between z-10 transition-transform duration-300 group-hover:-translate-y-1">
                  {/* Cursor Spotlight Glow Effect inside card */}
                  {isHovered && (
                    <div
                      className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-100 z-0"
                      style={{
                        background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, ${cert.color ? cert.color + '25' : 'rgba(59, 130, 246, 0.2)'}, transparent 80%)`,
                      }}
                    />
                  )}

                  {/* Ambient Accent Glow */}
                  <div
                    className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-15 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
                    style={{ backgroundColor: cert.color || "#3b82f6" }}
                  ></div>

                  <div className="relative z-10 space-y-4">
                    {/* Header line: Org Pill & Category Icon */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span
                        className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full border shadow-sm flex items-center gap-1.5"
                        style={{
                          color: cert.color || '#3b82f6',
                          borderColor: `${cert.color || '#3b82f6'}40`,
                          backgroundColor: `${cert.color || '#3b82f6'}15`
                        }}
                      >
                        <Icon size={13} />
                        {cert.org}
                      </span>
                      
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        {cert.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-snug group-hover:text-primary transition-colors flex items-center justify-between gap-2">
                      <span>{cert.title}</span>
                      <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 text-primary transition-opacity shrink-0" />
                    </h3>

                    {/* Category & Badge Tags */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {cert.category}
                      </span>

                      {cert.badge && (
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-primary/10 text-primary border border-primary/20 flex items-center gap-1">
                          <CheckCircle2 size={12} />
                          {cert.badge}
                        </span>
                      )}
                    </div>

                    {/* Detailed Description */}
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed pt-2">
                      {cert.desc}
                    </p>
                  </div>

                  {/* Metadata Footer */}
                  <div className="relative z-10 pt-4 mt-6 border-t border-slate-200 dark:border-white/10 flex items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                    {cert.certId && (
                      <span className="truncate">
                        ID: <strong className="text-slate-800 dark:text-slate-200">{cert.certId}</strong>
                      </span>
                    )}
                    <span className="shrink-0 ml-auto flex items-center gap-1 text-primary font-bold font-sans">
                      View Credential <ExternalLink size={12} />
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Interactive Modal */}
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
