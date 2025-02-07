"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "habibamadni557@gmail.com" && password === "12345678") {
      localStorage.setItem("isloggedin", "true");
      router.push("/admin/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-sm sm:max-w-md lg:max-w-lg p-8 space-y-8">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Admin Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <p className="text-red-600 text-center font-medium">{error}</p>
          )}
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg text-lg font-medium placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg text-lg font-medium placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <a
            href="#"
            className="text-sm text-blue-500 hover:text-blue-700 font-medium"
          >
            Forgot Password?
          </a>
        </div>
      </div>
    </section>
  );
}
