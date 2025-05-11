// src\components\landing\Header.tsx
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  Users,
  Rocket,
  BookOpen,
  Target,
  Menu,
} from 'lucide-react';

export default function Header() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-gray-950 bg-opacity-90 backdrop-blur border-b border-gray-800 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        
        {/* Logo */}
        <div
          className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text cursor-pointer hover:opacity-80 transition"
          onClick={() => router.push('/')}
        >
          Meta CRO Optimizer
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center relative">
          
          {/* About with mega menu */}
          <div className="relative group">
            <button className="text-gray-300 hover:text-white text-sm transition">
              About
            </button>

            {/* Mega Menu */}
            <div className="absolute left-0 top-full mt-2 bg-gray-900 border border-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 w-80 p-4 grid grid-cols-2 gap-4 z-50">
              <button
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white text-left"
                onClick={() => router.push('/about')}
              >
                <Rocket size={16} />
                Our Mission
              </button>
              <button
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white text-left"
                onClick={() => router.push('/team')}
              >
                <Users size={16} />
                Our Team
              </button>
              <button
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white text-left"
                onClick={() => router.push('/roadmap')}
              >
                <Target size={16} />
                Roadmap
              </button>
              <button
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white text-left"
                onClick={() => router.push('/blog')}
              >
                <BookOpen size={16} />
                Blog
              </button>
            </div>
          </div>

          <button
            className="text-gray-300 hover:text-white text-sm transition"
            onClick={() => router.push('/features')}
          >
            Features
          </button>
          <button
            className="text-gray-300 hover:text-white text-sm transition"
            onClick={() => router.push('/pricing')}
          >
            Pricing
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex gap-3 items-center">
          <Button
            variant="ghost"
            className="text-gray-300 hover:text-white transition-colors"
            onClick={() => router.push('/login')}
          >
            Login
          </Button>
          <Button
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:scale-105 transition-transform"
            onClick={() => router.push('/signup')}
          >
            Get Started →
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-300 hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 flex flex-col px-6 py-4 space-y-4 animate-fade-up">
          {/* Mega Menu items */}
          <button
            className="text-gray-300 hover:text-white text-left text-sm"
            onClick={() => {
              router.push('/about');
              setMobileMenuOpen(false);
            }}
          >
            Our Mission
          </button>
          <button
            className="text-gray-300 hover:text-white text-left text-sm"
            onClick={() => {
              router.push('/team');
              setMobileMenuOpen(false);
            }}
          >
            Our Team
          </button>
          <button
            className="text-gray-300 hover:text-white text-left text-sm"
            onClick={() => {
              router.push('/roadmap');
              setMobileMenuOpen(false);
            }}
          >
            Roadmap
          </button>
          <button
            className="text-gray-300 hover:text-white text-left text-sm"
            onClick={() => {
              router.push('/blog');
              setMobileMenuOpen(false);
            }}
          >
            Blog
          </button>

          {/* Other nav */}
          <button
            className="text-gray-300 hover:text-white text-left text-sm"
            onClick={() => {
              router.push('/features');
              setMobileMenuOpen(false);
            }}
          >
            Features
          </button>
          <button
            className="text-gray-300 hover:text-white text-left text-sm"
            onClick={() => {
              router.push('/pricing');
              setMobileMenuOpen(false);
            }}
          >
            Pricing
          </button>
          <Button
            variant="ghost"
            className="w-full text-gray-300 hover:text-white transition-colors"
            onClick={() => {
              router.push('/login');
              setMobileMenuOpen(false);
            }}
          >
            Login
          </Button>
          <Button
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:scale-105 transition-transform"
            onClick={() => {
              router.push('/signup');
              setMobileMenuOpen(false);
            }}
          >
            Get Started →
          </Button>
        </div>
      )}
    </header>
  );
}
