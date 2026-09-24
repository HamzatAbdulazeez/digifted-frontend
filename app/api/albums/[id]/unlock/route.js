import { NextResponse } from "next/server";
import db from "../../../../../lib/db";

export async function POST(request, { params }) {
  const { password } = await request.json();
  const gallery = db.prepare("SELECT * FROM galleries WHERE id = ?").get(params.id);

  if (!gallery || !gallery.password || gallery.password !== password) {
    return NextResponse.json({ message: "Incorrect password." }, { status: 422 });
  }

  const media = db.prepare("SELECT * FROM media WHERE galleryId = ?").all(gallery.id);
  return NextResponse.json({ id: gallery.id, title: gallery.title, media });
}
