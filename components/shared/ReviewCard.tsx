"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Review } from "@/lib/data/reviews";

interface ReviewCardProps {
  review: Review;
  index: number;
}

export default function ReviewCard({ review, index }: ReviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="bg-white p-7 rounded-3xl border border-forest/10 hover:border-gold/30 shadow-md hover:shadow-lg transition-all duration-300 relative flex flex-col h-full"
    >
      {/* Decorative quotation marks */}
      <div className="absolute top-6 right-6 font-serif text-6xl text-beige select-none pointer-events-none line-height-0">
        “
      </div>

      {/* Stars */}
      <div className="flex items-center gap-0.5 text-gold mb-4 relative z-10">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4.5 h-4.5 fill-current ${
              i < review.rating ? "text-gold" : "text-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Review text */}
      <p className="text-charcoal/80 text-sm leading-relaxed mb-6 italic flex-grow relative z-10">
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Author and stats info */}
      <div className="border-t border-forest/5 pt-4 flex items-center justify-between mt-auto">
        <div className="flex flex-col">
          <span className="font-semibold text-sm text-charcoal">{review.name}</span>
          <span className="text-[10px] text-charcoal/50">{review.date}</span>
        </div>

        {/* Source Badge */}
        <span className="text-[10px] font-bold uppercase tracking-wider text-forest bg-forest/5 border border-forest/10 px-2.5 py-1 rounded-lg">
          {review.source}
        </span>
      </div>
    </motion.div>
  );
}
