"use client";

import { useState } from "react";
import { PlusCircle, Search, Trash2, Star, Eye, EyeOff, Edit, X, Save, Sparkles } from "lucide-react";
import { reviews } from "@/lib/data/reviews";

interface ReviewItem {
  id: string;
  name: string;
  rating: number;
  date: string;
  text: string;
  source: "Google" | "Facebook" | "Direct";
  approved: boolean;
}

export default function AdminReviewsPage() {
  const [revs, setRevs] = useState<ReviewItem[]>(
    reviews.map(r => ({ ...r, approved: true })) as ReviewItem[]
  );
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    rating: 5,
    text: "",
    source: "Google" as "Google" | "Facebook" | "Direct",
    date: "1 week ago",
    approved: true
  });

  const filtered = revs.filter(r => 
    r.name.toLowerCase().includes(search.toLowerCase()) || 
    r.text.toLowerCase().includes(search.toLowerCase())
  );

  const toggleApproval = (id: string) => {
    setRevs(prev => prev.map(r => r.id === id ? { ...r, approved: !r.approved } : r));
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this review?")) {
      setRevs(prev => prev.filter(r => r.id !== id));
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      name: "",
      rating: 5,
      text: "",
      source: "Google",
      date: "Just now",
      approved: true
    });
    setModalOpen(true);
  };

  const openEditModal = (rev: ReviewItem) => {
    setEditingId(rev.id);
    setFormData({
      name: rev.name,
      rating: rev.rating,
      text: rev.text,
      source: rev.source,
      date: rev.date,
      approved: rev.approved
    });
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const preparedRev: ReviewItem = {
      id: editingId || `rev-${Date.now()}`,
      name: formData.name,
      rating: Number(formData.rating),
      text: formData.text,
      source: formData.source,
      date: formData.date,
      approved: formData.approved
    };

    if (editingId) {
      setRevs(prev => prev.map(r => r.id === editingId ? preparedRev : r));
    } else {
      setRevs(prev => [preparedRev, ...prev]);
    }

    setModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-8 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-bold text-3xl text-white">Manage Reviews</h1>
          <p className="text-beige/60 text-sm mt-1">
            Moderate guest feedback. Approved reviews are displayed live on the website.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-1.5 px-4.5 py-2.5 bg-gold hover:bg-gold-hover text-charcoal font-bold rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Custom Review</span>
        </button>
      </div>

      {/* Search Filter */}
      <div className="flex bg-charcoal-light rounded-xl border border-white/5 p-3 items-center gap-3">
        <Search className="w-5 h-5 text-beige/40 shrink-0 ml-1" />
        <input
          type="text"
          placeholder="Search reviews by name or text snippet..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow bg-transparent text-sm text-beige placeholder-beige/30 focus:outline-none"
        />
      </div>

      {/* Review cards */}
      <div className="flex flex-col gap-4">
        {filtered.map((rev) => (
          <div
            key={rev.id}
            className="bg-charcoal-light p-6 rounded-2xl border border-white/5 shadow-md flex flex-col md:flex-row md:items-start justify-between gap-4 relative"
          >
            <div className="flex-grow max-w-3xl">
              {/* Author & Stars */}
              <div className="flex flex-wrap items-center gap-3 mb-2.5">
                <span className="font-bold text-sm text-white">{rev.name}</span>
                <span className="text-[10px] text-beige/40">{rev.date}</span>
                
                {/* Rating Stars */}
                <div className="flex items-center gap-0.5 text-gold shrink-0">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 fill-current ${i < rev.rating ? "text-gold" : "text-gray-650"}`} />
                  ))}
                </div>

                {/* Source Badge */}
                <span className="text-[9px] font-bold uppercase tracking-wider text-forest bg-forest/20 border border-forest/15 px-2 py-0.5 rounded">
                  {rev.source}
                </span>
              </div>

              {/* Text */}
              <p className="text-beige/75 text-xs leading-relaxed italic">
                &ldquo;{rev.text}&rdquo;
              </p>
            </div>

            {/* Quick Actions Panel */}
            <div className="flex items-center md:flex-col gap-2 shrink-0 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-4">
              <button
                onClick={() => toggleApproval(rev.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors border w-full justify-center select-none cursor-pointer ${
                  rev.approved
                    ? "bg-forest/10 hover:bg-forest/25 text-forest border-forest/20"
                    : "bg-yellow-950/20 hover:bg-yellow-950/40 text-yellow-500 border-yellow-800/30"
                }`}
                title="Toggle Visibility Status"
              >
                {rev.approved ? (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    <span>Approved</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>Hidden</span>
                  </>
                )}
              </button>

              <div className="flex gap-2 w-full">
                <button
                  onClick={() => openEditModal(rev)}
                  className="flex-1 flex items-center gap-1 px-3 py-2 bg-white/3 hover:bg-gold/25 hover:text-gold border border-white/5 hover:border-gold/30 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors justify-center cursor-pointer"
                  title="Edit Review"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(rev.id)}
                  className="flex-1 flex items-center gap-1 px-3 py-2 bg-white/3 hover:bg-red-950 hover:text-red-400 border border-white/5 hover:border-red-900/35 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors justify-center cursor-pointer"
                  title="Delete Feedback"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-beige/40 text-sm font-bold uppercase">
            No reviews match your search.
          </div>
        )}
      </div>

      {/* Review CRUD Modal overlay */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-charcoal-light border border-white/10 w-full max-w-md rounded-3xl p-6 relative flex flex-col gap-6 text-beige">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h2 className="font-serif font-bold text-lg text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-gold" />
                <span>{editingId ? "Edit Guest Feedback" : "Create Guest Review"}</span>
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
                <label className="text-[9px] font-bold text-beige/50 uppercase">Guest Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="px-4 py-2.5 bg-black/35 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-gold"
                  placeholder="Kasun Jayasundara..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold text-beige/50 uppercase">Rating Star (1-5) *</label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="px-4 py-2.5 bg-black/35 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-gold animate-none"
                  >
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={2}>2 Stars</option>
                    <option value={1}>1 Star</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold text-beige/50 uppercase">Review Source *</label>
                  <select
                    value={formData.source}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value as "Google" | "Facebook" | "Direct" })}
                    className="px-4 py-2.5 bg-black/35 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-gold"
                  >
                    <option value="Google">Google</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Direct">Direct Guest</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-bold text-beige/50 uppercase">Date / Duration *</label>
                <input
                  type="text"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="px-4 py-2.5 bg-black/35 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-gold"
                  placeholder="1 week ago / Yesterday"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-bold text-beige/50 uppercase">Review Message *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  className="px-4 py-2.5 bg-black/35 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-gold resize-none"
                  placeholder="Absolutely stunning place! The infinity pool is incredible..."
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
                  <span>Save Review</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
