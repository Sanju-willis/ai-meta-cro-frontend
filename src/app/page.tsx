// src\app\page.tsx
import Header from '@/components/Header';

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-4">📊 Meta CRO Dashboard</h1>
        <p className="text-gray-600">No data synced yet.</p>
      </main>
    </>
  );
}