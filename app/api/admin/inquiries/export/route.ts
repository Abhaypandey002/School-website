import { NextResponse } from 'next/server';
import { join } from 'node:path';
import { readdir, readFile } from 'node:fs/promises';

export async function GET() {
  const directory = process.env.CSV_STORAGE_DIR ?? './storage/csv';

  try {
    const files = await readdir(directory);
    const inquiryFiles = files.filter((file) => file.startsWith('inquiry_submissions_'));

    if (inquiryFiles.length === 0) {
      return NextResponse.json({ error: 'No inquiry exports found.' }, { status: 404 });
    }

    inquiryFiles.sort();
    const latest = inquiryFiles[inquiryFiles.length - 1];
    const filePath = join(directory, latest);
    const contents = await readFile(filePath);

    return new NextResponse(contents, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${latest}"`
      }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unable to load CSV export.' }, { status: 500 });
  }
}
