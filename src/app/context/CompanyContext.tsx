// src\app\context\CompanyContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';
import { useUserAuth } from './AuthContext';

type Company = {
  _id: string;
  name: string;
  industry: string;
  type: string;
  // Add more fields if needed
};

type Item = {
  _id: string;
  name: string;
  type: 'product' | 'service';
};

type CompanyContextType = {
  company: Company | null;
  items: Item[];
  setCompany: (company: Company) => void;
  setItems: (items: Item[]) => void;
  refreshCompany: () => Promise<void>;
};

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export const CompanyProvider = ({ children }: { children: ReactNode }) => {
  const [company, setCompany] = useState<Company | null>(null);
  const [items, setItems] = useState<Item[]>([]);  // ✅ Add items state here
  const { userToken } = useUserAuth();

  const refreshCompany = async () => {
    try {
      const token = userToken || localStorage.getItem('my_jwt');

      const response = await axios.get('http://localhost:5000/api/company-profile/update', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('✅ Refreshed company data:', response.data.company);
      setCompany(response.data.company);

      // ✅ Make sure items are refreshed too
      if (response.data.company.items) {
        setItems(response.data.company.items);  // ✅ fix typo here
      }
    } catch (error) {
      console.error('❌ Failed to refresh company data:', error);
    }
  };

  return (
    <CompanyContext.Provider value={{ company, items, setCompany, setItems, refreshCompany }}>
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompany = (): CompanyContextType => {
  const context = useContext(CompanyContext);
  if (context === undefined) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
};
