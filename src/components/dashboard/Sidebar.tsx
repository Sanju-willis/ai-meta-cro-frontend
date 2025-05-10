// src\components\dashboard\Sidebar.tsx

import { useDashboardContext } from '@/app/context/DashboardContext';


export default function Sidebar() {
  const { setActiveView } = useDashboardContext();

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
              onClick={() => setActiveView('company')}
              className="hover:underline w-full text-left"
              >
            👤 Company

              </button>
            </li>
            <li>
              <button
              onClick={() => setActiveView('items')}
              className="hover:underline w-full text-left"
              >
            👤 Items

              </button>
            </li>
                        <li>
            <button
            onClick={() => setActiveView('meta')}
              >
                ⚙️ Meta
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