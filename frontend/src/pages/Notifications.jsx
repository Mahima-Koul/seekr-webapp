// import { Bell } from "lucide-react";
// import { motion } from "framer-motion";

// export default function Notifications() {
//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
//       {/* Header */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//         className="flex items-center gap-3 mt-10 mb-8"
//       >
//         <Bell className="w-8 h-8 text-black-600" />
//         <h1 className="text-3xl font-semibold text-gray-800">
//           Notifications
//         </h1>
//       </motion.div>

//       {/* Empty State */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ delay: 0.3, duration: 0.4 }}
//         className="bg-white rounded-2xl shadow-sm border border-gray-200 w-full max-w-lg p-8 flex flex-col items-center justify-center"
//       >
//         <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mb-4">
//           <Bell className="w-8 h-8 text-black-600" />
//         </div>
//         <h2 className="text-xl font-medium text-gray-700 mb-2">
//           You’re all caught up!
//         </h2>
//         <p className="text-gray-500 text-center">
//           You’ll see updates and alerts here when there’s new activity
//           on your Lost & Found posts.
//         </p>
//       </motion.div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "../context/AppContext.jsx";
import Loader from "../components/Loader.jsx";
import toast from "react-hot-toast";
import Moment from "moment";

export default function Notifications() {
  const { axios, token } = useAppContext();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const { data } = await axios.get("/api/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) setNotifications(data.notifications);
      else toast.error(data.message);
    } catch (error) {
      toast.error("Failed to fetch notifications");
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [token]);

  if (loading) return <Loader />;

  if (!notifications.length)
    return (
      <div className="flex justify-center mt-16">
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm">
          <h2 className="text-lg font-medium text-gray-800 mb-1">
            You’re all caught up!
          </h2>
          <p className="text-gray-500 text-sm">
            You’ll see updates and alerts here when there’s new activity on your
            Lost & Found posts.
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8 text-center">Notifications</h1>

        <div className="space-y-4">
          {notifications.map((note) => (
            <a
              key={note._id}
              href={note.link || "#"}
              className="block border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white hover:bg-gray-50"
            >
              <div className="flex justify-between items-center">
                <p className="text-gray-800">{note.message}</p>
                <span className="text-xs text-gray-400">
                  {Moment(note.createdAt).fromNow()}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
