import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <nav className="w-60 bg-white shadow-md p-6 flex flex-col gap-4">
        <h1 className="text-xl font-bold text-indigo-600 mb-8">Seekr</h1>
        <Link to="/dashboard" className="hover:text-indigo-600">Dashboard</Link>
        <Link to="/report-lost" className="hover:text-indigo-600">Report Lost</Link>
        <Link to="/items-list" className="hover:text-indigo-600">Items List</Link>
        <Link to="/my-claims" className="hover:text-indigo-600">My Claims</Link>
      </nav>
      {/* Main content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
