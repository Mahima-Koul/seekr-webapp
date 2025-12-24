import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { User, Bell, LayoutDashboard, PlusCircle, Search, Menu, X } from "lucide-react";
import logo from '../assets/logo.svg';

export default function Layout() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const linkClass = (path) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-indigo-50 text-indigo-700 font-medium"
        : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
    }`;

  const NavLinks = () => (
    <div className="flex flex-col gap-2">
      <Link 
        to="/dashboard" 
        className={linkClass("/dashboard")}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <LayoutDashboard size={18} />
        Dashboard
      </Link>
      <Link 
        to="/report-lost" 
        className={linkClass("/report-lost")}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <Search size={18} />
        Report Lost
      </Link>
      <Link 
        to="/found-item" 
        className={linkClass("/found-item")}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <PlusCircle size={18} />
        Found an Item
      </Link>
      <Link 
        to="/claims" 
        className={linkClass("/claims")}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        💬 My Claims
      </Link>
      <Link 
        to="/notifications" 
        className={linkClass("/notifications")}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <Bell size={18} />
        Notifications
      </Link>
      <Link 
        to="/profile" 
        className={linkClass("/profile")}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <User size={18} />
        Profile
      </Link>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white shadow-md z-50 px-4 py-3 flex items-center justify-between">
        <Link to="/">
          <img
            src={logo}
            alt="Seekr Logo"
            className="h-8 cursor-pointer"
          />
        </Link>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <nav className="hidden lg:flex w-64 bg-white shadow-md p-6 flex-col justify-between fixed h-screen">
        <div>
          <Link to="/">
            <img
              src={logo}
              alt="Seekr Logo"
              className="w-30 mb-6 cursor-pointer"
            />
          </Link>
          <NavLinks />
        </div>
        <div className="mt-10 text-xs text-gray-400">
          <p>© 2025 Seekr</p>
          <p>All rights reserved</p>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <nav 
            className="fixed left-0 top-0 bottom-0 w-64 bg-white shadow-md p-6 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                <img
                  src={logo}
                  alt="Seekr Logo"
                  className="w-30 mb-6 cursor-pointer"
                />
              </Link>
              <NavLinks />
            </div>
            <div className="mt-10 text-xs text-gray-400">
              <p>© 2025 Seekr</p>
              <p>All rights reserved</p>
            </div>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8 overflow-y-auto mt-16 lg:mt-0">
        <Outlet />
      </main>
    </div>
  );
}
