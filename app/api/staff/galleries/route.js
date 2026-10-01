import { NextResponse } from "next/server";
import db from "../../../../lib/db";
import { getCurrentUser, requireRole } from "../../../../lib/auth";

function randomPassword() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no ambiguous chars
  let out = "";
  for (let i = 0; i < 8; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

export async function GET() {
  const user = getCurrentUser();
  if (!requireRole(user, ["staff", "admin"])) {
    return NextResponse.json({ message: "Staff access only." }, { status: 403 });
  }

  const galleries = db
    .prepare(
      `SELECT g.*, (SELECT COUNT(*) FROM media m WHERE m.galleryId = g.id) as media_count
       FROM galleries g ORDER BY createdAt DESC`
    )
    .all();

  return NextResponse.json({ data: galleries });
}

export async function POST(request) {
  const user = getCurrentUser();
  if (!requireRole(user, ["staff", "admin"])) {
    return NextResponse.json({ message: "Staff access only." }, { status: 403 });
  }

  const body = await request.json();
  const { title, department, description, price } = body;

  if (!title || !price) {
    return NextResponse.json({ message: "Title and price are required." }, { status: 422 });
  }

  const password = body.password || randomPassword();

  const result = db
    .prepare(
      `INSERT INTO galleries (title, department, description, price, password, isForSale, createdById)
       VALUES (?, ?, ?, ?, ?, 1, ?)`
    )
    .run(title, department || null, description || null, price, password, user.id);

  const gallery = db.prepare("SELECT * FROM galleries WHERE id = ?").get(result.lastInsertRowid);
  return NextResponse.json({ ...gallery, media_count: 0 }, { status: 201 });
}