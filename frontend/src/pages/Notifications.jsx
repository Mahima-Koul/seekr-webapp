import { Bell } from "lucide-react";
import { motion } from "framer-motion";

export default function Notifications() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-3 mt-10 mb-8"
      >
        <Bell className="w-8 h-8 text-black-600" />
        <h1 className="text-3xl font-semibold text-gray-800">
          Notifications
        </h1>
      </motion.div>

      {/* Empty State */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-200 w-full max-w-lg p-8 flex flex-col items-center justify-center"
      >
        <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mb-4">
          <Bell className="w-8 h-8 text-black-600" />
        </div>
        <h2 className="text-xl font-medium text-gray-700 mb-2">
          You’re all caught up!
        </h2>
        <p className="text-gray-500 text-center">
          You’ll see updates and alerts here when there’s new activity
          on your Lost & Found posts.
        </p>
      </motion.div>
    </div>
  );
}
