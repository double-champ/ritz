"use client";

import { motion } from "framer-motion";
import { Waves } from "lucide-react";
import { getWhatsAppLink } from "@/lib/whatsapp";
import Link from "next/link";

export default function PoolHighlight() {
  const whatsappLink = getWhatsAppLink(
    "Hello Ritz Nature Villa, I would like to reserve pool access. Please share details on pool availability and rates."
  );

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white to-beige/25 relative overflow-hidden">
      {/* Decorative background visual elements */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-pool/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-forest/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-pool/10 border border-pool/25 rounded-full text-pool text-xs font-semibold uppercase tracking-wider mb-5"
            >
              <Waves className="w-3.5 h-3.5" />
              <span>REFRESHING ESCAPE</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-charcoal leading-tight mb-6"
            >
              Pool Access from <br />
              <span className="text-[#4a9ebf] relative font-extrabold">
                Rs. 500 Per Person
                <span className="absolute bottom-1 left-0 right-0 h-1 bg-pool/20 rounded" />
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-charcoal/70 text-sm sm:text-base leading-relaxed mb-8"
            >
              Enjoy a refreshing pool day surrounded by peaceful nature. Perfect for families, couples, friends, and relaxing day visits. Unplug, swim, and watch the clouds float over Kandy&apos;s misty forest ridges.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
            >
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-3.5 px-7 bg-forest hover:bg-forest-hover text-beige hover:text-white text-center font-bold rounded-full shadow-lg shadow-forest/15 transition-all duration-300 hover:scale-105"
              >
                Reserve Pool Access
              </a>
              <Link
                href="/pool-access"
                className="w-full sm:w-auto py-3.5 px-7 bg-white hover:bg-beige/30 text-charcoal text-center border border-forest/15 font-bold rounded-full transition-all duration-300 hover:scale-105"
              >
                View Outing Details
              </Link>
            </motion.div>
          </div>

          {/* Visual card - Glassmorphic Water inspired mockup */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 aspect-[4/3] group"
            >
              {/* Pool image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105" 
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1000&q=80')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />

              {/* Float Glass card on top of image */}
              <div className="absolute bottom-6 left-6 right-6 glass-panel-dark p-6 rounded-2xl border border-white/10 text-white">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gold block mb-1">
                  Highlights
                </span>
                <h4 className="font-serif font-bold text-lg mb-2">Hill Country Infinity Pool</h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-beige/80">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-[#25D366] rounded-full" />
                    <span>Open 24/7 Daily</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-[#25D366] rounded-full" />
                    <span>Free Parking</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-[#25D366] rounded-full" />
                    <span>Changing Showers</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-[#25D366] rounded-full" />
                    <span>Rs. 500 entry</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
