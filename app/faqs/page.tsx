import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { faqItems } from '@/src/data/content';

const FaqAccordion = dynamic(() => import('@/components/faq-accordion'), { ssr: false });

export const metadata: Metadata = {
  title: 'FAQs | Akshar Kids School'
};

export default function FaqsPage() {
  return (
    <div className="bg-white py-16">
      <div className="container-edge">
        <h1 className="section-title">Frequently Asked Questions</h1>
        <p className="section-subtitle">
          Find answers about admissions, transport, and campus life. Admins can add more categories from the CMS roadmap.
        </p>
        <FaqAccordion items={faqItems} />
      </div>
    </div>
  );
}
