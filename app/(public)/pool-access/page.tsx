"use client";

import { motion } from "framer-motion";
import { Waves, Heart, Users, Cake, ShieldCheck, HelpCircle } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { getWhatsAppLink } from "@/lib/whatsapp";
import Link from "next/link";
import Image from "next/image";

export default function PoolAccessPage() {
  const whatsappLink = getWhatsAppLink(
    "Hello Ritz Nature Villa, I would like to book a Pool Day / Outing slot. Please let me know rates and availability."
  );

  const outingsOptions = [
    {
      title: "Family Pool Day",
      description: "A secure, spacious environment for children and parents. Large garden lawn for playing games.",
      icon: Users
    },
    {
      title: "Couple's Retreat",
      description: "Quiet, romantic settings overlooking the hills. Relax poolside and enjoy peaceful slow days.",
      icon: Heart
    },
    {
      title: "Friends & Groups",
      description: "Ideal daytime outing. Pool games, delicious food platters, and relaxing music by the deck.",
      icon: Waves
    },
    {
      title: "Birthday Events",
      description: "Host private poolside celebrations with decorations, catering support, and custom setups.",
      icon: Cake
    }
  ];

  return (
    <div className="pt-24 pb-20 md:pb-28 bg-gradient-to-b from-[#fafaf8] to-beige/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Section */}
        <div className="py-8 md:py-12">
          <SectionHeader
            badge="Nature & Outings"
            title="Refresh Your Day at Ritz Nature Villa"
            subtitle="Spend a relaxing pool day or schedule a complete group outing in Dunuhappawa, Kandy."
          />
        </div>

        {/* Feature Highlight Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-20">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-3xl border border-forest/10 shadow-lg relative overflow-hidden"
            >
              {/* Highlight ribbon */}
              <div className="absolute top-0 right-0 bg-pool text-white text-[10px] uppercase font-bold tracking-widest px-4 py-1.5 rounded-bl-xl">
                Best Value in Kandy
              </div>

              <span className="text-[10px] font-bold uppercase tracking-wider text-pool block mb-2">
                Pool Access Rates
              </span>
              <h3 className="font-serif font-bold text-3xl text-charcoal mb-4">
                Pool Access from <span className="text-pool font-extrabold">Rs. 500</span> Per Person
              </h3>
              <p className="text-charcoal/70 text-sm leading-relaxed mb-6">
                Our crystal-clear infinity pool sits high above the mountain mist, offering refreshing water and panoramic views of Sri Lankan forests. We offer changing rooms, showers, and safe lockers for all pool guests.
              </p>

              <div className="flex flex-col gap-3.5 mb-8">
                <div className="flex gap-2.5 items-start text-xs text-charcoal/80">
                  <ShieldCheck className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                  <span>Pool access includes changing rooms & shower access.</span>
                </div>
                <div className="flex gap-2.5 items-start text-xs text-charcoal/80">
                  <ShieldCheck className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                  <span>Children under 5 years enter free of charge.</span>
                </div>
                <div className="flex gap-2.5 items-start text-xs text-charcoal/80">
                  <ShieldCheck className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                  <span>Fresh towels are available upon request (rental/charges may apply).</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-6 bg-pool hover:bg-pool-hover text-white text-xs font-bold rounded-full uppercase tracking-wider text-center"
                >
                  Reserve Pool Access
                </a>
                <Link
                  href="/booking"
                  className="py-3 px-6 bg-beige hover:bg-beige-hover text-charcoal text-xs font-bold rounded-full uppercase tracking-wider border border-forest/10 text-center"
                >
                  Inquire Package
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-6 relative aspect-[16/10] sm:aspect-[4/3] rounded-3xl overflow-hidden border border-forest/10 shadow-lg group">
            <Image
              src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1000&q=80"
              alt="Pool Day Outing Infinity Pool"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-[10px] uppercase font-bold tracking-widest text-gold mb-1 block">
                Scenic Views
              </span>
              <h4 className="font-serif font-bold text-lg">Dunuhappawa Hills Viewpoint</h4>
            </div>
          </div>
        </div>

        {/* Day Outing Occasions */}
        <div className="mb-20">
          <SectionHeader
            badge="Tailor-made Visits"
            title="Create Your Perfect Pool Day"
            subtitle="Perfect for families, couples, friends gatherings, or customized birthday parties."
            centered={true}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {outingsOptions.map((opt, idx) => {
              const Icon = opt.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="bg-white p-6 rounded-2xl border border-forest/5 shadow-sm hover:shadow-md hover:border-gold/30 transition-all flex flex-col items-center text-center"
                >
                  <div className="w-12 h-12 bg-forest/10 rounded-xl flex items-center justify-center text-forest mb-4">
                    <Icon className="w-5.5 h-5.5" />
                  </div>
                  <h4 className="font-serif font-bold text-lg text-charcoal mb-2">{opt.title}</h4>
                  <p className="text-charcoal/65 text-xs leading-relaxed">{opt.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Rules and Guidelines Info Panel */}
        <div className="bg-charcoal text-beige p-8 md:p-12 rounded-3xl border border-white/5 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-forest/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            <div className="lg:col-span-4 flex flex-col items-start">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full mb-3">
                Villa Guidelines
              </span>
              <h3 className="font-serif font-bold text-2.5xl text-white leading-tight mb-4">
                Pool Safety & Rules
              </h3>
              <p className="text-beige/70 text-xs leading-relaxed">
                To guarantee all guests experience a peaceful and secure day visit, we kindly request everyone to follow these simple rules.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-xs text-beige/85">
              <div className="flex gap-2 items-start">
                <HelpCircle className="w-4.5 h-4.5 text-gold shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block mb-1">Swimwear Required</span>
                  <span>Proper swimwear is required for all guests entering the pool.</span>
                </div>
              </div>
              <div className="flex gap-2 items-start">
                <HelpCircle className="w-4.5 h-4.5 text-gold shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block mb-1">Timings</span>
                  <span>Dayouting pool access is available from 8:00 AM to 6:00 PM.</span>
                </div>
              </div>
              <div className="flex gap-2 items-start">
                <HelpCircle className="w-4.5 h-4.5 text-gold shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block mb-1">Child Supervision</span>
                  <span>Children must be accompanied by an adult in or around the pool at all times.</span>
                </div>
              </div>
              <div className="flex gap-2 items-start">
                <HelpCircle className="w-4.5 h-4.5 text-gold shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block mb-1">External Foods</span>
                  <span>Please consult with villa hosts regarding bringing external foods or drinks.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
