import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createWriteStream, existsSync } from 'node:fs';
import { dirname } from 'node:path';

const CSV_HEADER = 'reference_id,parent_name,student_name,grade,phone,email,preferred_time,message,utm_source,utm_campaign,created_at\n';
const INQUIRY_HEADER = 'reference_id,name,phone,grade,message,created_at\n';

function getCsvPath(prefix: 'contact' | 'inquiry') {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  return `${process.env.CSV_STORAGE_DIR ?? './storage/csv'}/${prefix}_submissions_${now.getFullYear()}-${month}.csv`;
}

export async function appendContactCsv(row: string) {
  const path = getCsvPath('contact');
  await ensureHeader(path, CSV_HEADER);
  await appendRow(path, row);
}

export async function appendInquiryCsv(row: string) {
  const path = getCsvPath('inquiry');
  await ensureHeader(path, INQUIRY_HEADER);
  await appendRow(path, row);
}

async function ensureHeader(path: string, header: string) {
  if (!existsSync(path)) {
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, header, { encoding: 'utf8' });
    return;
  }

  const data = await readFile(path, 'utf8');
  if (!data.startsWith(header.trim())) {
    await writeFile(path, header + data, { encoding: 'utf8' });
  }
}

async function appendRow(path: string, row: string) {
  await mkdir(dirname(path), { recursive: true });
  await new Promise<void>((resolve, reject) => {
    const stream = createWriteStream(path, { flags: 'a', encoding: 'utf8' });
    stream.once('error', reject);
    stream.once('finish', () => resolve());
    stream.end(row + '\n');
  });
}
