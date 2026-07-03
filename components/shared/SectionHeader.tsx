"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeader({
  badge,
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`max-w-3xl mb-12 md:mb-16 ${centered ? "mx-auto text-center" : "text-left"}`}
    >
      {badge && (
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full mb-3 border border-gold/25 font-sans">
          {badge}
        </span>
      )}
      <h2
        className={`font-serif font-bold text-3xl md:text-4xl lg:text-5xl leading-tight ${
          light ? "text-white" : "text-charcoal"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-sm md:text-base leading-relaxed ${
            light ? "text-beige/70" : "text-charcoal/70"
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
