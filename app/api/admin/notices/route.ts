import { NextResponse } from 'next/server';
import { createNotice, getNotices, removeNotice } from '@/src/services/notices';

export async function GET() {
  const notices = await getNotices();
  return NextResponse.json({ notices });
}

export async function POST(request: Request) {
  const payload = await request.json();
  const { title, body, date } = payload ?? {};

  if (!title || !body) {
    return NextResponse.json({ error: 'Title and message are required.' }, { status: 422 });
  }

  try {
    const notice = await createNotice({ title, body, date });
    return NextResponse.json({ notice }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create notice.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const payload = await request.json();
  const { id } = payload ?? {};

  if (!id) {
    return NextResponse.json({ error: 'Notice id is required.' }, { status: 422 });
  }

  const removed = await removeNotice(id);
  if (!removed) {
    return NextResponse.json({ error: 'Notice not found.' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
