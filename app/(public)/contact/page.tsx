"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, Facebook, Instagram } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { getPhoneDialLink, getGoogleMapsLink, DISPLAY_PHONE } from "@/lib/whatsapp";

export default function ContactPage() {
  const dialLink = getPhoneDialLink();
  const mapsLink = getGoogleMapsLink();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Mock API Route Call for inquiry handling
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          message: `${formData.subject ? `Subject: ${formData.subject}\n\n` : ""}${formData.message}`,
          experienceType: "General Inquiry",
        }),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="pt-24 pb-20 md:pb-28 bg-[#fafaf8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Section */}
        <div className="py-8 md:py-12">
          <SectionHeader
            badge="Get in Touch"
            title="We'd Love to Hear From You"
            subtitle="Connect with Ritz Nature Villa. Ask questions, plan private dinners, or get directions."
          />
        </div>

        {/* Form and Contact Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* Info Column */}
          <div className="lg:col-span-5 flex flex-col items-start gap-8">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full mb-3 inline-block">
                Direct Contact
              </span>
              <h3 className="font-serif font-bold text-2.5xl text-charcoal leading-tight">
                Reach Villa Hosts Immediately
              </h3>
            </div>

            {/* Quick contact list cards */}
            <div className="flex flex-col gap-4 w-full">
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-4 p-5 bg-white rounded-2xl border border-forest/5 shadow-sm hover:border-gold/30 hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 bg-forest/10 rounded-xl flex items-center justify-center text-forest group-hover:bg-forest group-hover:text-beige transition-all duration-300">
                  <MapPin className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col text-sm">
                  <span className="font-bold text-charcoal mb-0.5">Location</span>
                  <span className="text-charcoal/70">47 Narampanawa Road, Dunuhappawa, Sri Lanka</span>
                </div>
              </a>

              <a
                href={dialLink}
                className="flex gap-4 p-5 bg-white rounded-2xl border border-forest/5 shadow-sm hover:border-gold/30 hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 bg-forest/10 rounded-xl flex items-center justify-center text-forest group-hover:bg-forest group-hover:text-beige transition-all duration-300">
                  <Phone className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col text-sm">
                  <span className="font-bold text-charcoal mb-0.5">Phone Call</span>
                  <span className="text-charcoal/70">{DISPLAY_PHONE}</span>
                </div>
              </a>

              <div className="flex gap-4 p-5 bg-white rounded-2xl border border-forest/5 shadow-sm hover:border-gold/30 hover:shadow-md transition-all group">
                <div className="w-10 h-10 bg-forest/10 rounded-xl flex items-center justify-center text-forest group-hover:bg-forest group-hover:text-beige transition-all duration-300">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col text-sm">
                  <span className="font-bold text-charcoal mb-0.5">Email Inquiries</span>
                  <span className="text-charcoal/70">info@ritznaturevilla.com</span>
                </div>
              </div>

              <div className="flex gap-4 p-5 bg-white rounded-2xl border border-forest/5 shadow-sm hover:border-gold/30 hover:shadow-md transition-all group">
                <div className="w-10 h-10 bg-forest/10 rounded-xl flex items-center justify-center text-forest group-hover:bg-forest group-hover:text-beige transition-all duration-300">
                  <Clock className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col text-sm">
                  <span className="font-bold text-charcoal mb-0.5">Reception Hours</span>
                  <span className="text-charcoal/70">Open 24 hours / 7 days a week</span>
                </div>
              </div>
            </div>

            {/* Socials card */}
            <div className="flex items-center gap-3 w-full border-t border-forest/5 pt-6">
              <span className="text-xs font-semibold text-charcoal/50 uppercase tracking-wider mr-2">
                Follow Us:
              </span>
              <a
                href="https://facebook.com"
                className="w-9 h-9 rounded-full bg-white hover:bg-gold hover:text-charcoal border border-forest/10 flex items-center justify-center transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                className="w-9 h-9 rounded-full bg-white hover:bg-gold hover:text-charcoal border border-forest/10 flex items-center justify-center transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-forest/5 shadow-lg">
            <h3 className="font-serif font-bold text-xl text-charcoal mb-6">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-bold text-charcoal/60 uppercase">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-forest/10 text-sm focus:outline-none focus:border-forest"
                    placeholder="Enter name"
                  />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-bold text-charcoal/60 uppercase">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-forest/10 text-sm focus:outline-none focus:border-forest"
                    placeholder="Enter email"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="subject" className="text-xs font-bold text-charcoal/60 uppercase">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-forest/10 text-sm focus:outline-none focus:border-forest"
                  placeholder="Subject name"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-xs font-bold text-charcoal/60 uppercase">
                  Message *
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-forest/10 text-sm focus:outline-none focus:border-forest resize-none"
                  placeholder="Type message here..."
                />
              </div>

              {/* Submit Buttons */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3.5 bg-forest hover:bg-forest-hover text-beige hover:text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50"
              >
                {status === "loading" ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              {/* Feedback States */}
              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="p-4 bg-forest/10 border border-forest/20 text-forest text-xs font-medium rounded-xl text-center"
                  >
                    Thank you! Ritz Nature Villa will contact you shortly.
                  </motion.div>
                )}
                
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-xl text-center"
                  >
                    Something went wrong. Please try again or chat via WhatsApp.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

        </div>

        {/* Bottom Full Map Embed */}
        <div className="relative w-full h-96 sm:h-[450px] rounded-3xl overflow-hidden border border-forest/10 shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.1706691456214!2d80.7237712147683!3d7.355872394691763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae35f0017c66b4f%3A0xa7d179676c44832a!2sRitz%20Nature%20Villa!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="filter brightness-[0.98] contrast-[1.02]"
            title="Ritz Nature Villa Maps Location Embed"
          />
        </div>

      </div>
    </div>
  );
}
