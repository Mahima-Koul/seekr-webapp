import React from "react";

const mockItems = [
  { id: 1, name: "Water Bottle", status: "Found", date: "8 Nov 2025" },
  { id: 2, name: "Earphones", status: "Pending", date: "6 Nov 2025" },
];

export default function ItemsList() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Items</h2>
      <div className="bg-white shadow rounded p-4">
        <div className="flex justify-between border-b py-2 font-bold">
          <span>Item</span>
          <span>Date</span>
          <span>Status</span>
        </div>
        {mockItems.map(item => (
          <div key={item.id} className="flex justify-between border-b py-2">
            <span>{item.name}</span>
            <span>{item.date}</span>
            <span
              className={
                item.status === "Found"
                  ? "text-green-700"
                  : "text-yellow-600"
              }
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
