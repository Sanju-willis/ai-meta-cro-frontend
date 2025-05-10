// src\app\dashboard\pages\MetaPage.tsx
'use client';

import { useMeta } from '@/app/context/MetaContext';
import Image from 'next/image';  // ✅ Use Next.js Image

export default function FacebookSyncPage() {
  const { pages, syncMetaData } = useMeta();

  return (
    <div>
      <button
        onClick={syncMetaData}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        🔄 Sync Meta Pages
      </button>

      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-4">Synced Pages:</h3>

        {pages.length > 0 ? (
          pages.map((page) => (
            <div key={page.pageId} className="p-2 border rounded mb-4 flex items-center gap-4">
              <Image
                src={page.pictureUrl}
                alt={page.pageName}
                width={64}  // ✅ Set width + height for optimization
                height={64}
                className="rounded"
              />
              <div>
                <p className="font-bold">{page.pageName}</p>
                <p className="text-sm text-gray-600">Category: {page.category}</p>
                <p className="text-xs text-gray-400">Page ID: {page.pageId}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No pages synced yet.</p>
        )}
      </div>
    </div>
  );
}
