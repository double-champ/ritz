"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Compass, Lock, User, Eye, EyeOff, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // If already authenticated, redirect to /admin directly
  useEffect(() => {
    const auth = localStorage.getItem("admin_auth");
    if (auth === "true") {
      router.replace("/admin");
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      if (username === "admin" && password === "admin123") {
        localStorage.setItem("admin_auth", "true");
        router.replace("/admin");
      } else {
        setError("Invalid username or password.");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div 
      className="min-h-screen bg-charcoal-bg flex items-center justify-center p-4 font-sans relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(18, 18, 18, 0.92), rgba(18, 18, 18, 0.98)), url('/images/pool-forest.png')`,
      }}
    >
      {/* Glow accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-forest/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-charcoal-light/80 backdrop-blur-md p-8 rounded-3xl border border-white/5 shadow-2xl relative z-10"
      >
        {/* Brand/Logo Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center bg-forest/20 mb-3 animate-float">
            <Compass className="w-6 h-6 text-gold" />
          </div>
          <h1 className="font-serif font-bold text-2xl text-white">Ritz Nature Villa</h1>
          <span className="text-[10px] uppercase tracking-widest text-gold font-semibold mt-1">
            Admin Portal Access
          </span>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-beige/50 uppercase">Username</label>
            <div className="relative">
              <User className="absolute left-4 top-3.5 w-4 h-4 text-beige/35" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-black/45 text-beige border border-white/10 rounded-xl text-sm focus:outline-none focus:border-gold"
                placeholder="Enter username"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-beige/50 uppercase">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 w-4 h-4 text-beige/35" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-11 py-3 bg-black/45 text-beige border border-white/10 rounded-xl text-sm focus:outline-none focus:border-gold"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-beige/35 hover:text-white"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-950/40 border border-red-800/35 rounded-xl text-red-300 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4.5 h-4.5 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gold hover:bg-gold-hover text-charcoal font-bold rounded-xl text-xs uppercase tracking-wider transition-all disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Access Control Dashboard"}
          </button>
        </form>

        {/* Small Notice */}
        <p className="text-center text-[10px] text-beige/30 mt-6 leading-relaxed">
          Authorized personnel only. Sessions are logged.<br />
          Mock User: <span className="text-gold">admin</span> | Pass: <span className="text-gold">admin123</span>
        </p>
      </motion.div>
    </div>
  );
}
