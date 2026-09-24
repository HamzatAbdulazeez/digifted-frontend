import { NextResponse } from "next/server";
import db from "../../../../lib/db";
import { getCurrentUser, requireRole, hashPassword } from "../../../../lib/auth";

export async function GET() {
  const user = getCurrentUser();
  if (!requireRole(user, ["admin"])) {
    return NextResponse.json({ message: "Admin access only." }, { status: 403 });
  }

  const staff = db
    .prepare("SELECT id, name, email, phone, role, createdAt FROM users WHERE role IN ('staff','admin') ORDER BY createdAt DESC")
    .all();

  return NextResponse.json({ data: staff });
}

export async function POST(request) {
  const user = getCurrentUser();
  if (!requireRole(user, ["admin"])) {
    return NextResponse.json({ message: "Admin access only." }, { status: 403 });
  }

  const { name, email, password, role } = await request.json();
  if (!name || !email || !password || !["staff", "admin"].includes(role)) {
    return NextResponse.json({ message: "Name, email, password, and a valid role (staff/admin) are required." }, { status: 422 });
  }

  const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
  if (existing) {
    return NextResponse.json({ message: "That email is already registered." }, { status: 422 });
  }

  const result = db
    .prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)")
    .run(name, email, hashPassword(password), role);

  const newUser = db.prepare("SELECT id, name, email, role, createdAt FROM users WHERE id = ?").get(result.lastInsertRowid);
  return NextResponse.json(newUser, { status: 201 });
}
