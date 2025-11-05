'use client';

import { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import type { Metadata } from 'next';
import { useRouter } from 'next/navigation';

import type { NoticeRecord } from '@/src/services/notices';
import type { GalleryAlbum } from '@/src/services/gallery';
import type { TestimonialRecord } from '@/src/services/testimonials';

import type { NoticeRecord } from '@/src/services/notices';
import type { GalleryAlbum } from '@/src/services/gallery';
import type { TestimonialRecord } from '@/src/services/testimonials';

export const metadata: Metadata = {
  title: 'Admin | Akshar Kids School'
};

type ApiError = { error: string };

type NoticeResponse = { notices: NoticeRecord[] };
type GalleryResponse = { albums: GalleryAlbum[] };
type TestimonialResponse = { testimonials: TestimonialRecord[] };

type NoticeFormState = {
  title: string;
  body: string;
};

type AlbumFormState = {
  slug: string;
  title: string;
  eventDate: string;
  description: string;
  cover: string;
  tags: string;
};

type PhotoFormState = {
  slug: string;
  src: string;
  alt: string;
  caption: string;
};

type TestimonialFormState = {
  name: string;
  role: string;
  message: string;
};

function sortNotices(items: NoticeRecord[]) {
  return [...items].sort((a, b) => (a.date > b.date ? -1 : 1));
}

function sortAlbums(items: GalleryAlbum[]) {
  return [...items].sort((a, b) => (a.eventDate > b.eventDate ? -1 : 1));
}

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [notices, setNotices] = useState<NoticeRecord[]>([]);
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialRecord[]>([]);

  const [noticeForm, setNoticeForm] = useState<NoticeFormState>({ title: '', body: '' });
  const [albumForm, setAlbumForm] = useState<AlbumFormState>({
    slug: '',
    title: '',
    eventDate: '',
    description: '',
    cover: '',
    tags: ''
  });
  const [photoForm, setPhotoForm] = useState<PhotoFormState>({ slug: '', src: '', alt: '', caption: '' });
  const [testimonialForm, setTestimonialForm] = useState<TestimonialFormState>({ name: '', role: '', message: '' });

  const [submitting, setSubmitting] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const [noticeResponse, galleryResponse, testimonialResponse] = await Promise.all([
          fetch('/api/admin/notices').then((res) => res.json() as Promise<NoticeResponse>),
          fetch('/api/admin/gallery').then((res) => res.json() as Promise<GalleryResponse>),
          fetch('/api/admin/testimonials').then((res) => res.json() as Promise<TestimonialResponse>)
        ]);

        setNotices(sortNotices(noticeResponse.notices));
        setAlbums(sortAlbums(galleryResponse.albums));
        setTestimonials(testimonialResponse.testimonials);
        setError(null);
      } catch (error) {
        console.error(error);
        setError('Unable to load admin data. Please refresh.');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const albumOptions = useMemo(() => albums.map((album) => ({ value: album.slug, label: album.title })), [albums]);

  async function submitNotice(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting('notice');

    try {
      const response = await fetch('/api/admin/notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noticeForm)
      });

      if (!response.ok) {
        const payload = (await response.json()) as ApiError;
        throw new Error(payload.error ?? 'Failed to create notice');
      }

      const payload = (await response.json()) as { notice: NoticeRecord };
      setNotices((state) => sortNotices([payload.notice, ...state]));
      setNoticeForm({ title: '', body: '' });
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : 'Failed to create notice');
    } finally {
      setSubmitting((state) => (state === 'notice' ? null : state));
    }
  }

  async function deleteNotice(id: string) {
    if (!confirm('Delete this notice?')) return;
    setSubmitting('notice-delete');

    try {
      const response = await fetch('/api/admin/notices', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      if (!response.ok) {
        const payload = (await response.json()) as ApiError;
        throw new Error(payload.error ?? 'Unable to delete notice');
      }

      setNotices((state) => state.filter((notice) => notice.id !== id));
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : 'Unable to delete notice');
    } finally {
      setSubmitting((state) => (state === 'notice-delete' ? null : state));
    }
  }

  async function submitAlbum(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting('album');

    const payload = {
      ...albumForm,
      tags: albumForm.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean)
    };

    try {
      const response = await fetch('/api/admin/gallery/albums', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const data = (await response.json()) as ApiError;
        throw new Error(data.error ?? 'Failed to create album');
      }

      const data = (await response.json()) as { album: GalleryAlbum };
      setAlbums((state) => sortAlbums([data.album, ...state]));
      setAlbumForm({ slug: '', title: '', eventDate: '', description: '', cover: '', tags: '' });
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : 'Failed to create album');
    } finally {
      setSubmitting((state) => (state === 'album' ? null : state));
    }
  }

  async function submitPhoto(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting('photo');

    try {
      const response = await fetch('/api/admin/gallery/photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(photoForm)
      });

      if (!response.ok) {
        const data = (await response.json()) as ApiError;
        throw new Error(data.error ?? 'Failed to add photo');
      }

      const data = (await response.json()) as { album: GalleryAlbum };
      setAlbums((state) => sortAlbums(state.map((album) => (album.slug === data.album.slug ? data.album : album))));
      setPhotoForm({ slug: '', src: '', alt: '', caption: '' });
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : 'Failed to add photo');
    } finally {
      setSubmitting((state) => (state === 'photo' ? null : state));
    }
  }

  async function removePhoto(slug: string, imageId: string) {
    if (!confirm('Remove this photo from the album?')) return;
    setSubmitting('photo-delete');

    try {
      const response = await fetch('/api/admin/gallery/photos', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, imageId })
      });

      if (!response.ok) {
        const data = (await response.json()) as ApiError;
        throw new Error(data.error ?? 'Unable to remove photo');
      }

      setAlbums((state) =>
        state.map((album) =>
          album.slug === slug
            ? { ...album, images: album.images.filter((image) => image.id !== imageId) }
            : album
        )
      );
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : 'Unable to remove photo');
    } finally {
      setSubmitting((state) => (state === 'photo-delete' ? null : state));
    }
  }

  async function submitTestimonial(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting('testimonial');

    try {
      const response = await fetch('/api/admin/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testimonialForm)
      });

      if (!response.ok) {
        const data = (await response.json()) as ApiError;
        throw new Error(data.error ?? 'Failed to save testimonial');
      }

      const data = (await response.json()) as { testimonial: TestimonialRecord };
      setTestimonials((state) => [data.testimonial, ...state]);
      setTestimonialForm({ name: '', role: '', message: '' });
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : 'Failed to save testimonial');
    } finally {
      setSubmitting((state) => (state === 'testimonial' ? null : state));
    }
  }

  async function deleteTestimonial(id: string) {
    if (!confirm('Delete this testimonial?')) return;
    setSubmitting('testimonial-delete');

    try {
      const response = await fetch('/api/admin/testimonials', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      if (!response.ok) {
        const data = (await response.json()) as ApiError;
        throw new Error(data.error ?? 'Unable to delete testimonial');
      }

      setTestimonials((state) => state.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : 'Unable to delete testimonial');
    } finally {
      setSubmitting((state) => (state === 'testimonial-delete' ? null : state));
    }
  }

  return (
    <div className="bg-white py-16">
      <div className="container-edge space-y-12">
        <header className="space-y-3">
          <h1 className="section-title">Admin Control Centre</h1>
          <p className="section-subtitle">
            Manage the public-facing blackboard notices, gallery albums, testimonials, and download inquiry reports.
          </p>
        </header>

        {loading ? (
          <p className="rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            Loading dashboard data…
          </p>
        ) : error ? (
          <p className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>
        ) : null}

        <section className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <header>
              <h2 className="text-lg font-semibold text-brand-700">Blackboard Notices</h2>
              <p className="text-sm text-slate-600">Add new updates that appear instantly on the website blackboard.</p>
            </header>
            <form onSubmit={submitNotice} className="space-y-4">
              <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
                Title
                <input
                  type="text"
                  value={noticeForm.title}
                  onChange={(event) => setNoticeForm((state) => ({ ...state, title: event.target.value }))}
                  required
                  className="rounded-md border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
                Message
                <textarea
                  value={noticeForm.body}
                  onChange={(event) => setNoticeForm((state) => ({ ...state, body: event.target.value }))}
                  required
                  rows={4}
                  className="rounded-md border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                />
              </label>
              <button
                type="submit"
                disabled={submitting === 'notice'}
                className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-500 disabled:cursor-not-allowed disabled:bg-brand-300"
              >
                {submitting === 'notice' ? 'Saving…' : 'Add notice'}
              </button>
            </form>
            <ul className="space-y-3 text-sm">
              {notices.map((notice) => (
                <li key={notice.id} className="rounded-lg border border-slate-200 bg-white p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-brand-700">{notice.title}</p>
                      <p className="text-xs text-slate-500">Published {notice.date}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => deleteNotice(notice.id)}
                      disabled={submitting === 'notice-delete'}
                      className="text-xs font-semibold text-red-600 hover:text-red-500 disabled:cursor-not-allowed disabled:text-red-300"
                    >
                      Delete
                    </button>
                  </div>
                  <p className="mt-2 text-slate-600">{notice.body}</p>
                </li>
              ))}
              {notices.length === 0 && (
                <li className="rounded-lg border border-dashed border-slate-200 p-3 text-center text-xs text-slate-500">
                  No notices yet.
                </li>
              )}
            </ul>
          </div>

          <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <header>
              <h2 className="text-lg font-semibold text-brand-700">Create Gallery Album</h2>
              <p className="text-sm text-slate-600">Set up a new album with cover details before adding photos.</p>
            </header>
            <form onSubmit={submitAlbum} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
                  Album Title
                  <input
                    type="text"
                    value={albumForm.title}
                    onChange={(event) => setAlbumForm((state) => ({ ...state, title: event.target.value }))}
                    required
                    className="rounded-md border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
                  Album Slug
                  <input
                    type="text"
                    value={albumForm.slug}
                    onChange={(event) => setAlbumForm((state) => ({ ...state, slug: event.target.value }))}
                    pattern="[a-z0-9\-]+"
                    title="Use lowercase letters, numbers, and hyphens only"
                    required
                    className="rounded-md border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
                  Event Date
                  <input
                    type="date"
                    value={albumForm.eventDate}
                    onChange={(event) => setAlbumForm((state) => ({ ...state, eventDate: event.target.value }))}
                    required
                    className="rounded-md border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
                  Cover Image URL
                  <input
                    type="url"
                    value={albumForm.cover}
                    onChange={(event) => setAlbumForm((state) => ({ ...state, cover: event.target.value }))}
                    required
                    className="rounded-md border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                  />
                </label>
              </div>
              <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
                Description
                <textarea
                  value={albumForm.description}
                  onChange={(event) => setAlbumForm((state) => ({ ...state, description: event.target.value }))}
                  required
                  rows={3}
                  className="rounded-md border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
                Tags (comma separated)
                <input
                  type="text"
                  value={albumForm.tags}
                  onChange={(event) => setAlbumForm((state) => ({ ...state, tags: event.target.value }))}
                  placeholder="Annual Day, Sports, STEM"
                  className="rounded-md border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                />
              </label>
              <button
                type="submit"
                disabled={submitting === 'album'}
                className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-500 disabled:cursor-not-allowed disabled:bg-brand-300"
              >
                {submitting === 'album' ? 'Saving…' : 'Create album'}
              </button>
            </form>
          </div>
        </section>

        <section className="space-y-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <header>
            <h2 className="text-lg font-semibold text-brand-700">Add photos to albums</h2>
            <p className="text-sm text-slate-600">Select an album and paste hosted image URLs to expand the gallery.</p>
          </header>
          <form onSubmit={submitPhoto} className="grid gap-4 md:grid-cols-[2fr_2fr_1fr]">
            <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
              Album
              <select
                value={photoForm.slug}
                onChange={(event) => setPhotoForm((state) => ({ ...state, slug: event.target.value }))}
                required
                className="rounded-md border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
              >
                <option value="">Select album</option>
                {albumOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
              Image URL
              <input
                type="url"
                value={photoForm.src}
                onChange={(event) => setPhotoForm((state) => ({ ...state, src: event.target.value }))}
                required
                className="rounded-md border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
              Alt text
              <input
                type="text"
                value={photoForm.alt}
                onChange={(event) => setPhotoForm((state) => ({ ...state, alt: event.target.value }))}
                required
                className="rounded-md border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
              />
            </label>
            <label className="md:col-span-3 flex flex-col gap-1 text-sm font-medium text-slate-700">
              Caption
              <input
                type="text"
                value={photoForm.caption}
                onChange={(event) => setPhotoForm((state) => ({ ...state, caption: event.target.value }))}
                required
                className="rounded-md border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
              />
            </label>
            <div className="md:col-span-3">
              <button
                type="submit"
                disabled={submitting === 'photo'}
                className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-500 disabled:cursor-not-allowed disabled:bg-brand-300"
              >
                {submitting === 'photo' ? 'Adding…' : 'Add photo'}
              </button>
            </div>
          </form>

          <div className="space-y-6">
            {albums.map((album) => (
              <div key={album.slug} className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-wide text-brand-500">{album.eventDate}</p>
                    <h3 className="text-lg font-semibold text-slate-900">{album.title}</h3>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {album.images.length} photos
                  </span>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {album.images.map((image) => (
                    <figure key={image.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{image.alt}</p>
                      <p className="mt-2 text-sm text-slate-600">{image.caption}</p>
                      <div className="mt-3 flex justify-between text-xs text-slate-500">
                        <a href={image.src} target="_blank" className="text-brand-600 hover:text-brand-500" rel="noopener noreferrer">
                          View image
                        </a>
                        <button
                          type="button"
                          onClick={() => removePhoto(album.slug, image.id)}
                          disabled={submitting === 'photo-delete'}
                          className="font-semibold text-red-600 hover:text-red-500 disabled:cursor-not-allowed disabled:text-red-300"
                        >
                          Remove
                        </button>
                      </div>
                    </figure>
                  ))}
                  {album.images.length === 0 && (
                    <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-xs text-slate-500">
                      No photos added yet.
                    </div>
                  )}
                </div>
              </div>
            ))}
            {albums.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-center text-sm text-slate-500">
                Create an album to begin uploading photos.
              </div>
            )}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <header>
              <h2 className="text-lg font-semibold text-brand-700">Testimonials</h2>
              <p className="text-sm text-slate-600">Curate quotes that appear on the homepage carousel.</p>
            </header>
            <form onSubmit={submitTestimonial} className="space-y-4">
              <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
                Name
                <input
                  type="text"
                  value={testimonialForm.name}
                  onChange={(event) => setTestimonialForm((state) => ({ ...state, name: event.target.value }))}
                  required
                  className="rounded-md border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
                Role / Relationship
                <input
                  type="text"
                  value={testimonialForm.role}
                  onChange={(event) => setTestimonialForm((state) => ({ ...state, role: event.target.value }))}
                  required
                  className="rounded-md border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
                Testimonial
                <textarea
                  value={testimonialForm.message}
                  onChange={(event) => setTestimonialForm((state) => ({ ...state, message: event.target.value }))}
                  required
                  rows={4}
                  className="rounded-md border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                />
              </label>
              <button
                type="submit"
                disabled={submitting === 'testimonial'}
                className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-500 disabled:cursor-not-allowed disabled:bg-brand-300"
              >
                {submitting === 'testimonial' ? 'Saving…' : 'Add testimonial'}
              </button>
            </form>
            <ul className="space-y-3 text-sm">
              {testimonials.map((testimonial) => (
                <li key={testimonial.id} className="rounded-lg border border-slate-200 bg-white p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-brand-700">{testimonial.name}</p>
                      <p className="text-xs uppercase tracking-wide text-slate-400">{testimonial.role}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => deleteTestimonial(testimonial.id)}
                      disabled={submitting === 'testimonial-delete'}
                      className="text-xs font-semibold text-red-600 hover:text-red-500 disabled:cursor-not-allowed disabled:text-red-300"
                    >
                      Delete
                    </button>
                  </div>
                  <p className="mt-2 text-slate-600">{testimonial.message}</p>
                </li>
              ))}
              {testimonials.length === 0 && (
                <li className="rounded-lg border border-dashed border-slate-200 p-3 text-center text-xs text-slate-500">
                  No testimonials yet.
                </li>
              )}
            </ul>
          </div>

          <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <header>
              <h2 className="text-lg font-semibold text-brand-700">Inquiry exports</h2>
              <p className="text-sm text-slate-600">
                Download the latest inquiry CSV. Files are grouped per month and include reference IDs and contact details.
              </p>
            </header>
            <a
              href="/api/admin/inquiries/export"
              className="inline-flex items-center justify-center rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-500"
            >
              Download inquiry CSV
            </a>
            <p className="text-xs text-slate-500">
              Tip: combine this with spreadsheet filters to analyse grades of interest and follow-up timelines.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
