"use client";

import { useState } from "react";
import { Trash2, Upload, Filter, X, Save, Sparkles } from "lucide-react";
import { galleryItems, galleryCategories } from "@/lib/data/gallery";
import Image from "next/image";

interface GalleryItem {
  id: string;
  category: "pool" | "villa" | "rooms" | "nature" | "events" | "day-outings";
  title: string;
  url: string;
  aspectRatio: "square" | "video" | "tall" | "wide";
}

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>(galleryItems);
  const [selectedCat, setSelectedCat] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "pool" as "pool" | "villa" | "rooms" | "nature" | "events" | "day-outings",
    url: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80",
    aspectRatio: "wide" as "square" | "video" | "tall" | "wide"
  });

  const filtered = selectedCat === "all"
    ? items
    : items.filter(item => item.category === selectedCat);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this photo from the gallery?")) {
      setItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const newItem: GalleryItem = {
      id: `g-${Date.now()}`,
      title: formData.title,
      category: formData.category,
      url: formData.url,
      aspectRatio: formData.aspectRatio
    };

    setItems(prev => [newItem, ...prev]);
    setModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-8 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-bold text-3xl text-white">Manage Gallery</h1>
          <p className="text-beige/60 text-sm mt-1">
            Upload new photos and organize them into categories for customer slideshows.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-1.5 px-4.5 py-2.5 bg-gold hover:bg-gold-hover text-charcoal font-bold rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
        >
          <Upload className="w-4 h-4" />
          <span>Upload New Photo</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-charcoal-light rounded-xl border border-white/5 p-2">
        <div className="flex items-center gap-1.5 text-beige/50 text-xs px-2 mr-1">
          <Filter className="w-3.5 h-3.5" />
          <span>Filter:</span>
        </div>
        {galleryCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCat(cat.id)}
            className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors ${
              selectedCat === cat.id
                ? "bg-gold text-charcoal"
                : "text-beige/60 hover:text-white hover:bg-white/5"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-charcoal-light rounded-xl border border-white/5 overflow-hidden shadow-md group relative aspect-square"
          >
            <Image
              src={item.url}
              alt={item.title}
              fill
              className="object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 z-10">
              <span className="text-[9px] uppercase font-bold tracking-widest text-gold font-sans font-semibold">
                {item.category.replace(/-/g, " ")}
              </span>
              <div className="flex items-center justify-between gap-3 border-t border-white/5 pt-3">
                <span className="text-white text-xs truncate max-w-[70%] font-semibold">
                  {item.title}
                </span>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 bg-red-950/80 text-red-400 hover:bg-red-900 border border-red-800/30 rounded-lg transition-colors cursor-pointer"
                  title="Delete Photo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-12 text-beige/40 text-sm font-bold uppercase">
            No photos found in this category.
          </div>
        )}
      </div>

      {/* Upload CRUD Modal overlay */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-charcoal-light border border-white/10 w-full max-w-md rounded-3xl p-6 relative flex flex-col gap-6 text-beige">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h2 className="font-serif font-bold text-lg text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-gold" />
                <span>Upload New Gallery Image</span>
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
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-bold text-beige/50 uppercase">Photo Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="px-4 py-2.5 bg-black/35 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-gold"
                  placeholder="Pool infinity deck view..."
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-bold text-beige/50 uppercase">Category Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as "pool" | "villa" | "rooms" | "nature" | "events" | "day-outings" })}
                  className="px-4 py-2.5 bg-black/35 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-gold"
                >
                  <option value="pool">Pool</option>
                  <option value="villa">Villa Exterior</option>
                  <option value="rooms">Rooms</option>
                  <option value="nature">Nature</option>
                  <option value="events">Events & Birthday Setups</option>
                  <option value="day-outings">Day Outings</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold text-beige/50 uppercase">Aspect Ratio *</label>
                  <select
                    value={formData.aspectRatio}
                    onChange={(e) => setFormData({ ...formData, aspectRatio: e.target.value as "square" | "video" | "tall" | "wide" })}
                    className="px-4 py-2.5 bg-black/35 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-gold"
                  >
                    <option value="square">Square</option>
                    <option value="video">Video (16:9)</option>
                    <option value="wide">Wide</option>
                    <option value="tall">Tall</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold text-beige/50 uppercase">Mock Image URL *</label>
                  <input
                    type="text"
                    required
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    className="px-4 py-2.5 bg-black/35 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-gold"
                  />
                </div>
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
                  <span>Save Image</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
