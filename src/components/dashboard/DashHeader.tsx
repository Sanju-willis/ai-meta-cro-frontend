// src\components\dashboard\DashHeader.tsx
'use client';

import { useUserAuth } from '@/app/context/AuthContext';
import { useState } from 'react';

export default function UserHeader() {
  const { userInfo, clearUserSession } = useUserAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (!userInfo) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between w-full p-4 bg-gray-100">
      <div>
        <h1 className="text-2xl font-bold">👋 Welcome, {userInfo.name}</h1>
        <p className="text-gray-600 text-sm">{userInfo.email}</p>
      </div>

      <div className="relative">
        <button
          className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          ⚙️ Options
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
            <button className="block px-4 py-2 text-left w-full hover:bg-gray-100">
              🔔 Notifications
            </button>
            <button className="block px-4 py-2 text-left w-full hover:bg-gray-100">
              ❓ Help
            </button>
            <button className="block px-4 py-2 text-left w-full hover:bg-gray-100">
              Account Settings
            </button>
            <button className="block px-4 py-2 text-left w-full hover:bg-gray-100">
              Privacy Policy
            </button>
            <button className="block px-4 py-2 text-left w-full hover:bg-gray-100"
               onClick={() => {
                    clearUserSession();
                    window.location.href = '/login';
                    
               }}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
