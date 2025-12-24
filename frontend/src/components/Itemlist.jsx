import React, { useState } from "react";

const mockItems = [
  { id: 1, name: "Water Bottle", status: "Found", date: "8 Nov 2025" },
  { id: 2, name: "Earphones", status: "Pending", date: "6 Nov 2025" },
];

export default function ItemsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState(mockItems);
  
  return (
    <div className="w-full">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">All Items</h2>
      
      {/* Search bar */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          className="border px-3 py-2 rounded w-full text-sm sm:text-base"
          placeholder="Search for lost items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded whitespace-nowrap text-sm sm:text-base hover:bg-blue-700 transition-colors"
          onClick={async () => {
            if (!searchTerm.trim()) return;
            try {
              const res = await fetch(`/api/item/search?q=${encodeURIComponent(searchTerm)}`);
              const data = await res.json();
              if (data.success) {
                setItems(data.items);
              }
            } catch (err) {
              console.error("Search error:", err);
            }
          }}
        >
          Search
        </button>
      </div>
      
      {/* Desktop Table View */}
      <div className="hidden sm:block bg-white shadow rounded p-4 overflow-x-auto">
        <div className="flex justify-between border-b py-2 font-bold min-w-[500px]">
          <span className="flex-1">Item</span>
          <span className="flex-1 text-center">Date</span>
          <span className="flex-1 text-right">Status</span>
        </div>
        {items.map(item => (
          <div key={item.id || item._id} className="flex justify-between border-b py-3 min-w-[500px]">
            <span className="flex-1">{item.title || item.name}</span>
            <span className="flex-1 text-center">
              {item.date ? new Date(item.date).toLocaleDateString() : ""}
            </span>
            <span
              className={`flex-1 text-right ${
                item.category === "Found" || item.resolved
                  ? "text-green-700"
                  : "text-yellow-600"
              }`}
            >
              {item.category || (item.resolved ? "Resolved" : "Pending")}
            </span>
          </div>
        ))}
      </div>
      
      {/* Mobile Card View */}
      <div className="sm:hidden space-y-3">
        {items.map(item => (
          <div key={item.id || item._id} className="bg-white shadow rounded p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-base">{item.title || item.name}</h3>
              <span
                className={`text-sm font-medium ${
                  item.category === "Found" || item.resolved
                    ? "text-green-700"
                    : "text-yellow-600"
                }`}
              >
                {item.category || (item.resolved ? "Resolved" : "Pending")}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              {item.date ? new Date(item.date).toLocaleDateString() : ""}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
