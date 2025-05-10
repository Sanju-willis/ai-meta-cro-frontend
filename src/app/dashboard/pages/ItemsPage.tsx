// src\app\dashboard\pages\ItemsPage.tsx
'use client';

import { useCompany } from '@/app/context/CompanyContext';
import { useState } from 'react';
import axios from 'axios';

export default function ItemsPage() {
  const { items, refreshCompany } = useCompany();
  const [editItems, setEditItems] = useState<{ [key: string]: { name: string; type: string } }>(
    {}
  );
  const [newItem, setNewItem] = useState({ name: '', type: 'product' });

  const handleEditChange = (id: string, field: string, value: string) => {
    setEditItems((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleSaveItem = async (id: string) => {
    try {
      const token = localStorage.getItem('my_jwt');
      await axios.put(
        `http://localhost:5000/api/items/${id}`,
        editItems[id],
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('✅ Item updated');
      refreshCompany();
    } catch (err) {
      console.error('❌ Failed to update item', err);
    }
  };

  const handleAddItem = async () => {
    try {
      const token = localStorage.getItem('my_jwt');
      await axios.post(
        `http://localhost:5000/api/items`,
        newItem,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('✅ Item added');
      setNewItem({ name: '', type: 'product' });
      refreshCompany();
    } catch (err) {
      console.error('❌ Failed to add item', err);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">🛒 Products & Services</h2>

      <h3 className="text-lg font-semibold mt-4 mb-2">Add New Item:</h3>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Name"
          value={newItem.name}
          onChange={(e) => setNewItem((prev) => ({ ...prev, name: e.target.value }))}
          className="flex-1 border rounded p-2"
        />
        <select
          value={newItem.type}
          onChange={(e) => setNewItem((prev) => ({ ...prev, type: e.target.value }))}
          className="border rounded p-2"
        >
          <option value="product">Product</option>
          <option value="service">Service</option>
        </select>
        <button
          onClick={handleAddItem}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          ➕ Add
        </button>
      </div>

      <h3 className="text-lg font-semibold mt-4 mb-2">Items List:</h3>
      {items.length > 0 ? (
        items.map((item) => (
          <div key={item._id} className="flex gap-2 mb-2 items-center">
            <input
              type="text"
              value={editItems[item._id]?.name ?? item.name}
              onChange={(e) =>
                handleEditChange(item._id, 'name', e.target.value)
              }
              className="flex-1 border rounded p-2"
            />
            <select
              value={editItems[item._id]?.type ?? item.type}
              onChange={(e) =>
                handleEditChange(item._id, 'type', e.target.value)
              }
              className="border rounded p-2"
            >
              <option value="product">Product</option>
              <option value="service">Service</option>
            </select>
            <button
              onClick={() => handleSaveItem(item._id)}
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              💾 Save
            </button>
          </div>
        ))
      ) : (
        <p>No items available.</p>
      )}
    </div>
  );
}
