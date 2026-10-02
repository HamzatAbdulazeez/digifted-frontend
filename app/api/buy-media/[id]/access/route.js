import { NextResponse } from "next/server";
import db from "../../../../../lib/db";
import { getCurrentUser } from "../../../../../lib/auth";

export async function GET(request, { params }) {
  const user = getCurrentUser();
  if (!user) return NextResponse.json({ message: "Unauthenticated." }, { status: 401 });

  const order = db
    .prepare("SELECT * FROM orders WHERE customerId = ? AND galleryId = ? AND status = 'paid'")
    .get(user.id, params.id);

  if (!order) {
    return NextResponse.json({ message: "No paid order found for this album." }, { status: 403 });
  }

  const gallery = db.prepare("SELECT * FROM galleries WHERE id = ?").get(params.id);
  if (!gallery) return NextResponse.json({ message: "Album not found." }, { status: 404 });

  const media = db.prepare("SELECT * FROM media WHERE galleryId = ?").all(gallery.id);

  return NextResponse.json({
    gallery: { id: gallery.id, title: gallery.title, password: gallery.password },
    media,
  });
}