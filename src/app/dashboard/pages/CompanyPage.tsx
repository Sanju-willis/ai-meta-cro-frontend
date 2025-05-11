// src\app\dashboard\pages\CompanyPage.tsx
'use client';

import { useCompany } from '@/app/context/CompanyContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';

export default function CompanyPage() {
  const { company, refreshCompany, setCompany } = useCompany();

  const [formData, setFormData] = useState({
    name: '', industry: '', type: '', size: '', website: '', targetMarket: '',
    userRole: '', description: '', logoUrl: '',
    brandGuideUrl: '', logoAssetsUrl: '', pressKitUrl: '', portfolioUrl: '', contentLibraryUrl: '',
    socialLinks: [''],
    productPages: [''],
  });

  useEffect(() => {
    if (company) {
      setFormData({
        name: company.name || '',
        industry: company.industry || '',
        type: company.type || '',
        size: company.size || '',
        website: company.website || '',
        targetMarket: company.targetMarket || '',
        userRole: company.userRole || '',
        description: company.description || '',
        logoUrl: company.logoUrl || '',
        brandGuideUrl: company.brandGuideUrl || '',
        logoAssetsUrl: company.logoAssetsUrl || '',
        pressKitUrl: company.pressKitUrl || '',
        portfolioUrl: company.portfolioUrl || '',
        contentLibraryUrl: company.contentLibraryUrl || '',
        socialLinks: company.socialLinks || [''],
        productPages: company.productPages || [''],
      });
    }
  }, [company]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleListChange = (index: number, value: string, key: 'socialLinks' | 'productPages') => {
    const updated = [...formData[key]];
    updated[index] = value;
    setFormData({ ...formData, [key]: updated });
  };

  const addToList = (key: 'socialLinks' | 'productPages') => {
    setFormData((prev) => ({
      ...prev,
      [key]: [...prev[key], ''],
    }));
  };

  const handleLogoUpload = async (file: File) => {
    const token = localStorage.getItem('my_jwt');
    const data = new FormData();
    data.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/api/upload-logo', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setFormData((prev) => ({
        ...prev,
        logoUrl: res.data.url, // 👈 response from backend
      }));
    } catch (err) {
      console.error('❌ Logo upload failed', err);
    }
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
      setCompany(response.data.company);
      alert('✅ Company profile updated!');
    } catch (err) {
      console.error('❌ Failed to update company', err);
    }
  };

  if (!company) {
    return (
      <div className="text-white p-10">
        <p className="text-sm">Loading company data...</p>
        <button
          onClick={refreshCompany}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
        >
          🔄 Refresh Company
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-900 text-white p-4 md:p-8">
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* LEFT: Company Card */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-md space-y-4 text-center h-full w-full">
          {formData.logoUrl ? (
            <Image
  src={formData.logoUrl}
  alt="Logo"
  width={96} // 24 * 4
  height={96}
  className="mx-auto rounded-full object-cover"
  style={{ width: '96px', height: '96px' }}
  unoptimized // optional: only needed if it's not a static domain or remote image loader
/>

          ) : (
            <div className="w-24 h-24 rounded-full mx-auto bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl font-bold">
              {formData.name?.charAt(0) || 'C'}
            </div>
          )}
          <h2 className="text-xl font-semibold">{formData.name}</h2>
          <p className="text-sm text-gray-400">{formData.industry} • {formData.type}</p>
          <p className="text-sm text-gray-400">{formData.size} • {formData.targetMarket}</p>
          <p className="text-sm text-blue-400 break-words">{formData.website}</p>
        </div>

        {/* RIGHT: Editable Form */}
        <div className="md:col-span-2 bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-md space-y-6">
          <h3 className="text-xl font-semibold mb-2">📝 Edit Company Profile</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Company Name" name="name" value={formData.name} onChange={handleChange} />
            <Input label="Industry" name="industry" value={formData.industry} onChange={handleChange} />
            <Input label="Type" name="type" value={formData.type} onChange={handleChange} />
            <Input label="Company Size" name="size" value={formData.size} onChange={handleChange} />
            <Input label="Target Market" name="targetMarket" value={formData.targetMarket} onChange={handleChange} />
            <Input label="Website" name="website" value={formData.website} onChange={handleChange} />
            <Input label="Your Role" name="userRole" value={formData.userRole} onChange={handleChange} />
          </div>

          <Textarea label="Company Description" name="description" value={formData.description} onChange={handleChange} />

          {/* 👇 Logo Upload */}
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Company Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) handleLogoUpload(e.target.files[0]);
              }}
              className="block w-full text-sm text-gray-400"
            />
            {formData.logoUrl && (
<Image
  src={formData.logoUrl}
  alt="Logo"
  width={96} // 24 * 4
  height={96}
  className="mx-auto rounded-full object-cover"
  style={{ width: '96px', height: '96px' }}
  unoptimized // optional: only needed if it's not a static domain or remote image loader
/>

            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Brand Guide URL" name="brandGuideUrl" value={formData.brandGuideUrl} onChange={handleChange} />
            <Input label="Logo Assets URL" name="logoAssetsUrl" value={formData.logoAssetsUrl} onChange={handleChange} />
            <Input label="Press Kit URL" name="pressKitUrl" value={formData.pressKitUrl} onChange={handleChange} />
            <Input label="Portfolio URL" name="portfolioUrl" value={formData.portfolioUrl} onChange={handleChange} />
            <Input label="Content Library URL" name="contentLibraryUrl" value={formData.contentLibraryUrl} onChange={handleChange} />
          </div>

          {/* Social Links */}
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Social Links</label>
            {formData.socialLinks.map((link, i) => (
              <input
                key={i}
                value={link}
                onChange={(e) => handleListChange(i, e.target.value, 'socialLinks')}
                className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded"
                placeholder={`Social Link ${i + 1}`}
              />
            ))}
            <button onClick={() => addToList('socialLinks')} className="text-sm text-blue-400 hover:underline">+ Add Social Link</button>
          </div>

          {/* Product Pages */}
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Product Pages</label>
            {formData.productPages.map((page, i) => (
              <input
                key={i}
                value={page}
                onChange={(e) => handleListChange(i, e.target.value, 'productPages')}
                className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded"
                placeholder={`Product Page ${i + 1}`}
              />
            ))}
            <button onClick={() => addToList('productPages')} className="text-sm text-blue-400 hover:underline">+ Add Product Page</button>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleSave}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded hover:scale-105 transition"
            >
              💾 Save Changes
            </button>
            <button
              onClick={refreshCompany}
              className="w-full py-3 border border-gray-600 text-gray-300 rounded hover:bg-gray-700 transition"
            >
              🔄 Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({ label, name, value, onChange }: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className="block text-sm mb-1 text-gray-300">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded"
      />
    </div>
  );
}

function Textarea({ label, name, value, onChange }: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div>
      <label className="block text-sm mb-1 text-gray-300">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={4}
        className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded"
      />
    </div>
  );
}
