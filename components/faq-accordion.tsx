'use client';

import * as Accordion from '@radix-ui/react-accordion';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <Accordion.Root type="single" collapsible className="mt-8 space-y-4">
      {items.map((item, index) => (
        <Accordion.Item key={item.question} value={`item-${index}`} className="overflow-hidden rounded-2xl border border-slate-200">
          <Accordion.Header>
            <Accordion.Trigger className="flex w-full items-center justify-between bg-slate-50 px-5 py-4 text-left text-lg font-semibold text-brand-700 hover:bg-slate-100">
              {item.question}
              <span aria-hidden>⌄</span>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="bg-white px-5 py-4 text-slate-600">{item.answer}</Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
