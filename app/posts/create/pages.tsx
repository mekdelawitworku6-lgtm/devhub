"use client";
import { useState } from "react";
import { apiPost } from "@/app/lib/api";
import { useRouter } from "next/navigation";

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("You must be logged in");
      return;
    }

    const res = await apiPost("posts", { title, content }, token);
    setMessage(res.message);
    if (res.post) {
      setTitle("");
      setContent("");
      router.push("/posts/me"); // redirect to My Posts
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Create Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={e => setContent(e.target.value)}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-purple-500 text-white p-2 rounded">Create Post</button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}