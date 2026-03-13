import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/mongodb";
import User from "@/app/model/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "devhubsecret";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    await dbConnect();

    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "7d" });

    return NextResponse.json({ message: "Login successful", token });
  } catch (error: any) {
    console.error(error);  // log errors for debugging
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}