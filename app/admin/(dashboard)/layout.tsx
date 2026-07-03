"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check local storage or session cookies for authentication
    const auth = localStorage.getItem("admin_auth");
    if (auth === "true") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      router.replace("/admin/login");
    }
  }, [router]);

  // Loading state during auth check
  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#121212] text-beige font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin" />
          <span className="text-xs uppercase tracking-widest text-beige/50 font-bold">
            Verifying Credentials...
          </span>
        </div>
      </div>
    );
  }

  // If authenticated, render dashboard layout
  return isAuthenticated ? (
    <div className="flex bg-[#121212] min-h-screen text-beige">
      <AdminSidebar />
      <main className="flex-grow p-8 md:p-12 overflow-y-auto h-screen">
        {children}
      </main>
    </div>
  ) : null;
}
