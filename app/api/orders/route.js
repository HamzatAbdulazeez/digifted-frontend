import { NextResponse } from "next/server";
import crypto from "crypto";
import db from "../../../lib/db";
import { getCurrentUser } from "../../../lib/auth";

export async function POST(request) {
  const user = getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "You need to be logged in to buy media." }, { status: 401 });
  }

  const { gallery_id } = await request.json();
  const gallery = db.prepare("SELECT * FROM galleries WHERE id = ? AND isForSale = 1").get(gallery_id);
  if (!gallery) {
    return NextResponse.json({ message: "Album not found." }, { status: 404 });
  }

  // Already paid? Send them straight to the reveal step instead of
  // charging twice.
  const existingPaid = db
    .prepare("SELECT * FROM orders WHERE customerId = ? AND galleryId = ? AND status = 'paid'")
    .get(user.id, gallery.id);
  if (existingPaid) {
    return NextResponse.json({ message: "Already purchased." }, { status: 409 });
  }

  const reference = "DGF-" + crypto.randomBytes(10).toString("hex");
  const result = db
    .prepare(
      "INSERT INTO orders (customerId, galleryId, status, total, paymentReference) VALUES (?, ?, 'pending', ?, ?)"
    )
    .run(user.id, gallery.id, gallery.price, reference);

  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  // No Paystack key configured yet (fresh install) — tell the caller
  // plainly instead of pretending checkout works.
  if (!secretKey) {
    return NextResponse.json(
      {
        message:
          "Payments aren't configured yet — set PAYSTACK_SECRET_KEY in .env to enable real checkout. Your order was created as order #" +
          result.lastInsertRowid +
          ".",
      },
      { status: 422 }
    );
  }

  const paystackRes = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: user.email,
      amount: gallery.price,
      reference,
      callback_url: `${process.env.FRONTEND_URL || "http://localhost:3000"}/buy-media/${gallery.id}`,
    }),
  });

  const paystackData = await paystackRes.json();
  if (!paystackData.status) {
    return NextResponse.json({ message: paystackData.message || "Could not start checkout." }, { status: 502 });
  }

  return NextResponse.json({
    order_id: result.lastInsertRowid,
    authorization_url: paystackData.data.authorization_url,
    reference,
  });
}

export async function GET() {
  const user = getCurrentUser();
  if (!user) return NextResponse.json({ message: "Unauthenticated." }, { status: 401 });

  const orders = db
    .prepare(
      `SELECT o.*, g.title as galleryTitle FROM orders o
       JOIN galleries g ON g.id = o.galleryId
       WHERE o.customerId = ? ORDER BY o.createdAt DESC`
    )
    .all(user.id);

  return NextResponse.json({ data: orders });
}
