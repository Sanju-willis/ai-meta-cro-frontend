// src\app\page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const router = useRouter();

  const handleSignup = () => router.push('/signup');

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white">
      <Header />

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center items-center text-center px-4 py-28 min-h-[85vh]">
        <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 text-blue-400 drop-shadow-lg">
          Automate. Optimize. Scale.
        </h1>
        <p className="max-w-2xl mb-6 text-lg text-gray-300">
          The AI CRO system for Meta Ads: pain point extraction, audience testing, message validation, and full-funnel optimization.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-xl hover:scale-105 transition-transform"
            onClick={async () => {
              if (!email) {
                setStatus('Please enter a valid email.');
                return;
              }
              try {
                const res = await fetch('/api/beta-signup', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email }),
                });
                if (res.ok) {
                  setStatus('Thanks for signing up!');
                  setEmail('');
                } else {
                  setStatus('Something went wrong. Please try again.');
                }
              } catch {
                setStatus('Error: Please try again later.');
              }
            }}
          >
            Sign Up for Beta →
          </Button>
        </div>

        <p className="text-sm text-gray-400">{status === 'idle' ? 'Join as a beta tester and get early access.' : status}</p>
      </main>

      {/* Features Section */}
      <section className="px-6 py-20 min-h-[60vh] bg-gray-900 rounded-t-3xl shadow-inner">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div className="p-6 bg-gray-800 rounded-xl hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-3 text-blue-300">AI Insights</h3>
            <p className="text-sm text-gray-400">
              Extract customer pain points, cluster them by themes, and enrich with competitor analysis.
            </p>
          </div>
          <div className="p-6 bg-gray-800 rounded-xl hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-3 text-blue-300">Audience Testing</h3>
            <p className="text-sm text-gray-400">
              Validate audience hypotheses using real Meta targeting data and performance tracking.
            </p>
          </div>
          <div className="p-6 bg-gray-800 rounded-xl hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-3 text-blue-300">Full-Funnel Optimization</h3>
            <p className="text-sm text-gray-400">
              Track CTR, CPC, and conversions in real time—automatically scaling your best combinations.
            </p>
          </div>
        </div>
      </section>

      {/* Progress Section */}
      <section className="px-6 py-20 min-h-[50vh] bg-gray-950 text-center">
        <p className="mb-4 text-sm text-gray-400">Your Journey to AI-Powered CRO</p>
        <div className="bg-gray-700 w-full h-2 rounded-full max-w-xl mx-auto">
          <div className="bg-blue-500 w-1/2 h-2 rounded-full"></div>
        </div>
        <p className="mt-2 text-xs text-gray-400">50% Complete - Unlock full potential</p>
      </section>

      {/* Call to Action Section */}
      <section className="px-6 py-24 min-h-[50vh] bg-gradient-to-r from-blue-600 to-purple-600 text-center text-white">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">Ready to Scale Your Campaigns?</h2>
        <Button
          size="lg"
          className="bg-white text-blue-600 font-bold shadow-lg hover:scale-105 transition-transform"
          onClick={handleSignup}
        >
          Get Started →
        </Button>
      </section>

      <Footer />
    </div>
  );
}
