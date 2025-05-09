// src\components\dashboard\Sidebar.tsx


export default function Sidebar() {
     return (
          <aside className="w-64 bg-gray-800 text-white h-screen p-4">
          <h2 className="text-xl font-bold mb-6">📂 Menu</h2>
          <ul className="space-y-4">
            <li>
              <a href="/dashboard" className="hover:underline">
                🏠 Dashboard
              </a>
            </li>
            <li>
              <a href="/profile" className="hover:underline">
                👤 Profile
              </a>
            </li>
            <li>
              <a href="/settings" className="hover:underline">
                ⚙️ Settings
              </a>
            </li>
          </ul>
        </aside>
      );
    }