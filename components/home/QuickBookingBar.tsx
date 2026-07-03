"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, Users, Compass, Search } from "lucide-react";

export default function QuickBookingBar() {
  const router = useRouter();
  const [experience, setExperience] = useState("couple-escape");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("2");

  const today = new Date().toLocaleDateString('en-CA');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to the booking form with search params prefilled!
    const queryParams = new URLSearchParams({
      package: experience,
      guests: guests,
      checkIn: date,
    });
    router.push(`/booking?${queryParams.toString()}`);
  };

  return (
    <div className="relative z-25 max-w-5xl mx-auto px-4 -mt-14 sm:-mt-10 mb-16 md:mt-0 md:mb-0">
      <motion.form
        onSubmit={handleSearch}
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="glass-panel-dark p-5 md:p-6 rounded-3xl md:rounded-full border border-white/10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-5 md:gap-4 font-sans text-beige"
      >
        {/* Field 1: Experience Selector */}
        <div className="flex items-center gap-3 w-full md:w-auto md:flex-1 md:border-r border-white/10 pr-2">
          <Compass className="w-5 h-5 text-gold shrink-0" />
          <div className="flex flex-col w-full">
            <label className="text-[9px] uppercase tracking-widest text-beige/55 font-bold font-sans">
              Select Experience
            </label>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="bg-transparent text-sm text-white font-semibold focus:outline-none cursor-pointer pr-4 appearance-none"
            >
              <option value="couple-escape" className="bg-charcoal text-white">Couple Escape Stay</option>
              <option value="family-villa" className="bg-charcoal text-white">Family Villa Getaway</option>
              <option value="pool-access" className="bg-charcoal text-white">Pool Day Access</option>
              <option value="day-outing" className="bg-charcoal text-white">Group Day Outing</option>
              <option value="birthday-celebration" className="bg-charcoal text-white">Birthday poolside</option>
              <option value="nature-stay" className="bg-charcoal text-white">Nature Retreat Stay</option>
            </select>
          </div>
        </div>

        {/* Field 2: Date Picker */}
        <div className="flex items-center gap-3 w-full md:w-auto md:flex-1 md:border-r border-white/10 pr-2">
          <Calendar className="w-5 h-5 text-gold shrink-0" />
          <div className="flex flex-col w-full">
            <label className="text-[9px] uppercase tracking-widest text-beige/55 font-bold font-sans">
              Arrival Date
            </label>
            <input
              type="date"
              required
              min={today}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              onClick={(e) => {
                try {
                  e.currentTarget.showPicker();
                } catch {}
              }}
              className="bg-transparent text-sm text-white font-semibold focus:outline-none cursor-pointer w-full text-left"
              style={{ colorScheme: "dark" }}
            />
          </div>
        </div>

        {/* Field 3: Guest Selector */}
        <div className="flex items-center gap-3 w-full md:w-auto md:flex-1">
          <Users className="w-5 h-5 text-gold shrink-0" />
          <div className="flex flex-col w-full">
            <label className="text-[9px] uppercase tracking-widest text-beige/55 font-bold font-sans">
              Guests Count
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="bg-transparent text-sm text-white font-semibold focus:outline-none cursor-pointer pr-4 appearance-none"
            >
              <option value="1" className="bg-charcoal text-white">1 Guest</option>
              <option value="2" className="bg-charcoal text-white">2 Guests</option>
              <option value="3" className="bg-charcoal text-white">3 Guests</option>
              <option value="4" className="bg-charcoal text-white">4 Guests</option>
              <option value="5" className="bg-charcoal text-white">5 Guests</option>
              <option value="6" className="bg-charcoal text-white">6 - 10 Guests</option>
              <option value="10" className="bg-charcoal text-white">10+ Guests</option>
            </select>
          </div>
        </div>

        {/* CTA Button */}
        <button
          type="submit"
          className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-gold hover:bg-gold-hover text-charcoal font-bold rounded-full md:rounded-full transition-all duration-300 hover:scale-[1.03] cursor-pointer shadow-lg shadow-gold/15 text-xs uppercase tracking-wider whitespace-nowrap"
        >
          <Search className="w-4 h-4" />
          <span>Check Availability</span>
        </button>
      </motion.form>
    </div>
  );
}
