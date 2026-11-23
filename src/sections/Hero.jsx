import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import Section from "../components/layout/Section";
import StatusPill from "../components/ui/StatusPill";
import ButtonLink from "../components/ui/Button3D";
import Typewriter from "../components/ui/Typewriter";
import CountUp from "../components/ui/CountUp";
import Logo3D from "../components/ui/Logo3D";
import { availability, heroRoles, location, resumeUrl, socialLinks, stats } from "../data/constants";

export default function Hero() {
  return (
    <Section id="home" className="pt-32 sm:pt-36">
      <div className="grid gap-14 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <StatusPill label={availability.status} detail={location} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-7 font-display text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl"
          >
            Rabi Prasad <span className="text-primary">Bhagat</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-5 flex flex-wrap items-center gap-x-2 text-lg text-muted"
          >
            <span>Full-stack developer</span>
            <span className="text-faint">/</span>
            <Typewriter words={heroRoles} className="font-medium text-ink" />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted"
          >
            Computer Science &amp; Engineering student at Maharishi Markandeshwar University,
            building clean, high-performance web applications and dependable backend systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <ButtonLink href="#projects" variant="accent" size="lg">
              View projects
            </ButtonLink>
            <ButtonLink
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              size="lg"
            >
              Resume
            </ButtonLink>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            {socialLinks.map((social) => (
              <div key={social.name} className="flex items-center gap-2">
                <Logo3D
                  src={social.iconUrl}
                  alt={social.name}
                  color={social.color}
                  size="sm"
                  href={social.link}
                  showGlow={false}
                />
                <span className="text-xs font-medium text-muted">{social.name}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="panel rounded-2xl p-6"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-faint">
            Snapshot
          </p>
          <dl className="mt-5 space-y-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-baseline justify-between gap-4 border-b border-line pb-4 last:border-0 last:pb-0">
                <dt className="text-xs leading-snug text-muted">{stat.label}</dt>
                <dd className="font-display text-2xl font-semibold text-ink">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </dd>
              </div>
            ))}
          </dl>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
          >
            <Download size={13} /> Download resume
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-16 flex items-center gap-3 border-t border-line pt-6 text-xs text-faint"
      >
        <span>Scroll</span>
        <ArrowDown size={13} className="animate-bounce" />
        <span className="ml-auto">{location}</span>
      </motion.div>
    </Section>
  );
}
