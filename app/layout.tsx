import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import AuthStoreSync from "@/components/auth/AuthStoreSync";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { clerkLocalization } from "@/lib/clerkLocalization";

import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "WiseMove",
  description: "Find trusted property listings across Africa and beyond",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={clerkLocalization}>
      <html lang="en">
        <body className={`${plusJakartaSans.variable} flex min-h-screen flex-col font-sans antialiased`}>
          <AuthStoreSync />
          <Navbar />
          <main className="flex-1" data-component="main">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
