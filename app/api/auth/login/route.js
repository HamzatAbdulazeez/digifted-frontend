import { NextResponse } from "next/server";
import db from "../../../../lib/db";
import { verifyPassword, signSession, setSessionCookie } from "../../../../lib/auth";

export async function POST(request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ message: "Email and password are required." }, { status: 422 });
  }

  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);

  if (!user || !verifyPassword(password, user.password)) {
    return NextResponse.json({ message: "Invalid credentials." }, { status: 401 });
  }

  const token = signSession(user);
  setSessionCookie(token);

  delete user.password;
  return NextResponse.json({ user });
}
