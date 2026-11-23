-- Run once on existing databases; init.sql already has the column
ALTER TABLE minutes ADD COLUMN IF NOT EXISTS document_type text;

-- Blob path is <committee>/<type>/<filename>
UPDATE minutes
SET document_type = split_part(
  regexp_replace(blob_url, '^https?://[^/]+/', ''),
  '/',
  2
)
WHERE document_type IS NULL AND blob_url IS NOT NULL;

-- Old numbers counted all document types together
UPDATE minutes SET number = NULL;
