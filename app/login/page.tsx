"use client";
import { useState } from "react";
import { apiPost } from "@/app/lib/api";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await apiPost("login", { email, password });

    if (res.token) {
      localStorage.setItem("token", res.token);
      setMessage("Login successful! Redirecting...");
      setTimeout(() => {
        window.location.href = "/profile";
      }, 1000);
    } else {
      setMessage(res.message || "Login failed");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          Login
        </button>
      </form>
      {message && <p className="mt-3 text-center">{message}</p>}
      <div className="mt-3 text-center">
        <p>
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-500">Register</Link>
        </p>
      </div>
    </div>
  );
}