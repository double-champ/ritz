"use client";

import { useState } from "react";
import { Save, Lock, RefreshCw } from "lucide-react";

export default function AdminSettingsPage() {
  const [villaConfig, setVillaConfig] = useState({
    name: "Ritz Nature Villa",
    phone: "074 103 5606",
    whatsapp: "94741035606",
    address: "47 Narampanawa Road, Dunuhappawa, Sri Lanka",
    googleRating: "5.0",
    googleReviews: "12",
    seoTitle: "Ritz Nature Villa | Nature Villa, Pool Access & Day Outings in Kandy",
    seoDescription: "A peaceful villa retreat in the scenic hills of Kandy with an infinity pool, day outings, and serene accommodations.",
  });

  const [saving, setSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert("Settings saved successfully! (Simulated)");
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-8 font-sans">
      {/* Header */}
      <div>
        <h1 className="font-serif font-bold text-3xl text-white">Website Settings</h1>
        <p className="text-beige/60 text-sm mt-1">
          Configure global contact channels, metadata keywords, and landing parameters.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Settings Form Column */}
        <form onSubmit={handleSave} className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-charcoal-light p-6 rounded-2xl border border-white/5 shadow-md flex flex-col gap-5">
            <h3 className="font-serif font-bold text-lg text-white mb-1">General Details</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-beige/50 uppercase">Villa Name</label>
                <input
                  type="text"
                  value={villaConfig.name}
                  onChange={(e) => setVillaConfig({ ...villaConfig, name: e.target.value })}
                  className="px-4 py-3 bg-charcoal text-beige border border-white/10 rounded-xl text-sm focus:outline-none focus:border-gold"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-beige/50 uppercase">Contact Call Display</label>
                <input
                  type="text"
                  value={villaConfig.phone}
                  onChange={(e) => setVillaConfig({ ...villaConfig, phone: e.target.value })}
                  className="px-4 py-3 bg-charcoal text-beige border border-white/10 rounded-xl text-sm focus:outline-none focus:border-gold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-beige/50 uppercase">WhatsApp Number (Int&apos;l Prefix)</label>
                <input
                  type="text"
                  value={villaConfig.whatsapp}
                  onChange={(e) => setVillaConfig({ ...villaConfig, whatsapp: e.target.value })}
                  className="px-4 py-3 bg-charcoal text-beige border border-white/10 rounded-xl text-sm focus:outline-none focus:border-gold"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-beige/50 uppercase">Google Maps Coordinates / Address</label>
                <input
                  type="text"
                  value={villaConfig.address}
                  onChange={(e) => setVillaConfig({ ...villaConfig, address: e.target.value })}
                  className="px-4 py-3 bg-charcoal text-beige border border-white/10 rounded-xl text-sm focus:outline-none focus:border-gold"
                />
              </div>
            </div>
          </div>

          <div className="bg-charcoal-light p-6 rounded-2xl border border-white/5 shadow-md flex flex-col gap-5">
            <h3 className="font-serif font-bold text-lg text-white mb-1">SEO & Metadata</h3>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-beige/50 uppercase">SEO Page Title</label>
              <input
                type="text"
                value={villaConfig.seoTitle}
                onChange={(e) => setVillaConfig({ ...villaConfig, seoTitle: e.target.value })}
                className="px-4 py-3 bg-charcoal text-beige border border-white/10 rounded-xl text-sm focus:outline-none focus:border-gold"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-beige/50 uppercase">Meta Description Summary</label>
              <textarea
                rows={3}
                value={villaConfig.seoDescription}
                onChange={(e) => setVillaConfig({ ...villaConfig, seoDescription: e.target.value })}
                className="px-4 py-3 bg-charcoal text-beige border border-white/10 rounded-xl text-sm focus:outline-none focus:border-gold resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="py-3.5 bg-gold hover:bg-gold-hover text-charcoal font-bold rounded-xl text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Saving website settings...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Config Settings</span>
              </>
            )}
          </button>
        </form>

        {/* Informative Side Cards Column */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-charcoal-light rounded-2xl border border-white/5 p-6 shadow-md flex flex-col gap-4">
            <h3 className="font-serif font-bold text-base text-white border-b border-white/5 pb-2">
              System Health
            </h3>
            
            <div className="flex flex-col gap-3 text-xs">
              <div className="flex items-center justify-between text-beige/70">
                <span>Frontend Server:</span>
                <span className="text-green-400 font-bold">ONLINE</span>
              </div>
              <div className="flex items-center justify-between text-beige/70">
                <span>Database Sync:</span>
                <span className="text-yellow-500 font-bold">LOCAL CACHE</span>
              </div>
              <div className="flex items-center justify-between text-beige/70">
                <span>Security State:</span>
                <span className="text-green-400 font-bold">ENCRYPTED</span>
              </div>
            </div>
          </div>

          <div className="bg-[#2d5016]/10 rounded-2xl border border-gold/10 p-6 shadow-md text-center">
            <Lock className="w-6 h-6 text-gold mx-auto mb-2" />
            <span className="text-white text-xs font-bold font-serif block mb-1">
              Need Database Integrations?
            </span>
            <p className="text-beige/65 text-[10px] leading-relaxed mb-4">
              Connect this control settings form to a MySQL database schema or a Spring Boot REST API layer.
            </p>
            <button
              type="button"
              onClick={() => alert("Setup guide: Config Spring Boot application properties")}
              className="py-1.5 px-3 bg-gold hover:bg-gold-hover text-charcoal font-bold rounded-lg text-[9px] uppercase tracking-wider transition-colors"
            >
              Learn Integrations
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
