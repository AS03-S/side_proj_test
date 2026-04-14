import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { uploadFileToDrive } from "@/lib/drive";
import { supabase } from "@/lib/db";

const MAX_BYTES = 25 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken || !session.user?.id) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Fetch the user's Drive folder ID
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("drive_folder_id")
      .eq("id", session.user.id)
      .single();

    if (userError || !user?.drive_folder_id) {
      return NextResponse.json(
        {
          error:
            "Your Google Drive folder is not set up yet. Please sign out and sign in again.",
          code: "NO_DRIVE_FOLDER",
        },
        { status: 400 }
      );
    }

    // Parse the uploaded file
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { error: "No file provided", code: "MISSING_FILE" },
        { status: 400 }
      );
    }

    const mimeType = file.type || "application/octet-stream";
    if (!ALLOWED_TYPES.has(mimeType)) {
      return NextResponse.json(
        {
          error: "Unsupported file type. Upload a PDF, JPG, PNG, or WebP.",
          code: "UNSUPPORTED_TYPE",
        },
        { status: 415 }
      );
    }

    const fileName = (file as File).name ?? `document-${Date.now()}`;
    const buffer = await file.arrayBuffer();

    if (buffer.byteLength > MAX_BYTES) {
      return NextResponse.json(
        { error: "File exceeds the 25 MB limit.", code: "FILE_TOO_LARGE" },
        { status: 413 }
      );
    }

    // Upload to the user's own Google Drive using their access token
    const driveFileId = await uploadFileToDrive(
      session.accessToken,
      user.drive_folder_id,
      buffer,
      fileName,
      mimeType
    );

    // Store only metadata in our database — no file content ever touches our servers
    const { data: doc, error: dbError } = await supabase
      .from("documents")
      .insert({
        user_id: session.user.id,
        drive_file_id: driveFileId,
        file_name: fileName,
        file_type: mimeType,
      })
      .select()
      .single();

    if (dbError) {
      // The file is already in Drive — just metadata failed.
      // Log for investigation but don't leave Drive in a dirty state.
      console.error("[drive/upload] DB insert failed:", dbError);
      return NextResponse.json(
        {
          error:
            "File uploaded to Google Drive, but we failed to save the record. Please refresh and try again.",
          code: "DB_ERROR",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ document: doc });
  } catch (err) {
    console.error("[drive/upload]", err);
    return NextResponse.json(
      { error: "Upload failed. Please try again.", code: "UPLOAD_ERROR" },
      { status: 500 }
    );
  }
}
