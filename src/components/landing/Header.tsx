// src\components\landing\Header.tsx
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function Header() {
  const router = useRouter();

  return (
    <header className="w-full bg-gray-950 bg-opacity-90 backdrop-blur border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo / Site Name */}
        <div
          className="text-2xl font-bold text-blue-400 cursor-pointer"
          onClick={() => router.push('/')}
        >
          Ai Meta CRO
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex gap-6">
          <button
            className="text-gray-300 hover:text-white transition-colors"
            onClick={() => router.push('/about')}
          >
            About
          </button>
          <button
            className="text-gray-300 hover:text-white transition-colors"
            onClick={() => router.push('/features')}
          >
            Features
          </button>
          <button
            className="text-gray-300 hover:text-white transition-colors"
            onClick={() => router.push('/pricing')}
          >
            Pricing
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="ghost"
            className="text-gray-300 hover:text-white transition-colors"
            onClick={() => router.push('/login')}
          >
            Login
          </Button>
          <Button
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md hover:shadow-lg transition-transform hover:scale-105"
            onClick={() => router.push('/signup')}
          >
            Try Free
          </Button>
        </div>
      </div>
    </header>
  );
}
