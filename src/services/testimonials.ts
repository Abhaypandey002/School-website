import { randomUUID } from 'node:crypto';
import { readCollection, writeCollection } from '@/src/lib/json-store';

export type TestimonialRecord = {
  id: string;
  name: string;
  role: string;
  message: string;
};

const TESTIMONIAL_PATH = './storage/content/testimonials.json';

export async function getTestimonials(): Promise<TestimonialRecord[]> {
  const records = await readCollection<TestimonialRecord[]>(TESTIMONIAL_PATH);
  return records;
}

export async function createTestimonial(input: {
  name: string;
  role: string;
  message: string;
}): Promise<TestimonialRecord> {
  const testimonials = await readCollection<TestimonialRecord[]>(TESTIMONIAL_PATH);
  const testimonial: TestimonialRecord = {
    id: `testimonial-${randomUUID()}`,
    ...input
  };

  testimonials.push(testimonial);
  await writeCollection(TESTIMONIAL_PATH, testimonials);
  return testimonial;
}

export async function removeTestimonial(id: string): Promise<boolean> {
  const testimonials = await readCollection<TestimonialRecord[]>(TESTIMONIAL_PATH);
  const next = testimonials.filter((item) => item.id !== id);

  if (next.length === testimonials.length) {
    return false;
  }

  await writeCollection(TESTIMONIAL_PATH, next);
  return true;
}
