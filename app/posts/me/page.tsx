"use client";
import { useEffect, useState } from "react";
import { apiGet } from "@/app/lib/api";

export default function MyPostsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("You must be logged in");
      setLoading(false);
      return;
    }

    apiGet("posts/me", token).then(res => {
      if (res.posts) setPosts(res.posts);
      else setMessage(res.message);
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="mt-10 text-center">Loading your posts...</p>;
  if (message) return <p className="mt-10 text-center text-red-500">{message}</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-6">My Posts</h1>
      {posts.length === 0 && <p>You have no posts yet</p>}
      {posts.map(post => (
        <div key={post._id} className="mb-4 p-4 border rounded shadow">
          <h2 className="font-bold">{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}