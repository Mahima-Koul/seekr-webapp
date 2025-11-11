import React from "react";

export default function MyClaims() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Claims</h2>
      <div className="bg-white shadow rounded p-4">
        <div className="flex justify-between border-b py-2 font-bold">
          <span>Item</span>
          <span>Date Claimed</span>
          <span>Status</span>
        </div>
        {/* Example item */}
        <div className="flex justify-between border-b py-2">
          <span>Pencil Box</span>
          <span>07 Nov 2025</span>
          <span className="text-green-700">Approved</span>
        </div>
        <div className="flex justify-between border-b py-2">
          <span>Calculator</span>
          <span>08 Nov 2025</span>
          <span className="text-yellow-600">Pending</span>
        </div>
      </div>
    </div>
  );
}
