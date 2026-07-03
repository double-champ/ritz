"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, CalendarDays, Compass } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Packages", path: "/packages" },
  { label: "Pool Access", path: "/pool-access" },
  { label: "Gallery", path: "/gallery" },
  { label: "Reviews", path: "/reviews" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on path changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-charcoal/90 backdrop-blur-md border-b border-gold/15 py-3 shadow-lg"
            : "bg-gradient-to-b from-black/60 to-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Brand Name */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center bg-forest/20 backdrop-blur-sm group-hover:border-gold transition-all duration-300">
              <Compass className="w-5 h-5 text-gold group-hover:rotate-45 transition-transform duration-500" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg md:text-xl tracking-wider text-beige group-hover:text-white transition-colors">
                RITZ NATURE VILLA
              </span>
              <span className="text-[9px] uppercase tracking-widest text-gold font-sans font-medium -mt-1">
                Kandy, Sri Lanka
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "px-4 py-2 text-sm font-medium tracking-wide transition-colors relative rounded-lg font-sans",
                    isActive
                      ? "text-gold font-medium"
                      : "text-beige/80 hover:text-white hover:bg-white/5"
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute bottom-0 left-4 right-4 h-0.5 bg-gold rounded-full transition-all duration-350 transform scale-x-0 origin-center",
                      isActive && "scale-x-100"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Book Now Button Desktop */}
          <div className="hidden md:block">
            <Link
              href="/booking"
              className="flex items-center gap-2 px-5 py-2.5 bg-gold hover:bg-gold-hover text-charcoal font-semibold rounded-full text-sm tracking-wide shadow-[0_4px_14px_rgba(201,168,76,0.35)] transition-all duration-300 hover:translate-y-[-1px] hover:shadow-[0_6px_20px_rgba(201,168,76,0.45)]"
            >
              <CalendarDays className="w-4 h-4" />
              <span>Book Now</span>
            </Link>
          </div>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-beige hover:text-white transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation (Popover-like overlay) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[72px] z-40 md:hidden bg-charcoal/95 backdrop-blur-lg border-b border-gold/20 shadow-2xl py-6 px-4 flex flex-col gap-4"
          >
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={cn(
                      "px-4 py-3 rounded-xl text-base font-medium tracking-wide transition-all",
                      isActive
                        ? "bg-gold/10 text-gold border border-gold/20"
                        : "text-beige/80 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <Link
              href="/booking"
              className="flex items-center justify-center gap-2 w-full py-3 bg-gold hover:bg-gold-hover text-charcoal font-bold rounded-xl text-base shadow-lg transition-all"
            >
              <CalendarDays className="w-5 h-5" />
              <span>Book Stay Now</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
