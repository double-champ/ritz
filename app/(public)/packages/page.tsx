"use client";

import { useState } from "react";
import SectionHeader from "@/components/shared/SectionHeader";
import PackageCard from "@/components/shared/PackageCard";
import { packages } from "@/lib/data/packages";

const categories = [
  { id: "all", label: "All Packages" },
  { id: "stay", label: "Room Stays" },
  { id: "day-outing", label: "Day Outings" },
  { id: "pool", label: "Pool Access" },
  { id: "event", label: "Events & Birthdays" },
];

export default function PackagesPage() {
  const [selectedCat, setSelectedCat] = useState("all");

  const filteredPackages = selectedCat === "all" 
    ? packages 
    : packages.filter(p => p.category === selectedCat);

  return (
    <div className="pt-24 pb-20 md:pb-28 min-h-screen bg-gradient-to-b from-[#fafaf8] to-beige/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Section */}
        <div className="py-8 md:py-12">
          <SectionHeader
            badge="Luxurious Offers"
            title="Rooms & Packages"
            subtitle="Explore our peaceful double rooms, group outings, birthday venues, and pool access choices."
          />
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                selectedCat === cat.id
                  ? "bg-forest text-beige border border-forest"
                  : "bg-white text-charcoal border border-forest/10 hover:border-gold/30 hover:bg-beige/25"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg, idx) => (
            <PackageCard key={pkg.id} pkg={pkg} index={idx} />
          ))}
        </div>

      </div>
    </div>
  );
}
