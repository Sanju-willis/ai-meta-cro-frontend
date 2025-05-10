// src\app\layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meta CRO Optimizer – AI-Powered Ad Automation",
  description:
    "Boost Meta Ads performance with AI-powered CRO: automated landing pages, pain extraction, targeting & analytics.",
  openGraph: {
    title: "Meta CRO Optimizer – AI-Powered Ad Automation",
    description:
      "Boost Meta Ads performance with AI-powered CRO: automated landing pages, pain extraction, targeting & analytics.",
    url: "https://yourdomain.com", // 🔄 update to your domain when live
    siteName: "Meta CRO Optimizer",
    images: [
      {
        url: "https://yourdomain.com/og-image.png", // 🔄 replace with your OG image URL later
        width: 1200,
        height: 630,
        alt: "Meta CRO Optimizer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meta CRO Optimizer – AI-Powered Ad Automation",
    description:
      "Boost Meta Ads performance with AI-powered CRO: automated landing pages, pain extraction, targeting & analytics.",
    images: ["https://yourdomain.com/og-image.png"], // 🔄 same as above
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
