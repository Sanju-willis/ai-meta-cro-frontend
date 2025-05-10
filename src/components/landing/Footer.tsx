// src\components\landing\Footer.tsx
// src/components/landing/Footer.tsx
'use client';

export default function Footer() {
  return (
    <footer className="w-full bg-gray-950 border-t border-gray-800 text-gray-400 text-sm">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          © {new Date().getFullYear()} Ai Meta CRO. All rights reserved.
        </div>
        <div className="flex gap-4">
          <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
