// src\components\onboarding\OnboardingModal.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useUserAuth } from '@/app/context/AuthContext';
import { useCompany } from '@/app/context/CompanyContext';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

const INDUSTRY_OPTIONS = ['SaaS', 'E-commerce', 'Healthcare', 'Fintech', 'Education', 'Consumer Electronics', 'Automotive', 'Travel', 'Logistics', 'Real Estate', 'Marketing', 'Agency', 'Media', 'Gaming', 'Nonprofit'];
const SIZE_OPTIONS = ['1-10', '11-50', '51-200', '201-500', '500+'];
const TYPE_OPTIONS = ['B2B', 'B2C'];
const REGION_OPTIONS = ['North America', 'Europe', 'Asia-Pacific', 'Latin America', 'Middle East & Africa', 'Global'];
const ROLE_OPTIONS = ['Founder', 'CEO', 'CMO', 'Marketing Manager', 'Developer'];
const AUDIENCE_OPTIONS = ['Individual Consumers', 'Small Businesses', 'Mid-size Businesses', 'Enterprise Customers'];

const TOTAL_STEPS = 4;

export default function CompanyProfilePage({ onComplete }: { onComplete: () => void }) {
  const { saveUserToken, userToken } = useUserAuth();
  const { setCompany } = useCompany();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', size: '', industry: '', type: '', targetMarket: '', address: '', website: '',
    socialLinks: [''], brandGuideUrl: '', logoAssetsUrl: '', pressKitUrl: '', portfolioUrl: '',
    contentLibraryUrl: '', productPages: [''], userRole: '', description: '', targetAudience: '',
    items: [{ name: '', type: 'product' as 'product' | 'service' }],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleListChange = (i: number, val: string, key: 'socialLinks' | 'productPages') => {
    const updated = [...formData[key]];
    updated[i] = val;
    setFormData({ ...formData, [key]: updated });
  };
  const handleItemChange = (i: number, field: 'name' | 'type', val: string) => {
    const updated = [...formData.items];
    updated[i][field] = val as 'product' | 'service';
    setFormData({ ...formData, items: updated });
  };
  const handleAddField = (key: 'socialLinks' | 'productPages' | 'items') => {
    if (key === 'items') setFormData({ ...formData, items: [...formData.items, { name: '', type: 'product' }] });
    else setFormData({ ...formData, [key]: [...formData[key], ''] });
  };

  const handleNext = () => { if (step < TOTAL_STEPS) setStep(step + 1); };
  const handleBack = () => { if (step > 1) setStep(step - 1); };

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
      onComplete();
    } catch (error) {
      console.error('❌ Error submitting onboarding:', error);
    }
  };

  const ChatBotBubble = ({ message }: { message: string }) => (
    <div className="text-sm bg-gray-700 text-white border border-gray-600 p-3 rounded-xl max-w-xl mb-4 shadow-sm">
      <Sparkles className="inline mr-2 text-yellow-400" size={16} />
      <span>{message}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-900 text-white flex flex-col items-center justify-center px-4 py-6">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-lg px-6 py-8 md:p-10 w-full max-w-xl space-y-4">
        <h1 className="text-2xl font-semibold">🚀 Company Onboarding</h1>
        <p className="text-sm text-gray-400">Step {step} of {TOTAL_STEPS}</p>

        {/* Progress Bar */}
        <p className="text-xs text-gray-500 mb-1">Progress</p>
        <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500 ease-in-out"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          ></div>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <ChatBotBubble message="Hi! Let’s start with your company basics." />
            <input name="name" placeholder="Company Name" value={formData.name} onChange={handleChange} className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded mb-3" />
            <select name="industry" value={formData.industry} onChange={handleChange} className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded mb-3">
              <option value="">Select Industry</option>
              {INDUSTRY_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <select name="size" value={formData.size} onChange={handleChange} className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded mb-3">
              <option value="">Select Size</option>
              {SIZE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <select name="type" value={formData.type} onChange={handleChange} className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded mb-3">
              <option value="">Select Type</option>
              {TYPE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <select name="targetMarket" value={formData.targetMarket} onChange={handleChange} className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded mb-4">
              <option value="">Select Market</option>
              {REGION_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <Button onClick={handleNext} className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded hover:scale-105 transition-all">Next →</Button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <ChatBotBubble message="Great! Let’s add online presence & assets." />
            <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded mb-3" />
            <input name="website" placeholder="Website URL" value={formData.website} onChange={handleChange} className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded mb-3" />
            {formData.socialLinks.map((link, i) => (
              <input key={i} value={link} onChange={(e) => handleListChange(i, e.target.value, 'socialLinks')} placeholder={`Social Link ${i + 1}`} className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded mb-3" />
            ))}
            <Button variant="outline" onClick={() => handleAddField('socialLinks')} className="mb-4 w-full border border-gray-600 text-gray-300 hover:bg-gray-800">+ Add Social</Button>
            <input name="brandGuideUrl" placeholder="Brand Guide URL" value={formData.brandGuideUrl} onChange={handleChange} className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded mb-3" />
            <input name="logoAssetsUrl" placeholder="Logo Assets URL" value={formData.logoAssetsUrl} onChange={handleChange} className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded mb-3" />
            <input name="pressKitUrl" placeholder="Press Kit URL" value={formData.pressKitUrl} onChange={handleChange} className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded mb-3" />
            <input name="portfolioUrl" placeholder="Portfolio URL" value={formData.portfolioUrl} onChange={handleChange} className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded mb-3" />
            <input name="contentLibraryUrl" placeholder="Content Library URL" value={formData.contentLibraryUrl} onChange={handleChange} className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded mb-3" />
            {formData.productPages.map((page, i) => (
              <input key={i} value={page} onChange={(e) => handleListChange(i, e.target.value, 'productPages')} placeholder={`Product Page ${i + 1}`} className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded mb-3" />
            ))}
            <Button variant="outline" onClick={() => handleAddField('productPages')} className="mb-4 w-full border border-gray-600 text-gray-300 hover:bg-gray-800">+ Add Product Page</Button>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={handleBack} className="w-1/2 border border-gray-600 text-gray-300 hover:bg-gray-800">← Back</Button>
              <Button onClick={handleNext} className="w-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:scale-105">Next →</Button>
            </div>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <ChatBotBubble message="What’s your role and company description?" />
            <select name="userRole" value={formData.userRole} onChange={handleChange} className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded mb-3">
              <option value="">Select Role</option>
              {ROLE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded mb-3" rows={3} />
            <select name="targetAudience" value={formData.targetAudience} onChange={handleChange} className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded mb-4">
              <option value="">Select Audience</option>
              {AUDIENCE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={handleBack} className="w-1/2 border border-gray-600 text-gray-300 hover:bg-gray-800">← Back</Button>
              <Button onClick={handleNext} className="w-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:scale-105">Next →</Button>
            </div>
          </>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <>
            <ChatBotBubble message="Add your products or services." />
            {formData.items.map((item, i) => (
              <div key={i} className="flex space-x-2 mb-3">
                <input value={item.name} onChange={(e) => handleItemChange(i, 'name', e.target.value)} placeholder={`Item ${i + 1}`} className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded" />
                <select value={item.type} onChange={(e) => handleItemChange(i, 'type', e.target.value)} className="w-32 p-3 bg-gray-900 text-white border border-gray-700 rounded">
                  <option value="product">Product</option>
                  <option value="service">Service</option>
                </select>
              </div>
            ))}
            <Button variant="outline" onClick={() => handleAddField('items')} className="mb-4 w-full border border-gray-600 text-gray-300 hover:bg-gray-800">+ Add Item</Button>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={handleBack} className="w-1/2 border border-gray-600 text-gray-300 hover:bg-gray-800">← Back</Button>
              <Button onClick={handleSubmit} className="w-1/2 bg-green-600 hover:bg-green-700 text-white font-semibold">Finish & Save</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
