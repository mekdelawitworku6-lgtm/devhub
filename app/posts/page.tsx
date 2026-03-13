"use client";
import { useEffect, useState } from "react";
import { apiGet } from "@/app/lib/api";

export default function PostsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet("posts").then(res => {
      if (res.posts) setPosts(res.posts);
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="mt-10 text-center">Loading posts...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-6">All Posts</h1>
      {posts.length === 0 && <p>No posts yet</p>}
      {posts.map(post => (
        <div key={post._id} className="mb-4 p-4 border rounded shadow">
          <h2 className="font-bold">{post.title}</h2>
          <p>{post.content}</p>
          <p className="text-sm text-gray-500">By {post.author.name}</p>
        </div>
      ))}
    </div>
  );
}