import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import dbConnect from "@/app/lib/mongodb";
import User from "@/app/model/User";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json({ message: "All fields required" }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Email already registered" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    return NextResponse.json({ message: "User created", userId: user._id });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}