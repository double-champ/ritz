"use client";

import SectionHeader from "@/components/shared/SectionHeader";
import ExperienceCard from "@/components/shared/ExperienceCard";
import { experiences } from "@/lib/data/experiences";

export default function ExperienceSection() {
  return (
    <section className="py-20 md:py-28 bg-[#fafaf8] relative overflow-hidden">
      {/* Background glow styling */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-forest/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <SectionHeader
          badge="Curated Moments"
          title="Choose Your Ritz Experience"
          subtitle="Explore tailored packages designed for romantic getaways, family holidays, pool day outings, or custom celebrations."
        />

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {experiences.map((exp, index) => (
            <ExperienceCard key={exp.id} exp={exp} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}
