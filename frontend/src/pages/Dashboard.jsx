import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext.jsx";
import toast from "react-hot-toast";
import Loader from "../components/Loader.jsx";
import Moment from "moment";

export default function YourActivity() {
  const navigate = useNavigate();
  const { axios } = useAppContext();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login", { replace: true });
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
  // Fetch all items
  const fetchActivities = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/item/all"); // correct backend route
      if (data.success) setActivities(data.items);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Toggle resolved status
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
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  // Summary counts
  const lostCount = activities.filter(a => a.category === "Lost").length;
  const foundCount = activities.filter(a => a.category === "Found").length;
  const resolvedCount = activities.filter(a => a.resolved).length;

  return (
    <div className="p-6 space-y-8">
      {/* --- SUMMARY CARDS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-indigo-100 p-6 rounded-xl shadow-sm text-center hover:shadow-md transition">
          <div className="text-3xl font-bold text-indigo-700">{lostCount}</div>
          <div className="text-indigo-600 mt-1 font-medium">Lost Items Reported</div>
        </div>

        <div className="bg-green-100 p-6 rounded-xl shadow-sm text-center hover:shadow-md transition">
          <div className="text-3xl font-bold text-green-700">{foundCount}</div>
          <div className="text-green-600 mt-1 font-medium">Found Items Submitted</div>
        </div>

        <div className="bg-gray-100 p-6 rounded-xl shadow-sm text-center hover:shadow-md transition">
          <div className="text-3xl font-bold text-gray-700">{resolvedCount}</div>
          <div className="text-gray-600 mt-1 font-medium">Resolved Cases</div>
        </div>


      </div>

      {/* --- RECENT ACTIVITY TABLE --- */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Activity</h2>
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
                <span>{activity.category === "Lost" ? "Reported Lost" : "Found Item"}</span>
                <span>{activity.title}</span>
                <span>{activity.category}</span>
                <span>{activity.type}</span>
                <span>{Moment(activity.date).format("DD MMM YYYY")}</span>
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
                  className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800 transition text-sm"
                >
                  {activity.resolved ? "Mark Pending" : "Resolve"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-center mt-10">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium"
        >
          ← Go Back to Home
        </button>
      </div>
    </div>
  );
}
