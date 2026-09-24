import { NextResponse } from "next/server";
import db from "../../../../lib/db";
import { hashPassword, signSession, setSessionCookie } from "../../../../lib/auth";

export async function POST(request) {
  const body = await request.json();
  const { name, email, phone, password } = body;

  if (!name || !email || !password || password.length < 8) {
    return NextResponse.json(
      { message: "Name, email, and a password of at least 8 characters are required." },
      { status: 422 }
    );
  }

  const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
  if (existing) {
    return NextResponse.json({ message: "That email is already registered." }, { status: 422 });
  }

  const hashed = hashPassword(password);
  const result = db
    .prepare("INSERT INTO users (name, email, phone, password, role) VALUES (?, ?, ?, ?, 'customer')")
    .run(name, email, phone || null, hashed);

  const user = db.prepare("SELECT id, name, email, phone, role FROM users WHERE id = ?").get(result.lastInsertRowid);
  const token = signSession(user);
  setSessionCookie(token);

  return NextResponse.json({ user }, { status: 201 });
}
