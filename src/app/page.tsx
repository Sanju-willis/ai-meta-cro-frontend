// src\app\page.tsx
'use client';

import { useState } from 'react';
import Header from '@/components/landing/Header';
import { Button } from '@/components/ui/button';
import {
  Mail,
  Zap,
  Target,
  BarChart3,
  ShieldCheck,
  TrendingUp,
  Layers3,
} from 'lucide-react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const AnimatedBlobs = dynamic(() => import('@/components/visuals/AnimatedBlobs'), { ssr: false });
const ParticleBackground = dynamic(() => import('@/components/visuals/Particles'), { ssr: false });

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
    <div className="min-h-screen bg-black text-white font-sans relative overflow-hidden">
      <Header />
      <ParticleBackground />

      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-20 bg-gradient-to-b from-[#0d0d0d] to-black relative z-10">
        <AnimatedBlobs />
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text mb-6"
        >
          Aenigma AI CRO Optimizer
        </motion.h1>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="max-w-2xl text-lg text-gray-400 mb-8"
        >
          Built for high-velocity ad testing and conversion tracking — powered by AI agents.
        </motion.p>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded-md bg-[#111] text-white placeholder-gray-600 border border-gray-700 focus:outline-none focus:ring focus:ring-purple-400"
          />
          <Button
            onClick={handleSubscribe}
            className="bg-purple-500 text-white font-semibold px-6 py-2 rounded-md hover:bg-purple-400 transition"
          >
            <Mail className="mr-2 h-4 w-4" /> Join Waitlist
          </Button>
        </motion.div>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-2 text-sm text-gray-600"
        >
          {status === 'idle' ? 'We’ll notify you when we launch.' : status}
        </motion.p>
      </section>

      {/* PLATFORM OVERVIEW */}
      <section className="px-6 py-28 max-w-6xl mx-auto text-center relative z-10">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl font-bold mb-6"
        >
          Platform Features
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-gray-400 mb-12 max-w-3xl mx-auto"
        >
          From AI-generated landing pages to performance analytics, our tools automate and enhance every part of your CRO workflow.
        </motion.p>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Zap className="h-8 w-8 text-purple-400" />, title: 'Landing Page Variants', desc: 'Generate tailored variants in real time based on performance data.'
            },
            {
              icon: <Target className="h-8 w-8 text-purple-400" />, title: 'Audience Detection', desc: 'Segment and adapt messaging based on audience behavior.'
            },
            {
              icon: <BarChart3 className="h-8 w-8 text-purple-400" />, title: 'Unified Analytics', desc: 'See conversions, spend, and ROI across funnel stages.'
            },
            {
              icon: <Layers3 className="h-8 w-8 text-purple-400" />, title: 'Split Testing', desc: 'Auto-test creatives and headlines across ad sets.'
            },
            {
              icon: <TrendingUp className="h-8 w-8 text-purple-400" />, title: 'Live ROAS Tracking', desc: 'Measure real-time return on ad spend with visual clarity.'
            },
            {
              icon: <ShieldCheck className="h-8 w-8 text-purple-400" />, title: 'Privacy Compliant', desc: 'GDPR + CCPA ready, anonymized tracking by default.'
            }
          ].map((f, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-[#0f0f0f] p-6 rounded-xl border border-[#1a1a1a] hover:shadow-lg transition backdrop-blur-md bg-opacity-60"
            >
              {f.icon}
              <h3 className="text-lg font-semibold mt-4 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-400">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 py-28 bg-gradient-to-r from-[#1a0d2f] to-black text-center relative z-10">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold mb-8"
        >
          Convert Smarter. Convert Better.
        </motion.h2>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Button
            size="lg"
            className="bg-purple-500 text-white font-bold px-8 py-4 rounded-md hover:bg-purple-400 transition"
            onClick={handleSubscribe}
          >
            <Mail className="mr-2 h-5 w-5" /> Join the Waitlist
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
