import Link from "next/link";
import { Compass, Phone, Mail, MapPin, Clock, Facebook, Instagram, ShieldAlert } from "lucide-react";
import { getWhatsAppLink, getPhoneDialLink, getGoogleMapsLink } from "@/lib/whatsapp";

export default function Footer() {
  const whatsappLink = getWhatsAppLink();
  const dialLink = getPhoneDialLink();
  const mapLink = getGoogleMapsLink();

  return (
    <footer className="bg-charcoal text-beige border-t border-gold/15 pt-16 pb-28 md:pb-12 font-sans relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-forest/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-6">
          {/* Brand Info */}
          <div className="flex flex-col gap-4 sm:col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full border border-gold/40 flex items-center justify-center bg-forest/20">
                <Compass className="w-4.5 h-4.5 text-gold" />
              </div>
              <span className="font-serif font-bold text-lg tracking-wider text-white">
                RITZ NATURE VILLA
              </span>
            </Link>
            <p className="text-beige/60 text-sm leading-relaxed">
              Your peaceful nature retreat nestled in the misty hills of Kandy. Experience tranquility, infinity pool luxury, day outings, and authentic Sri Lankan hospitality.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-gold hover:text-charcoal border border-white/10 flex items-center justify-center transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-gold hover:text-charcoal border border-white/10 flex items-center justify-center transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-gold hover:text-charcoal border border-white/10 flex items-center justify-center transition-all duration-300"
                aria-label="WhatsApp"
              >
                {/* Simple WhatsApp SVG */}
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-serif text-white font-semibold text-base tracking-wider uppercase border-b border-white/5 pb-2">
              Explore
            </h4>
            <nav className="flex flex-col gap-2.5 text-sm">
              <Link href="/" className="text-beige/60 hover:text-gold transition-colors">
                Home
              </Link>
              <Link href="/packages" className="text-beige/60 hover:text-gold transition-colors">
                Rooms & Packages
              </Link>
              <Link href="/pool-access" className="text-beige/60 hover:text-gold transition-colors">
                Pool & Day Outings
              </Link>
              <Link href="/gallery" className="text-beige/60 hover:text-gold transition-colors">
                Photo Gallery
              </Link>
              <Link href="/about" className="text-beige/60 hover:text-gold transition-colors">
                About Ritz Villa
              </Link>
              <Link href="/reviews" className="text-beige/60 hover:text-gold transition-colors">
                Guest Reviews
              </Link>
              <Link href="/contact" className="text-beige/60 hover:text-gold transition-colors">
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Policies */}
          <div className="flex flex-col gap-4">
            <h4 className="font-serif text-white font-semibold text-base tracking-wider uppercase border-b border-white/5 pb-2">
              Policies
            </h4>
            <nav className="flex flex-col gap-2.5 text-sm">
              <Link href="/policies/privacy" className="text-beige/60 hover:text-gold transition-colors">
                Privacy Policy
              </Link>
              <Link href="/policies/booking" className="text-beige/60 hover:text-gold transition-colors">
                Booking Policy
              </Link>
              <Link href="/policies/cancellation" className="text-beige/60 hover:text-gold transition-colors">
                Cancellation Policy
              </Link>
              <Link href="/policies/pool-rules" className="text-beige/60 hover:text-gold transition-colors">
                Pool Rules
              </Link>
              <Link href="/policies/terms" className="text-beige/60 hover:text-gold transition-colors">
                Terms & Conditions
              </Link>
            </nav>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-4">
            <h4 className="font-serif text-white font-semibold text-base tracking-wider uppercase border-b border-white/5 pb-2">
              Contact Info
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-beige/60">
              <li className="flex gap-2.5 items-start">
                <MapPin className="w-4.5 h-4.5 text-gold shrink-0 mt-0.5" />
                <a
                  href={mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  47 Narampanawa Road, Dunuhappawa, Sri Lanka
                </a>
              </li>
              <li className="flex gap-2.5 items-center">
                <Phone className="w-4.5 h-4.5 text-gold shrink-0" />
                <a href={dialLink} className="hover:text-gold transition-colors">
                  074 103 5606
                </a>
              </li>
              <li className="flex gap-2.5 items-center">
                <Mail className="w-4.5 h-4.5 text-gold shrink-0" />
                <span className="hover:text-gold transition-colors">info@ritznaturevilla.com</span>
              </li>
              <li className="flex gap-2.5 items-center">
                <Clock className="w-4.5 h-4.5 text-gold shrink-0" />
                <span>Open 24 Hours</span>
              </li>
            </ul>
          </div>

          {/* Highlights & Quick CTA */}
          <div className="flex flex-col gap-4">
            <h4 className="font-serif text-white font-semibold text-base tracking-wider uppercase border-b border-white/5 pb-2">
              Day Visits
            </h4>
            <div className="bg-forest/20 border border-gold/15 p-4 rounded-xl">
              <span className="text-gold font-serif font-bold text-lg block mb-1">
                Rs. 500 Pool Access
              </span>
              <p className="text-xs text-beige/65 leading-relaxed mb-3">
                Spend a relaxing pool day surrounded by mountains. Reserve your slot now via WhatsApp.
              </p>
              <Link
                href="/booking"
                className="inline-block w-full py-2 bg-gold hover:bg-gold-hover text-charcoal text-center text-xs font-bold rounded-lg transition-colors"
              >
                Book Pool Day
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-beige/40">
          <p>© {new Date().getFullYear()} Ritz Nature Villa. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span>Designed in Sri Lanka</span>
            <Link
              href="/admin"
              className="flex items-center gap-1 hover:text-gold transition-colors"
            >
              <ShieldAlert className="w-3 h-3" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
