import { NextResponse } from "next/server";
import db from "../../../lib/db";
import { getCurrentUser } from "../../../lib/auth";

export async function GET() {
  const user = getCurrentUser();

  const galleries = db
    .prepare(
      `SELECT g.*, (SELECT COUNT(*) FROM media m WHERE m.galleryId = g.id) as media_count
       FROM galleries g WHERE isForSale = 1 ORDER BY createdAt DESC`
    )
    .all();

  const paidGalleryIds = user
    ? new Set(
        db
          .prepare("SELECT galleryId FROM orders WHERE customerId = ? AND status = 'paid'")
          .all(user.id)
          .map((o) => o.galleryId)
      )
    : new Set();

  const data = galleries.map((g) => ({
    id: g.id,
    title: g.title,
    department: g.department,
    coverImage: g.coverImage,
    price: g.price,
    media_count: g.media_count,
    unlocked: paidGalleryIds.has(g.id),
  }));

  return NextResponse.json({ data });
}
