import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/mongodb";
import Post from "@/app/model/Post";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "devhubsecret";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return NextResponse.json({ message: "No token provided" }, { status: 401 });

    const token = authHeader.split(" ")[1];
    if (!token) return NextResponse.json({ message: "Invalid token format" }, { status: 401 });

    let decoded: any;
    try { decoded = jwt.verify(token, SECRET); }
    catch { return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 }); }

    const { title, content } = await req.json();
    if (!title || !content) return NextResponse.json({ message: "Title and content required" }, { status: 400 });

    const post = await Post.create({ title, content, author: decoded.id });

    return NextResponse.json({ message: "Post created", post });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
export async function GET() {
  try {
    await dbConnect();
    const posts = await Post.find().populate("author", "name email").sort({ createdAt: -1 });
    return NextResponse.json({ posts });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}