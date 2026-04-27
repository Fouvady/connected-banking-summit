import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Connected Banking Summit 2026 — The Future of Finance",
  description: "The world's premier banking technology summit. Join 5,000+ leaders, innovators, and visionaries shaping the future of financial services.",
  keywords: ["Banking", "FinTech", "AI", "Digital Transformation", "Blockchain", "Connected Banking", "Summit"],
  authors: [{ name: "Connected Banking Summit" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Connected Banking Summit 2026",
    description: "Where the future of finance converges with technology, innovation, and human potential",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
