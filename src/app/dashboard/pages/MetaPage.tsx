'use client';

import { useMeta } from '@/app/context/MetaContext';
import Image from 'next/image';
import axios from 'axios';

export default function FacebookSyncPage() {
  const { pages, syncMetaData } = useMeta();

  const handleTriggerSync = async () => {
    const token = localStorage.getItem('my_jwt');
    try {
      await axios.post('http://localhost:5000/api/trigger-sync', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('✅ Sync triggered!');
    } catch (err) {
      console.error('❌ Failed to trigger sync:', err);
      alert('❌ Failed to trigger sync.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white p-8">
      <div className="flex gap-4 mb-6">
        <button
          onClick={syncMetaData}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:brightness-110 text-white px-6 py-2 rounded-xl font-semibold shadow-md transition"
        >
          🔄 Sync Meta Pages
        </button>

        <button
          onClick={handleTriggerSync}
          className="bg-gradient-to-r from-purple-600 to-blue-500 hover:brightness-110 text-white px-6 py-2 rounded-xl font-semibold shadow-md transition"
        >
          🚀 Trigger Sync Dispatch
        </button>
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-4">📘 Synced Facebook Pages</h3>

        {pages.length > 0 ? (
          pages.map((page) => (
            <div key={page.pageId} className="p-4 border border-gray-700 rounded-xl mb-4 flex items-center gap-4 bg-gray-800 shadow-sm">
              <Image
                src={page.pictureUrl}
                alt={page.pageName}
                width={64}
                height={64}
                className="rounded"
              />
              <div>
                <p className="font-bold text-lg">{page.pageName}</p>
                <p className="text-sm text-gray-400">Category: {page.category}</p>
                <p className="text-xs text-gray-500">Page ID: {page.pageId}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No pages synced yet.</p>
        )}
      </div>
    </div>
  );
}
