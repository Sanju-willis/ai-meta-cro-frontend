// src\components\Header.tsx
export default function Header() {
    return (
      <header className="bg-blue border-b p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">🚀 Meta CRO Tool</h1>
        
        <nav className="space-x-4">
          <a href="/" className="text-blue-600 hover:underline">Dashboard</a>
          <a href="/sync" className="text-blue-600 hover:underline">Sync Pages</a>
        </nav>
      </header>
    );
  }