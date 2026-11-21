'use client';

import SectionHeading from '@/components/ui/SectionHeading';
import TimelineItem from '@/components/ui/TimelineItem';
import type { Experience as ExperienceType } from '@/lib/types';

export default function Experience({ experience }: { experience: ExperienceType[] }) {
  return (
    <section id="experience" className="py-16 sm:py-24 border-b border-gray-200/90 dark:border-slate-800/90 bg-white dark:bg-[#0a0d16] scroll-mt-16">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading
          title="Experience &amp; Leadership"
          subtitle="Club leadership at NIT Agartala, hackathons, and systems mentoring"
        />
        <div className="mt-8 space-y-4">
          {experience.map((exp, i) => (
            <TimelineItem key={i} experience={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}