"use client";

import { useState, useEffect } from "react";
import { Search, Phone, Mail, Trash2, Calendar, Edit3, ClipboardList, Check, RotateCw } from "lucide-react";

interface Inquiry {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  experienceType: string;
  guests: string;
  checkIn: string;
  checkOut: string;
  message: string;
  status: "New" | "Contacted" | "Confirmed" | "Cancelled";
  adminNote: string;
  createdDate: string;
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteValue, setNoteValue] = useState("");

  // Load inquiries
  const loadInquiries = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/inquiry");
      if (res.ok) {
        const data = await res.json();
        setInquiries(data);
      }
    } catch (err) {
      console.error("Failed to load inquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadInquiries();
  }, []);

  // Update status or note via API
  const handleUpdate = async (id: string, updates: Partial<Inquiry>) => {
    try {
      const res = await fetch("/api/inquiry", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...updates }),
      });
      if (res.ok) {
        // Optimistically update local state or reload
        setInquiries(prev => 
          prev.map(inq => inq.id === id ? { ...inq, ...updates } : inq)
        );
        if (updates.adminNote !== undefined) {
          setEditingNoteId(null);
        }
      }
    } catch (err) {
      console.error("Failed to update inquiry:", err);
    }
  };

  // Delete inquiry via API
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this inquiry?")) return;
    try {
      const res = await fetch(`/api/inquiry?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setInquiries(prev => prev.filter(inq => inq.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete inquiry:", err);
    }
  };

  const filtered = inquiries.filter(
    (inq) =>
      inq.fullName.toLowerCase().includes(search.toLowerCase()) ||
      inq.experienceType.toLowerCase().includes(search.toLowerCase()) ||
      inq.phone.includes(search)
  );

  return (
    <div className="flex flex-col gap-8 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-bold text-3xl text-white flex items-center gap-3">
            <ClipboardList className="w-8 h-8 text-gold" />
            <span>Booking Inquiries</span>
          </h1>
          <p className="text-beige/60 text-sm mt-1">
            Review live client inquiries. Update status, add notes, and reply via WhatsApp or phone.
          </p>
        </div>
        
        <button
          onClick={loadInquiries}
          className="p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 text-beige transition-colors"
          title="Refresh Data"
        >
          <RotateCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Search Input */}
      <div className="flex bg-charcoal-light rounded-xl border border-white/5 p-3 items-center gap-3">
        <Search className="w-5 h-5 text-beige/40 shrink-0 ml-1" />
        <input
          type="text"
          placeholder="Search inquiries by guest name, phone, or package type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow bg-transparent text-sm text-beige placeholder-beige/30 focus:outline-none"
        />
      </div>

      {/* List Container */}
      <div className="flex flex-col gap-6">
        {loading ? (
          <div className="text-center py-16 text-beige/40 text-sm">
            Loading inquiries from database...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-beige/40 text-sm bg-charcoal-light rounded-2xl border border-white/5">
            No booking inquiries found.
          </div>
        ) : (
          filtered.map((inq) => {
            const formattedDate = new Date(inq.createdDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            });

            // Prefilled WhatsApp reply based on package type
            const waReplyMessage = `Hello ${inq.fullName}, this is Ritz Nature Villa Kandy. We received your booking inquiry for ${inq.experienceType} (Arrival: ${inq.checkIn}). We would love to confirm your reservation. Please let us know if you have any questions!`;
            const cleanPhone = inq.phone.startsWith("0") ? "94" + inq.phone.substring(1) : inq.phone;
            const waReplyUrl = `https://wa.me/${cleanPhone.replace(/\+/g, "").replace(/\s/g, "")}?text=${encodeURIComponent(waReplyMessage)}`;

            return (
              <div
                key={inq.id}
                className="bg-charcoal-light p-6 rounded-2xl border border-white/5 shadow-md flex flex-col gap-4 relative overflow-hidden"
              >
                {/* Top Row: Name, Status, Date */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-3">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-bold text-base text-white">{inq.fullName}</span>
                    <span className="text-beige/40 text-[10px]">{formattedDate}</span>
                  </div>

                  {/* Status Dropdown Selector */}
                  <div className="flex items-center gap-2">
                    <select
                      value={inq.status}
                      onChange={(e) => handleUpdate(inq.id, { status: e.target.value as "New" | "Contacted" | "Confirmed" | "Cancelled" })}
                      className={`px-2.5 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider bg-black/40 text-beige border border-white/10 focus:outline-none focus:border-gold ${
                        inq.status === "New"
                          ? "text-blue-300 border-blue-800/30"
                          : inq.status === "Contacted"
                          ? "text-yellow-300 border-yellow-800/30"
                          : inq.status === "Confirmed"
                          ? "text-green-300 border-green-800/30"
                          : "text-red-300 border-red-800/30"
                      }`}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-3 text-xs">
                  <div>
                    <span className="text-beige/40 block mb-0.5 font-bold uppercase text-[9px]">
                      Package / Type
                    </span>
                    <span className="text-gold font-semibold capitalize">
                      {inq.experienceType.replace(/-/g, " ")}
                    </span>
                  </div>
                  <div>
                    <span className="text-beige/40 block mb-0.5 font-bold uppercase text-[9px]">
                      Guests Count
                    </span>
                    <span className="text-white">{inq.guests} Guests</span>
                  </div>
                  <div>
                    <span className="text-beige/40 block mb-0.5 font-bold uppercase text-[9px]">
                      Check-in
                    </span>
                    <span className="text-white flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gold shrink-0" />
                      <span>{inq.checkIn}</span>
                    </span>
                  </div>
                  <div>
                    <span className="text-beige/40 block mb-0.5 font-bold uppercase text-[9px]">
                      Check-out
                    </span>
                    <span className="text-white">{inq.checkOut || "N/A"}</span>
                  </div>
                </div>

                {/* Contact Email Display */}
                {inq.email && (
                  <div className="text-xs text-beige/65 flex items-center gap-1.5 -mt-1">
                    <Mail className="w-3.5 h-3.5 text-beige/45" />
                    <span>Email: {inq.email}</span>
                  </div>
                )}

                {/* Message Details */}
                {inq.message && (
                  <div className="bg-black/20 p-3.5 rounded-xl border border-white/5 text-xs text-beige/85">
                    <span className="font-bold text-white block mb-1">Guest Message:</span>
                    <p className="italic font-sans">&ldquo;{inq.message}&rdquo;</p>
                  </div>
                )}

                {/* Admin Note Section */}
                <div className="border-t border-white/5 pt-3 mt-1 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] uppercase font-bold tracking-wider text-beige/40">
                      Admin Notes
                    </span>
                    {editingNoteId !== inq.id && (
                      <button
                        onClick={() => {
                          setEditingNoteId(inq.id);
                          setNoteValue(inq.adminNote || "");
                        }}
                        className="text-[9px] text-gold hover:underline flex items-center gap-1 font-bold uppercase"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>{inq.adminNote ? "Edit Note" : "Add Note"}</span>
                      </button>
                    )}
                  </div>

                  {editingNoteId === inq.id ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={noteValue}
                        onChange={(e) => setNoteValue(e.target.value)}
                        className="flex-grow px-3 py-1.5 bg-black/35 text-xs text-beige border border-white/10 rounded-lg focus:outline-none focus:border-gold"
                        placeholder="Add internal follow-up note..."
                      />
                      <button
                        onClick={() => handleUpdate(inq.id, { adminNote: noteValue })}
                        className="p-2 bg-forest text-beige rounded-lg hover:bg-forest-hover border border-forest transition-colors"
                        title="Save Note"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setEditingNoteId(null)}
                        className="p-2 bg-white/5 text-beige hover:bg-white/10 rounded-lg border border-white/10 transition-colors text-xs"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : inq.adminNote ? (
                    <p className="text-xs text-gold/80 bg-forest/5 border border-forest/10 p-2.5 rounded-lg font-sans">
                      {inq.adminNote}
                    </p>
                  ) : (
                    <p className="text-xs text-beige/35 italic">No internal admin notes added.</p>
                  )}
                </div>

                {/* Action buttons footer */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-4 mt-1">
                  {/* Contact quick actions */}
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${inq.phone}`}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white/5 hover:bg-white/10 text-white rounded-lg border border-white/5 text-[10px] font-bold uppercase tracking-wider transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-gold" />
                      <span>Call {inq.phone}</span>
                    </a>

                    <a
                      href={waReplyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] rounded-lg border border-[#25D366]/20 text-[10px] font-bold uppercase tracking-wider transition-colors"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                      </svg>
                      <span>WhatsApp Chat</span>
                    </a>
                  </div>

                  {/* Delete Option */}
                  <button
                    onClick={() => handleDelete(inq.id)}
                    className="p-1.5 bg-white/5 text-beige/50 hover:bg-red-950 hover:text-red-400 border border-white/5 hover:border-red-900/30 rounded-lg transition-colors"
                    title="Delete Record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
