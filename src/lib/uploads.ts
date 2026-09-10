import "server-only";
import { randomUUID } from "node:crypto";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

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

let client: S3Client | undefined;

function getClient(): S3Client {
  if (client) return client;

  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error(
      "R2_ACCOUNT_ID, R2_ACCESS_KEY_ID und R2_SECRET_ACCESS_KEY müssen gesetzt sein.",
    );
  }

  client = new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  });
  return client;
}

function getBucket(): string {
  const bucket = process.env.R2_BUCKET_NAME;
  if (!bucket) {
    throw new Error("R2_BUCKET_NAME muss gesetzt sein.");
  }
  return bucket;
}

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

  const storageKey = `${randomUUID()}-${sanitizeFilename(file.name)}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  await getClient().send(
    new PutObjectCommand({
      Bucket: getBucket(),
      Key: storageKey,
      Body: buffer,
      ContentType: file.type,
    }),
  );

  return {
    filename: file.name,
    storageKey,
    mimeType: file.type,
    size: file.size,
  };
}

/** Streams an object's body for the attachments route handler. Throws if missing. */
export async function getUploadedFile(storageKey: string) {
  const result = await getClient().send(
    new GetObjectCommand({ Bucket: getBucket(), Key: storageKey }),
  );

  if (!result.Body) {
    throw new Error("Datei nicht gefunden.");
  }

  // Body is a web ReadableStream in the Next.js/Edge-compatible runtime.
  return result.Body.transformToWebStream();
}

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9_.-]/g, "_").slice(-100);
}
