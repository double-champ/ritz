"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderHeart,
  BedDouble,
  Image as ImageIcon,
  MessageSquare,
  ClipboardList,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { label: "Overview", path: "/admin", icon: LayoutDashboard },
  { label: "Manage Packages", path: "/admin/packages", icon: FolderHeart },
  { label: "Manage Rooms", path: "/admin/rooms", icon: BedDouble },
  { label: "Manage Gallery", path: "/admin/gallery", icon: ImageIcon },
  { label: "Manage Reviews", path: "/admin/reviews", icon: MessageSquare },
  { label: "Booking Inquiries", path: "/admin/inquiries", icon: ClipboardList },
  { label: "Website Settings", path: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="w-64 bg-charcoal text-beige flex flex-col border-r border-gold/15 h-screen sticky top-0 font-sans">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-white/5 flex items-center gap-2.5">
        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gold/40 flex items-center justify-center bg-forest/20">
          <Image
            src="/images/logo.jpg"
            alt="Ritz Nature Villa Logo"
            fill
            sizes="32px"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-serif font-bold text-sm tracking-wide text-white leading-none">
            Ritz Villa Admin
          </span>
          <span className="text-[9px] uppercase tracking-widest text-gold font-medium mt-1">
            Control Panel
          </span>
        </div>
      </div>

      {/* Nav Menu */}
      <nav className="flex-grow p-4 flex flex-col gap-1.5 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all",
                isActive
                  ? "bg-gold text-charcoal shadow-md shadow-gold/15"
                  : "text-beige/60 hover:text-white hover:bg-white/5"
              )}
            >
              <Icon className="w-4.5 h-4.5 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-white/5">
        <button
          onClick={() => {
            localStorage.removeItem("admin_auth");
            router.replace("/");
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-red-400 hover:bg-red-950/20 hover:text-red-300 transition-colors text-left cursor-pointer"
        >
          <LogOut className="w-4.5 h-4.5 shrink-0" />
          <span>Exit Dashboard</span>
        </button>
      </div>
    </aside>
  );
}
