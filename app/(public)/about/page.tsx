"use client";

import { motion } from "framer-motion";
import { Trees, Waves, Heart, HeartHandshake } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  const values = [
    {
      title: "Nature Escape",
      desc: "Immerse yourself in mountain mist, tropical birds, and fresh hill country breezes.",
      icon: Trees,
    },
    {
      title: "Genuine Hospitality",
      desc: "Experience warm Sri Lankan hospitality and service tailored specifically to your needs.",
      icon: HeartHandshake,
    },
    {
      title: "Peaceful Dips",
      desc: "Our infinity pool sits above the valley, providing the ultimate environment to swim and relax.",
      icon: Waves,
    },
    {
      title: "Perfect Security",
      desc: "A safe, closed property with 24-hour service. Safe environments for families & kids.",
      icon: Heart,
    },
  ];

  return (
    <div className="pt-24 pb-20 md:pb-28 bg-[#fafaf8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Section */}
        <div className="py-8 md:py-12">
          <SectionHeader
            badge="About Us"
            title="The Ritz Nature Villa Experience"
            subtitle="Understand our philosophy of slow days, peaceful swims, and natural beauty in Kandy."
          />
        </div>

        {/* Narrative & Visual Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          {/* Visual Column */}
          <div className="lg:col-span-5 relative aspect-[3/4] rounded-3xl overflow-hidden border border-forest/10 shadow-xl group">
            <Image
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
              alt="Nature Retreat"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/50 to-transparent" />
          </div>

          {/* Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full mb-4">
              Our Journey
            </span>
            <h3 className="font-serif font-bold text-2.5xl sm:text-3xl text-charcoal mb-6 leading-tight">
              A Serene Sanctuary Built for Mindful Stays
            </h3>
            
            <div className="flex flex-col gap-4 text-charcoal/70 text-sm sm:text-base leading-relaxed">
              <p>
                Ritz Nature Villa was envisioned as an escape from the busy streets of Kandy. Situated in the peaceful valley of Dunuhappawa, we wanted to build a sanctuary where guests can sleep, swim, and relax surrounded by purely Sri Lankan nature.
              </p>
              <p>
                Whether you arrive for a day outing, pool day access, family gathering, or a romantic overnight escape, our villa is designed to make you feel right at home. We combine comfort, luxury forest surroundings, and pocket-friendly pricing starting from Rs. 500.
              </p>
              <p className="font-serif italic text-forest font-semibold mt-2 border-l-2 border-gold pl-4">
                “Nature. Pool. Peace. Relax above the ordinary.”
              </p>
            </div>
          </div>
        </div>

        {/* Brand Values / Trust Badges */}
        <div className="mb-24">
          <SectionHeader
            badge="Core Philosophy"
            title="What Makes Us Special"
            subtitle="We dedicate ourselves to providing high-quality experiences that combine natural forest beauty and premium hospitality."
            centered={true}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="bg-white p-6 rounded-2xl border border-forest/5 shadow-sm hover:shadow-md transition-all flex flex-col items-start"
                >
                  <div className="w-12 h-12 bg-forest/10 rounded-xl flex items-center justify-center text-forest mb-4 border border-forest/5 shadow-inner">
                    <Icon className="w-5.5 h-5.5" />
                  </div>
                  <h4 className="font-serif font-bold text-lg text-charcoal mb-2">{val.title}</h4>
                  <p className="text-charcoal/65 text-xs leading-relaxed">{val.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-charcoal text-beige p-8 md:p-12 rounded-3xl border border-white/5 shadow-xl text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-forest/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <h3 className="font-serif font-bold text-2.5xl sm:text-3xl text-white mb-4">
              Ready to Escape the Ordinary?
            </h3>
            <p className="text-beige/70 text-xs sm:text-sm leading-relaxed mb-8">
              Explore our packages or get in touch today to schedule pool access, day outings, romantic villa retreats, or group vacations.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/booking"
                className="py-3 px-8 bg-gold hover:bg-gold-hover text-charcoal font-bold rounded-full text-xs uppercase tracking-wider transition-colors"
              >
                Book Your Visit
              </Link>
              <Link
                href="/contact"
                className="py-3 px-8 bg-white/5 hover:bg-white/10 text-white font-bold rounded-full text-xs uppercase tracking-wider border border-white/15 transition-colors"
              >
                Contact Details
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
