// src\components\onboarding\OnboardingModal.tsx
'use client';

import { useState } from 'react';
import axios from 'axios';
import { useUserAuth } from '@/app/context/AuthContext';
import { useCompany } from '@/app/context/CompanyContext';

type OnboardingModalProps = {
  onComplete: () => void;
};

export default function OnboardingModal({ onComplete }: OnboardingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    size: '',
    industry: '',
    type: '',
    targetMarket: '',
    address: '',
    website: '',
    socialLinks: [''],
    brandGuideUrl: '',
    logoAssetsUrl: '',
    pressKitUrl: '',
    portfolioUrl: '',
    contentLibraryUrl: '',
    productPages: [''],
    userRole: '',
    description: '',
    targetAudience: '',
    items: [{ name: '', type: 'product' as 'product' | 'service' }],
  });

  const { saveUserToken, userToken } = useUserAuth();
  const { setCompany } = useCompany();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleListChange = (index: number, value: string, key: 'socialLinks' | 'productPages') => {
    const updated = [...formData[key]];
    updated[index] = value;
    setFormData({ ...formData, [key]: updated });
  };

  const handleItemChange = (index: number, field: 'name' | 'type', value: string) => {
    const updatedItems = [...formData.items];
    updatedItems[index][field] = value as 'product' | 'service';
    setFormData({ ...formData, items: updatedItems });
  };

  const handleAddField = (key: 'socialLinks' | 'productPages' | 'items') => {
    if (key === 'items') {
      setFormData({ ...formData, items: [...formData.items, { name: '', type: 'product' }] });
    } else {
      setFormData({ ...formData, [key]: [...formData[key], ''] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const cleanedItems = formData.items.filter(item => item.name.trim() !== '');

      const response = await axios.post(
        'http://localhost:5000/api/company-profile',
        { ...formData, items: cleanedItems },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`,
          },
        }
      );

      const { token: newToken, company } = response.data;

      if (newToken) {
        saveUserToken(newToken);
        setCompany(company);
      }
      console.log('✅ Onboarding complete, data saved.');
      onComplete(); // ✅ Close the modal
    } catch (error) {
      console.error('❌ Error submitting onboarding:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">👋 Welcome! Let’s get your company set up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic Info */}
          <input name="name" placeholder="Company Name" value={formData.name} onChange={handleChange} className="input" required />
          <input name="size" placeholder="Company Size" value={formData.size} onChange={handleChange} className="input" required />
          <input name="industry" placeholder="Industry" value={formData.industry} onChange={handleChange} className="input" required />
          <input name="type" placeholder="Business Type (B2B/B2C)" value={formData.type} onChange={handleChange} className="input" required />
          <input name="targetMarket" placeholder="Target Market" value={formData.targetMarket} onChange={handleChange} className="input" />

          {/* Contact + Online */}
          <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="input" />
          <input name="website" placeholder="Website URL" value={formData.website} onChange={handleChange} className="input" />
          {formData.socialLinks.map((link, i) => (
            <input
              key={i}
              value={link}
              onChange={(e) => handleListChange(i, e.target.value, 'socialLinks')}
              placeholder={`Social Link ${i + 1}`}
              className="input"
            />
          ))}
          <button type="button" onClick={() => handleAddField('socialLinks')} className="text-blue-500 text-sm">
            + Add Social Link
          </button>

          {/* Assets */}
          <input name="brandGuideUrl" placeholder="Brand Guide URL" value={formData.brandGuideUrl} onChange={handleChange} className="input" />
          <input name="logoAssetsUrl" placeholder="Logo Assets URL" value={formData.logoAssetsUrl} onChange={handleChange} className="input" />
          <input name="pressKitUrl" placeholder="Press Kit URL" value={formData.pressKitUrl} onChange={handleChange} className="input" />
          <input name="portfolioUrl" placeholder="Portfolio URL" value={formData.portfolioUrl} onChange={handleChange} className="input" />
          <input name="contentLibraryUrl" placeholder="Content Library URL" value={formData.contentLibraryUrl} onChange={handleChange} className="input" />
          {formData.productPages.map((page, i) => (
            <input
              key={i}
              value={page}
              onChange={(e) => handleListChange(i, e.target.value, 'productPages')}
              placeholder={`Product Page URL ${i + 1}`}
              className="input"
            />
          ))}
          <button type="button" onClick={() => handleAddField('productPages')} className="text-blue-500 text-sm">
            + Add Product Page
          </button>

          {/* User Role + Description */}
          <input name="userRole" placeholder="Your Role (e.g., Founder)" value={formData.userRole} onChange={handleChange} className="input" />
          <textarea name="description" placeholder="Company Description" value={formData.description} onChange={handleChange} className="input" rows={3} />
          <input name="targetAudience" placeholder="Target Audience" value={formData.targetAudience} onChange={handleChange} className="input" />

          {/* Items */}
          {formData.items.map((item, i) => (
            <div key={i} className="flex space-x-2">
              <input
                value={item.name}
                onChange={(e) => handleItemChange(i, 'name', e.target.value)}
                placeholder={`Item ${i + 1} Name`}
                className="input flex-1"
              />
              <select
                value={item.type}
                onChange={(e) => handleItemChange(i, 'type', e.target.value)}
                className="input w-32"
              >
                <option value="product">Product</option>
                <option value="service">Service</option>
              </select>
            </div>
          ))}
          <button type="button" onClick={() => handleAddField('items')} className="text-blue-500 text-sm">
            + Add Item
          </button>

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full mt-4">
            ✅ Complete Onboarding
          </button>
        </form>
      </div>
    </div>
  );
}
