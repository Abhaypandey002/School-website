import { NextResponse } from 'next/server';
import { createGalleryAlbum } from '@/src/services/gallery';

export async function POST(request: Request) {
  const payload = await request.json();
  const { slug, title, eventDate, description, cover, tags } = payload ?? {};

  if (!slug || !title || !eventDate || !description || !cover) {
    return NextResponse.json({ error: 'All album fields are required.' }, { status: 422 });
  }

  try {
    const album = await createGalleryAlbum({
      slug,
      title,
      eventDate,
      description,
      cover,
      tags: Array.isArray(tags) ? tags : []
    });

    return NextResponse.json({ album }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to create album.' }, { status: 400 });
  }
}
