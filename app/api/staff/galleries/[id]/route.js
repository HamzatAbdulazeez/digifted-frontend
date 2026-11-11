import { NextResponse } from "next/server";
import db from "../../../../../lib/db";
import { getCurrentUser, requireRole } from "../../../../../lib/auth";

export async function DELETE(request, ctx) {
  const params = await ctx.params;
  const user = await getCurrentUser();
  if (!requireRole(user, ["staff", "admin"])) {
    return NextResponse.json({ message: "Staff access only." }, { status: 403 });
  }

  db.prepare("DELETE FROM galleries WHERE id = ?").run(params.id);
  return NextResponse.json({ message: "Deleted." });
}

export async function PATCH(request, ctx) {
  const params = await ctx.params;
  const user = await getCurrentUser();
  if (!requireRole(user, ["staff", "admin"])) {
    return NextResponse.json({ message: "Staff access only." }, { status: 403 });
  }

  const existing = db.prepare("SELECT * FROM galleries WHERE id = ?").get(params.id);
  if (!existing) {
    return NextResponse.json({ message: "Album not found." }, { status: 404 });
  }

  const body = await request.json();
  const title = body.title !== undefined ? String(body.title).trim() : existing.title;
  const price = body.price !== undefined ? Number(body.price) : existing.price;

  if (!title || !Number.isFinite(price) || price <= 0) {
    return NextResponse.json({ message: "Title and price are required." }, { status: 422 });
  }

  db.prepare("UPDATE galleries SET title = ?, department = ?, description = ?, price = ? WHERE id = ?").run(
    title,
    body.department !== undefined ? body.department || null : existing.department,
    body.description !== undefined ? body.description || null : existing.description,
    price,
    params.id
  );

  const gallery = db.prepare("SELECT * FROM galleries WHERE id = ?").get(params.id);
  return NextResponse.json(gallery);
}
