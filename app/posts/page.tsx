"use client";

import { useEffect, useState } from "react";

interface Post {
  _id: string;
  title: string;
  content: string;
  author?: {
    name: string;
    email?: string;
  };
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts");
        if (!res.ok) throw new Error("Failed to fetch posts");

        const data = await res.json();

        // ✅ This ensures posts is always an array
        const finalData = Array.isArray(data) ? data : data.posts || [];
        setPosts(finalData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div className="text-center mt-20 text-gray-400">Loading feed...</div>;
  if (error) return <div className="text-center mt-20 text-red-400">Error: {error}</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-6 pb-10">
      <h1 className="text-3xl font-bold text-center mb-6">DevHub Feed</h1>

      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts to show yet.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            className="bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700 hover:border-blue-500 transition-colors"
          >
            <p className="text-sm text-gray-400 mb-2">
              {post.author?.name || "Developer"}
            </p>

            <h2 className="text-xl font-semibold mb-2 text-white">
              {post.title}
            </h2>

            <p className="text-gray-300 leading-relaxed">{post.content}</p>
          </div>
        ))
      )}
    </div>
  );
}