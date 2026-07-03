"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PackageCard from "@/components/shared/PackageCard";
import { packages } from "@/lib/data/packages";

export default function PackagesPreview() {
  // Preview 3 packages on home page, or show all 6. Let's show first 3 packages on the home page as a preview, with a link to see all!
  // This is clean and matches the "Preview" concept.
  const previewPackages = packages.slice(0, 3);

  return (
    <section className="py-20 md:py-28 bg-[#fafaf8] border-t border-forest/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl text-left">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full mb-3 border border-gold/25 font-sans">
              Exclusive Packages
            </span>
            <h2 className="font-serif font-bold text-3xl md:text-4xl lg:text-5xl text-charcoal leading-tight">
              Stays & Outing Packages
            </h2>
            <p className="mt-4 text-sm md:text-base leading-relaxed text-charcoal/70">
              Discover comfortable accommodations, serene environment, and high-value packages curated for your relaxation.
            </p>
          </div>
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 text-sm font-bold text-forest hover:text-forest-hover group mt-4 md:mt-0 whitespace-nowrap"
          >
            <span>View All Packages</span>
            <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {previewPackages.map((pkg, index) => (
            <PackageCard key={pkg.id} pkg={pkg} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}
