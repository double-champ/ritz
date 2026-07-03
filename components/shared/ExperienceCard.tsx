"use client";

import { motion } from "framer-motion";
import { GlassWater, Users, Heart, Leaf, Cake, CalendarDays, ArrowRight, LucideIcon } from "lucide-react";
import Link from "next/link";

interface Experience {
  id: string;
  title: string;
  description: string;
  recommendedPackage: string;
  iconName: string;
}

interface ExperienceCardProps {
  exp: Experience;
  index: number;
}

const iconMap: Record<string, LucideIcon> = {
  GlassWater: GlassWater,
  Users: Users,
  Heart: Heart,
  Leaf: Leaf,
  Cake: Cake,
  CalendarDays: CalendarDays,
};

export default function ExperienceCard({ exp, index }: ExperienceCardProps) {
  const IconComponent = iconMap[exp.iconName] || Compass;

  // Map to relevant links
  let exploreLink = "/packages";
  if (exp.id === "pool-day" || exp.id === "day-outing") {
    exploreLink = "/pool-access";
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-45px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="glass-panel group relative flex flex-col p-8 rounded-3xl border border-forest/10 hover:border-gold/30 shadow-md hover:shadow-xl transition-all duration-500 h-full"
    >
      {/* Icon Wrapper */}
      <div className="w-14 h-14 rounded-2xl bg-forest/10 flex items-center justify-center text-forest group-hover:bg-forest group-hover:text-beige transition-all duration-500 mb-6 border border-forest/5 shadow-inner">
        <IconComponent className="w-6 h-6 group-hover:scale-110 transition-transform duration-500" />
      </div>

      {/* Content */}
      <h3 className="font-serif font-bold text-xl text-charcoal group-hover:text-forest transition-colors duration-300 mb-3">
        {exp.title}
      </h3>

      <p className="text-charcoal/70 text-sm leading-relaxed mb-6 flex-grow">
        {exp.description}
      </p>

      {/* Recommendation Area */}
      <div className="border-t border-forest/5 pt-4 mt-auto">
        <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal/40 block mb-1">
          Recommended Choice:
        </span>
        <span className="text-xs font-semibold text-gold block mb-4">
          {exp.recommendedPackage}
        </span>

        {/* Link Button */}
        <Link
          href={exploreLink}
          className="inline-flex items-center gap-1 text-xs font-bold text-forest hover:text-forest-hover group/link hover:translate-x-1 transition-all"
        >
          <span>Explore Option</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}

// Fallback icon just in case
function Compass(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}
