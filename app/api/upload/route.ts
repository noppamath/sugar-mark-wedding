import { NextRequest, NextResponse } from 'next/server';
import { Storage } from '@google-cloud/storage';
import fs from 'fs';
import path from 'path';

// Initialize GCS client
let storage: Storage;

try {
  // For local development with service account key file
  const keyPath = process.env.GCS_KEY_PATH || path.join(process.cwd(), 'gcs-key.json');
  
  if (fs.existsSync(keyPath)) {
    storage = new Storage({
      projectId: process.env.GCS_PROJECT_ID,
      keyFilename: keyPath,
    });
  } else {
    // For production with environment variables
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
const GUEST_PHOTOS_PREFIX = 'guest_photos/';
const MAX_FILE_SIZE = 10485760; // 10MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const photo = formData.get('photo') as File;
    const guestName = formData.get('guestName') as string;

    // Validation
    if (!photo) {
      return NextResponse.json({ message: 'No photo provided' }, { status: 400 });
    }

    if (photo.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { message: 'File size exceeds 10MB limit' },
        { status: 400 }
      );
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(photo.type)) {
      return NextResponse.json(
        { message: 'Invalid file type. Only JPEG, PNG, and WebP are allowed' },
        { status: 400 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(7);
    const ext = photo.type.split('/')[1];
    const filename = `${GUEST_PHOTOS_PREFIX}${timestamp}-${randomId}.${ext}`;

    // Upload to GCS
    if (!storage) {
      return NextResponse.json(
        { message: 'Storage service not configured' },
        { status: 500 }
      );
    }

    const bucket = storage.bucket(BUCKET_NAME);
    const file = bucket.file(filename);
    const buffer = await photo.arrayBuffer();

    await file.save(Buffer.from(buffer), {
      metadata: {
        metadata: {
          guestName: guestName || 'Anonymous',
          uploadedAt: new Date().toISOString(),
        },
      },
    });

    // Make file public
    await file.makePublic();

    // Update gallery metadata
    const metadataFile = path.join(process.cwd(), 'public/data/gallery-metadata.json');
    let metadata: any = { lastUpdated: new Date().toISOString(), photos: [] };

    if (fs.existsSync(metadataFile)) {
      const content = fs.readFileSync(metadataFile, 'utf-8');
      metadata = JSON.parse(content);
    }

    if (!metadata.photos) {
      metadata.photos = [];
    }

    metadata.photos.push({
      id: filename,
      url: `https://storage.googleapis.com/${BUCKET_NAME}/${filename}`,
      guestName: guestName || 'Anonymous',
      uploadedAt: new Date().toISOString(),
    });

    metadata.lastUpdated = new Date().toISOString();
    fs.writeFileSync(metadataFile, JSON.stringify(metadata, null, 2));

    return NextResponse.json(
      {
        success: true,
        message: 'Photo uploaded successfully',
        filename,
        url: `https://storage.googleapis.com/${BUCKET_NAME}/${filename}`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { message: 'Upload failed', error: String(error) },
      { status: 500 }
    );
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
