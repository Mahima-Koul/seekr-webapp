import React from 'react';

export default function Dashboard() {
  return (
    <div>
      <div className="flex gap-6 mb-8">
        <div className="bg-indigo-100 p-6 rounded flex-1 text-center">
          <div className="text-2xl font-bold">24</div>
          <div className="text-indigo-700">Reports</div>
        </div>
        <div className="bg-green-100 p-6 rounded flex-1 text-center">
          <div className="text-2xl font-bold">18</div>
          <div className="text-green-700">Found Items</div>
        </div>
        <div className="bg-yellow-100 p-6 rounded flex-1 text-center">
          <div className="text-2xl font-bold">6</div>
          <div className="text-yellow-700">Open Claims</div>
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-2">Latest Lost Items</h2>
      <div className="bg-white shadow rounded p-4">
        <div className="flex justify-between border-b py-2 font-bold">
          <span>Item</span><span>Date</span><span>Status</span><span>Actions</span>
        </div>
        <div className="flex justify-between border-b py-2">
          <span>Blue Backpack</span><span>10 Nov 2025</span>
          <span className="text-yellow-600">Pending</span>
          <button className="text-indigo-600">Claim</button>
        </div>
        <div className="flex justify-between border-b py-2">
          <span>ID Card</span><span>09 Nov 2025</span>
          <span className="text-green-700">Found</span>
          <button className="text-indigo-600">Claim</button>
        </div>
      </div>
    </div>
  );
}
