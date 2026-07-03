"use client";

import { Star, MessageSquare } from "lucide-react";
import ReviewCard from "@/components/shared/ReviewCard";
import { reviews } from "@/lib/data/reviews";
import { getGoogleMapsLink } from "@/lib/whatsapp";
import Link from "next/link";

export default function ReviewsSection() {
  const googleLink = getGoogleMapsLink();
  // Display top 3 reviews on the homepage
  const homepageReviews = reviews.slice(0, 3);

  return (
    <section className="py-20 md:py-28 bg-[#fafaf8] border-t border-forest/5 relative overflow-hidden">
      {/* Decorative vector overlays */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Rating Header Info Panel */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold/10 border border-gold/25 rounded-full text-gold text-xs font-semibold uppercase tracking-wider mb-5">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>CUSTOMER LOVE</span>
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-charcoal leading-tight mb-4">
            Loved by Travelers
          </h2>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 bg-white px-6 py-3 rounded-2xl border border-forest/5 shadow-sm mt-2">
            <div className="flex items-center gap-0.5 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <span className="text-sm font-semibold text-charcoal">
              5.0 Google Rating based on 12 reviews
            </span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {homepageReviews.map((rev, index) => (
            <ReviewCard key={rev.id} review={rev} index={index} />
          ))}
        </div>

        {/* Bottom CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={googleLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto py-3 px-8 bg-white border border-forest/10 hover:bg-beige/40 text-charcoal text-center text-xs font-bold rounded-full uppercase tracking-wider transition-colors font-sans shadow-sm"
          >
            Read Reviews on Google
          </a>
          <Link
            href="/reviews"
            className="w-full sm:w-auto py-3 px-8 bg-forest hover:bg-forest-hover text-beige hover:text-white text-center text-xs font-bold rounded-full uppercase tracking-wider transition-colors font-sans shadow-sm"
          >
            See All Guest Stories
          </Link>
        </div>

      </div>
    </section>
  );
}
