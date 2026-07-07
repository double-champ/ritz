"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { galleryItems, galleryCategories } from "@/lib/data/gallery";

export default function GalleryPage() {
  const [selectedCat, setSelectedCat] = useState("all");
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  const filteredItems = selectedCat === "all"
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCat);

  const activePhotoObj = galleryItems.find(item => item.url === activePhoto);

  return (
    <div className="pt-24 pb-20 md:pb-28 min-h-screen bg-gradient-to-b from-[#fafaf8] to-beige/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Section */}
        <div className="py-8 md:py-12">
          <SectionHeader
            badge="Captured Beauty"
            title="Villa Photo Gallery"
            subtitle="Take a visual tour around Ritz Nature Villa. Walk through our rooms, dive into the pool, and explore the forest hills."
          />
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {galleryCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                selectedCat === cat.id
                  ? "bg-forest text-beige border border-forest"
                  : "bg-white text-charcoal border border-forest/10 hover:border-gold/30 hover:bg-beige/25"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry-Style Responsive Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onClick={() => setActivePhoto(item.url)}
              className="break-inside-avoid relative rounded-3xl overflow-hidden border border-forest/5 shadow-sm group cursor-zoom-in group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              
              {/* Overlay with description */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-6">
                <div className="flex items-center justify-between w-full">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-gold block mb-0.5">
                      {item.category}
                    </span>
                    <span className="text-white text-sm font-semibold font-serif block">
                      {item.title}
                    </span>
                  </div>
                  <div className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-white border border-white/20">
                    <ZoomIn className="w-4.5 h-4.5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal (Framer Motion Animated Overlay) */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4"
            onClick={() => setActivePhoto(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 border border-white/10 text-white hover:bg-white/20 active:scale-95 transition-all"
              aria-label="Close photo preview"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Photo Preview Container */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-5xl w-full h-[70vh] max-h-[70vh] overflow-hidden rounded-2xl border border-white/15"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={activePhoto}
                alt="Selected preview"
                fill
                className="object-contain"
                sizes="100vw"
              />
            </motion.div>

            {/* Subtext info */}
            {activePhotoObj && (
              <div className="text-center mt-6 text-white max-w-xl">
                <span className="text-[10px] uppercase tracking-widest text-gold font-bold mb-1 block">
                  {activePhotoObj.category}
                </span>
                <h3 className="font-serif font-bold text-lg">{activePhotoObj.title}</h3>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
