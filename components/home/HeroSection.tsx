"use client";

import { motion } from "framer-motion";
import { Star, Calendar, Sparkles, Compass } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getWhatsAppLink } from "@/lib/whatsapp";
import QuickBookingBar from "./QuickBookingBar";

export default function HeroSection() {
  const whatsappLink = getWhatsAppLink("Hello Ritz Nature Villa, I would like to inquire about booking a stay or package. Please send me details.");

  return (
    <section className="relative min-h-dvh md:h-dvh w-full flex items-center justify-center overflow-hidden bg-charcoal py-16 md:py-0">
      {/* Background Image with optimized layout */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/exterior.png"
          alt="Ritz Nature Villa Exterior"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center animate-zoom-slow"
        />
      </div>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-black/70" />

      {/* Nature Mist Overlay - subtle custom styling */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-forest/20 via-transparent to-transparent pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-gold text-xs font-semibold tracking-widest uppercase mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-gold animate-spin-slow" />
          <span>YOUR PEACEFUL ESCAPE IN KANDY</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-beige leading-tight tracking-wide"
        >
          Escape Into Nature at <br />
          <span className="text-white relative">
            Ritz Nature Villa
            <span className="absolute bottom-1 left-0 right-0 h-[2px] bg-gold/45 rounded" />
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 text-sm sm:text-base md:text-lg text-beige/85 max-w-2xl leading-relaxed font-sans"
        >
          A peaceful villa retreat in the scenic hills of Kandy with an infinity pool, relaxing stays, day outings, and beautiful natural surroundings.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-gold hover:bg-gold-hover text-charcoal font-bold rounded-full shadow-lg shadow-gold/20 transition-all duration-300 hover:scale-105 cursor-pointer font-sans text-sm tracking-wide"
          >
            {/* WhatsApp Icon */}
            <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
            </svg>
            <span>Book on WhatsApp</span>
          </a>

          <Link
            href="/packages"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/15 text-beige border border-white/20 font-bold rounded-full transition-all duration-300 hover:scale-105 font-sans text-sm tracking-wide"
          >
            <span>View Packages</span>
          </Link>
        </motion.div>

        {/* Badges Footer Area */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-xs font-semibold uppercase tracking-wider text-beige/70"
        >
          <div className="flex items-center gap-1.5 bg-black/25 px-4 py-2 rounded-full border border-white/5">
            <Star className="w-4 h-4 text-gold fill-current" />
            <span>5.0 Google Rating (12 Reviews)</span>
          </div>
          <div className="flex items-center gap-1.5 bg-black/25 px-4 py-2 rounded-full border border-white/5">
            <div className="w-2 h-2 rounded-full bg-pool animate-pulse" />
            <span>Infinity Pool</span>
          </div>
          <div className="flex items-center gap-1.5 bg-black/25 px-4 py-2 rounded-full border border-white/5">
            <Compass className="w-4 h-4 text-gold" />
            <span>Open 24 Hours</span>
          </div>
          <div className="flex items-center gap-1.5 bg-black/25 px-4 py-2 rounded-full border border-white/5">
            <Calendar className="w-4 h-4 text-gold" />
            <span>Day Outings</span>
          </div>
        </motion.div>
      </div>

      {/* Quick Booking Bar Desktop */}
      <div className="absolute bottom-6 left-0 right-0 z-20 w-full hidden md:block">
        <QuickBookingBar />
      </div>
    </section>
  );
}
