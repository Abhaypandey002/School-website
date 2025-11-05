import { randomUUID } from 'node:crypto';
import { readCollection, writeCollection } from '@/src/lib/json-store';

export type NoticeRecord = {
  id: string;
  title: string;
  body: string;
  date: string;
};

const NOTICE_PATH = './storage/content/notices.json';

async function ensureNotices(): Promise<NoticeRecord[]> {
  const records = await readCollection<NoticeRecord[]>(NOTICE_PATH);

  if (records.length === 0) {
    return [];
  }

  return records;
}

export async function getNotices(): Promise<NoticeRecord[]> {
  const records = await ensureNotices();
  return [...records].sort((a, b) => (a.date > b.date ? -1 : 1));
}

export async function createNotice(input: { title: string; body: string; date?: string }): Promise<NoticeRecord> {
  const current = await ensureNotices();
  const notice: NoticeRecord = {
    id: `notice-${randomUUID()}`,
    title: input.title,
    body: input.body,
    date: input.date ?? new Date().toISOString().slice(0, 10)
  };

  const records = current.length > 0 ? current : [];
  records.push(notice);
  await writeCollection(NOTICE_PATH, records);

  return notice;
}

export async function removeNotice(id: string): Promise<boolean> {
  const current = await ensureNotices();
  if (current.length === 0) {
    return false;
  }

  const next = current.filter((notice) => notice.id !== id);
  if (next.length === current.length) {
    return false;
  }

  await writeCollection(NOTICE_PATH, next);
  return true;
}
