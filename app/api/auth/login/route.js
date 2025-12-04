import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "@/lib/db";

export async function POST(request) {
  const { username, password } = await request.json();

  try {
    const [rows] = await pool.execute(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Invalid username or password" },
        { status: 401 }
      );
    }

    const user = rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid username or password" },
        { status: 401 }
      );
    }

    // 🔥 Create JWT with id, username, brandId inside payload
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        brandId: user.brandId,
      },
      process.env.JWT_SECRET, // must exist in .env
      { expiresIn: "7d" }
    );

    // 🔥 Return ONLY success + token
    return NextResponse.json(
      {
        success: true,
        token,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
