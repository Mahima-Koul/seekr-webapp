import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import ReportLost from "./pages/ReportLost";
import ItemsList from "./pages/ItemsList";
import MyClaims from "./pages/MyClaims";
import Home from "./pages/Home";
import Item from "./pages/Item";
import Login from "./pages/Login";
import FoundItem from "./pages/FoundItem";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import { useAppContext } from "./context/AppContext";

export default function App() {
  const { token } = useAppContext();

  // Small ProtectedRoute wrapper (inline)
  const ProtectedRoute = ({ children }) => {
    if (!token) return <Navigate to="/login" replace />;
    return children;
  };

  return (
    <div>
      <Toaster />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/item/:id" element={<Item />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="report-lost" element={<ReportLost />} />
          <Route path="found-item" element={<FoundItem />} />
          <Route path="items-list" element={<ItemsList />} />
          <Route path="my-claims" element={<MyClaims />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}
