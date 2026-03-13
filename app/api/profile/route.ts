import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/mongodb";
import User from "@/app/model/User";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "devhubsecret";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json({ message: "No token provided" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1]; // Expecting "Bearer <token>"
    if (!token) {
      return NextResponse.json({ message: "Invalid token format" }, { status: 401 });
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, SECRET);
    } catch (err) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}