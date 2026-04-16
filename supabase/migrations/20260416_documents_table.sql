-- Documents table: tracks files uploaded to Google Drive per user.
-- Each row is a reference to a Drive file; the actual file lives in Drive.

CREATE TABLE IF NOT EXISTS documents (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       text        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  drive_file_id text        NOT NULL,
  file_name     text        NOT NULL,
  file_type     text        NOT NULL DEFAULT 'application/octet-stream',
  uploaded_at   timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS documents_user_id_idx ON documents(user_id);
