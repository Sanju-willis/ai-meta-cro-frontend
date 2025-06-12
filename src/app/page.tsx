// src\app\page.tsx
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
  Facebook,
  Linkedin

} from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import OurTeamPage from './about/ourteampage';


const XIcon = () => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current">
    <title>X</title>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const TikTokIcon = () => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 fill-current"
  >
    <title>TikTok</title>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);


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
      
      <ParticleBackground />

      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-20 bg-gradient-to-b from-[#0d0d0d] to-black relative z-10">
        <AnimatedBlobs />
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-5xl sm:text-6xl font-extrabold mb-6"
        >
          <span className="inline-flex items-center  font-bold leading-none bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
            <Image
              src="/logo-kordor1.png"
              alt="Kordor K"
              width={70}
              height={70}
              className="inline-block align-middle"
            />
            <span className="-ml-[0px]">ordor</span>
            <span className="ml-[10px] font-medium"> AI</span>
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-cyan-500 text-transparent bg-clip-text mt-4">Automate. Optimize. Scale.</span>
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
      <section className="px-6 py-20 max-w-6xl mx-auto text-center relative z-10" id="features">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500"
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
            { icon: <Zap className="h-8 w-8 text-purple-400" />, title: 'Landing Page Variants', desc: 'Generate tailored variants in real time based on performance data.' },
            { icon: <Target className="h-8 w-8 text-purple-400" />, title: 'Audience Detection', desc: 'Segment and adapt messaging based on audience behavior.' },
            { icon: <BarChart3 className="h-8 w-8 text-purple-400" />, title: 'Unified Analytics', desc: 'See conversions, spend, and ROI across funnel stages.' },
            { icon: <Layers3 className="h-8 w-8 text-purple-400" />, title: 'Split Testing', desc: 'Auto-test creatives and headlines across ad sets.' },
            { icon: <TrendingUp className="h-8 w-8 text-purple-400" />, title: 'Live ROAS Tracking', desc: 'Measure real-time return on ad spend with visual clarity.' },
            { icon: <ShieldCheck className="h-8 w-8 text-purple-400" />, title: 'Privacy Compliant', desc: 'GDPR + CCPA ready, anonymized tracking by default.' }
          ].map((f, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-[#0f0f0f] p-5 rounded-xl border border-[#1a1a1a] hover:shadow-lg transition backdrop-blur-md bg-opacity-60 flex flex-col items-center text-center h-full"
            >
              <div className="mb-3 flex justify-center items-center h-12 w-12">
                {f.icon}
              </div>
              <h3 className="text-base font-semibold mb-1">{f.title}</h3>
              <p className="text-sm text-gray-400">{f.desc}</p>
            </motion.div>

          ))}
        </div>

      </section>

      <section id="our-team">
        <OurTeamPage />
      </section>

      {/* FINAL CTA */}
      <section className="px-6 py-28 bg-gradient-to-r from-[#1a0d2f] to-black text-center relative z-10" id="join-waitlist">
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
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 flex justify-center gap-6"
        >
          <a href="https://www.facebook.com/profile.php?id=61577311437116" target="_blank" rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transform hover:scale-125 transition duration-300">
            <Facebook className="h-6 w-6" />
          </a>
          <a href="https://www.linkedin.com/company/kordor-ai/?viewAsMember=true" target="_blank" rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transform hover:scale-125 transition duration-300">
            <Linkedin className="h-6 w-6" />
          </a>
          <a href="https://www.tiktok.com/@kordor_ai" target="_blank" rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transform hover:scale-125 transition duration-300">
            <TikTokIcon />
          </a>
          <a href="https://x.com/kordor_ai" target="_blank" rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transform hover:scale-125 transition duration-300">
            <XIcon />
          </a>
        </motion.div>
      </section>

      
    </div>
  );
}
