// src\app\context\MetaContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';
import { useUserAuth } from './AuthContext';

type FacebookPage = {
  pageId: string;
  pageName: string;
  pictureUrl: string;
  picture: string;
  category: string;
};

type MetaContextType = {
  pages: FacebookPage[];
  syncMetaData: () => Promise<void>;
};

const MetaContext = createContext<MetaContextType | undefined>(undefined);

export const MetaProvider = ({ children }: { children: ReactNode }) => {
  const [pages, setPages] = useState<FacebookPage[]>([]);
  const { userToken } = useUserAuth();

  const syncMetaData = async () => {
    try {
      const token = userToken || localStorage.getItem('my_jwt');

      // ✅ 1️⃣ First: trigger sync (POST)
      await axios.post('http://localhost:5000/api/sync-pages', null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('✅ Sync triggered successfully');

      // ✅ 2️⃣ Then: fetch the latest synced pages (GET)
      const pagesRes = await axios.get('http://localhost:5000/api/synced-pages', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPages(pagesRes.data.pages);

      console.log('✅ Synced and fetched pages successfully');
    } catch (err) {
      console.error('❌ Failed to sync Meta data:', err);
    }
  };

  return (
    <MetaContext.Provider value={{ pages, syncMetaData }}>
      {children}
    </MetaContext.Provider>
  );
};

export const useMeta = (): MetaContextType => {
  const context = useContext(MetaContext);
  if (context === undefined) {
    throw new Error('useMeta must be used within a MetaProvider');
  }
  return context;
};
