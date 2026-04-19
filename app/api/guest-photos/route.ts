import { NextResponse } from 'next/server';
import { Storage } from '@google-cloud/storage';
import fs from 'fs';
import path from 'path';

let storage: Storage;

try {
  const keyPath = process.env.GCS_KEY_PATH || path.join(process.cwd(), 'gcs-key.json');

  if (fs.existsSync(keyPath)) {
    storage = new Storage({
      projectId: process.env.GCS_PROJECT_ID,
      keyFilename: keyPath,
    });
  } else {
    storage = new Storage({
      projectId: process.env.GCS_PROJECT_ID,
      credentials: {
        type: 'service_account',
        project_id: process.env.GCS_PROJECT_ID,
        private_key_id: process.env.GCS_PRIVATE_KEY_ID,
        private_key: process.env.GCS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        client_email: process.env.GCS_CLIENT_EMAIL,
        client_id: process.env.GCS_CLIENT_ID,
        auth_uri: process.env.GCS_AUTH_URI,
        token_uri: process.env.GCS_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.GCS_AUTH_PROVIDER_CERT_URL,
      } as any,
    });
  }
} catch (error) {
  console.error('Failed to initialize GCS:', error);
}

const BUCKET_NAME = process.env.GCS_BUCKET_NAME || 'sugar-mark-wedding';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    if (!storage) {
      return NextResponse.json(
        { message: 'Storage service not configured' },
        { status: 500 }
      );
    }

    const bucket = storage.bucket(BUCKET_NAME);
    const [files] = await bucket.getFiles({ prefix: 'guest_photos/' });

    const imageFiles = files.filter((file) =>
      /\.(jpg|jpeg|png|webp|gif)$/i.test(file.name)
    );

    // Guest photos use signed URLs (bucket is not public)
    const photos = (
      await Promise.all(
        imageFiles.map(async (file) => {
          try {
            const [signedUrl] = await file.getSignedUrl({
              version: 'v4',
              action: 'read',
              expires: Date.now() + 3600000, // 1 hour
            });
            return {
              id: file.name,
              url: signedUrl,
              guestName: (file.metadata?.metadata as any)?.guestName || 'Anonymous',
              uploadedAt: file.metadata?.timeCreated || new Date().toISOString(),
            };
          } catch (err) {
            console.error(`Failed to get signed URL for ${file.name}:`, err);
            return null;
          }
        })
      )
    ).filter((p) => p !== null);

    // Newest first
    photos.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());

    return NextResponse.json({ photos });
  } catch (error) {
    console.error('Guest photos error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch guest photos', error: String(error), photos: [] },
      { status: 500 }
    );
  }
}
