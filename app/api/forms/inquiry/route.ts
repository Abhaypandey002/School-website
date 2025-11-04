import { NextResponse } from 'next/server';
import { inquiryFormSchema } from '@/src/lib/validators';
import { appendInquiryCsv } from '@/src/lib/csv';
import { addRecord } from '@/src/lib/json-store';
import { generateReference } from '@/src/lib/reference';

export async function POST(request: Request) {
  const data = await request.json();
  const parseResult = inquiryFormSchema.safeParse(data);

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
  const referenceId = generateReference('INQ');
  const createdAt = new Date().toISOString();

  const csvRow = [referenceId, payload.name, payload.phone, payload.grade, payload.message ?? '', createdAt]
    .map((value) => `"${String(value).replace(/"/g, '""')}"`)
    .join(',');

  await appendInquiryCsv(csvRow);
  await addRecord('./storage/forms/inquiry.json', {
    referenceId,
    ...payload,
    createdAt
  });

  return NextResponse.json({ success: true, referenceId, createdAt });
}
