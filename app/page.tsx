"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { apiGet } from "@/app/lib/api";

export default function HomePage() {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      apiGet("profile", token).then(res => {
        if (res.user) setName(res.user.name);
      });
    }
  }, []);

  return (
    <div className="max-w-md mx-auto mt-20 p-6 text-center">
      <h1 className="text-3xl font-bold mb-6">Welcome to DevHub</h1>
      {name && <p className="mb-4">Hello, {name}!</p>}
      <div className="flex flex-col gap-4">
        {!name && <Link href="/register" className="bg-blue-500 text-white p-3 rounded">Register</Link>}
        {!name && <Link href="/login" className="bg-green-500 text-white p-3 rounded">Login</Link>}
        <Link href="/posts" className="bg-gray-700 text-white p-3 rounded">All Posts</Link>
        {name && <Link href="/posts/me" className="bg-gray-700 text-white p-3 rounded">My Posts</Link>}
      </div>
    </div>
  );
}