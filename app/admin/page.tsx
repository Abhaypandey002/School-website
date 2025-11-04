import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin | Akshar Kids School'
};

export default function AdminPlaceholder() {
  return (
    <div className="bg-white py-16">
      <div className="container-edge space-y-6">
        <h1 className="section-title">Admin Portal (Preview)</h1>
        <p className="section-subtitle">
          The production version will feature secure authentication, notice management, gallery uploads, and CSV exports. This
          placeholder outlines the roadmap while we finalize the NextAuth and Prisma integrations.
        </p>
        <ul className="list-disc space-y-2 pl-6 text-slate-600">
          <li>Role-based dashboard with analytics for submissions and downloads.</li>
          <li>CRUD for notices, gallery albums, pages, and downloads.</li>
          <li>Export tools for contact and inquiry submissions with filtering.</li>
          <li>Settings for school profile, social links, and integrations.</li>
        </ul>
      </div>
    </div>
  );
}
