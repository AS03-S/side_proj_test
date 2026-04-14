import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { supabase } from "@/lib/db";
import type { DocumentRow } from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("documents")
      .select("id, user_id, drive_file_id, file_name, file_type, uploaded_at")
      .eq("user_id", session.user.id)
      .order("uploaded_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ documents: (data ?? []) as DocumentRow[] });
  } catch (err) {
    console.error("[documents/GET]", err);
    return NextResponse.json(
      { error: "Failed to load documents" },
      { status: 500 }
    );
  }
}
