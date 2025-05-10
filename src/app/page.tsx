// src/app/page.tsx

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Mail,
  Zap,
  Target,
  BarChart3,
  ShieldCheck,
  TrendingUp,
  Layers3,
  CheckCircle,
} from 'lucide-react';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubscribe = async () => {
    if (!email) {
      setStatus('Please enter a valid email.');
      return;
    }
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus('Thanks for subscribing!');
        setEmail('');
      } else {
        setStatus('Something went wrong. Please try again.');
      }
    } catch {
      setStatus('Error: Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] to-[#0f0f1a] text-gray-300 font-sans">
      
      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-center items-center px-4 text-center animate-fade-up">
        <h1 className="text-4xl sm:text-6xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text mb-4">
          AI Meta CRO Optimizer
        </h1>
        <p className="max-w-2xl text-lg text-gray-400 mb-6">
          Supercharge your Meta Ads with AI-powered landing page optimization, audience targeting, and full-funnel insights.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email to join early access"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <Button
            onClick={handleSubscribe}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:scale-105 transition-transform w-full sm:w-auto"
          >
            <Mail className="mr-2 h-4 w-4" />
            Join Waitlist
          </Button>
        </div>
        <p className="mt-2 text-sm text-gray-500">{status === 'idle' ? 'We’ll notify you when we launch.' : status}</p>
      </section>

      {/* WHAT IT DOES */}
      <section className="px-6 py-20 max-w-5xl mx-auto text-center animate-fade-up">
        <h2 className="text-3xl font-bold mb-4 text-white">What Our AI CRO Engine Does</h2>
        <p className="text-gray-400 max-w-3xl mx-auto">
          Our AI engine analyzes your landing pages, extracts pain points from audience data, optimizes CTAs, and auto-tests ad creatives—all while giving you real-time performance insights.
        </p>
      </section>

      {/* FEATURES */}
      <section className="px-6 py-16 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-up">
        {[
          {
            title: 'AI-Powered Landing Pages',
            desc: 'Instantly generate & optimize landing page variants based on real-time performance data.',
            icon: <Zap className="h-8 w-8 text-purple-400" />,
          },
          {
            title: 'Audience Pain Extraction',
            desc: 'Analyze your audience and extract actionable pain points for ad messaging.',
            icon: <Target className="h-8 w-8 text-pink-400" />,
          },
          {
            title: 'Full Funnel Analytics',
            desc: 'Track every click, conversion, and ROI metric in one unified dashboard.',
            icon: <BarChart3 className="h-8 w-8 text-blue-400" />,
          },
        ].map((feature, i) => (
          <div key={i} className="bg-gray-900 rounded-xl p-6 hover:shadow-lg transition border border-gray-800 flex flex-col items-center text-center">
            {feature.icon}
            <h3 className="text-xl font-semibold mt-4 mb-2 text-white">{feature.title}</h3>
            <p className="text-sm text-gray-400">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* AUDIENCE & TESTING */}
      <section className="px-6 py-20 max-w-5xl mx-auto text-center animate-fade-up">
        <h2 className="text-3xl font-bold mb-4 text-white">Audience Targeting & Testing</h2>
        <p className="text-gray-400 max-w-3xl mx-auto mb-10">
          Our tool dynamically tests different audience segments, Meta targeting options, and creative angles—so you can quickly identify your most profitable combinations.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: 'Automated Split Tests',
              desc: 'Easily test different headlines, images, and targeting groups without manual effort.',
              icon: <Layers3 className="h-8 w-8 text-purple-400" />,
            },
            {
              title: 'Real-Time Audience Insights',
              desc: 'Uncover exactly who converts best and why with live performance tracking.',
              icon: <Target className="h-8 w-8 text-pink-400" />,
            },
          ].map((item, i) => (
            <div key={i} className="bg-gray-900 rounded-xl p-6 text-left border border-gray-800 hover:shadow-lg transition">
              {item.icon}
              <h4 className="text-lg font-semibold mt-4 mb-2 text-white">{item.title}</h4>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ANALYTICS & INSIGHTS */}
      <section className="px-6 py-20 max-w-5xl mx-auto text-center animate-fade-up">
        <h2 className="text-3xl font-bold mb-4 text-white">Analytics That Actually Help</h2>
        <p className="text-gray-400 max-w-3xl mx-auto mb-10">
          Stop wasting time with messy spreadsheets. Get clear, actionable insights on funnel performance, conversion costs, and more—all in one sleek dashboard.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: 'Conversion Tracking',
              desc: 'Track conversions, ROAS, and ad spend easily with full transparency.',
              icon: <TrendingUp className="h-8 w-8 text-blue-400" />,
            },
            {
              title: 'Privacy-First Data',
              desc: 'GDPR & CCPA compliant—your data is safe & fully anonymized.',
              icon: <ShieldCheck className="h-8 w-8 text-green-400" />,
            },
          ].map((item, i) => (
            <div key={i} className="bg-gray-900 rounded-xl p-6 text-left border border-gray-800 hover:shadow-lg transition">
              {item.icon}
              <h4 className="text-lg font-semibold mt-4 mb-2 text-white">{item.title}</h4>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-6 py-20 max-w-6xl mx-auto text-center animate-fade-up">
        <h2 className="text-3xl font-bold mb-10 text-white">What Early Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Alex G',
              feedback: 'This tool cut our ad spend by 30% while improving conversion rates. Total game changer!',
            },
            {
              name: 'Jessica R',
              feedback: 'We were flying blind before. Now we have clear insights + AI optimization. Love it.',
            },
            {
              name: 'Mark T',
              feedback: 'I can finally test landing pages & ads at scale without wasting hours. Brilliant!',
            },
          ].map((t, i) => (
            <div key={i} className="bg-gray-900 rounded-xl p-6 text-left border border-gray-800 hover:shadow-lg transition">
              <CheckCircle className="h-6 w-6 text-green-400 mb-3" />
              <p className="text-sm text-gray-400 italic mb-4">{t.feedback}</p>
              <p className="text-sm font-semibold text-white">{t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 py-24 bg-gradient-to-r from-purple-600 to-pink-600 text-center text-white animate-fade-up">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">Be the First to Try Meta CRO Optimizer</h2>
        <Button
          size="lg"
          className="bg-white text-purple-700 font-bold shadow-lg hover:scale-105 transition-transform"
          onClick={handleSubscribe}
        >
          <Mail className="mr-2 h-4 w-4" />
          Join the Waitlist
        </Button>
      </section>
    </div>
  );
}
