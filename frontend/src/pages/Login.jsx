import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/login", {
        email,
        password,
      });

      if (data.success) {
        // 🔐 Save token & user info
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // 🔗 Attach token to future axios requests
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

        toast.success("Logged in successfully!");
        navigate("/dashboard"); // ✅ Navigate after login
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 flex flex-col gap-5"
        style={{ boxShadow: "0 6px 24px 0 #E0E7FF" }}
      >
        <h2 className="text-2xl font-bold text-center">
          <span className="text-purple-600">Student</span>{" "}
          <span className="text-black">Login</span>
        </h2>

        <p className="text-center text-gray-500 text-sm">
          Enter your credentials to continue
        </p>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
            {error}
          </div>
        )}

        <div>
          <label className="block font-medium text-gray-700 mb-1">Email</label>
          <input
            className="w-full border-b border-gray-300 focus:outline-none p-2 bg-transparent"
            type="email"
            placeholder="your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Password</label>
          <input
            className="w-full border-b border-gray-300 focus:outline-none p-2 bg-transparent"
            type="password"
            placeholder="your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          className={`w-full mt-2 py-2 rounded bg-indigo-500 hover:bg-indigo-600 text-white font-semibold transition ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-center text-gray-600 mt-3">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-indigo-600 font-medium">
            Sign up here
          </Link>
        </p>
      </form>
    </div>
  );
}
