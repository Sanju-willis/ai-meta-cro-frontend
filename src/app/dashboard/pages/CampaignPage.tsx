// src\app\dashboard\pages\CampaignPage.tsx
'use client';

import { useState } from 'react';
import axios from 'axios';

export default function CampaignPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleTriggerCampaignSync = async () => {
    const token = localStorage.getItem('my_jwt');
    try {
      setIsLoading(true);
      await axios.post('http://localhost:5000/api/campaigns/sync', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('✅ Campaign sync triggered!');
    } catch (err) {
      console.error('❌ Campaign sync failed:', err);
      alert('❌ Failed to trigger campaign sync.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">🎯 Campaign Sync</h1>

      <button
        onClick={handleTriggerCampaignSync}
        disabled={isLoading}
        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:brightness-110 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition"
      >
        {isLoading ? '⏳ Syncing Campaigns...' : '🚀 Trigger Campaign Sync'}
      </button>
    </div>
  );
}
