import { NextResponse } from "next/server";
import db from "../../../../lib/db";
import { getCurrentUser, requireRole } from "../../../../lib/auth";

export async function GET() {
  const user = getCurrentUser();
  if (!requireRole(user, ["admin"])) {
    return NextResponse.json({ message: "Admin access only." }, { status: 403 });
  }

  const orders = db
    .prepare(
      `SELECT o.*, g.title as galleryTitle, u.name as customerName, u.email as customerEmail
       FROM orders o
       JOIN galleries g ON g.id = o.galleryId
       JOIN users u ON u.id = o.customerId
       ORDER BY o.createdAt DESC`
    )
    .all();

  const totals = db
    .prepare("SELECT COUNT(*) as count, COALESCE(SUM(total),0) as revenue FROM orders WHERE status = 'paid'")
    .get();

  return NextResponse.json({ data: orders, totals });
}
