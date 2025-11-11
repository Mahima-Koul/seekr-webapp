import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import ReportLost from "./pages/ReportLost";
import ItemsList from "./pages/ItemsList";
import MyClaims from "./pages/MyClaims";
import Home from "./pages/Home";
import Item from "./pages/Item";
import Login from "./pages/Login";
import { useAppContext } from "./context/AppContext";

export default function App() {
  const {token}= useAppContext()
  return (
    <div>
      <Toaster />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/item/:id" element={<Item />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboard Layout Routes */}
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="report-lost" element={<ReportLost />} />
          <Route path="items-list" element={<ItemsList />} />
          <Route path="my-claims" element={<MyClaims />} />
        </Route>
      </Routes>
    </div>
  );
}

