// src\app\dashboard\pages\CompanyPage.tsx
'use client';

import { useCompany } from '@/app/context/CompanyContext';

export default function CompanyPage() {
  const { company, refreshCompany } = useCompany();

  if (!company) {
    return (
      <div>
        <p>Loading company data...</p>
        <button
          onClick={refreshCompany}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          🔄 Refresh Company
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">🏢 {company.name}</h2>
      <p>Industry: {company.industry}</p>
      <p>Type: {company.type}</p>

      <button
        onClick={refreshCompany}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        🔄 Refresh Company
      </button>
    </div>
  );
}
