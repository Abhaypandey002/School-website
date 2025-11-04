import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'After-School Tuition | Akshar Kids School'
};

const subjects = [
  {
    name: 'Mathematics',
    details: 'Concept mastery, Olympiad prep, and weekly diagnostic assessments.'
  },
  {
    name: 'Science',
    details: 'Hands-on experiments, lab journals, and inquiry projects across Physics, Chemistry, and Biology.'
  },
  {
    name: 'English',
    details: 'Reading comprehension, public speaking labs, and creative writing workshops.'
  },
  {
    name: 'Social Studies',
    details: 'Current affairs clubs, debates, and geography skills.'
  }
];

const faculty = [
  {
    name: 'Ms. Riya Shah',
    subject: 'Mathematics Lead',
    bio: '8 years coaching middle-school math with a focus on conceptual clarity and confidence.'
  },
  {
    name: 'Mr. Aarav Mehta',
    subject: 'Science Mentor',
    bio: 'STEM enthusiast guiding robotics and science fair teams to national podiums.'
  },
  {
    name: 'Ms. Farah Ansari',
    subject: 'English Specialist',
    bio: 'Cambridge-certified educator nurturing fluent communicators and storytellers.'
  }
];

export default function AfterSchoolTuitionPage() {
  return (
    <div className="bg-white py-16">
      <div className="container-edge space-y-12">
        <section className="space-y-4">
          <h1 className="section-title">After-School Tuition Program</h1>
          <p className="section-subtitle">
            Tailored evening batches for Std. 5-10 to reinforce classroom learning, close gaps, and accelerate achievement.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {subjects.map((subject) => (
            <article key={subject.name} className="rounded-2xl border border-brand-100 bg-brand-50 p-6">
              <h2 className="text-xl font-semibold text-brand-700">{subject.name}</h2>
              <p className="mt-3 text-brand-800">{subject.details}</p>
            </article>
          ))}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-xl font-semibold text-brand-700">Schedule & Fees</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600">
            <li>Weekday Batches: Monday–Friday, 4:30 PM – 6:30 PM.</li>
            <li>Weekend Masterclass: Saturday 9:00 AM – 12:00 PM (STEM & project labs).</li>
            <li>Batch Size: 12 learners for personalized attention.</li>
            <li>Fees: ₹3,200 per month (weekday) · ₹1,800 per month (weekend add-on).</li>
          </ul>
          <div className="mt-6">
            <a
              href="/contact"
              className="inline-flex rounded-full bg-brand-600 px-6 py-2 text-sm font-semibold text-white hover:bg-brand-500"
            >
              Enroll Now
            </a>
          </div>
        </section>

        <section>
          <h2 className="section-title">Faculty Spotlight</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {faculty.map((member) => (
              <article key={member.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-brand-700">{member.name}</h3>
                <p className="text-sm uppercase tracking-wide text-slate-500">{member.subject}</p>
                <p className="mt-3 text-slate-600">{member.bio}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
