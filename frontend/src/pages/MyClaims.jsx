import React from "react";

export default function MyClaims() {
  const claims = [
    { item: "Pencil Box", date: "07 Nov 2025", status: "Approved" },
    { item: "Calculator", date: "08 Nov 2025", status: "Pending" },
    { item: "Water Bottle", date: "10 Nov 2025", status: "Rejected" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "text-green-600";
      case "Pending":
        return "text-yellow-600";
      case "Rejected":
        return "text-red-600";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6 border border-gray-200">
      <h2 className="text-3xl font-semibold text-black mb-6 tracking-tight border-b pb-2">
        My Claims
      </h2>

      <div className="divide-y divide-gray-200">
        <div className="grid grid-cols-3 font-semibold text-gray-600 pb-2">
          <span>Item</span>
          <span>Date Claimed</span>
          <span>Status</span>
        </div>

        {claims.map((claim, index) => (
          <div
            key={index}
            className="grid grid-cols-3 py-3 hover:bg-gray-50 transition-all duration-200"
          >
            <span className="font-medium text-gray-800">{claim.item}</span>
            <span className="text-gray-500">{claim.date}</span>
            <span className={`${getStatusColor(claim.status)} font-medium`}>
              {claim.status}
            </span>
          </div>
        ))}
      </div>

      {claims.length === 0 && (
        <p className="text-gray-400 text-center mt-6">
          You haven’t made any claims yet.
        </p>
      )}
    </div>
  );
}
