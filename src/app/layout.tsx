import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import CartDrawer from "@/components/CartDrawer";
import ClientEffects from "@/components/ClientEffects";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "CR7 Premium Sports - Wear Greatness",
  description: "Explore the exclusive sports apparel and footwear collection inspired by Cristiano Ronaldo. Premium design, extreme durability, and engineered for high athletic speed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col bg-obsidian text-silverLight font-sans">
        <AuthProvider>
          <CartProvider>
            <ClientEffects />
            <Navbar />
            <CartDrawer />
            <main className="flex-grow pt-20">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </AuthProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
