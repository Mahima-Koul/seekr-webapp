import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext.jsx";
import toast from "react-hot-toast";
import Loader from "../components/Loader.jsx";
import Moment from "moment";

export default function YourActivity() {
  const navigate = useNavigate();
  const { axios, token } = useAppContext();

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ---------------- AUTH GUARD ---------------- */
  useEffect(() => {
    // wait for context to hydrate token
    if (token === null) return;

    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  /* ---------------- FETCH USER ITEMS ---------------- */
  const fetchActivities = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const { data } = await axios.get("/api/item/myitems");

      if (data.success) {
        setActivities(data.items);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchActivities();
  }, [token]);

  /* ---------------- TOGGLE RESOLVED ---------------- */
  const handleToggleResolved = async (id) => {
    try {
      const { data } = await axios.post("/api/item/toggle-resolve", { id });

      if (data.success) {
        toast.success(data.message);
        fetchActivities();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  /* ---------------- STATS ---------------- */
  const lostCount = activities.filter(
    (a) => a.category === "Lost" && !a.resolved
  ).length;

  const foundCount = activities.filter(
    (a) => a.category === "Found" && !a.resolved
  ).length;

  const resolvedCount = activities.filter(
    (a) => a.resolved
  ).length;

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-gray-50 px-6 sm:px-10 py-10 space-y-10">
      
      {/* SUMMARY */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-indigo-50 p-6 rounded-2xl shadow-sm text-center">
          <div className="text-4xl font-semibold text-indigo-700">
            {lostCount}
          </div>
          <div className="mt-1 text-indigo-600">
            Lost Items Reported
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-2xl shadow-sm text-center">
          <div className="text-4xl font-semibold text-green-700">
            {foundCount}
          </div>
          <div className="mt-1 text-green-600">
            Found Items Submitted
          </div>
        </div>

        <div className="bg-gray-100 p-6 rounded-2xl shadow-sm text-center">
          <div className="text-4xl font-semibold text-gray-700">
            {resolvedCount}
          </div>
          <div className="mt-1 text-gray-600">
            Resolved Cases
          </div>
        </div>
      </div>

      {/* ACTIVITY TABLE */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Recent Activity
        </h2>

        {loading ? (
          <Loader />
        ) : (
          <div className="bg-white shadow rounded-xl overflow-hidden">
            <div className="grid grid-cols-7 font-semibold text-gray-700 border-b px-4 py-3 bg-gray-50">
              <span>Action</span>
              <span>Item</span>
              <span>Category</span>
              <span>Type</span>
              <span>Date</span>
              <span>Status</span>
              <span>Resolve</span>
            </div>

            {activities.map((activity) => (
              <div
                key={activity._id}
                className="grid grid-cols-7 items-center px-4 py-3 border-b last:border-none text-gray-700 hover:bg-gray-50 transition"
              >
                <span>
                  {activity.category === "Lost"
                    ? "Reported Lost"
                    : "Found Item"}
                </span>

                <span>{activity.title}</span>
                <span>{activity.category}</span>
                <span>{activity.type || "-"}</span>

                <span>
                  {Moment(activity.date).format("DD MMM YYYY")}
                </span>

                <span
                  className={
                    activity.resolved
                      ? "text-green-600 font-medium"
                      : "text-yellow-600 font-medium"
                  }
                >
                  {activity.resolved ? "Resolved" : "Pending"}
                </span>

                <button
                  onClick={() => handleToggleResolved(activity._id)}
                  disabled={activity.resolved}
                  className={`px-3 py-1 rounded text-white text-sm transition ${
                    activity.resolved
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-black hover:bg-gray-800"
                  }`}
                >
                  {activity.resolved ? "Resolved" : "Resolve"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BACK */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition"
        >
          ← Go Back to Home
        </button>
      </div>
    </div>
  );
}
