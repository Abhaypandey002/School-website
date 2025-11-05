import { NextResponse } from 'next/server';
import { createTestimonial, getTestimonials, removeTestimonial } from '@/src/services/testimonials';

export async function GET() {
  const testimonials = await getTestimonials();
  return NextResponse.json({ testimonials });
}

export async function POST(request: Request) {
  const payload = await request.json();
  const { name, role, message } = payload ?? {};

  if (!name || !role || !message) {
    return NextResponse.json({ error: 'Name, role, and message are required.' }, { status: 422 });
  }

  const testimonial = await createTestimonial({ name, role, message });
  return NextResponse.json({ testimonial }, { status: 201 });
}

export async function DELETE(request: Request) {
  const payload = await request.json();
  const { id } = payload ?? {};

  if (!id) {
    return NextResponse.json({ error: 'Testimonial id is required.' }, { status: 422 });
  }

  const removed = await removeTestimonial(id);
  if (!removed) {
    return NextResponse.json({ error: 'Testimonial not found.' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
