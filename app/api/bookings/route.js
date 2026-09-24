import { NextResponse } from "next/server";
import db from "../../../lib/db";
import { getCurrentUser, requireRole } from "../../../lib/auth";

export async function POST(request) {
  const body = await request.json();
  const { name, email, phone, department, preferred_date, message } = body;

  if (!name || !email) {
    return NextResponse.json({ message: "Name and email are required." }, { status: 422 });
  }

  const user = getCurrentUser();
  const result = db
    .prepare(
      `INSERT INTO bookings (customerId, name, email, phone, department, preferredDate, message, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')`
    )
    .run(user?.id || null, name, email, phone || null, department || null, preferred_date || null, message || null);

  const booking = db.prepare("SELECT * FROM bookings WHERE id = ?").get(result.lastInsertRowid);
  return NextResponse.json(booking, { status: 201 });
}

export async function GET() {
  const user = getCurrentUser();
  if (!requireRole(user, ["staff", "admin"])) {
    return NextResponse.json({ message: "Staff access only." }, { status: 403 });
  }

  const bookings = db.prepare("SELECT * FROM bookings ORDER BY createdAt DESC").all();
  return NextResponse.json({ data: bookings });
}
