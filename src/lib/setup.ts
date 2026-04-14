import { supabase } from "./db";
import { createDriveFolder } from "./drive";
import type { Session } from "next-auth";

/**
 * Ensures the signed-in user has a "migraDOCS" folder in their Google Drive.
 * Idempotent — fast no-op if the folder already exists.
 * Called from the (app) layout on every authenticated page load.
 */
export async function ensureUserSetup(session: Session): Promise<void> {
  const userId = session.user?.id;
  const accessToken = session.accessToken;

  if (!userId || !accessToken) return;

  // Fast path: check if folder already created
  const { data: user, error } = await supabase
    .from("users")
    .select("drive_folder_id")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("[setup] Could not read user record:", error.message);
    return;
  }

  // Folder already exists — nothing to do
  if (user?.drive_folder_id) return;

  // Create the migraDOCS folder in the user's Drive
  try {
    const folderId = await createDriveFolder(accessToken, "migraDOCS");
    const { error: updateError } = await supabase
      .from("users")
      .update({ drive_folder_id: folderId })
      .eq("id", userId);

    if (updateError) {
      console.error("[setup] Could not save folder ID:", updateError.message);
    }
  } catch (err) {
    // Non-fatal — user will retry on next page load
    console.error("[setup] Failed to create Drive folder:", err);
  }
}
