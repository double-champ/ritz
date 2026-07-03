"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, X, Users, Heart, Clock, DollarSign, Calendar, Info, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Package } from "@/lib/data/packages";
import { getWhatsAppLink } from "@/lib/whatsapp";

interface PackageCardProps {
  pkg: Package;
  index: number;
}

export default function PackageCard({ pkg, index }: PackageCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  // Direct WhatsApp booking message
  const whatsappLink = getWhatsAppLink(
    `Hello Ritz Nature Villa, I would like to inquire about this package.`
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative flex flex-col bg-white rounded-3xl overflow-hidden border border-forest/10 hover:border-gold/30 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(45,80,22,0.1)] transition-all duration-500 h-full"
    >
      {/* Image Area */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={pkg.image}
          alt={pkg.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        {/* Category Badge */}
        <div className="absolute top-4 left-4 bg-charcoal/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-gold text-[10px] uppercase font-bold tracking-widest">
          {pkg.category === "stay"
            ? "Stay"
            : pkg.category === "day-outing"
            ? "Outing"
            : pkg.category === "pool"
            ? "Pool Access"
            : "Event"}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="font-serif font-bold text-lg text-charcoal group-hover:text-forest transition-colors duration-300 mb-1.5">
          {pkg.name}
        </h3>

        {/* Small Pills Row */}
        <div className="flex flex-wrap items-center gap-2 mb-3.5 text-[10px] font-semibold text-charcoal/70">
          <div className="flex items-center gap-1 bg-forest/5 px-2 py-0.5 rounded-md">
            <Users className="w-3.5 h-3.5 text-forest" />
            <span>{pkg.guestCount}</span>
          </div>
          <div className="flex items-center gap-1 bg-beige/50 px-2 py-0.5 rounded-md">
            <Heart className="w-3.5 h-3.5 text-gold" />
            <span>{pkg.suitableFor}</span>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-charcoal/70 text-sm leading-relaxed mb-3.5">
          {pkg.shortDescription}
        </p>

        {/* Short list of what's included */}
        <div className="mb-3.5">
          <h4 className="text-xs uppercase tracking-wider text-charcoal/50 font-bold mb-2">
            What&apos;s Included:
          </h4>
          <ul className="flex flex-col gap-1.5">
            {pkg.included.slice(0, 3).map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-charcoal/80">
                <Check className="w-3.5 h-3.5 text-forest shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
            {pkg.included.length > 3 && (
              <li className="text-[10px] text-forest/70 font-semibold italic">
                + {pkg.included.length - 3} more items included
              </li>
            )}
          </ul>
        </div>

        {/* Toggle Expandable Details */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-gold hover:text-gold-hover self-start mb-4 cursor-pointer"
        >
          {showDetails ? (
            <>
              <span>Hide Details</span>
              <ChevronUp className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              <span>Show Package Details</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </>
          )}
        </button>

        {/* Expandable details content */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-forest/5 pt-4 mb-6 flex flex-col gap-4 text-xs"
            >
              {/* Detailed specs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#fafaf8] p-3.5 rounded-xl border border-forest/5">
                <div className="flex gap-1.5 items-start">
                  <Clock className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[9px] uppercase text-charcoal/40 block">Duration</span>
                    <span className="text-charcoal/80 font-medium">{pkg.duration}</span>
                  </div>
                </div>

                <div className="flex gap-1.5 items-start">
                  <DollarSign className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[9px] uppercase text-charcoal/40 block">Extra Guest</span>
                    <span className="text-charcoal/80 font-medium">{pkg.extraGuestCharge}</span>
                  </div>
                </div>

                <div className="flex gap-1.5 items-start col-span-full border-t border-forest/5 pt-2">
                  <Calendar className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[9px] uppercase text-charcoal/40 block">Availability</span>
                    <span className="text-charcoal/80 font-medium">{pkg.availability}</span>
                  </div>
                </div>
              </div>

              {/* Inclusions & Exclusions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-bold uppercase text-[9px] text-forest mb-2 tracking-wider">All Inclusions</h5>
                  <ul className="flex flex-col gap-1.5">
                    {pkg.included.map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-charcoal/70 text-[11px]">
                        <Check className="w-3.5 h-3.5 text-forest shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-bold uppercase text-[9px] text-red-500 mb-2 tracking-wider">Exclusions</h5>
                  <ul className="flex flex-col gap-1.5">
                    {pkg.excluded.map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-charcoal/70 text-[11px]">
                        <X className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Booking notice */}
              <div className="bg-gold/5 border border-gold/15 p-3 rounded-xl flex gap-2">
                <Info className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <span className="font-bold text-[9px] uppercase text-charcoal/50 block">Booking Notice</span>
                  <p className="text-charcoal/70 text-[10px]">{pkg.bookingNote}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Price Area & CTA Buttons */}
        <div className="mt-auto pt-4 border-t border-forest/5">
          <div className="flex items-baseline justify-between mb-4">
            <span className="text-xs text-charcoal/55">Price</span>
            <span className="font-serif font-bold text-lg text-forest">
              {pkg.price}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href={{ pathname: "/booking", query: { package: pkg.id } }}
              className="py-2.5 px-4 bg-beige hover:bg-beige-hover text-charcoal font-semibold rounded-xl text-xs text-center border border-forest/5 active:scale-95 transition-all"
            >
              Inquire Now
            </Link>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold rounded-xl text-xs text-center flex items-center justify-center gap-1 active:scale-95 transition-all"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
              </svg>
              <span>Book</span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
