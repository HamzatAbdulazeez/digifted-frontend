import { NextResponse } from "next/server";
import db from "../../../../../lib/db";
import { getCurrentUser, requireRole } from "../../../../../lib/auth";

export async function DELETE(request, { params }) {
  const user = getCurrentUser();
  if (!requireRole(user, ["admin"])) {
    return NextResponse.json({ message: "Admin access only." }, { status: 403 });
  }

  if (Number(params.id) === user.id) {
    return NextResponse.json({ message: "You can't remove your own account." }, { status: 422 });
  }

  db.prepare("DELETE FROM users WHERE id = ? AND role IN ('staff','admin')").run(params.id);
  return NextResponse.json({ message: "Removed." });
}
