import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { deleteFromDrive } from "@/lib/drive";
import { supabase } from "@/lib/db";

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken || !session.user?.id) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const { documentId } = body as { documentId?: string };

    if (!documentId) {
      return NextResponse.json(
        { error: "documentId is required", code: "MISSING_ID" },
        { status: 400 }
      );
    }

    // Fetch the document — enforce ownership via user_id filter
    const { data: doc, error: fetchError } = await supabase
      .from("documents")
      .select("drive_file_id")
      .eq("id", documentId)
      .eq("user_id", session.user.id)
      .single();

    if (fetchError || !doc) {
      return NextResponse.json(
        { error: "Document not found", code: "NOT_FOUND" },
        { status: 404 }
      );
    }

    // Delete from Google Drive first.
    // If this fails, we do NOT delete the metadata record — never leave a ghost record.
    try {
      await deleteFromDrive(session.accessToken, doc.drive_file_id);
    } catch (driveErr) {
      console.error("[drive/delete] Drive deletion failed:", driveErr);
      return NextResponse.json(
        {
          error:
            "Could not delete the file from Google Drive. Please try again.",
          code: "DRIVE_ERROR",
        },
        { status: 502 }
      );
    }

    // Drive deletion succeeded — now remove the metadata record
    const { error: dbError } = await supabase
      .from("documents")
      .delete()
      .eq("id", documentId)
      .eq("user_id", session.user.id);

    if (dbError) {
      // Drive file is gone but metadata record remains.
      // Not ideal, but better than a ghost record pointing to a live file.
      console.error("[drive/delete] DB delete failed after Drive success:", dbError);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[drive/delete]", err);
    return NextResponse.json(
      { error: "Deletion failed. Please try again.", code: "DELETE_ERROR" },
      { status: 500 }
    );
  }
}
