import { NextResponse } from "next/server";
import db from "../../../../lib/db";

export async function POST(request) {
  const { password } = await request.json();
  if (!password) return NextResponse.json({ message: "Password is required." }, { status: 422 });

  const gallery = db
    .prepare("SELECT * FROM galleries WHERE isForSale = 1 AND password = ?")
    .get(password);

  if (!gallery) {
    return NextResponse.json({ message: "No album found for that password." }, { status: 422 });
  }

  const media = db.prepare("SELECT * FROM media WHERE galleryId = ?").all(gallery.id);
  return NextResponse.json({ id: gallery.id, title: gallery.title, media });
}
