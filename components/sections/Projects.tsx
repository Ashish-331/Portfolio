'use client';

import SectionHeading from '@/components/ui/SectionHeading';
import ProjectCard from '@/components/ui/ProjectCard';
import type { Project } from '@/lib/types';

export default function Projects({ projects }: { projects: Project[] }) {
  const [flagship, ...rest] = projects;

  return (
    <section id="projects" className="py-16 sm:py-24 border-b border-gray-200/90 dark:border-slate-800/90 bg-white dark:bg-[#0a0d16] scroll-mt-16">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          title="Projects"
          subtitle="Low-overhead Linux tools, kernel monitors, and distributed telemetry pipelines"
        />

        {/* Flagship Wide Architecture Card */}
        {flagship && <ProjectCard project={flagship} flagship={true} />}

        {/* Secondary 2-Column Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {rest.map((project) => (
            <ProjectCard key={project.title} project={project} flagship={false} />
          ))}
        </div>
      </div>
    </section>
  );
}