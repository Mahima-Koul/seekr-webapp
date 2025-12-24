import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext.jsx";
import Navbar from "../components/navbar.jsx";
import Loader from "../components/Loader.jsx";
import toast from "react-hot-toast";
import Moment from "moment";

export default function Claims() {
  const { axios } = useAppContext();
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchClaims = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/claim/my-claims");
      if (data.success) setClaims(data.claims);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (claimId, action) => {
    try {
      const { data } = await axios.post("/api/claim/update-status", {
        claimId,
        action, // "approved" or "rejected"
      });

      if (data.success) {
        toast.success(data.message);
        fetchClaims();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchClaims();
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">

      <div className="max-w-5xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Item Claims
        </h1>

        {loading ? (
          <Loader />
        ) : claims.length === 0 ? (
          <div className="flex justify-center">
  <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm">
    
    <h2 className="text-lg font-medium text-gray-800 mb-1">
      No claims yet
    </h2>
    <p className="text-gray-500 text-sm">
      When someone claims one of your items, it’ll show up here.
    </p>
  </div>
</div>
        ) : (
          <div className="space-y-6">
            {claims.map((claim) => (
              <div
                key={claim._id}
                className="border rounded-xl p-6 shadow-sm hover:shadow-md transition bg-white"
              >
                {/* ITEM INFO */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {claim.item.title}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      {claim.item.category} •{" "}
                      {Moment(claim.createdAt).format("DD MMM YYYY")}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      claim.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : claim.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {claim.status.toUpperCase()}
                  </span>
                </div>

                {/* CLAIMANT INFO */}
                <div className="mt-4 text-gray-700">
                  <p>
                    <span className="font-medium">Requested by:</span>{" "}
                    {claim.claimedBy.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {claim.claimedBy.email}
                  </p>
                </div>

                {/* MESSAGE */}
                {claim.message && (
                  <div className="mt-4 bg-gray-50 p-4 rounded-lg text-gray-700">
                    “{claim.message}”
                  </div>
                )}

                {/* ACTIONS */}
                {claim.status === "pending" && (
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() =>
                        handleAction(claim._id, "approved")
                      }
                      className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        handleAction(claim._id, "rejected")
                      }
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
