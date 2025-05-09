// src\app\dashboard\page.tsx
'use client';

import { useUserAuth } from '@/app/context/AuthContext';
import UserHeader from '@/components/dashboard/D-Header';
import Sidebar from '@/components/dashboard/Sidebar';

export default function DashboardPage() {
  const { clearUserSession } = useUserAuth();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <UserHeader />

        <button
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded"
          onClick={() => {
            clearUserSession();
            window.location.href = '/login';
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
