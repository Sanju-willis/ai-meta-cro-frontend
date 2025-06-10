// src/components/landing/Header.tsx
'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  Users,
  Rocket,
  BookOpen,
  Target,
  Menu,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/features', label: 'Features' },
    { path: '/pricing', label: 'Pricing' },
  ];

  const aboutItems = [
    { path: '/about', label: 'Our Mission', icon: <Rocket size={16} /> },
    { path: '/team', label: 'Our Team', icon: <Users size={16} /> },
    { path: '/roadmap', label: 'Roadmap', icon: <Target size={16} /> },
    { path: '/blog', label: 'Blog', icon: <BookOpen size={16} /> },
  ];

  return (
    <header className="w-full bg-black bg-opacity-80 backdrop-blur-md border-b border-gray-800 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div
          className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text cursor-pointer hover:opacity-80 transition"
          onClick={() => router.push('/')}
        >
          Aenigma AI
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center relative">
          {/* About with animated mega menu */}
          <div className="relative group">
            <button className="text-sm text-gray-300 hover:text-white transition">
              About
            </button>

            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 top-full mt-2 bg-[#0f0f0f] border border-gray-800 rounded-lg shadow-xl w-80 p-4 grid grid-cols-2 gap-4 z-50 backdrop-blur-lg invisible group-hover:visible group-hover:opacity-100 group-hover:translate-y-0"
              >
                {aboutItems.map(({ path, label, icon }) => (
                  <button
                    key={path}
                    className="flex items-center gap-2 text-sm text-gray-300 hover:text-white"
                    onClick={() => router.push(path)}
                  >
                    {icon} {label}
                  </button>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {navItems.map(({ path, label }) => (
            <button
              key={path}
              className={`text-sm transition ${
                pathname === path ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'
              }`}
              onClick={() => router.push(path)}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex gap-3 items-center">
          <Button
            variant="ghost"
            className="text-gray-300 hover:text-white"
            onClick={() => router.push('/login')}
          >
            Login
          </Button>
          <Button
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-4 py-2 rounded-md shadow-lg hover:scale-105 transition-transform"
            onClick={() => router.push('/signup')}
          >
            Get Started →
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-300 hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-black bg-opacity-90 border-t border-gray-800 flex flex-col px-6 py-4 space-y-4 backdrop-blur animate-fade-up"
          >
            {[...aboutItems, ...navItems].map(({ path, label }) => (
              <button
                key={path}
                className="text-sm text-gray-300 hover:text-white text-left"
                onClick={() => {
                  router.push(path);
                  setMobileMenuOpen(false);
                }}
              >
                {label}
              </button>
            ))}
            <Button
              variant="ghost"
              className="w-full text-gray-300 hover:text-white"
              onClick={() => {
                router.push('/login');
                setMobileMenuOpen(false);
              }}
            >
              Login
            </Button>
            <Button
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-4 py-2 rounded-md shadow-lg hover:scale-105 transition-transform"
              onClick={() => {
                router.push('/signup');
                setMobileMenuOpen(false);
              }}
            >
              Get Started →
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
