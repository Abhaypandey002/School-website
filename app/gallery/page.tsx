import type { Metadata } from 'next';
import Link from 'next/link';
import { format } from 'date-fns';
import { galleryAlbums } from '@/src/data/gallery';

export const metadata: Metadata = {
  title: 'Gallery | Akshar Kids School'
};

export default function GalleryPage() {
  return (
    <div className="bg-white py-16">
      <div className="container-edge">
        <h1 className="section-title">Events Gallery</h1>
        <p className="section-subtitle">
          Relive the energy of Annual Day, Sports Day, Science Fair, and more through curated albums and highlights.
        </p>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {galleryAlbums.map((album) => (
            <article key={album.slug} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <img src={album.cover} alt={album.title} className="h-48 w-full object-cover" />
              <div className="p-6 space-y-3">
                <p className="text-sm uppercase tracking-wide text-brand-500">
                  {format(new Date(album.eventDate), 'dd MMM yyyy')}
                </p>
                <h2 className="text-xl font-semibold text-slate-900">{album.title}</h2>
                <p className="text-sm text-slate-600">{album.description}</p>
                <div className="flex flex-wrap gap-2">
                  {album.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href={`/gallery/${album.slug}`} className="inline-flex text-sm font-semibold text-brand-600">
                  View album →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
