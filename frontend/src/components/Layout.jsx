import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { User, Bell, LayoutDashboard, PlusCircle, Search } from "lucide-react";
import logo from '../assets/logo.svg';
export default function Layout() {
  const location = useLocation();

  const linkClass = (path) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-indigo-50 text-indigo-700 font-medium"
        : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
    }`;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <nav className="w-64 bg-white shadow-md p-6 flex flex-col justify-between">
        <div>
          <img src={logo} alt="Seekr Logo" className="w-30 mb-6" />
          <div className="flex flex-col gap-2">
            <Link to="/dashboard" className={linkClass("/dashboard")}>
              <LayoutDashboard size={18} />
              Dashboard
            </Link>

            <Link to="/report-lost" className={linkClass("/report-lost")}>
              <Search size={18} />
              Report Lost
            </Link>

            <Link to="/found-item" className={linkClass("/found-item")}>
              <PlusCircle size={18} />
              Found an Item
            </Link>

            <Link to="/my-claims" className={linkClass("/my-claims")}>
              💬 My Claims
            </Link>

            <Link to="/notifications" className={linkClass("/notifications")}>
              <Bell size={18} />
              Notifications
            </Link>

            <Link to="/profile" className={linkClass("/profile")}>
              <User size={18} />
              Profile
            </Link>
          </div>
        </div>

        {/* Footer (optional) */}
        <div className="mt-10 text-xs text-gray-400">
          <p>© 2025 Seekr</p>
          <p>All rights reserved</p>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
