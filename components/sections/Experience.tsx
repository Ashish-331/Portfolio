'use client';
import SectionHeading from '@/components/ui/SectionHeading';
import TimelineItem from '@/components/ui/TimelineItem';
import type { Experience as ExperienceType } from '@/lib/types';

export default function Experience({ experience }: { experience: ExperienceType[] }) {
  return (
    <section id="experience" className="py-20 lg:py-28 bg-gray-50/50 dark:bg-gray-950/50">
      <div className="max-w-3xl mx-auto px-6">
        <SectionHeading title="Experience" subtitle="My professional journey" />
        <div>{experience.map((exp, i) => <TimelineItem key={i} experience={exp} index={i} />)}</div>
      </div>
    </section>
  );
}
