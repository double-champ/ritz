import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ritznaturevilla.com"), // Fallback base URL for metadata
  title: {
    default: "Ritz Nature Villa | Nature Villa, Pool Access & Day Outings in Kandy",
    template: "%s | Ritz Nature Villa Kandy",
  },
  description:
    "A peaceful villa retreat in the scenic hills of Kandy, Sri Lanka. Enjoy our infinity pool, day outing packages, nature stays, romantic escapes, and family getaways. Pool access from Rs. 500.",
  keywords: [
    "Ritz Nature Villa",
    "villa in Kandy",
    "nature villa Kandy",
    "infinity pool Kandy",
    "pool access Kandy",
    "day outing Kandy",
    "family villa Sri Lanka",
    "romantic villa Kandy",
    "Kandy villa stay",
    "pool day outing Kandy",
  ],
  openGraph: {
    title: "Ritz Nature Villa | Your Peaceful Escape in Kandy",
    description:
      "A peaceful villa retreat in Kandy with an infinity pool, nature stays, and day outing packages.",
    url: "https://ritznaturevilla.com",
    siteName: "Ritz Nature Villa",
    images: [
      {
        url: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&h=630&q=80",
        width: 1200,
        height: 630,
        alt: "Ritz Nature Villa Infinity Pool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ritz Nature Villa | Your Peaceful Escape in Kandy",
    description:
      "Escape into nature at Ritz Nature Villa. Infinity pool, day outings, and serene accommodation in Kandy.",
    images: ["https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&h=630&q=80"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground min-h-screen flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
