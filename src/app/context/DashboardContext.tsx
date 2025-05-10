// src\app\context\DashboardContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

type DashboardContextType = {
     activeView: string;
     setActiveView: (view: string) => void;
}


const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider ({ children }:{ children: ReactNode}) {
     const [activeView, setActiveView ] = useState('home');

     return (
          <DashboardContext.Provider value={{ activeView, setActiveView }}>
               {children}
          </DashboardContext.Provider>
     );
}

export function useDashboard() {
     const context = useContext(DashboardContext);

     if (context === undefined) {
          throw new Error('useDashboard mush be used within a DashboardProvide');
     }
     return context;
}