"use client";

import { useState } from "react";
import { PlusCircle, Search, Edit, Trash2, BedDouble, X, Save, Sparkles } from "lucide-react";
import Image from "next/image";

interface Room {
  id: string;
  name: string;
  price: string;
  capacity: string;
  status: string;
  image: string;
}

const initialRooms: Room[] = [
  { id: "r-1", name: "Luxury Deluxe Bedroom", price: "Rs. 15,500 / night", capacity: "2 Adults", status: "Available", image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=300&q=80" },
  { id: "r-2", name: "Family Villa Suite", price: "Rs. 28,000 / night", capacity: "4 - 6 Adults", status: "Booked", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=300&q=80" },
  { id: "r-3", name: "Forest View Double Room", price: "Rs. 12,000 / night", capacity: "2 Adults", status: "Available", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=300&q=80" },
  { id: "r-4", name: "Premium Poolside Cabin", price: "Rs. 18,500 / night", capacity: "2 Adults", status: "Maintenance", image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=300&q=80" }
];

export default function AdminRoomsPage() {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    capacity: "",
    status: "Available",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=300&q=80"
  });

  const filtered = rooms.filter(r => r.name.toLowerCase().includes(search.toLowerCase()));

  const toggleAvailability = (id: string) => {
    setRooms(prev => prev.map(r => {
      if (r.id === id) {
        const nextStatus = r.status === "Available" ? "Booked" : r.status === "Booked" ? "Maintenance" : "Available";
        return { ...r, status: nextStatus };
      }
      return r;
    }));
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this room type?")) {
      setRooms(prev => prev.filter(r => r.id !== id));
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      name: "",
      price: "",
      capacity: "",
      status: "Available",
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=300&q=80"
    });
    setModalOpen(true);
  };

  const openEditModal = (room: Room) => {
    setEditingId(room.id);
    setFormData({
      name: room.name,
      price: room.price,
      capacity: room.capacity,
      status: room.status,
      image: room.image
    });
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const preparedRoom: Room = {
      id: editingId || `r-${Date.now()}`,
      name: formData.name,
      price: formData.price.startsWith("Rs.") ? formData.price : `Rs. ${formData.price} / night`,
      capacity: formData.capacity,
      status: formData.status,
      image: formData.image
    };

    if (editingId) {
      setRooms(prev => prev.map(r => r.id === editingId ? preparedRoom : r));
    } else {
      setRooms(prev => [...prev, preparedRoom]);
    }

    setModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-8 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-bold text-3xl text-white">Manage Rooms</h1>
          <p className="text-beige/60 text-sm mt-1">
            Configure room types, overnight pricing, and check calendar availability states.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-1.5 px-4.5 py-2.5 bg-gold hover:bg-gold-hover text-charcoal font-bold rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Room</span>
        </button>
      </div>

      {/* Search Filter */}
      <div className="flex bg-charcoal-light rounded-xl border border-white/5 p-3 items-center gap-3">
        <Search className="w-5 h-5 text-beige/40 shrink-0 ml-1" />
        <input
          type="text"
          placeholder="Search rooms by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow bg-transparent text-sm text-beige placeholder-beige/30 focus:outline-none"
        />
      </div>

      {/* Grid of rooms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((room) => (
          <div
            key={room.id}
            className="bg-charcoal-light rounded-2xl border border-white/5 overflow-hidden flex shadow-md group relative"
          >
            {/* Room Thumbnail */}
            <div className="relative w-1/3 min-h-[140px] overflow-hidden shrink-0 border-r border-white/5">
              <Image
                src={room.image}
                alt={room.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Room Info */}
            <div className="p-5 flex flex-col justify-between flex-grow text-xs gap-3">
              <div>
                <h3 className="font-serif font-bold text-sm text-white mb-1.5 group-hover:text-gold transition-colors">
                  {room.name}
                </h3>
                <div className="flex items-center gap-1.5 text-beige/50 font-semibold mb-1">
                  <BedDouble className="w-3.5 h-3.5 text-gold" />
                  <span>Max Capacity: {room.capacity}</span>
                </div>
                <span className="font-bold text-gold text-sm block mt-1">{room.price}</span>
              </div>

              {/* Status Control */}
              <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-1">
                <span
                  onClick={() => toggleAvailability(room.id)}
                  className={`px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider cursor-pointer select-none ${
                    room.status === "Available"
                      ? "bg-green-900/40 text-green-300 border border-green-800/30"
                      : room.status === "Booked"
                      ? "bg-red-900/40 text-red-300 border border-red-800/30"
                      : "bg-yellow-900/40 text-yellow-300 border border-yellow-800/30"
                  }`}
                  title="Click to cycle status"
                >
                  {room.status}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(room)}
                    className="p-1.5 bg-white/5 hover:bg-gold/25 hover:text-gold border border-white/5 rounded-lg transition-colors"
                    title="Edit Room"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(room.id)}
                    className="p-1.5 bg-white/5 hover:bg-red-950/35 hover:text-red-400 border border-white/5 rounded-lg transition-colors"
                    title="Delete Room"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-12 text-beige/40 text-sm font-bold uppercase">
            No rooms found.
          </div>
        )}
      </div>

      {/* Room CRUD Modal Dialog Overlay */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-charcoal-light border border-white/10 w-full max-w-lg rounded-3xl p-6 relative flex flex-col gap-6 text-beige">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h2 className="font-serif font-bold text-lg text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-gold" />
                <span>{editingId ? "Edit Room Details" : "Create New Room"}</span>
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
                <label className="text-[9px] font-bold text-beige/50 uppercase">Room Type Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="px-4 py-2.5 bg-black/35 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-gold"
                  placeholder="Luxury Double Bedroom..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold text-beige/50 uppercase">Pricing (Rs. / night) *</label>
                  <input
                    type="text"
                    required
                    value={formData.price.replace("Rs. ", "").replace(" / night", "")}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="px-4 py-2.5 bg-black/35 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-gold"
                    placeholder="15,500"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold text-beige/50 uppercase">Capacity limit *</label>
                  <input
                    type="text"
                    required
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    className="px-4 py-2.5 bg-black/35 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-gold"
                    placeholder="2 Adults / 4 Guests"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold text-beige/50 uppercase">Status *</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="px-4 py-2.5 bg-black/35 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-gold"
                  >
                    <option value="Available">Available</option>
                    <option value="Booked">Booked</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
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
                  <span>Save Room</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
