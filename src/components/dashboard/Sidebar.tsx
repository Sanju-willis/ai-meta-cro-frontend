// src\components\dashboard\Sidebar.tsx

import { useDashboard } from '@/app/context/DashboardContext';


export default function Sidebar() {
  const { setActiveView } = useDashboard();

     return (
          <aside className="w-64 bg-gray-800 text-white h-screen p-4">
          <h2 className="text-xl font-bold mb-6">📂 Menu</h2>
          <ul className="space-y-4">
            <li>
             <button
             onClick={() => setActiveView('home')}
             className="hover:underline w-full text-left"
             >
            🏠 Home
             </button>
            </li>
            <li>
              <button
              onClick={() => setActiveView('profile')}
              className="hover:underline w-full text-left"
              >
            👤 Profile

              </button>
            </li>
            <li>
            <button
            onClick={() => setActiveView('settings')}
              >
                ⚙️ Settings
                </button>
              
            </li>
          </ul>
        </aside>
      );
    }