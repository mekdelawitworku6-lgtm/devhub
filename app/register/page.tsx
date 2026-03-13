"use client";
import { useState } from "react";
import { apiPost } from "@/app/lib/api";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await apiPost("register", { name, email, password });
    setMessage(res.message);

    if (res.message === "User registered successfully") {
      // optional: redirect to login after registration
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border p-2 rounded"
          required
        />
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
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Register
        </button>
      </form>
      {message && <p className="mt-3 text-center">{message}</p>}
      <div className="mt-3 text-center">
        <p>
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500">Login</Link>
        </p>
      </div>
    </div>
  );
}