// src\app\dashboard\page.tsx
'use client';

import { useState } from 'react';
import { useUserAuth } from '@/app/context/AuthContext';
import OnboardingModal from '@/components/onboarding/OnboardingModal';
import { DashboardProvider, useDashboard } from '@/app/context/DashboardContext';
import Sidebar from '@/components/dashboard/Sidebar';
import UserHeader from '@/components/dashboard/DashHeader';


function DashboardContent() {
  const { activeView } = useDashboard();

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        {/* DYNAMIC CONTENT */}
        <div className="mt-8">
          {activeView === 'dashboard' && <p>📊 This is the Dashboard view.</p>}
          {activeView === 'profile' && <p>👤 This is the Profile view.</p>}
          {activeView === 'settings' && <p>⚙️ This is the Settings view.</p>}
        </div>

        
      </div>
    </div>
  );
} 

export default function DashboardPage() {
  const { userInfo } = useUserAuth();
  const [onboarded, setOnboarded] = useState(userInfo?.isOnboarded);

  if (!userInfo) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <DashboardProvider>
      <UserHeader />

      {/* 🚩 SHOW Onboarding if user is not onboarded */}
      {!onboarded && (
        <OnboardingModal
          onComplete={() => {
            // ✅ After onboarding: update local state (and ideally, call backend to mark onboarded)
            setOnboarded(true);
            console.log('User is now onboarded!');
          }}
        />
      )}

      {/* Content is blocked until onboarding is complete */}
      {onboarded && <DashboardContent />}
    </DashboardProvider>
  );
}
