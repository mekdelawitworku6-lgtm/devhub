import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/mongodb";
import User from "@/app/model/User";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();
    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return NextResponse.json({ message: "User already exists" }, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, email, password: hashedPassword });

    return NextResponse.json({
      message: "User created",
      user: { id: newUser._id, name, email },
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}