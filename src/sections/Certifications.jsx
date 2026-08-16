import React, { useState, lazy, Suspense, useMemo } from 'react';
import Section from "../components/ui/Section";
import { achievements } from "../data/constants";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ExternalLink, Search, Eye, ShieldCheck, Trophy, Briefcase, FileText } from "lucide-react";
import Button3D from "../components/ui/Button3D";

const CertificateModal = lazy(() => import("../components/ui/CertificateModal"));

export default function Certifications() {
  const [activeType, setActiveType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAchievement, setSelectedAchievement] = useState(null);

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
        (item.badge && item.badge.toLowerCase().includes(query));

      return matchesType && matchesSearch;
    });
  }, [activeType, searchQuery]);

  return (
    <Section id="certifications" className="section-padding relative">
      {/* Header */}
      <div className="text-center mb-10 space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
          Achievements & <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent via-secondary to-primary">Certifications</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-300 max-w-3xl mx-auto text-lg leading-relaxed">
          Comprehensive showcase of hackathon awards, Google GDG achievements, internship offer letters, recommendation letters, and technical certifications.
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
            placeholder="Search by title, organization (Google, EY, Bluestock)..."
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

      {/* Grid of Achievement Cards */}
      <motion.div
        layout
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
      >
        <AnimatePresence>
          {filteredAchievements.map((cert) => (
            <motion.div
              layout
              key={cert.id || cert.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <div className="glass-card glass-card-hover p-5 md:p-6 flex flex-col group relative overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 shadow-xl h-full">
                {/* Background Glow Orb */}
                <div
                  className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
                  style={{ backgroundColor: cert.color || "#3b82f6" }}
                ></div>

                {/* Card Top: Preview Thumbnail Box */}
                <div
                  onClick={() => setSelectedAchievement(cert)}
                  className="w-full h-44 rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden relative mb-5 cursor-pointer group/img shrink-0 flex items-center justify-center"
                >
                  {cert.previewImage ? (
                    <img
                      src={cert.previewImage}
                      alt={cert.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                    />
                  ) : (
                    <Award size={48} style={{ color: cert.color }} />
                  )}

                  {/* Dark overlay & Hover Preview Badge */}
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <span className="px-4 py-2 rounded-xl bg-slate-900/90 text-white text-xs font-bold shadow-lg border border-white/20 flex items-center gap-1.5 transform translate-y-2 group-hover/img:translate-y-0 transition-transform">
                      <Eye size={14} /> Full Document Preview
                    </span>
                  </div>

                  {/* Badge Ribbon */}
                  {cert.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider bg-slate-900/80 backdrop-blur-md text-white border border-white/10 shadow-md">
                      {cert.badge}
                    </span>
                  )}
                </div>

                {/* Card Content */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    {/* Header line: Org & Date */}
                    <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                      <span
                        className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-md border"
                        style={{
                          color: cert.color || '#3b82f6',
                          borderColor: `${cert.color || '#3b82f6'}40`,
                          backgroundColor: `${cert.color || '#3b82f6'}15`
                        }}
                      >
                        {cert.org}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        {cert.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => setSelectedAchievement(cert)}
                      className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors cursor-pointer line-clamp-2"
                    >
                      {cert.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6 line-clamp-3">
                      {cert.desc}
                    </p>
                  </div>

                  {/* Action Bar */}
                  <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between gap-3 mt-auto">
                    <button
                      onClick={() => setSelectedAchievement(cert)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-md shadow-primary/20 hover:bg-blue-600 transition-all"
                    >
                      <Eye size={14} /> Preview Credential
                    </button>

                    <a
                      href={cert.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                      title="Open Document File"
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Certificate Modal */}
      {selectedAchievement && (
        <Suspense fallback={null}>
          <CertificateModal
            achievement={selectedAchievement}
            achievements={achievements}
            onClose={() => setSelectedAchievement(null)}
            onSelect={(ach) => setSelectedAchievement(ach)}
          />
        </Suspense>
      )}
    </Section>
  );
}
