// src\components\onboarding\OnboardingModal.tsx
'use client';

import { useState } from 'react';
import axios from 'axios';
import { useUserAuth } from '@/app/context/AuthContext';
import { useCompany } from '@/app/context/CompanyContext';

type OnboardingModalProps = {
  onComplete: () => void;
};

export default function OnboardingModal({ onComplete }: OnboardingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    type: '',
  });
  const { saveUserToken, userToken } = useUserAuth();
  const { setCompany } = useCompany();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      'http://localhost:5000/api/company-profile',
      formData, // ✅ Send data as object (Axios auto stringifies)
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`, // ✅ Correct header & string
        },
      }
    );
    
    const { token: newToken, company } = response.data;
    
    if (newToken) {
    saveUserToken(newToken);

    setCompany(company);
  }
        console.log('✅ Onboarding complete, data saved.');
    onComplete(); // ✅ Close the modal / trigger complete
  } catch (error) {
    console.error('❌ Error submitting onboarding:', error);
  }
};
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">👋 Welcome! Lets get you started</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full border-gray-300 rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Company</label>
            <input
              type="text"
              required
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              className="mt-1 block w-full border-gray-300 rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">What’s your main goal?</label>
            <input
              type="text"
              required
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
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
