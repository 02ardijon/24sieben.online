import "server-only";
import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const UPLOAD_DIR = path.join(process.cwd(), "uploads");
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ALLOWED_MIME_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
  "application/pdf",
  "text/plain",
  "application/zip",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

export type SavedUpload = {
  filename: string;
  storageKey: string;
  mimeType: string;
  size: number;
};

export async function saveUploadedFile(file: File): Promise<SavedUpload | null> {
  if (file.size === 0) return null;
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("Datei ist zu groß (max. 10 MB).");
  }
  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    throw new Error("Dateityp wird nicht unterstützt.");
  }

  await mkdir(UPLOAD_DIR, { recursive: true });

  const storageKey = `${randomUUID()}-${sanitizeFilename(file.name)}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOAD_DIR, storageKey), buffer);

  return {
    filename: file.name,
    storageKey,
    mimeType: file.type,
    size: file.size,
  };
}

export function resolveUploadPath(storageKey: string): string {
  return path.join(UPLOAD_DIR, storageKey);
}

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9_.-]/g, "_").slice(-100);
}
