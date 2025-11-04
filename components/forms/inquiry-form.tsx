'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { inquiryFormSchema } from '@/src/lib/validators';
import { z } from 'zod';
import { useState } from 'react';

const grades = ['Nursery', 'Jr. KG', 'Std. 1-4', 'Std. 5-8'];

type InquiryFormValues = z.infer<typeof inquiryFormSchema>;

export function InquiryForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [referenceId, setReferenceId] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquiryFormSchema),
    defaultValues: {
      message: ''
    }
  });

  const onSubmit = async (values: InquiryFormValues) => {
    setStatus('submitting');
    setReferenceId('');
    try {
      const response = await fetch('/api/forms/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      const payload = await response.json();
      setReferenceId(payload.referenceId);
      setStatus('success');
      reset();
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <label className="flex flex-col">
        <span className="text-sm font-medium text-slate-700">Name</span>
        <input
          type="text"
          className="mt-1 rounded-md border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          {...register('name')}
        />
        {errors.name && <span className="mt-1 text-sm text-red-600">{errors.name.message}</span>}
      </label>
      <label className="flex flex-col">
        <span className="text-sm font-medium text-slate-700">Phone</span>
        <input
          type="tel"
          className="mt-1 rounded-md border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          {...register('phone')}
        />
        {errors.phone && <span className="mt-1 text-sm text-red-600">{errors.phone.message}</span>}
      </label>
      <label className="flex flex-col">
        <span className="text-sm font-medium text-slate-700">Grade Interested</span>
        <select
          className="mt-1 rounded-md border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          {...register('grade')}
        >
          <option value="">Select grade</option>
          {grades.map((grade) => (
            <option key={grade} value={grade}>
              {grade}
            </option>
          ))}
        </select>
        {errors.grade && <span className="mt-1 text-sm text-red-600">{errors.grade.message}</span>}
      </label>
      <label className="flex flex-col">
        <span className="text-sm font-medium text-slate-700">Message</span>
        <textarea
          rows={4}
          className="mt-1 rounded-md border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          {...register('message')}
        />
        {errors.message && <span className="mt-1 text-sm text-red-600">{errors.message.message}</span>}
      </label>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="rounded-full bg-brand-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-brand-500 disabled:cursor-not-allowed disabled:bg-brand-300"
      >
        {status === 'submitting' ? 'Submitting…' : 'Submit'}
      </button>

      {status === 'success' && (
        <p className="rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-700">
          Thank you! Your reference ID is <span className="font-semibold">{referenceId}</span>.
        </p>
      )}
      {status === 'error' && (
        <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          Something went wrong. Please retry shortly.
        </p>
      )}
    </form>
  );
}
