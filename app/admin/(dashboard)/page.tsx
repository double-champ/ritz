"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ClipboardList,
  FolderHeart,
  ImageIcon,
  MessageSquare,
  PlusCircle,
  Settings,
  Sparkles,
  Users,
  RotateCw,
} from "lucide-react";
import Link from "next/link";

interface Inquiry {
  id: string;
  fullName: string;
  phone: string;
  experienceType: string;
  guests: string;
  status: "New" | "Contacted" | "Confirmed" | "Cancelled";
  createdDate: string;
}

export default function AdminOverviewPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const loadInquiries = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/inquiry");
      if (res.ok) {
        const data = await res.json();
        setInquiries(data);
      }
    } catch (err) {
      console.error("Failed to load dashboard metrics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadInquiries();
  }, []);

  const totalInquiriesCount = inquiries.length;
  const newInquiriesCount = inquiries.filter(i => i.status === "New").length;
  const recentInquiries = inquiries.slice(0, 4);

  const stats = [
    { label: "Total Inquiries", value: totalInquiriesCount.toString(), icon: ClipboardList, change: "Registered inquiries" },
    { label: "New Requests", value: newInquiriesCount.toString(), icon: Users, change: "Awaiting review" },
    { label: "Active Packages", value: "6", icon: FolderHeart, change: "Live listings" },
    { label: "Gallery Photos", value: "12", icon: ImageIcon, change: "High definition" },
    { label: "Google Reviews", value: "12", icon: MessageSquare, change: "5.0 star rating" },
  ];

  return (
    <div className="flex flex-col gap-10 font-sans">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-white">
            Dashboard Overview
          </h1>
          <p className="text-beige/60 text-sm mt-1">
            Real-time statistics and recent customer inquiries for Ritz Nature Villa.
          </p>
        </div>
        
        {/* Quick action buttons */}
        <div className="flex flex-wrap gap-2.5 items-center">
          <button
            onClick={loadInquiries}
            className="p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 text-beige transition-colors mr-1"
            title="Refresh Metrics"
          >
            <RotateCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <Link
            href="/admin/inquiries"
            className="flex items-center gap-1.5 px-4.5 py-2.5 bg-gold hover:bg-gold-hover text-charcoal font-bold rounded-xl text-xs uppercase tracking-wider transition-colors"
          >
            <ClipboardList className="w-4 h-4" />
            <span>Review Inquiries</span>
          </Link>
        </div>
      </div>

      {/* Stats Dashboard Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="bg-charcoal-light p-5 rounded-2xl border border-white/5 shadow-md flex flex-col justify-between"
            >
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="text-[10px] uppercase font-bold tracking-wider text-beige/50">
                  {stat.label}
                </span>
                <div className="w-8 h-8 rounded-lg bg-forest/20 text-gold flex items-center justify-center border border-gold/15">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className="text-3xl font-serif font-bold text-white block">
                  {loading ? "..." : stat.value}
                </span>
                <span className="text-[10px] text-beige/40 block mt-1">
                  {stat.change}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lower Section Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Recent Inquiries Panel */}
        <div className="lg:col-span-8 bg-charcoal-light rounded-2xl border border-white/5 p-6 shadow-lg">
          <div className="flex items-center justify-between gap-4 mb-6">
            <h3 className="font-serif font-bold text-lg text-white">Recent Inquiries</h3>
            <Link
              href="/admin/inquiries"
              className="text-[10px] font-bold uppercase tracking-wider text-gold hover:underline"
            >
              See All Inquiries
            </Link>
          </div>

          <div className="overflow-x-auto font-sans">
            {loading ? (
              <div className="text-center py-8 text-beige/40 text-xs font-bold uppercase">
                Loading recent inquiries...
              </div>
            ) : recentInquiries.length === 0 ? (
              <div className="text-center py-8 text-beige/40 text-xs font-bold uppercase">
                No inquiries registered yet.
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/5 text-beige/40 font-bold uppercase tracking-wider pb-3 bg-black/10">
                    <th className="pb-3 p-2.5">Guest</th>
                    <th className="pb-3 p-2.5">Phone</th>
                    <th className="pb-3 p-2.5">Package</th>
                    <th className="pb-3 p-2.5 text-center">Guests</th>
                    <th className="pb-3 p-2.5">Status</th>
                    <th className="pb-3 p-2.5 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-beige/85">
                  {recentInquiries.map((inq) => {
                    const formattedDate = new Date(inq.createdDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric"
                    });

                    return (
                      <tr key={inq.id} className="hover:bg-white/2 transition-colors">
                        <td className="py-3.5 p-2.5 font-semibold text-white">{inq.fullName}</td>
                        <td className="py-3.5 p-2.5">{inq.phone}</td>
                        <td className="py-3.5 p-2.5 text-gold/80 capitalize">
                          {inq.experienceType.replace(/-/g, " ")}
                        </td>
                        <td className="py-3.5 p-2.5 text-center">{inq.guests}</td>
                        <td className="py-3.5 p-2.5">
                          <span
                            className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider ${
                              inq.status === "New"
                                ? "bg-blue-900/40 text-blue-300 border border-blue-800/30"
                                : inq.status === "Contacted"
                                ? "bg-yellow-900/40 text-yellow-300 border border-yellow-800/30"
                                : inq.status === "Confirmed"
                                ? "bg-green-900/40 text-green-300 border border-green-800/30"
                                : "bg-red-900/40 text-red-300 border border-red-800/30"
                            }`}
                          >
                            {inq.status}
                          </span>
                        </td>
                        <td className="py-3.5 p-2.5 text-right text-beige/50">{formattedDate}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Quick actions panel */}
        <div className="lg:col-span-4 bg-charcoal-light rounded-2xl border border-white/5 p-6 shadow-lg flex flex-col gap-6">
          <h3 className="font-serif font-bold text-lg text-white">Quick Tasks</h3>
          
          <div className="flex flex-col gap-3">
            <Link
              href="/admin/packages"
              className="flex items-center justify-between p-3.5 bg-white/3 hover:bg-white/5 rounded-xl border border-white/5 text-xs text-beige transition-colors group"
            >
              <div className="flex items-center gap-3">
                <PlusCircle className="w-4.5 h-4.5 text-gold" />
                <span>Create New Room Package</span>
              </div>
              <span className="text-[10px] text-beige/40 group-hover:text-gold transition-colors">→</span>
            </Link>

            <Link
              href="/admin/gallery"
              className="flex items-center justify-between p-3.5 bg-white/3 hover:bg-white/5 rounded-xl border border-white/5 text-xs text-beige transition-colors group"
            >
              <div className="flex items-center gap-3">
                <ImageIcon className="w-4.5 h-4.5 text-gold" />
                <span>Upload Gallery Photos</span>
              </div>
              <span className="text-[10px] text-beige/40 group-hover:text-gold transition-colors">→</span>
            </Link>

            <Link
              href="/admin/settings"
              className="flex items-center justify-between p-3.5 bg-white/3 hover:bg-white/5 rounded-xl border border-white/5 text-xs text-beige transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Settings className="w-4.5 h-4.5 text-gold" />
                <span>Update Contact Settings</span>
              </div>
              <span className="text-[10px] text-beige/40 group-hover:text-gold transition-colors">→</span>
            </Link>
          </div>

          {/* Premium banner inside admin */}
          <div className="bg-forest/20 border border-gold/15 p-4 rounded-xl text-center">
            <Sparkles className="w-6 h-6 text-gold mx-auto mb-2" />
            <span className="text-white text-xs font-bold font-serif block mb-1">Ritz Nature Villa</span>
            <span className="text-beige/65 text-[10px] block leading-relaxed">
              Ensure you sync inquiry updates with the future MySQL database.
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}
