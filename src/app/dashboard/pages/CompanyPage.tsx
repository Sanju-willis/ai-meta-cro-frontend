// src\app\dashboard\pages\CompanyPage.tsx
'use client';

import { useCompany } from '@/app/context/CompanyContext';
import { useState } from 'react';
import axios from 'axios';

export default function CompanyPage() {
  const { company, refreshCompany, setCompany } = useCompany();

  const [formData, setFormData] = useState({
    name: company?.name || '',
    industry: company?.industry || '',
    type: company?.type || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('my_jwt');
      const response = await axios.put(
        'http://localhost:5000/api/company-profile',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('✅ Company updated:', response.data.company);
      setCompany(response.data.company);  // Update context
      alert('Company profile updated!');
    } catch (err) {
      console.error('❌ Failed to update company', err);
    }
  };

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
    <div className="max-w-lg mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">🏢 Company Profile</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Industry</label>
          <input
            type="text"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="mt-1 block w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Type</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="mt-1 block w-full border rounded p-2"
          />
        </div>

        <button
          onClick={handleSave}
          className="mt-4 w-full bg-green-500 text-white py-2 rounded"
        >
          💾 Save Changes
        </button>

        <button
          onClick={refreshCompany}
          className="mt-2 w-full bg-blue-500 text-white py-2 rounded"
        >
          🔄 Refresh Company
        </button>
      </div>
    </div>
  );
}
