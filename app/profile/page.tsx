"use client";
import { useEffect, useState } from "react";
import { apiGet } from "@/app/lib/api";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("You must be logged in");
      return;
    }

    apiGet("profile", token).then(res => {
      if (res.user) setUser(res.user);
      else setMessage(res.message);
    });
  }, []);

  if (message) return <p className="mt-10 text-center text-red-500">{message}</p>;

  if (!user) return <p className="mt-10 text-center">Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
}