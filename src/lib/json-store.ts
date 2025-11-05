import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

export async function readCollection<T>(path: string): Promise<T> {
  try {
    const data = await readFile(path, 'utf8');
    return JSON.parse(data) as T;
  } catch (error) {
    return [] as T;
  }
}

export async function writeCollection<T>(path: string, data: T) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, JSON.stringify(data, null, 2), 'utf8');
}

export async function addRecord<TRecord extends Record<string, unknown>>(path: string, record: TRecord) {
  const existing = await readCollection<TRecord[]>(path);
  existing.push(record);
  await writeCollection(path, existing);
}
