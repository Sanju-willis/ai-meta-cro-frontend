// src\components\onboarding\OnboardingModal.tsx
'use client';

import { useState } from 'react';

type OnboardingModalProps = {
  onComplete: () => void;
};

export default function OnboardingModal({ onComplete }: OnboardingModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    goal: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Here you would send formData to your backend to save onboarding info
    console.log('Onboarding complete:', formData);

    // Call the parent function to mark onboarding as complete
    onComplete();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">👋 Welcome! Let's get you started</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="mt-1 block w-full border-gray-300 rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Company</label>
            <input
              type="text"
              required
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="mt-1 block w-full border-gray-300 rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">What’s your main goal?</label>
            <input
              type="text"
              required
              value={formData.goal}
              onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
              className="mt-1 block w-full border-gray-300 rounded p-2"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
            ✅ Complete Onboarding
          </button>
        </form>
      </div>
    </div>
  );
}
