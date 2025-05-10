// src/components/dashboard/Sidebar.tsx

'use client';

import { useDashboardContext } from '@/app/context/DashboardContext';
import { useEffect, useState } from 'react';
import {
  Home,
  Building2,
  Boxes,
  Layers3,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export default function Sidebar() {
  const { activeView, setActiveView } = useDashboardContext();
  const [collapsed, setCollapsed] = useState(false);

  // Load collapsed state
  useEffect(() => {
    const savedState = localStorage.getItem('sidebar-collapsed');
    if (savedState === 'true') {
      setCollapsed(true);
    }
  }, []);

  // Save collapsed state
  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', collapsed.toString());
  }, [collapsed]);

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'company', label: 'Company', icon: Building2 },
    { id: 'items', label: 'Items', icon: Boxes },
    { id: 'meta', label: 'Meta', icon: Layers3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside
      className={`${
        collapsed ? 'w-20' : 'w-64'
      } bg-gray-900 text-white h-screen p-3 flex flex-col border-r border-gray-800 transition-all duration-300`}
    >
      {/* Collapse/Expand Toggle */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-400 hover:text-white"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <ul className="space-y-1 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <li key={item.id}>
              <button
                onClick={() => setActiveView(item.id)}
                className={`group flex items-center gap-3 w-full text-left rounded-md px-3 py-2 transition-colors
                  ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-700 text-gray-300'
                  }`}
                title={collapsed ? item.label : undefined}
              >
                <Icon size={20} />
                {!collapsed && <span>{item.label}</span>}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
