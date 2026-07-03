import SectionHeader from "@/components/shared/SectionHeader";
import Link from "next/link";
import { HelpCircle } from "lucide-react";

export const metadata = {
  title: "Frequently Asked Questions | Ritz Nature Villa Kandy",
  description: "Find answers about pool access, day outings, room stays, food rules, and reservations at Ritz Nature Villa Kandy.",
};

const faqs = [
  {
    q: "What is the pool access price?",
    a: "Pool access starts from Rs. 500 per person. This grants entry to our infinity pool, gardens, and changing/shower rooms for a day visit.",
  },
  {
    q: "Do we need to book before visiting?",
    a: "Yes, prior booking or a call is highly recommended before visiting the villa to check pool slots or overnight stay availability and prevent disappointments.",
  },
  {
    q: "Are food and drinks available?",
    a: "We serve authentic Sri Lankan meals, buffet options, and evening snacks on request. Custom BBQ and dinner plans can be pre-ordered.",
  },
  {
    q: "Is Ritz Nature Villa suitable for families?",
    a: "Yes, the villa is extremely family-friendly. We offer private bedrooms, large garden areas, and children under 5 enter the pool free.",
  },
  {
    q: "Can we arrange birthday celebrations?",
    a: "Absolutely! We offer specialized birthday celebration packages including event decorations, poolside tables, and music setups.",
  },
  {
    q: "Is parking available?",
    a: "Yes, secure free vehicle parking is available inside the gated villa property for up to 4-5 vehicles.",
  },
  {
    q: "What are the check-in and check-out times?",
    a: "For overnight stay packages, standard check-in time is 2:00 PM and check-out time is 11:00 AM.",
  },
  {
    q: "Can couples book the villa?",
    a: "Yes, couples can book our Double Bed Deluxe Rooms or our exclusive Couple Escape Package for maximum privacy and romance.",
  },
  {
    q: "Are outside foods allowed?",
    a: "Outside foods and drinks are allowed for specific day outing groups, but please verify corkage charges or kitchen use rules with our hosts prior to arrival.",
  },
  {
    q: "How can I make a booking?",
    a: "You can book directly by filling out the Booking Inquiry form on our site, or via WhatsApp / direct phone call to 074 103 5606.",
  },
];

export default function FAQPage() {
  return (
    <div className="pt-24 pb-20 md:pb-28 bg-[#fafaf8] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Section */}
        <div className="py-8 md:py-12">
          <SectionHeader
            badge="Frequently Asked Questions"
            title="Questions & Answers"
            subtitle="Get instant details on pool rates, bookings, meals, and general villa guidelines."
          />
        </div>

        {/* Accordions List using Native Details & Summary with Name attribute */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              name="villa-faq"
              className="group bg-white rounded-2xl border border-forest/5 shadow-sm overflow-hidden transition-all duration-300 open:shadow-md open:border-gold/30"
            >
              <summary className="p-5 font-serif font-bold text-sm sm:text-base text-charcoal hover:text-forest flex items-center justify-between cursor-pointer select-none">
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-gold shrink-0" />
                  <span>{faq.q}</span>
                </div>
                {/* Arrow Icon */}
                <span className="text-beige/60 group-open:rotate-180 transition-transform duration-300 font-sans text-xs">
                  ▼
                </span>
              </summary>
              {/* Content Panel */}
              <div className="px-5 pb-5 pt-1 text-charcoal/70 text-xs sm:text-sm leading-relaxed border-t border-forest/5 bg-beige/5 font-sans">
                {faq.a}
              </div>
            </details>
          ))}
        </div>

        {/* Still Have Questions CTA */}
        <div className="bg-forest text-beige p-8 rounded-3xl mt-16 text-center border border-forest/10 shadow-md">
          <h3 className="font-serif font-bold text-xl text-white mb-2">Still Have Questions?</h3>
          <p className="text-xs text-beige/70 mb-6 leading-relaxed">
            Our friendly hosts are available 24/7. Get in touch directly via WhatsApp or phone.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://wa.me/94741035606?text=Hello%20Ritz%20Nature%20Villa%2C%20I%20have%2520some%2520questions%2520about%2520bookings."
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-6 bg-gold hover:bg-gold-hover text-charcoal font-bold rounded-xl text-xs uppercase tracking-wider"
            >
              WhatsApp Us
            </a>
            <Link
              href="/contact"
              className="py-2.5 px-6 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl text-xs uppercase tracking-wider border border-white/15"
            >
              Contact Form
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
