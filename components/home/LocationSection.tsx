"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import { getPhoneDialLink, getGoogleMapsLink, DISPLAY_PHONE } from "@/lib/whatsapp";

export default function LocationSection() {
  const dialLink = getPhoneDialLink();
  const mapsLink = getGoogleMapsLink();

  // Ritz Nature Villa Map Embed URL (Dunuhappawa, Kandy)
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.1706691456214!2d80.7237712147683!3d7.355872394691763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae35f0017c66b4f%3A0xa7d179676c44832a!2sRitz%20Nature%20Villa!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk";

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Details Column */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-forest/10 border border-forest/25 rounded-full text-forest text-xs font-semibold uppercase tracking-wider mb-5">
              <MapPin className="w-3.5 h-3.5" />
              <span>OUR LOCATION</span>
            </span>

            <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-charcoal leading-tight mb-6">
              Find Us in the Hills of Kandy
            </h2>

            <p className="text-charcoal/70 text-sm sm:text-base leading-relaxed mb-8">
              Ritz Nature Villa is situated in Dunuhappawa, along Narampanawa Road. Tucked away in a quiet mountain pocket, it offers peaceful surroundings and fresh mountain air, yet remains convenient to reach from Kandy City.
            </p>

            {/* Info Cards */}
            <div className="flex flex-col gap-4 w-full mb-8">
              <div className="flex gap-4 p-4 bg-beige/35 rounded-2xl border border-forest/5">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-1" />
                <div className="flex flex-col text-sm">
                  <span className="font-bold text-charcoal mb-0.5">Address</span>
                  <span className="text-charcoal/70">47 Narampanawa Road, Dunuhappawa, Sri Lanka</span>
                </div>
              </div>

              <div className="flex gap-4 p-4 bg-beige/35 rounded-2xl border border-forest/5">
                <Phone className="w-5 h-5 text-gold shrink-0 mt-1" />
                <div className="flex flex-col text-sm">
                  <span className="font-bold text-charcoal mb-0.5">Contact Call</span>
                  <span className="text-charcoal/70">{DISPLAY_PHONE}</span>
                </div>
              </div>

              <div className="flex gap-4 p-4 bg-beige/35 rounded-2xl border border-forest/5">
                <Clock className="w-5 h-5 text-gold shrink-0 mt-1" />
                <div className="flex flex-col text-sm">
                  <span className="font-bold text-charcoal mb-0.5">Opening Hours</span>
                  <span className="text-charcoal/70">Open 24 hours daily</span>
                </div>
              </div>
            </div>

            {/* Location buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full">
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-6 bg-forest hover:bg-forest-hover text-beige hover:text-white text-xs font-bold rounded-full uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all flex-1 sm:flex-none text-center"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </a>
              <a
                href={dialLink}
                className="py-3 px-6 bg-white hover:bg-beige/40 text-charcoal text-xs font-bold rounded-full uppercase tracking-wider border border-forest/10 active:scale-95 transition-all flex-1 sm:flex-none text-center"
              >
                Call Villa
              </a>
            </div>
          </div>

          {/* Map Column */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-3xl overflow-hidden border border-forest/10 shadow-lg"
            >
              {/* Map embed */}
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="filter brightness-[0.98] contrast-[1.02]"
                title="Ritz Nature Villa Map Location"
              />
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
