/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { packages } from "@/lib/data/packages";

const experienceTypes = [
  { id: "room-stay", label: "Room Stay" },
  { id: "pool-access", label: "Pool Access" },
  { id: "day-outing", label: "Day Outing" },
  { id: "birthday-celebration", label: "Birthday Celebration" },
  { id: "romantic-stay", label: "Romantic Stay" },
  { id: "family-stay", label: "Family Stay" },
  { id: "nature-stay", label: "Nature Retreat Stay" },
];

function BookingInquiryForm() {
  const searchParams = useSearchParams();
  const pkgParam = searchParams.get("package");
  const guestsParam = searchParams.get("guests");
  const checkInParam = searchParams.get("checkIn");

  const today = new Date().toLocaleDateString('en-CA');

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
    experienceType: "room-stay",
    message: "",
  });

  const selectedPackage = packages.find((p) => {
    if (formData.experienceType === "pool-access" && p.id === "pool-access") return true;
    if (formData.experienceType === "day-outing" && p.id === "day-outing") return true;
    if (formData.experienceType === "romantic-stay" && p.id === "couple-escape") return true;
    if (formData.experienceType === "family-stay" && p.id === "family-villa") return true;
    if (formData.experienceType === "birthday-celebration" && p.id === "birthday-celebration") return true;
    if (formData.experienceType === "nature-stay" && p.id === "nature-stay") return true;
    return false;
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Map incoming package parameters to drop down choices
  useEffect(() => {
    if (pkgParam) {
      if (pkgParam === "pool-access") {
        setFormData((prev) => ({ ...prev, experienceType: "pool-access" }));
      } else if (pkgParam === "day-outing") {
        setFormData((prev) => ({ ...prev, experienceType: "day-outing" }));
      } else if (pkgParam === "couple-escape" || pkgParam === "romantic-stay") {
        setFormData((prev) => ({ ...prev, experienceType: "romantic-stay" }));
      } else if (pkgParam === "family-villa" || pkgParam === "family-stay") {
        setFormData((prev) => ({ ...prev, experienceType: "family-stay" }));
      } else if (pkgParam === "birthday-celebration") {
        setFormData((prev) => ({ ...prev, experienceType: "birthday-celebration" }));
      } else if (pkgParam === "nature-stay" || pkgParam === "nature-retreat") {
        setFormData((prev) => ({ ...prev, experienceType: "nature-stay" }));
      } else {
        setFormData((prev) => ({ ...prev, experienceType: "room-stay" }));
      }
    }

    if (guestsParam) {
      setFormData((prev) => ({ ...prev, guests: guestsParam }));
    }

    if (checkInParam) {
      setFormData((prev) => ({ ...prev, checkIn: checkInParam }));
    }
  }, [pkgParam, guestsParam, checkInParam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.checkOut && formData.checkIn && formData.checkOut < formData.checkIn) {
      alert("Departure Date cannot be earlier than Arrival Date.");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setShowSuccessModal(true);
        // Clear forms
        setFormData({
          fullName: "",
          phone: "",
          email: "",
          checkIn: "",
          checkOut: "",
          guests: "2",
          experienceType: "room-stay",
          message: "",
        });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  // WhatsApp link with prefilled details
  const whatsappDetails = `Hello Ritz Nature Villa, I would like to book a stay/visit:
- Name: ${formData.fullName || "(Not specified)"}
- Phone: ${formData.phone || "(Not specified)"}
- Type: ${experienceTypes.find((t) => t.id === formData.experienceType)?.label || ""}
- Guests: ${formData.guests}
- Check In: ${formData.checkIn || "(Not specified)"}
- Check Out: ${formData.checkOut || "(Not specified)"}
Please send availability and details.`;
  const whatsappLink = getWhatsAppLink(whatsappDetails);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      
      {/* Instructions / Column Left */}
      <div className="lg:col-span-5 flex flex-col items-start gap-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full mb-3 inline-block">
            Reservation Inquiry
          </span>
          <h3 className="font-serif font-bold text-2.5xl text-charcoal leading-tight">
            Book Your Mountain Retreat
          </h3>
        </div>
        <p className="text-charcoal/70 text-sm leading-relaxed">
          Please fill out the inquiry form. Our villa hosts will reach out within a few hours to confirm rates, availability, and payment directions.
        </p>

        {/* Dynamic Package Preview Card */}
        {selectedPackage ? (
          <div className="w-full bg-white p-5 rounded-2.5xl border border-forest/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col gap-3.5">
            <div className="relative h-32 w-full overflow-hidden rounded-xl bg-beige/30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedPackage.image}
                alt={selectedPackage.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-charcoal/80 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[9px] text-gold uppercase font-bold tracking-wider">
                Selected Package
              </div>
            </div>
            <div className="flex flex-col">
              <h4 className="font-serif font-bold text-base text-charcoal">
                {selectedPackage.name}
              </h4>
              <p className="text-charcoal/70 text-xs mt-1 leading-relaxed">
                {selectedPackage.shortDescription}
              </p>
              <div className="flex flex-wrap gap-2 mt-2.5 text-[10px] text-charcoal/60 font-semibold">
                <span className="bg-forest/5 px-2.5 py-0.5 rounded-md">
                  Capacity: {selectedPackage.guestCount}
                </span>
                <span className="bg-beige/65 px-2.5 py-0.5 rounded-md text-gold">
                  Rate: {selectedPackage.price}
                </span>
              </div>
            </div>
            <div className="border-t border-forest/5 pt-3.5">
              <span className="text-[10px] uppercase font-bold text-charcoal/40 tracking-wider block mb-2">
                What&apos;s Included:
              </span>
              <ul className="flex flex-col gap-1.5">
                {selectedPackage.included.slice(0, 3).map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-charcoal/75">
                    <div className="w-1.5 h-1.5 rounded-full bg-forest shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          /* Fallback General Room Stay Card */
          <div className="w-full bg-white p-5 rounded-2.5xl border border-forest/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col gap-3.5">
            <div className="relative h-32 w-full overflow-hidden rounded-xl bg-beige/30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80"
                alt="Luxury Room Stay"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-charcoal/80 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[9px] text-gold uppercase font-bold tracking-wider">
                Room Stay
              </div>
            </div>
            <div className="flex flex-col">
              <h4 className="font-serif font-bold text-base text-charcoal">
                General Room Stay
              </h4>
              <p className="text-charcoal/70 text-xs mt-1 leading-relaxed">
                Enjoy a luxurious room stay in the misty hills of Kandy. Includes access to our mountain infinity pool and gardens.
              </p>
              <div className="flex flex-wrap gap-2 mt-2.5 text-[10px] text-charcoal/60 font-semibold">
                <span className="bg-forest/5 px-2.5 py-0.5 rounded-md">
                  Capacity: 2 - 4 guests
                </span>
                <span className="bg-beige/65 px-2.5 py-0.5 rounded-md text-gold">
                  Rate: Contact for Rates
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Alternative direct WhatsApp button */}
        <div className="w-full">
          <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal/40 block mb-2">
            Prefer direct chat?
          </span>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 px-5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer text-center"
          >
            {/* WhatsApp SVG Inline */}
            <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
            </svg>
            <span>Book instantly via WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Booking Form Card / Right Column */}
      <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-forest/5 shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="fullName" className="text-xs font-bold text-charcoal/60 uppercase">
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-forest/10 text-sm focus:outline-none focus:border-forest"
                placeholder="Full name"
              />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label htmlFor="phone" className="text-xs font-bold text-charcoal/60 uppercase">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-forest/10 text-sm focus:outline-none focus:border-forest"
                placeholder="07X XXX XXXX"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-bold text-charcoal/60 uppercase">
                Email Address (Optional)
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-forest/10 text-sm focus:outline-none focus:border-forest"
                placeholder="email@example.com"
              />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label htmlFor="experienceType" className="text-xs font-bold text-charcoal/60 uppercase">
                Experience Type *
              </label>
              <select
                id="experienceType"
                required
                value={formData.experienceType}
                onChange={(e) => setFormData({ ...formData, experienceType: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-forest/10 text-sm bg-white focus:outline-none focus:border-forest"
              >
                {experienceTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5 sm:col-span-1">
              <label htmlFor="guests" className="text-xs font-bold text-charcoal/60 uppercase">
                Guests *
              </label>
              <select
                id="guests"
                required
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-forest/10 text-sm bg-white focus:outline-none focus:border-forest"
              >
                {Array.from({ length: 20 }).map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1} {i + 1 === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
                <option value="20+">20+ Guests</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-1">
              <label htmlFor="checkIn" className="text-xs font-bold text-charcoal/60 uppercase">
                Arrival Date *
              </label>
              <input
                type="date"
                id="checkIn"
                required
                min={today}
                value={formData.checkIn}
                onChange={(e) => {
                  const val = e.target.value;
                  setFormData((prev) => {
                    const updated = { ...prev, checkIn: val };
                    if (prev.checkOut && val && prev.checkOut < val) {
                      updated.checkOut = "";
                    }
                    return updated;
                  });
                }}
                onClick={(e) => {
                  try {
                    e.currentTarget.showPicker();
                  } catch {}
                }}
                className="w-full px-4 py-3 rounded-xl border border-forest/10 text-sm focus:outline-none focus:border-forest"
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-1">
              <label htmlFor="checkOut" className="text-xs font-bold text-charcoal/60 uppercase">
                Departure Date
              </label>
              <input
                type="date"
                id="checkOut"
                min={formData.checkIn || today}
                value={formData.checkOut}
                onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                onClick={(e) => {
                  try {
                    e.currentTarget.showPicker();
                  } catch {}
                }}
                className="w-full px-4 py-3 rounded-xl border border-forest/10 text-sm focus:outline-none focus:border-forest"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-xs font-bold text-charcoal/60 uppercase">
              Special Requests / Messages
            </label>
            <textarea
              id="message"
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-forest/10 text-sm focus:outline-none focus:border-forest resize-none"
              placeholder="e.g. Birthday decoration, dietary preferences..."
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-4 bg-forest hover:bg-forest-hover text-beige hover:text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {status === "loading" ? (
              <span>Submitting booking...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Reservation Inquiry</span>
              </>
            )}
          </button>

          {/* Feedback states */}
          <AnimatePresence>
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="p-5 bg-forest/10 border border-forest/20 text-forest text-xs font-medium rounded-xl text-center flex flex-col gap-3 items-center"
              >
                <span>Thank you! Ritz Nature Villa will contact you shortly.</span>
                <a
                  href={getWhatsAppLink("Hello Ritz Nature Villa, I just submitted a booking inquiry online. Please let me know the status.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold rounded-lg uppercase tracking-wider text-[10px] transition-colors shadow-sm"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                  </svg>
                  <span>Follow Up via WhatsApp</span>
                </a>
              </motion.div>
            )}
            
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-xl text-center"
              >
                Failed to send inquiry. Please try again or submit via WhatsApp.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          </div>

        {/* Custom Success Dialog Modal */}
        <AnimatePresence>
          {showSuccessModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-charcoal/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 15 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-white p-8 md:p-10 rounded-3xl border border-forest/10 max-w-md w-full shadow-2xl flex flex-col items-center text-center gap-6 relative font-sans"
              >
                {/* Animated Success Checkmark Ring */}
                <div className="w-16 h-16 bg-forest/10 rounded-full flex items-center justify-center text-forest">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                {/* Text Information */}
                <div className="flex flex-col gap-2">
                  <h3 className="font-serif font-bold text-2xl text-charcoal">
                    Inquiry Received
                  </h3>
                  <p className="text-charcoal/70 text-sm leading-relaxed">
                    Thank you! Your reservation inquiry has been submitted successfully. Ritz Nature Villa hosts will verify availability and contact you shortly.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2.5 w-full mt-2">
                  <button
                    onClick={() => setShowSuccessModal(false)}
                    className="w-full py-3.5 bg-forest hover:bg-forest-hover text-beige hover:text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Okay, Great
                  </button>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                    </svg>
                    <span>Discuss via WhatsApp</span>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
  );
}

export default function BookingPage() {
  return (
    <div className="pt-24 pb-20 md:pb-28 bg-[#fafaf8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Section */}
        <div className="py-8 md:py-12">
          <SectionHeader
            badge="Reservations"
            title="Book Your Quiet Escape"
            subtitle="Let us know your check-in dates and package selection. Our hosts will confirm your villa reservation."
          />
        </div>

        <Suspense fallback={<div className="text-center py-12">Loading reservation details...</div>}>
          <BookingInquiryForm />
        </Suspense>

      </div>
    </div>
  );
}
