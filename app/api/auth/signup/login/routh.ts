import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dbConnect from "@/app/lib/mongodb";
import User from "@/app/model/User";

const SECRET = process.env.JWT_SECRET || "devhubsecret";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { email, password } = await req.json();
    if (!email || !password) return NextResponse.json({ message: "All fields required" }, { status: 400 });

    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return NextResponse.json({ message: "Invalid password" }, { status: 401 });

    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "7d" });
    return NextResponse.json({ message: "Login successful", token });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}