import { NextResponse } from 'next/server';
import { contactFormSchema } from '@/src/lib/validators';
import { appendContactCsv } from '@/src/lib/csv';
import { addRecord } from '@/src/lib/json-store';
import { generateReference } from '@/src/lib/reference';

export async function POST(request: Request) {
  const data = await request.json();
  const parseResult = contactFormSchema.safeParse(data);

  if (!parseResult.success) {
    return NextResponse.json(
      {
        success: false,
        errors: parseResult.error.flatten().fieldErrors
      },
      { status: 422 }
    );
  }

  const payload = parseResult.data;
  const referenceId = generateReference('CNT');
  const createdAt = new Date().toISOString();

  const csvRow = [
    referenceId,
    payload.parentName,
    payload.studentName,
    payload.grade,
    payload.phone,
    payload.email,
    payload.preferredTime,
    payload.message ?? '',
    payload.utmSource ?? '',
    payload.utmCampaign ?? '',
    createdAt
  ]
    .map((value) => `"${String(value).replace(/"/g, '""')}"`)
    .join(',');

  await appendContactCsv(csvRow);
  await addRecord('./storage/forms/contact.json', {
    referenceId,
    ...payload,
    createdAt
  });

  return NextResponse.json({ success: true, referenceId, createdAt });
}
