import { NextResponse } from "next/server";
import db from "../../../../lib/db";
import { getCurrentUser } from "../../../../lib/auth";

export async function POST(request) {
  const user = getCurrentUser();
  if (!user) return NextResponse.json({ message: "Unauthenticated." }, { status: 401 });

  const { reference } = await request.json();
  const order = db.prepare("SELECT * FROM orders WHERE paymentReference = ?").get(reference);

  if (!order || order.customerId !== user.id) {
    return NextResponse.json({ message: "Order not found." }, { status: 404 });
  }

  if (order.status !== "paid") {
    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json({ message: "Payments aren't configured yet." }, { status: 422 });
    }

    // Always re-verify with Paystack directly — never trust the
    // frontend redirect alone.
    const res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${secretKey}` },
    });
    const data = await res.json();

    if (!data.status || data.data.status !== "success") {
      db.prepare("UPDATE orders SET status = 'failed' WHERE id = ?").run(order.id);
      return NextResponse.json({ message: "Payment was not successful." }, { status: 402 });
    }

    db.prepare("UPDATE orders SET status = 'paid' WHERE id = ?").run(order.id);
  }

  const gallery = db.prepare("SELECT * FROM galleries WHERE id = ?").get(order.galleryId);

  return NextResponse.json({
    gallery: { id: gallery.id, title: gallery.title, password: gallery.password },
  });
}
