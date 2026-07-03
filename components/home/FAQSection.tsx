"use client";

import Link from "next/link";
import SectionHeader from "@/components/shared/SectionHeader";
import { HelpCircle, ArrowRight } from "lucide-react";

const homeFaqs = [
  {
    q: "What is the pool access price?",
    a: "Pool access starts from Rs. 500 per person. This grants entry to our infinity pool, changing/shower rooms, and vehicle parking for a day visit.",
  },
  {
    q: "Do we need to book before visiting?",
    a: "Yes, prior reservation or a quick call is highly recommended to check pool availability and stay slots before making your trip.",
  },
  {
    q: "Are food and drinks available?",
    a: "We serve authentic Sri Lankan meals and bites on request. Custom BBQ and special dinners can be pre-ordered.",
  },
  {
    q: "Is Ritz Nature Villa suitable for families?",
    a: "Yes, the villa is child-friendly and features spacious bedroom stays, green lawns, and secure gated environments.",
  },
  {
    q: "How can I make a booking?",
    a: "You can book directly using the Booking Inquiry form on our site, or via WhatsApp or direct phone call to 074 103 5606.",
  },
];

export default function FAQSection() {
  return (
    <section className="py-20 md:py-28 bg-white border-t border-forest/5 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <SectionHeader
          badge="FAQ Help"
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about pool day passes, family outings, and overnight reservations."
        />

        {/* FAQs list */}
        <div className="flex flex-col gap-4 mb-10">
          {homeFaqs.map((faq, idx) => (
            <details
              key={idx}
              name="home-faq"
              className="group bg-[#fafaf8] rounded-2xl border border-forest/5 shadow-sm overflow-hidden transition-all duration-300 open:shadow-md open:border-gold/30"
            >
              <summary className="p-5 font-serif font-bold text-sm sm:text-base text-charcoal hover:text-forest flex items-center justify-between cursor-pointer select-none">
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-4.5 h-4.5 text-gold shrink-0" />
                  <span>{faq.q}</span>
                </div>
                <span className="text-beige/60 group-open:rotate-180 transition-transform duration-300 font-sans text-xs">
                  ▼
                </span>
              </summary>
              <div className="px-5 pb-5 pt-1 text-charcoal/70 text-xs sm:text-sm leading-relaxed border-t border-forest/5 bg-beige/5 font-sans">
                {faq.a}
              </div>
            </details>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-sm font-bold text-forest hover:text-forest-hover group"
          >
            <span>View All Frequently Asked Questions</span>
            <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
