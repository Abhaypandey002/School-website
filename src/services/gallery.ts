import { randomUUID } from 'node:crypto';
import { readCollection, writeCollection } from '@/src/lib/json-store';

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  caption: string;
};

export type GalleryAlbum = {
  slug: string;
  title: string;
  eventDate: string;
  description: string;
  cover: string;
  tags: string[];
  images: GalleryImage[];
};

const GALLERY_PATH = './storage/content/gallery.json';

export async function getGalleryAlbums(): Promise<GalleryAlbum[]> {
  const albums = await readCollection<GalleryAlbum[]>(GALLERY_PATH);
  return albums.sort((a, b) => (a.eventDate > b.eventDate ? -1 : 1));
}

export async function getGalleryAlbum(slug: string): Promise<GalleryAlbum | undefined> {
  const albums = await getGalleryAlbums();
  return albums.find((album) => album.slug === slug);
}

export async function createGalleryAlbum(input: {
  slug: string;
  title: string;
  eventDate: string;
  description: string;
  cover: string;
  tags: string[];
}): Promise<GalleryAlbum> {
  const albums = await readCollection<GalleryAlbum[]>(GALLERY_PATH);
  if (albums.some((album) => album.slug === input.slug)) {
    throw new Error('Album slug already exists.');
  }

  const newAlbum: GalleryAlbum = {
    ...input,
    images: []
  };

  albums.push(newAlbum);
  await writeCollection(GALLERY_PATH, albums);
  return newAlbum;
}

export async function addImageToAlbum(slug: string, image: Omit<GalleryImage, 'id'>): Promise<GalleryAlbum> {
  const albums = await readCollection<GalleryAlbum[]>(GALLERY_PATH);
  const album = albums.find((item) => item.slug === slug);

  if (!album) {
    throw new Error('Album not found.');
  }

  const newImage: GalleryImage = { id: randomUUID(), ...image };
  album.images.push(newImage);
  await writeCollection(GALLERY_PATH, albums);
  return album;
}

export async function removeImageFromAlbum(slug: string, imageId: string): Promise<boolean> {
  const albums = await readCollection<GalleryAlbum[]>(GALLERY_PATH);
  const album = albums.find((item) => item.slug === slug);

  if (!album) {
    return false;
  }

  const nextImages = album.images.filter((image) => image.id !== imageId);
  if (nextImages.length === album.images.length) {
    return false;
  }

  album.images = nextImages;
  await writeCollection(GALLERY_PATH, albums);
  return true;
}
