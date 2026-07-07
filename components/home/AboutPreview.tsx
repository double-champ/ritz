"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Compass } from "lucide-react";
import AnimatedCounter from "@/components/shared/AnimatedCounter";

export default function AboutPreview() {
  const stats = [
    { value: 5.0, decimals: 1, suffix: "", label: "Google Rating" },
    { value: 12, decimals: 0, suffix: "+", label: "Google Reviews" },
    { value: 24, decimals: 0, suffix: "/7", label: "Hours Open" },
    { value: 500, decimals: 0, suffix: "", label: "Pool Access (Rs.)" },
  ];

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Decorative vectors */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-forest/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Visual Column */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative aspect-[4/3] lg:aspect-[3/4] rounded-3xl overflow-hidden border border-forest/10 shadow-xl group"
            >
              <Image
                src="/images/lobby.png"
                alt="Ritz Nature Villa Nature Surrounding"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/45 to-transparent" />
            </motion.div>
          </div>

          {/* Text & Counter Column */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-start"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-forest/10 border border-forest/25 rounded-full text-forest text-xs font-semibold uppercase tracking-wider mb-5">
                <Compass className="w-3.5 h-3.5" />
                <span>MEET RITZ VILLA</span>
              </span>

              <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-charcoal leading-tight mb-6">
                A Nature Villa Made for Slow Days
              </h2>

              <p className="text-charcoal/70 text-sm sm:text-base leading-relaxed mb-6">
                Ritz Nature Villa is a peaceful retreat nestled in the scenic hills of Kandy. Enjoy our infinity pool, comfortable accommodation, relaxing natural surroundings, and memorable experiences for families, couples, and groups.
              </p>
              
              <p className="text-charcoal/75 text-sm leading-relaxed mb-8">
                Located just along Narampanawa Road in Dunuhappawa, we are surrounded by lush forest settings, quiet village lanes, and pure Sri Lankan beauty. It is the ultimate spot to escape the rush and find yourself.
              </p>

              {/* Counters Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full mb-8 border-t border-forest/5 pt-8">
                {stats.map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="font-serif font-bold text-3xl sm:text-4xl text-forest">
                      <AnimatedCounter
                        value={stat.value}
                        decimals={stat.decimals}
                        suffix={stat.suffix}
                      />
                    </span>
                    <span className="text-[11px] uppercase tracking-wider text-charcoal/50 font-bold mt-1.5">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="/about"
                className="py-3 px-8 bg-forest hover:bg-forest-hover text-beige hover:text-white font-bold rounded-full transition-colors font-sans text-xs tracking-wider uppercase"
              >
                Read Our Story
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
