"use client";

import { useState } from "react";
import { PlusCircle, Search, Edit, Trash2, X, Save, Sparkles } from "lucide-react";
import { packages, Package } from "@/lib/data/packages";
import Image from "next/image";

export default function AdminPackagesPage() {
  const [pkgs, setPkgs] = useState<Package[]>(packages);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Fields State
  const [formData, setFormData] = useState({
    name: "",
    category: "stay" as "stay" | "day-outing" | "pool" | "event",
    shortDescription: "",
    description: "",
    suitableFor: "",
    guestCount: "",
    price: "",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80",
    duration: "",
    extraGuestCharge: "",
    availability: "",
    bookingNote: "",
    includedRaw: "",
    excludedRaw: "",
  });

  const filtered = pkgs.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this package?")) {
      setPkgs(prev => prev.filter(p => p.id !== id));
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      name: "",
      category: "stay",
      shortDescription: "",
      description: "",
      suitableFor: "",
      guestCount: "",
      price: "",
      image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80",
      duration: "",
      extraGuestCharge: "",
      availability: "",
      bookingNote: "",
      includedRaw: "",
      excludedRaw: "",
    });
    setModalOpen(true);
  };

  const openEditModal = (pkg: Package) => {
    setEditingId(pkg.id);
    setFormData({
      name: pkg.name,
      category: pkg.category,
      shortDescription: pkg.shortDescription,
      description: pkg.description,
      suitableFor: pkg.suitableFor,
      guestCount: pkg.guestCount,
      price: pkg.price,
      image: pkg.image,
      duration: pkg.duration || "",
      extraGuestCharge: pkg.extraGuestCharge || "",
      availability: pkg.availability || "",
      bookingNote: pkg.bookingNote || "",
      includedRaw: (pkg.included || []).join("\n"),
      excludedRaw: (pkg.excluded || []).join("\n"),
    });
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const preparedPkg: Package = {
      id: editingId || `pkg-${Date.now()}`,
      name: formData.name,
      category: formData.category,
      shortDescription: formData.shortDescription,
      description: formData.description,
      suitableFor: formData.suitableFor,
      guestCount: formData.guestCount,
      facilities: formData.includedRaw.split("\n").filter(i => i.trim() !== ""),
      price: formData.price,
      image: formData.image,
      duration: formData.duration,
      included: formData.includedRaw.split("\n").filter(i => i.trim() !== ""),
      excluded: formData.excludedRaw.split("\n").filter(e => e.trim() !== ""),
      extraGuestCharge: formData.extraGuestCharge,
      availability: formData.availability,
      bookingNote: formData.bookingNote,
    };

    if (editingId) {
      setPkgs(prev => prev.map(p => p.id === editingId ? preparedPkg : p));
    } else {
      setPkgs(prev => [preparedPkg, ...prev]);
    }

    setModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-8 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-bold text-3xl text-white">Manage Packages</h1>
          <p className="text-beige/60 text-sm mt-1">
            Create, update, and delete stay or outing packages live on the hotel front.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-1.5 px-4.5 py-2.5 bg-gold hover:bg-gold-hover text-charcoal font-bold rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Package</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex bg-charcoal-light rounded-xl border border-white/5 p-3 items-center gap-3">
        <Search className="w-5 h-5 text-beige/40 shrink-0 ml-1" />
        <input
          type="text"
          placeholder="Search packages by name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow bg-transparent text-sm text-beige placeholder-beige/30 focus:outline-none"
        />
      </div>

      {/* Packages Table List */}
      <div className="bg-charcoal-light rounded-2xl border border-white/5 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/5 text-beige/40 font-bold uppercase tracking-wider bg-black/10">
                <th className="p-4">Package Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Suitable For</th>
                <th className="p-4">Guest limit</th>
                <th className="p-4">Price</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-beige/85">
              {filtered.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-white/2 transition-colors">
                  <td className="p-4 flex items-center gap-3 font-semibold text-white">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-white/10 shrink-0">
                      <Image
                        src={pkg.image}
                        alt={pkg.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span>{pkg.name}</span>
                  </td>
                  <td className="p-4 capitalize">{pkg.category.replace(/-/g, " ")}</td>
                  <td className="p-4 text-gold/80">{pkg.suitableFor}</td>
                  <td className="p-4">{pkg.guestCount}</td>
                  <td className="p-4 font-bold text-white">{pkg.price}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => openEditModal(pkg)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-gold/20 hover:text-gold text-beige transition-colors border border-white/5 cursor-pointer"
                        title="Edit Details"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(pkg.id)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-red-950/40 hover:text-red-400 text-beige transition-colors border border-white/5 cursor-pointer"
                        title="Delete Package"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-beige/40 font-bold uppercase text-[10px]">
                    No packages match your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit CRUD Modal Dialog Overlay */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-charcoal-light border border-white/10 w-full max-w-3xl rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative flex flex-col gap-6 text-beige">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h2 className="font-serif font-bold text-xl text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-gold" />
                <span>{editingId ? "Edit Package Details" : "Create New Package"}</span>
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-beige hover:bg-white/10"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="flex flex-col gap-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold text-beige/50 uppercase">Package Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="px-4 py-2.5 bg-black/35 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-gold"
                    placeholder="Nature stay package..."
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold text-beige/50 uppercase">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as "stay" | "day-outing" | "pool" | "event" })}
                    className="px-4 py-2.5 bg-black/35 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-gold"
                  >
                    <option value="stay">Room Stay</option>
                    <option value="day-outing">Day Outing</option>
                    <option value="pool">Pool Access</option>
                    <option value="event">Events & Celebrations</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold text-beige/50 uppercase">Price Label *</label>
                  <input
                    type="text"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="px-4 py-2.5 bg-black/35 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-gold"
                    placeholder="Contact for rates / Rs. 500"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold text-beige/50 uppercase">Guests limit *</label>
                  <input
                    type="text"
                    required
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                    className="px-4 py-2.5 bg-black/35 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-gold"
                    placeholder="2 guests / 10 - 20 pax"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold text-beige/50 uppercase">Suitability *</label>
                  <input
                    type="text"
                    required
                    value={formData.suitableFor}
                    onChange={(e) => setFormData({ ...formData, suitableFor: e.target.value })}
                    className="px-4 py-2.5 bg-black/35 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-gold"
                    placeholder="Couples / Family / Friends"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold text-beige/50 uppercase">Duration Description *</label>
                  <input
                    type="text"
                    required
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="px-4 py-2.5 bg-black/35 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-gold"
                    placeholder="Overnight Stay / 6 Hours Event"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold text-beige/50 uppercase">Extra Guest Charge *</label>
                  <input
                    type="text"
                    required
                    value={formData.extraGuestCharge}
                    onChange={(e) => setFormData({ ...formData, extraGuestCharge: e.target.value })}
                    className="px-4 py-2.5 bg-black/35 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-gold"
                    placeholder="Rs. 1,500 per person / N/A"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold text-beige/50 uppercase">Availability Status *</label>
                  <input
                    type="text"
                    required
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                    className="px-4 py-2.5 bg-black/35 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-gold"
                    placeholder="Available Daily / Booking subject to calendar status"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold text-beige/50 uppercase">Mock Image URL *</label>
                  <input
                    type="text"
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="px-4 py-2.5 bg-black/35 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-bold text-beige/50 uppercase">Short Summary Description *</label>
                <input
                  type="text"
                  required
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="px-4 py-2.5 bg-black/35 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-gold"
                  placeholder="Perfect weekend escape..."
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-bold text-beige/50 uppercase">Full Package Description *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="px-4 py-2.5 bg-black/35 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-gold resize-none"
                  placeholder="Details of overnight room facilities, garden views..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold text-beige/50 uppercase">Included Items (Line separated) *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.includedRaw}
                    onChange={(e) => setFormData({ ...formData, includedRaw: e.target.value })}
                    className="px-4 py-2.5 bg-black/35 border border-white/10 rounded-xl text-xs focus:outline-none focus:border-gold resize-none"
                    placeholder="Infinity pool access&#10;Complimentary breakfast&#10;Balcony view"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold text-beige/50 uppercase">Excluded Items (Line separated) *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.excludedRaw}
                    onChange={(e) => setFormData({ ...formData, excludedRaw: e.target.value })}
                    className="px-4 py-2.5 bg-black/35 border border-white/10 rounded-xl text-xs focus:outline-none focus:border-gold resize-none"
                    placeholder="Overnight stay&#10;Extra buffet meal"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-bold text-beige/50 uppercase">Booking Notice / Notes *</label>
                <input
                  type="text"
                  required
                  value={formData.bookingNote}
                  onChange={(e) => setFormData({ ...formData, bookingNote: e.target.value })}
                  className="px-4 py-2.5 bg-black/35 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-gold"
                  placeholder="Requires advance payment, booking subject to check"
                />
              </div>

              {/* Modal footer / Action */}
              <div className="border-t border-white/5 pt-4 flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold uppercase hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gold hover:bg-gold-hover text-charcoal rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Package</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
