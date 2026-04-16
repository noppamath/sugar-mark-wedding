import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Disable static generation for this dynamic API route
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const metadataFile = path.join(process.cwd(), 'public/data/gallery-metadata.json');

    if (!fs.existsSync(metadataFile)) {
      return NextResponse.json({ photos: [] });
    }

    const content = fs.readFileSync(metadataFile, 'utf-8');
    const metadata = JSON.parse(content);

    return NextResponse.json(metadata);
  } catch (error) {
    console.error('Error fetching photos:', error);
    return NextResponse.json(
      { message: 'Failed to fetch photos', photos: [] },
      { status: 500 }
    );
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
