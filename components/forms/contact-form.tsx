'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema } from '@/src/lib/validators';
import { z } from 'zod';
import { useState } from 'react';

const grades = ['Nursery', 'Jr. KG', 'Std. 1', 'Std. 2', 'Std. 3', 'Std. 4', 'Std. 5', 'Std. 6', 'Std. 7', 'Std. 8'];

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [referenceId, setReferenceId] = useState<string>('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      utmSource: '',
      utmCampaign: '',
      message: '',
      consent: false
    }
  });

  const onSubmit = async (values: ContactFormValues) => {
    setStatus('submitting');
    setReferenceId('');
    try {
      const response = await fetch('/api/forms/contact', {
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col">
          <span className="text-sm font-medium text-slate-700">Parent / Guardian Name</span>
          <input
            type="text"
            className="mt-1 rounded-md border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
            {...register('parentName')}
          />
          {errors.parentName && <span className="mt-1 text-sm text-red-600">{errors.parentName.message}</span>}
        </label>
        <label className="flex flex-col">
          <span className="text-sm font-medium text-slate-700">Student Name</span>
          <input
            type="text"
            className="mt-1 rounded-md border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
            {...register('studentName')}
          />
          {errors.studentName && <span className="mt-1 text-sm text-red-600">{errors.studentName.message}</span>}
        </label>
        <label className="flex flex-col">
          <span className="text-sm font-medium text-slate-700">Applying For</span>
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
          <span className="text-sm font-medium text-slate-700">Phone</span>
          <input
            type="tel"
            className="mt-1 rounded-md border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
            {...register('phone')}
          />
          {errors.phone && <span className="mt-1 text-sm text-red-600">{errors.phone.message}</span>}
        </label>
        <label className="flex flex-col">
          <span className="text-sm font-medium text-slate-700">Email</span>
          <input
            type="email"
            className="mt-1 rounded-md border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
            {...register('email')}
          />
          {errors.email && <span className="mt-1 text-sm text-red-600">{errors.email.message}</span>}
        </label>
        <label className="flex flex-col">
          <span className="text-sm font-medium text-slate-700">Preferred Contact Time</span>
          <input
            type="text"
            placeholder="e.g., Weekdays 4-6 PM"
            className="mt-1 rounded-md border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
            {...register('preferredTime')}
          />
          {errors.preferredTime && <span className="mt-1 text-sm text-red-600">{errors.preferredTime.message}</span>}
        </label>
      </div>

      <label className="flex flex-col">
        <span className="text-sm font-medium text-slate-700">Message</span>
        <textarea
          rows={4}
          className="mt-1 rounded-md border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          {...register('message')}
        />
        {errors.message && <span className="mt-1 text-sm text-red-600">{errors.message.message}</span>}
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col">
          <span className="text-sm font-medium text-slate-700">UTM Source</span>
          <input
            type="text"
            className="mt-1 rounded-md border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
            {...register('utmSource')}
          />
        </label>
        <label className="flex flex-col">
          <span className="text-sm font-medium text-slate-700">UTM Campaign</span>
          <input
            type="text"
            className="mt-1 rounded-md border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
            {...register('utmCampaign')}
          />
        </label>
      </div>

      <label className="flex items-start gap-3 text-sm text-slate-600">
        <input type="checkbox" className="mt-1" {...register('consent')} />
        <span>
          I consent to Akshar Kids School storing my information for admissions processing. Data will be retained in CSV and
          analytics systems as per our privacy policy.
        </span>
      </label>
      {errors.consent && <p className="text-sm text-red-600">{errors.consent.message}</p>}

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
          Something went wrong. Please try again or contact us directly.
        </p>
      )}
    </form>
  );
}
