# Akshar Kids School Website

A modern school marketing site built with Next.js 14, the App Router, TypeScript, Tailwind CSS, and lightweight file-based storage. It satisfies the admissions-first product spec with a hero-led home page, notice blackboard, tuition highlights, gallery albums, CSV-backed contact flows, and policy coverage. All assets are text-based to keep the repository binary-free.

## Tech Stack

- [Next.js 14](https://nextjs.org/) with the App Router
- React 18 + TypeScript
- Tailwind CSS for styling
- Zod + React Hook Form for validation
- Radix UI primitives for accessible accordions
- File-backed CSV + JSON persistence for form submissions (upgradeable to Prisma/PostgreSQL)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Prepare writable directories

```bash
mkdir -p storage/csv storage/forms uploads
```

### 3. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the site.

### 4. Configure admin credentials (optional for local dev)

Create a `.env.local` file with the following values to control who can access the admin dashboard:

```
NEXT_PUBLIC_ADMIN_ID=admin
NEXT_PUBLIC_ADMIN_PASSWORD=password123
```

If the variables are not provided, the above defaults are used.

## Admin Dashboard

1. Navigate to `/admin/login` and authenticate with the configured admin ID and password.
2. After signing in, you can:
   - Publish, edit, and delete blackboard notices
   - Create gallery albums, upload photo metadata, and manage album images
   - Add, remove, and curate homepage testimonials
   - Download inquiry submissions as CSV reports
3. Use the **Log out** button in the dashboard header to clear your session when finished.

The lightweight client-side guard stores a short-lived flag in `localStorage`. For production deployments, replace it with your preferred auth provider (e.g. NextAuth, Clerk, custom JWT service).

## Project Structure

```
app/                # App Router routes and layouts
  api/forms/*       # CSV-writing form endpoints
  ...               # Marketing and admissions pages
components/         # Reusable UI pieces and form components
public/             # Text-based image placeholders and downloads
src/config/         # Site navigation configuration
src/data/           # Seed content for pages and gallery albums
src/lib/            # CSV, JSON store, validation, and utility helpers
storage/            # Runtime CSV + JSON data (gitignored)
```

## Forms & CSV Exports

- `POST /api/forms/contact` persists validated submissions to:
  - `storage/csv/contact_submissions_YYYY-MM.csv`
  - `storage/forms/contact.json`
- `POST /api/forms/inquiry` persists to:
  - `storage/csv/inquiry_submissions_YYYY-MM.csv`
  - `storage/forms/inquiry.json`
- Each submission returns a reference ID for confirmation to the user.
- The CSV helpers ensure headers are consistent and directories are created if missing.

## Downloads & Assets

- Placeholder documents live in `public/downloads/*.pdf`. They are plain-text stubs—replace them with real PDFs before launch.
- Event imagery in `public/images/gallery/*.svg` is text-based for repository portability. Swap these with production-ready assets as needed.

## Roadmap Notes

- Swap the client-side credential guard for a hardened auth strategy (NextAuth + Prisma, Clerk, etc.).
- Extend the gallery with image uploads and thumbnail generation via `sharp`.
- Add rate limiting, CAPTCHA, and email notifications to form submissions.

## Testing

The project currently relies on manual QA. Recommended scripts to add:

- Playwright end-to-end tests for contact/inquiry flows
- unit tests for validators and CSV helpers

## Deployment

1. Build the application: `npm run build`
2. Run in production mode: `npm run start`
3. Mount persistent volumes for `storage/csv`, `storage/forms`, and `uploads`
4. Configure environment variables (see `.env.example`) for site metadata, auth, and storage paths

## License

MIT
