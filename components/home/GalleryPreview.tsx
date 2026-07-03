"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Image as ImageIcon } from "lucide-react";
import { galleryItems } from "@/lib/data/gallery";

export default function GalleryPreview() {
  const previewItems = galleryItems.slice(0, 6);

  return (
    <section className="py-20 md:py-28 bg-charcoal text-beige relative overflow-hidden">
      {/* Decorative dark elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-forest/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl text-left">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full mb-3 border border-gold/25 font-sans">
              <ImageIcon className="w-3.5 h-3.5" />
              <span>VISUAL JOURNEY</span>
            </span>
            <h2 className="font-serif font-bold text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
              Captured Tranquility
            </h2>
            <p className="mt-4 text-sm md:text-base leading-relaxed text-beige/70">
              Get a glimpse of our pool, cozy villa rooms, romantic set-ups, and the peaceful green hills around us.
            </p>
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-sm font-bold text-gold hover:text-gold-hover group mt-4 md:mt-0 whitespace-nowrap"
          >
            <span>Open Full Gallery</span>
            <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {previewItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden border border-white/5 shadow-md group cursor-pointer"
            >
              <Image
                src={item.url}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div>
                  <span className="text-[9px] uppercase font-bold tracking-widest text-gold mb-0.5 block">
                    {item.category}
                  </span>
                  <span className="text-white text-xs font-semibold font-serif">
                    {item.title}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
