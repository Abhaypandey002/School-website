import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { getGalleryAlbum, getGalleryAlbums } from '@/src/services/gallery';

export const revalidate = 0;

interface AlbumPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const albums = await getGalleryAlbums();
  return albums.map((album) => ({ slug: album.slug }));
}

export async function generateMetadata({ params }: AlbumPageProps): Promise<Metadata> {
  const album = await getGalleryAlbum(params.slug);
  if (!album) {
    return { title: 'Album not found | Akshar Kids School' };
  }

  return {
    title: `${album.title} | Akshar Kids School`
  };
}

export const dynamicParams = true;

export default async function AlbumPage({ params }: AlbumPageProps) {
  const album = await getGalleryAlbum(params.slug);

  if (!album) {
    notFound();
  }

  return (
    <div className="bg-white py-16">
      <div className="container-edge space-y-8">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-wide text-brand-500">
            {format(new Date(album.eventDate), 'dd MMM yyyy')}
          </p>
          <h1 className="section-title">{album.title}</h1>
          <p className="max-w-3xl text-slate-600">{album.description}</p>
          <div className="flex flex-wrap gap-2">
            {album.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="grid gap-6 sm:grid-cols-2">
          {album.images.map((image) => (
            <figure key={image.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <img src={image.src} alt={image.alt} className="h-64 w-full object-cover" />
              <figcaption className="p-4 text-sm text-slate-600">{image.caption}</figcaption>
            </figure>
          ))}
          {album.images.length === 0 && (
            <p className="sm:col-span-2 rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
              Photos will be added to this album soon.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
