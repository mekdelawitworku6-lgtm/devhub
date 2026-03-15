import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/mongodb";
import Post from "@/app/model/Post";
import User from "@/app/model/User";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "devhubsecret";

// GET /api/posts
export async function GET() {
  try {
    await dbConnect();

    // Fetch posts with author name, sorted newest first
    const posts = await Post.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    // Always return an array
    return NextResponse.json({ posts: posts || [] });
  } catch (error: any) {
    console.error("GET /api/posts error:", error.message);

    // Return empty array on failure to prevent frontend crash
    return NextResponse.json({ posts: [], message: error.message }, { status: 500 });
  }
}

// POST /api/posts
export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json({ message: "No token provided" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return NextResponse.json({ message: "Invalid token format" }, { status: 401 });
    }

    // Verify JWT
    let decoded: any;
    try {
      decoded = jwt.verify(token, SECRET);
    } catch {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
    }

    // Get post data
    const { title, content } = await req.json();
    if (!title || !content) {
      return NextResponse.json({ message: "Title and content are required" }, { status: 400 });
    }

    // Create new post
    const post = await Post.create({
      title,
      content,
      author: decoded.id
    });

    // Populate author field before returning
    await post.populate("author", "name email");

    return NextResponse.json({ message: "Post created", post });
  } catch (error: any) {
    console.error("POST /api/posts error:", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}