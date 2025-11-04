import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

export async function addRecord<TRecord extends Record<string, unknown>>(path: string, record: TRecord) {
  await mkdir(dirname(path), { recursive: true });
  const existing = await readJson<TRecord[]>(path);
  existing.push(record);
  await writeFile(path, JSON.stringify(existing, null, 2), 'utf8');
}

async function readJson<T>(path: string): Promise<T> {
  try {
    const data = await readFile(path, 'utf8');
    return JSON.parse(data) as T;
  } catch (error) {
    return [] as T;
  }
}
