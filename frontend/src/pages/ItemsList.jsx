// ⬆️ We import useState because we need React state to store the search term and the items list dynamically.

import React,{useState} from "react";

const mockItems = [
  { id: 1, name: "Water Bottle", status: "Found", date: "8 Nov 2025" },
  { id: 2, name: "Earphones", status: "Pending", date: "6 Nov 2025" },
];

export default function ItemsList() {
   // ⬇️ State to hold the current search input
  const [searchTerm, setSearchTerm] = useState("");
  // ⬇️ State to hold items (initially mockItems, later replaced by search results)
  const [items, setItems] = useState(mockItems);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Items</h2>




{/* Search bar + button so user can type and trigger search */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border px-3 py-2 rounded w-full"
          placeholder="Search for lost items..."
          value={searchTerm} //  Controlled input: keeps input value in sync with searchTerm state
          onChange={(e) => setSearchTerm(e.target.value)} // Updates searchTerm state whenever user types
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={async () => {
            //  Prevent empty searches
            if (!searchTerm.trim()) return;
            try {
              // Call backend API with search term
              const res = await fetch(`/api/item/search?q=${encodeURIComponent(searchTerm)}`);
              const data = await res.json();
              if (data.success) {
                //  Replace items list with search results
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

















      <div className="bg-white shadow rounded p-4">
        <div className="flex justify-between border-b py-2 font-bold">
          
          <span>Item</span>
          <span>Date</span>
          <span>Status</span>
        </div>
                {/* ⬇️ Use items state instead of mockItems so it can update dynamically and or in item._id */}

        {items.map(item => (
          <div key={item.id || item._id} className="flex justify-between border-b py-2">
              {/* ⬇️ Show title if it exists, otherwise fallback to name */}
    <span>{item.title || item.name}</span>

        {    /*<span>{item.name}</span> commented this out and added ternary in date*/}
            <span>{item.date ? new Date(item.date).toLocaleDateString() : ""}</span>
             {/*category and resolved */}
            <span
              className={
                item.category === "Found" || item.resolved
                  ? "text-green-700"
                  : "text-yellow-600"
              }
            >
              {/*here is chneged status to category and resolved*/}
              {item.category || (item.resolved ? "Resolved" : "Pending")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
