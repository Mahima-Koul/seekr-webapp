import React, { useState } from "react";

export default function ReportLost() {
  const [item, setItem] = useState('');
  const [desc, setDesc] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Lost item reported! (This is a demo)");
    setItem('');
    setDesc('');
  };

  return (
    <div className="bg-white shadow rounded p-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Report Lost Item</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="border p-2 rounded"
          type="text"
          placeholder="Item Name"
          value={item}
          onChange={e => setItem(e.target.value)}
          required
        />
        <textarea
          className="border p-2 rounded"
          placeholder="Description"
          value={desc}
          onChange={e => setDesc(e.target.value)}
          required
        />
        <button className="bg-indigo-600 text-white rounded py-2" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
