// src\lib\metadata.ts
// src/lib/metadata.ts
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kordor – AI-Powered Ad Optimization',
  description:
    'Kordor helps you convert better with AI-powered CRO tools: dynamic landing pages, audience pain analysis, ad testing & real-time funnel analytics.',
  icons: {
    icon: '/logo-kordor.svg',
  },
  openGraph: {
    title: 'Kordor – AI Ad Optimization Engine',
    description:
      'Boost Ads performance using AI: auto-optimized landing pages, predictive targeting & CRO analytics.',
    url: 'https://kordor.com',
    siteName: 'Kordor',
    images: [
      {
        url: 'https://kordor.com/og-image.png',
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
