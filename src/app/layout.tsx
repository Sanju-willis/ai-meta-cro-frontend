import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/styles/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Kordor – AI-Powered Ad Optimization',
  description:
    'Kordor helps you convert better with AI-powered CRO tools: dynamic landing pages, audience pain analysis, ad testing & real-time funnel analytics.',
  icons: {
    icon: '/logo-kordor.svg', // ensure this is optimized (SVG or 32x32 PNG for favicon)
  },
  openGraph: {
    title: 'Kordor – AI Ad Optimization Engine',
    description:
      'Boost Meta Ads performance using AI: auto-optimized landing pages, predictive targeting & CRO analytics.',
    url: 'https://kordor.com', // replace with your domain
    siteName: 'Kordor',
    images: [
      {
        url: 'https://kordor.com/og-image.png', // replace with actual OG image
        width: 1200,
        height: 630,
        alt: 'Kordor OpenGraph Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kordor – AI Ad Optimization Engine',
    description:
      'Boost Meta Ads performance using AI: auto-optimized landing pages, predictive targeting & CRO analytics.',
    images: ['https://kordor.com/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
