'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Metadata } from 'next';

const ADMIN_ID = process.env.NEXT_PUBLIC_ADMIN_ID ?? 'admin';
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? 'password123';

export const metadata: Metadata = {
  title: 'Admin Login | Akshar Kids School'
};

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ id: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const authed = window.localStorage.getItem('admin-auth') === '1';
    if (authed) {
      router.replace('/admin');
      return;
    }

    setChecking(false);
  }, [router]);

  function handleChange(field: 'id' | 'password') {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setForm((state) => ({ ...state, [field]: event.target.value }));
      if (error) setError(null);
    };
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submitting) return;

    setSubmitting(true);

    const matchesId = form.id.trim() === ADMIN_ID;
    const matchesPassword = form.password === ADMIN_PASSWORD;

    if (matchesId && matchesPassword) {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('admin-auth', '1');
      }
      router.replace('/admin');
      return;
    }

    setError('Invalid admin ID or password. Please try again.');
    setSubmitting(false);
  }

  if (checking) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-white">
        <p className="text-sm text-slate-600">Preparing admin login…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 py-24">
      <div className="container-edge flex justify-center">
        <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white/95 p-10 shadow-2xl ring-1 ring-white/50 backdrop-blur">
          <div className="pointer-events-none absolute -top-20 -left-10 h-40 w-40 rounded-full bg-brand-200/60 blur-3xl"></div>
          <div className="pointer-events-none absolute -bottom-24 right-0 h-48 w-48 rounded-full bg-amber-200/60 blur-3xl"></div>
          <div className="relative space-y-6">
            <div className="space-y-2 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-500">Admin Access</p>
              <h1 className="text-3xl font-bold text-slate-900">Sign in to continue</h1>
              <p className="text-sm text-slate-600">Use the credentials shared with the school administration office.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                Admin ID
                <input
                  type="text"
                  value={form.id}
                  onChange={handleChange('id')}
                  autoComplete="username"
                  required
                  className="rounded-xl border border-slate-300 px-4 py-2.5 text-base shadow-sm transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                Password
                <input
                  type="password"
                  value={form.password}
                  onChange={handleChange('password')}
                  autoComplete="current-password"
                  required
                  className="rounded-xl border border-slate-300 px-4 py-2.5 text-base shadow-sm transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                />
              </label>
              {error && <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition hover:bg-brand-500 disabled:cursor-not-allowed disabled:bg-brand-300"
              >
                {submitting ? 'Signing in…' : 'Sign in'}
              </button>
            </form>
            <p className="text-center text-xs text-slate-400">
              Tip: Configure <code className="rounded bg-slate-100 px-1.5 py-0.5">NEXT_PUBLIC_ADMIN_ID</code> and
              <code className="ml-1 rounded bg-slate-100 px-1.5 py-0.5">NEXT_PUBLIC_ADMIN_PASSWORD</code> for production.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
