import { NextResponse } from "next/server";
import db from "../../../../../../lib/db";
import { getCurrentUser, requireRole } from "../../../../../../lib/auth";

export async function GET(request, { params }) {
  const user = getCurrentUser();
  if (!requireRole(user, ["staff", "admin"])) {
    return NextResponse.json({ message: "Staff access only." }, { status: 403 });
  }

  const media = db.prepare("SELECT * FROM media WHERE galleryId = ? ORDER BY createdAt DESC").all(params.id);
  return NextResponse.json({ data: media });
}

export async function POST(request, { params }) {
  const user = getCurrentUser();
  if (!requireRole(user, ["staff", "admin"])) {
    return NextResponse.json({ message: "Staff access only." }, { status: 403 });
  }

  const gallery = db.prepare("SELECT * FROM galleries WHERE id = ?").get(params.id);
  if (!gallery) return NextResponse.json({ message: "Album not found." }, { status: 404 });

  const { type, cloudinary_public_id, url, thumbnail_url } = await request.json();
  if (!url || !cloudinary_public_id) {
    return NextResponse.json({ message: "Missing upload data." }, { status: 422 });
  }

  const result = db
    .prepare(
      "INSERT INTO media (galleryId, type, cloudinaryId, url, thumbnailUrl) VALUES (?, ?, ?, ?, ?)"
    )
    .run(gallery.id, type || "image", cloudinary_public_id, url, thumbnail_url || url);

  if (!gallery.coverImage) {
    db.prepare("UPDATE galleries SET coverImage = ? WHERE id = ?").run(url, gallery.id);
  }

  const media = db.prepare("SELECT * FROM media WHERE id = ?").get(result.lastInsertRowid);
  return NextResponse.json(media, { status: 201 });
}