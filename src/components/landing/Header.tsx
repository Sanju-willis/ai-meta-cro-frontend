// src\components\landing\Header.tsx
'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  Menu,
  Facebook,
  LinkedinIcon,
  
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const XIcon = () => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current">
    <title>X</title>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const TikTokIcon = () => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 fill-current"
  >
    <title>TikTok</title>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/#features', label: 'Features' },
    { path: '/#our-team', label: 'Our team' },
    { path: '/#join-waitlist', label: 'Join Waitlist' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-black border-b border-gray-800 shadow-sm">


      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <div
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
          onClick={() => router.push('/')}
        >
          <span className="inline-flex items-center text-2xl font-bold leading-none bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
            <Image
              src="/logo-kordor1.png"
              alt="Kordor K"
              width={30}
              height={30}
              className="inline-block align-middle"
            />
            <span className="-ml-[0px]">ordor</span>
            <span className="ml-[2px] font-medium">AI</span>
          </span>
        </div>

        <nav className="hidden md:flex gap-8 items-center relative">
          {navItems.map(({ path, label }) => (
            <button
              key={path}
              className={`text-lg transition ${pathname === path ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'}`}
              onClick={() => router.push(path)}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Desktop Social Icons */}
        <div className="hidden md:flex gap-4 items-center">
          <a href="https://www.facebook.com/profile.php?id=61577311437116" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
            <Facebook className="h-5 w-5" />
          </a>
          <a href="https://www.linkedin.com/company/kordor-ai/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
            <LinkedinIcon className="h-5 w-5" />
          </a>
          <a href="https://www.tiktok.com/@kordor_ai" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
            <TikTokIcon />
          </a>
          <a href="https://x.com/kordor_ai" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
            <XIcon />
          </a>
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
            {navItems.map(({ path, label }) => (
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
            <div className="flex gap-4 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                <LinkedinIcon className="h-5 w-5" />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                <TikTokIcon />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                <XIcon />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
