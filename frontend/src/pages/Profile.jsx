import React, { useState, useEffect } from "react";

export default function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    joined: "",
  });

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  useEffect(() => {
    // Get user info from localStorage after login
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      // If you want, you can also fetch 'joined' date from backend
      setUser({ ...savedUser, joined: "August 2025" });
      setFormData({ ...savedUser, joined: "August 2025" });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setUser(formData);
    setEditing(false);
    // Optionally update backend here
    localStorage.setItem("user", JSON.stringify(formData));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login"; // redirect to login page
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-6 border border-gray-200">
      <h2 className="text-3xl font-semibold text-black mb-6 tracking-tight border-b pb-2">
        My Profile
      </h2>

      {/* Avatar + Basic Info */}
      <div className="flex items-center gap-6 mb-8">
        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-2xl font-bold">
          {user.name[0]}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
          <p className="text-gray-500">{user.email}</p>
          <p className="text-sm text-gray-400 mt-1">
            Member since {user.joined}
          </p>
        </div>
      </div>

      {/* Editable Form */}
      <form onSubmit={handleSave} className="flex flex-col gap-4 text-gray-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-500 block mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              disabled={!editing}
              onChange={handleChange}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-gray-400 disabled:bg-gray-50"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500 block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled={!editing}
              onChange={handleChange}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-gray-400 disabled:bg-gray-50"
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-500 block mb-1">Role</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            disabled
            className="w-full border rounded-md p-2 bg-gray-50 text-gray-500 cursor-not-allowed"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-4">
          {editing ? (
            <>
              <button
                type="button"
                onClick={() => {
                  setFormData(user);
                  setEditing(false);
                }}
                className="px-4 py-2 border border-gray-400 text-gray-700 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              >
                Save Changes
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="px-4 py-2 border border-gray-900 text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition-all"
            >
              Edit Profile
            </button>
          )}
        </div>
      </form>

      {/* Account Section */}
      <div className="mt-10 border-t pt-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-900">Account Settings</h3>
        <button
          onClick={handleLogout}
          className="px-4 py-2 border border-red-500 text-red-600 rounded-md hover:bg-red-50 transition-all"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
