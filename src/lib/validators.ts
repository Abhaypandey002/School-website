import { z } from 'zod';

export const contactFormSchema = z.object({
  parentName: z.string().min(2, 'Parent or guardian name is required'),
  studentName: z.string().min(2, 'Student name is required'),
  grade: z.enum(['Nursery', 'Jr. KG', 'Std. 1', 'Std. 2', 'Std. 3', 'Std. 4', 'Std. 5', 'Std. 6', 'Std. 7', 'Std. 8']),
  phone: z.string().min(10).max(15),
  email: z.string().email(),
  preferredTime: z.string().min(2),
  message: z.string().max(1000).optional(),
  utmSource: z.string().optional().default(''),
  utmCampaign: z.string().optional().default(''),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'You must consent to data handling policies.' })
  })
});

export const inquiryFormSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10).max(15),
  grade: z.enum(['Nursery', 'Jr. KG', 'Std. 1-4', 'Std. 5-8']),
  message: z.string().max(600).optional()
});
