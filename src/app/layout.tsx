// src/app/layout.tsx
import '@/styles/globals.css';
import { Geist, Geist_Mono } from 'next/font/google';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { metadata } from '@/lib/metadata';

export { metadata };

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className={`min-h-screen relative ${geistSans.variable} ${geistMono.variable}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
