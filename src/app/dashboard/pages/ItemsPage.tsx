// src\app\dashboard\pages\ItemsPage.tsx
'use client';

import { useCompany } from '@/app/context/CompanyContext';
import { useState } from 'react';
import axios from 'axios';
import type { Item as ItemType } from '@/types/item';

export default function ItemsPage() {
  const { items, refreshCompany } = useCompany();
  const [viewMode, setViewMode] = useState<'view' | 'edit'>('view');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [editItems, setEditItems] = useState<{ [key: string]: Partial<ItemType> }>({});
  const [newTagInputs, setNewTagInputs] = useState<{ [key: string]: string }>({});

  const handleEditChange = (id: string, field: keyof ItemType, value: string | string[]) => {
    setEditItems((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleAddToList = (id: string, field: keyof ItemType, value: string) => {
    if (!value.trim()) return;
    const currentList = editItems[id]?.[field] as string[] ?? [];
    setEditItems((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: [...currentList, value.trim()],
      },
    }));
    setNewTagInputs((prev) => ({ ...prev, [field]: '' }));
  };

  const handleDeleteFromList = (id: string, field: keyof ItemType, index: number) => {
    const currentList = (editItems[id]?.[field] as string[]) ?? (items.find(i => i._id === id)?.[field] as string[]) ?? [];
    const updatedList = [...currentList.slice(0, index), ...currentList.slice(index + 1)];
    setEditItems((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: updatedList,
      },
    }));
  };

  const handleSaveItem = async (id: string) => {
  try {
    const token = localStorage.getItem('my_jwt');
    const selectedItem = items.find((item) => item._id === id);

    if (!selectedItem) {
      console.warn('❌ Item not found in local state');
      return;
    }

    const payload = {
      ...selectedItem,
      ...editItems[id], // override only changed fields
    };

    console.log('🛠 Sending PUT /items/:id with:', payload);

    await axios.put(`http://localhost:5000/api/items/${id}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log('✅ Item updated');
    refreshCompany();
    setViewMode('view');
  }  catch (err: unknown) {
  if (axios.isAxiosError(err)) {
    console.error('❌ Failed to update item:', err.response?.status, err.response?.data);
  } else {
    console.error('❌ Unexpected error:', err);
  }
}

};


  const selectedItem = items.find((item) => item._id === selectedItemId);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold mb-6">📦 Product & Service Personas</h2>

      <div className="flex flex-wrap gap-4 mb-6">
        {items.map((item) => (
          <button
            key={item._id}
            onClick={() => {
              setSelectedItemId(item._id);
              setViewMode('view');
            }}
            className={`px-4 py-2 rounded border ${
              selectedItemId === item._id ? 'bg-blue-600 text-white' : 'bg-gray-800 border-gray-600 text-gray-300'
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      {selectedItem && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-2 text-center h-fit">
            <div className="w-20 h-20 rounded-full mx-auto bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl font-bold">
              {selectedItem.name?.charAt(0) || 'P'}
            </div>
            <h3 className="text-xl font-semibold mt-2">{selectedItem.name}</h3>
            <p className="text-sm text-gray-400">{selectedItem.category}</p>
            <p className="text-sm text-gray-400">{selectedItem.type}</p>
            <p className="text-sm text-gray-400">{selectedItem.pricePositioning}</p>
            <p className="text-sm text-gray-400">{selectedItem.description}</p>
          </div>

          <div className="md:col-span-2 bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">✏️ Edit Persona</h3>
              <button
                onClick={() => setViewMode(viewMode === 'view' ? 'edit' : 'view')}
                className="text-sm px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
              >
                {viewMode === 'view' ? 'Edit' : 'Cancel'}
              </button>
            </div>

            {viewMode === 'view' ? (
              <div className="space-y-2">
                <p><strong>Category:</strong> {selectedItem.category}</p>
                <p><strong>Description:</strong> {selectedItem.description}</p>
                <p><strong>Price Positioning:</strong> {selectedItem.pricePositioning}</p>
                {['targetAudiences', 'features', 'painPoints', 'useCases', 'competitors', 'uniqueSellingPoints'].map((key) => (
                  <div key={key}>
                    <p className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}:</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {(selectedItem[key as keyof ItemType] as string[] ?? []).map((val, i) => (
                        <span key={i} className="bg-gray-700 text-white text-xs px-2 py-1 rounded">
                          {val}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <input
                  placeholder="Category"
                  value={editItems[selectedItem._id]?.category ?? selectedItem.category ?? ''}
                  onChange={(e) => handleEditChange(selectedItem._id, 'category', e.target.value)}
                  className="w-full bg-gray-900 text-white border border-gray-700 rounded p-2"
                />

                <textarea
                  placeholder="Description"
                  value={editItems[selectedItem._id]?.description ?? selectedItem.description ?? ''}
                  onChange={(e) => handleEditChange(selectedItem._id, 'description', e.target.value)}
                  rows={3}
                  className="w-full bg-gray-900 text-white border border-gray-700 rounded p-2"
                />

                <input
                  placeholder="Price Positioning"
                  value={editItems[selectedItem._id]?.pricePositioning ?? selectedItem.pricePositioning ?? ''}
                  onChange={(e) => handleEditChange(selectedItem._id, 'pricePositioning', e.target.value)}
                  className="w-full bg-gray-900 text-white border border-gray-700 rounded p-2"
                />

                {['targetAudiences', 'features', 'painPoints', 'useCases', 'competitors', 'uniqueSellingPoints'].map((field) => (
                  <div key={field} className="space-y-1">
                    <label className="block text-sm font-medium capitalize mb-1">{field.replace(/([A-Z])/g, ' $1')}</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newTagInputs[field] || ''}
                        placeholder={`Add to ${field}`}
                        className="flex-1 bg-gray-900 text-white border border-gray-700 rounded p-2"
                        onChange={(e) => setNewTagInputs(prev => ({ ...prev, [field]: e.target.value }))}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddToList(selectedItem._id, field as keyof ItemType, e.currentTarget.value);
                            e.currentTarget.value = '';
                          }
                        }}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(editItems[selectedItem._id]?.[field as keyof ItemType] as string[] ?? selectedItem[field as keyof ItemType] as string[] ?? []).map((tag, index) => (
                        <span key={index} className="bg-blue-700 text-white text-sm px-2 py-1 rounded flex items-center gap-2">
                          {tag}
                          <button onClick={() => handleDeleteFromList(selectedItem._id, field as keyof ItemType, index)}>✖</button>
                        </span>
                      ))}
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => handleSaveItem(selectedItem._id)}
                  className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded hover:scale-105 transition"
                >
                  💾 Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
