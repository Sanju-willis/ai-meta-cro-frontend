// src\app\dashboard\page.tsx
'use client';

import { useUserAuth } from '@/app/context/AuthContext';
import OnboardingModal from '@/components/onboarding/OnboardingModal';
import { DashboardProvider, useDashboardContext } from '@/app/context/DashboardContext';
import Sidebar from '@/components/dashboard/Sidebar';
import UserHeader from '@/components/dashboard/DashHeader';

import HomePage from '@/app/dashboard/pages/HomePage';
import CompanyPage from '@/app/dashboard/pages/CompanyPage';
import ItemsPage from '@/app/dashboard/pages/ItemsPage';
import MetaPage from '@/app/dashboard/pages/MetaPage';
import SettingsPage from '@/app/dashboard/pages/SettingsPage';


function DashboardContent() {
  const { activeView } = useDashboardContext();

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        {/* DYNAMIC CONTENT */}
        <div className="mt-8">
          {activeView === 'home' &&  <HomePage />}
          {activeView === 'company' && <CompanyPage />}
          {activeView === 'items'&& <ItemsPage />}
          {activeView === 'meta'&& <MetaPage />}
          {activeView === 'settings' && <SettingsPage />}
        </div>
      </div>
    </div>
  );
} 

export default function DashboardPage() {
  const { userInfo } = useUserAuth();
  const isOnboarded = userInfo?.isOnboarded;

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
      {!isOnboarded && (
        <OnboardingModal
          onComplete={() => {
            // ✅ No need to manually set onboarded; token will be updated
            console.log('✅ Onboarding complete, waiting for AuthContext to refresh.');
          }}
        />
      )}

      {/* Content is blocked until onboarding is complete */}
      {isOnboarded && <DashboardContent />}
    </DashboardProvider>
  );
}
