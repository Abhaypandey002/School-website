import { NextResponse } from 'next/server';
import { getGalleryAlbums } from '@/src/services/gallery';

export async function GET() {
  const albums = await getGalleryAlbums();
  return NextResponse.json({ albums });
}
