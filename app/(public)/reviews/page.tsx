"use client";

import { Star } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import ReviewCard from "@/components/shared/ReviewCard";
import { reviews, googleRatingStats } from "@/lib/data/reviews";
import { getGoogleMapsLink } from "@/lib/whatsapp";
import Link from "next/link";

export default function ReviewsPage() {
  const mapsLink = getGoogleMapsLink();

  return (
    <div className="pt-24 pb-20 md:pb-28 bg-[#fafaf8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Section */}
        <div className="py-8 md:py-12">
          <SectionHeader
            badge="Guest Stories"
            title="What Our Visitors Say"
            subtitle="Read verified customer feedback from guests who stayed at Ritz Nature Villa, booked pool days, or held celebrations."
          />
        </div>

        {/* Rating Breakdown Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 items-center bg-white p-8 rounded-3xl border border-forest/5 shadow-sm">
          {/* Main Score Card */}
          <div className="md:col-span-4 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-forest/10 pb-6 md:pb-0 md:pr-6">
            <span className="text-6xl font-bold font-serif text-forest mb-2">
              {googleRatingStats.score.toFixed(1)}
            </span>
            <div className="flex items-center gap-0.5 text-gold mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5.5 h-5.5 fill-current" />
              ))}
            </div>
            <span className="text-xs font-semibold text-charcoal/50 uppercase tracking-wider">
              Based on {googleRatingStats.count} Google Reviews
            </span>
          </div>

          {/* Stars Breakdown Column */}
          <div className="md:col-span-5 flex flex-col gap-2.5">
            {googleRatingStats.stars.map((count, idx) => {
              const starsCount = 5 - idx;
              const percentage = (count / googleRatingStats.count) * 100;
              return (
                <div key={idx} className="flex items-center gap-3 text-xs">
                  <span className="w-3 font-semibold text-charcoal/60">{starsCount}</span>
                  <Star className="w-3.5 h-3.5 fill-current text-gold shrink-0" />
                  {/* Progress bar */}
                  <div className="flex-grow h-2 bg-beige/40 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gold rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="w-5 text-right font-semibold text-charcoal/60">{count}</span>
                </div>
              );
            })}
          </div>

          {/* CTA Box Column */}
          <div className="md:col-span-3 flex flex-col items-center md:items-end justify-center text-center md:text-right">
            <span className="text-sm font-semibold text-charcoal mb-4">Have you visited us recently?</span>
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-6 bg-gold hover:bg-gold-hover text-charcoal font-bold rounded-xl text-xs uppercase tracking-wider shadow-sm transition-colors text-center w-full"
            >
              Write a Google Review
            </a>
          </div>
        </div>

        {/* All Reviews list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {reviews.map((rev, idx) => (
            <ReviewCard key={rev.id} review={rev} index={idx} />
          ))}
        </div>

        {/* Final CTA */}
        <div className="bg-forest text-beige p-8 md:p-12 rounded-3xl border border-forest/10 shadow-lg text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-forest-hover/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
            <h3 className="font-serif font-bold text-2.5xl text-white mb-3">
              Book Your 5-Star Stay Today
            </h3>
            <p className="text-beige/70 text-xs sm:text-sm mb-8 leading-relaxed">
              Experience the hospitality and tranquil atmosphere that everyone is talking about. We have spaces waiting for you.
            </p>
            <Link
              href="/booking"
              className="py-3 px-8 bg-gold hover:bg-gold-hover text-charcoal font-bold rounded-full text-xs uppercase tracking-wider shadow-sm transition-colors"
            >
              Book Stay Now
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
