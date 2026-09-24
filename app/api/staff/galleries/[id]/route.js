import { NextResponse } from "next/server";
import db from "../../../../../lib/db";
import { getCurrentUser, requireRole } from "../../../../../lib/auth";

export async function DELETE(request, { params }) {
  const user = getCurrentUser();
  if (!requireRole(user, ["staff", "admin"])) {
    return NextResponse.json({ message: "Staff access only." }, { status: 403 });
  }

  db.prepare("DELETE FROM galleries WHERE id = ?").run(params.id);
  return NextResponse.json({ message: "Deleted." });
}
