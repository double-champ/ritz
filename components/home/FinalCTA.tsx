"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, CalendarDays } from "lucide-react";
import { getWhatsAppLink, getPhoneDialLink } from "@/lib/whatsapp";

export default function FinalCTA() {
  const whatsappLink = getWhatsAppLink(
    "Hello Ritz Nature Villa, I am ready to plan my visit. Please send me rates and package details."
  );
  const dialLink = getPhoneDialLink();

  return (
    <section className="relative py-24 md:py-32 bg-charcoal text-beige overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 scale-102"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=80')`,
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/80 to-charcoal/50" />

      {/* Nature glow accent */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-forest/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold uppercase tracking-widest text-gold bg-gold/10 px-4 py-1.5 rounded-full mb-6 border border-gold/25 font-sans"
        >
          Begin Your Escape
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif font-bold text-3.5xl sm:text-4.5xl md:text-5.5xl text-beige leading-tight tracking-wide mb-6"
        >
          Plan Your Peaceful Escape Today
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base md:text-lg text-beige/80 max-w-2xl leading-relaxed mb-10"
        >
          Whether it’s a pool day, romantic stay, family getaway, or special celebration, Ritz Nature Villa is ready to welcome you with natural beauty and warm hospitality.
        </motion.p>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          {/* WhatsApp CTA */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold rounded-full shadow-lg shadow-[#25D366]/20 transition-all duration-300 hover:scale-105 font-sans text-xs tracking-wider uppercase cursor-pointer"
          >
            {/* WhatsApp SVG */}
            <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
            </svg>
            <span>Book on WhatsApp</span>
          </a>

          {/* Call CTA */}
          <a
            href={dialLink}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-beige hover:bg-beige hover:text-charcoal text-beige font-bold rounded-full transition-all duration-300 hover:scale-105 font-sans text-xs tracking-wider uppercase"
          >
            <Phone className="w-4 h-4" />
            <span>Call Now</span>
          </a>

          {/* Packages */}
          <Link
            href="/packages"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-gold hover:bg-gold-hover text-charcoal font-bold rounded-full transition-all duration-300 hover:scale-105 font-sans text-xs tracking-wider uppercase shadow-md shadow-gold/15"
          >
            <CalendarDays className="w-4 h-4" />
            <span>View Packages</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
