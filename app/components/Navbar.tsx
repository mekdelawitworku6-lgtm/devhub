"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
    window.location.href = "/login";
  }

  return (
    <nav className="bg-gray-800 text-gray-200 p-4 flex justify-between items-center shadow-md">
      <div className="font-bold text-xl">DevHub</div>
      <div className="flex gap-4 items-center">
        <Link href="/">Home</Link>
        <Link href="/posts">All Posts</Link>
        {token && <Link href="/posts/me">My Posts</Link>}
        {token && <Link href="/posts/create">Create Post</Link>}
        {token && <Link href="/profile">Profile</Link>}
        {!token && <Link href="/login">Login</Link>}
        {!token && <Link href="/register">Register</Link>}
        {token && <button onClick={handleLogout} className="bg-red-600 px-2 py-1 rounded">Logout</button>}
      </div>
    </nav>
  );
}