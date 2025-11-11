import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const { data } = await axios.post("/api/admin/login", { email, password });

      if (data.success) {
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = data.token;
        toast.success("Logged in successfully!");
        navigate("/dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 flex flex-col gap-5"
        style={{ boxShadow: "0 6px 24px 0 #E0E7FF" }}
      >
        <h2 className="text-2xl font-bold mb-0 text-center">
          <span className="text-purple-600">student</span>{" "}
          <span className="text-black">Login</span>
        </h2>
        <p className="text-center text-gray-500 mb-4 text-sm">
          Enter your credentials to access the admin panel
        </p>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2 mb-2">
            {error}
          </div>
        )}

        <div>
          <label className="block font-medium text-gray-700 mb-1">Email</label>
          <input
            className="w-full border-b border-gray-300 focus:outline-none p-2 bg-transparent placeholder-gray-400"
            type="email"
            placeholder="your email id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            className="w-full border-b border-gray-300 focus:outline-none p-2 bg-transparent placeholder-gray-400"
            type="password"
            placeholder="your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full mt-2 py-2 rounded bg-indigo-500 hover:bg-indigo-600 text-white font-semibold shadow transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}

