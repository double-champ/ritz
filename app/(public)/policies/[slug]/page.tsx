import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return [
    { slug: "privacy" },
    { slug: "booking" },
    { slug: "cancellation" },
    { slug: "pool-rules" },
    { slug: "terms" },
  ];
}

interface PolicyContent {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: { heading: string; paragraphs: string[] }[];
}

const policiesData: Record<string, PolicyContent> = {
  privacy: {
    title: "Privacy Policy",
    lastUpdated: "June 30, 2026",
    intro: "Ritz Nature Villa Kandy is committed to protecting your personal privacy. This Privacy Policy details how we handle the contact and booking details you submit on our website.",
    sections: [
      {
        heading: "1. Information Collected",
        paragraphs: [
          "When you submit a booking inquiry or contact form, we collect your Full Name, Phone Number, Email Address, and stay preferences.",
          "We also collect basic web diagnostics such as IP address and browser signatures for security purposes.",
        ],
      },
      {
        heading: "2. How We Use Information",
        paragraphs: [
          "To process and confirm your room reservations, day outings, and pool access passes.",
          "To message or call you directly regarding rates, directions, and scheduling updates.",
          "We do not sell, rent, or distribute guest contact details to third-party advertisers.",
        ],
      },
      {
        heading: "3. Data Security",
        paragraphs: [
          "All guest inquiries are stored in secure local servers and access is restricted only to authorized villa administrators.",
          "We adopt secure HTTPS protocols across all web forms to ensure your data stays encrypted.",
        ],
      },
    ],
  },
  booking: {
    title: "Booking Policy",
    lastUpdated: "June 30, 2026",
    intro: "Understand our reservation booking procedures for overnight rooms, pool day passes, and group outings.",
    sections: [
      {
        heading: "1. Reservation Requests",
        paragraphs: [
          "Online inquiry forms submitted on our website do not constitute a guaranteed reservation until verified and confirmed by villa hosts.",
          "Timely follow-ups are conducted via WhatsApp or phone call to finalize bookings.",
        ],
      },
      {
        heading: "2. Payment Deposits",
        paragraphs: [
          "To secure room bookings and large day outing buffets, an advance deposit of 30% to 50% may be required depending on seasonal demand.",
          "Bank transfers or local deposit methods are accepted. Details will be shared during confirmation.",
        ],
      },
      {
        heading: "3. Arrival Timings",
        paragraphs: [
          "Check-in time for overnight room stays is 2:00 PM. Check-out time is 11:00 AM.",
          "Day outing pool access passes are valid strictly between 8:00 AM and 6:00 PM.",
        ],
      },
    ],
  },
  cancellation: {
    title: "Cancellation Policy",
    lastUpdated: "June 30, 2026",
    intro: "Please review our cancellation terms before confirming your stay or event reservation.",
    sections: [
      {
        heading: "1. Stay Cancellations",
        paragraphs: [
          "Cancellations made 7 days prior to check-in dates qualify for a full refund of deposit charges (subject to bank transfer fees).",
          "Cancellations made between 3 and 7 days prior receive a 50% refund of deposit.",
          "No refunds are issued for cancellations made within 48 hours of scheduled arrival.",
        ],
      },
      {
        heading: "2. Dayouting & Pool Passes",
        paragraphs: [
          "Group outing reservations can be rescheduled once for free with a minimum of 3 days prior notice.",
          "Weather-related cancellations will be coordinated for rescheduling or full refund.",
        ],
      },
    ],
  },
  "pool-rules": {
    title: "Pool Rules & Safety Guidelines",
    lastUpdated: "June 30, 2026",
    intro: "Ritz Nature Villa hosts a beautiful hillside infinity pool. Please comply with these safety guidelines to ensure a pleasant day pass visit.",
    sections: [
      {
        heading: "1. Dress Code & Hygiene",
        paragraphs: [
          "Proper nylon swimwear is mandatory for all pool entries. Casual cotton clothing is strictly not permitted inside the water.",
          "Please shower at the poolside before entering the pool.",
        ],
      },
      {
        heading: "2. Supervision & Safety",
        paragraphs: [
          "There is no full-time lifeguard on duty. Guests swim at their own risk.",
          "Children must be actively supervised by a parent or guardian at all times around the pool deck.",
          "Diving is strictly prohibited due to pool depth regulations.",
        ],
      },
      {
        heading: "3. Food & Beverages",
        paragraphs: [
          "Consuming food, beverages, or alcohol inside the pool water is strictly forbidden.",
          "Glass bottles and glassware are not allowed on the pool deck to prevent injuries.",
        ],
      },
    ],
  },
  terms: {
    title: "Terms & Conditions",
    lastUpdated: "June 30, 2026",
    intro: "Welcome to Ritz Nature Villa. By browsing our website and booking our spaces, you agree to these Terms and Conditions.",
    sections: [
      {
        heading: "1. Property Damage",
        paragraphs: [
          "Guests are liable for any damages caused to villa furniture, pool equipment, gardens, or rooms during their stay.",
          "Charges for repairs or replacements will be added to the final checkout bill.",
        ],
      },
      {
        heading: "2. Conduct & Noise Limits",
        paragraphs: [
          "Ritz Nature Villa is a peaceful retreat. Excessive noise, loud music, or disruptive behavior that disturbs the village peace is not permitted, especially after 10:00 PM.",
        ],
      },
      {
        heading: "3. Liability Disclaimer",
        paragraphs: [
          "We are not liable for the loss of personal belongings, cash, or valuables inside rooms, vehicles, or common garden decks.",
          "Please secure your valuables.",
        ],
      },
    ],
  },
};

export default function PolicySlugPage({ params }: { params: { slug: string } }) {
  const policy = policiesData[params.slug];

  if (!policy) {
    notFound();
  }

  return (
    <div className="pt-24 pb-20 md:pb-28 bg-[#fafaf8] min-h-screen font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-xs font-bold text-forest hover:text-forest-hover mb-8 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>

        {/* Article */}
        <article className="bg-white p-8 md:p-12 rounded-3xl border border-forest/5 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gold block mb-2">
            Last Updated: {policy.lastUpdated}
          </span>
          
          <h1 className="font-serif font-bold text-3xl md:text-4xl text-charcoal leading-tight mb-6">
            {policy.title}
          </h1>

          <p className="text-charcoal/70 text-sm sm:text-base leading-relaxed mb-8 border-l-2 border-gold pl-4 italic">
            {policy.intro}
          </p>

          {/* Sections */}
          <div className="flex flex-col gap-8">
            {policy.sections.map((section, idx) => (
              <div key={idx} className="flex flex-col gap-3">
                <h2 className="font-serif font-bold text-lg md:text-xl text-charcoal">
                  {section.heading}
                </h2>
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-charcoal/70 text-xs sm:text-sm leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </article>

      </div>
    </div>
  );
}
export const dynamicParams = false;
