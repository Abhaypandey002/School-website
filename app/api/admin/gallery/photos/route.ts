import { NextResponse } from 'next/server';
import { addImageToAlbum, getGalleryAlbum, removeImageFromAlbum } from '@/src/services/gallery';

export async function POST(request: Request) {
  const payload = await request.json();
  const { slug, src, alt, caption } = payload ?? {};

  if (!slug || !src || !alt || !caption) {
    return NextResponse.json({ error: 'Album, image URL, alt text, and caption are required.' }, { status: 422 });
  }

  try {
    const album = await addImageToAlbum(slug, { src, alt, caption });
    return NextResponse.json({ album }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to add photo.' }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const payload = await request.json();
  const { slug, imageId } = payload ?? {};

  if (!slug || !imageId) {
    return NextResponse.json({ error: 'Album slug and image id are required.' }, { status: 422 });
  }

  const album = await getGalleryAlbum(slug);
  if (!album) {
    return NextResponse.json({ error: 'Album not found.' }, { status: 404 });
  }

  const removed = await removeImageFromAlbum(slug, imageId);
  if (!removed) {
    return NextResponse.json({ error: 'Image not found.' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
