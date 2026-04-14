import { createClient } from "@supabase/supabase-js";

if (!process.env.SUPABASE_URL) throw new Error("SUPABASE_URL is not set");
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");

/** Server-side Supabase client using the service role key.
 *  Never expose this to the browser. */
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

// ── Row types ──────────────────────────────────────────────────────────────

export interface UserRow {
  id: string;
  email: string;
  display_name: string | null;
  drive_folder_id: string | null;
  created_at: string;
}

export interface DocumentRow {
  id: string;
  user_id: string;
  drive_file_id: string;
  file_name: string;
  file_type: string;
  uploaded_at: string;
}
