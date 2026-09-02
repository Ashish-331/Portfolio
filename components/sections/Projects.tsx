'use client';
import SectionHeading from '@/components/ui/SectionHeading';
import ProjectCard from '@/components/ui/ProjectCard';
import type { Project } from '@/lib/types';

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="py-20 lg:py-28 bg-gray-50/50 dark:bg-gray-950/50">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading title="Projects" subtitle="Things I've built" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => <ProjectCard key={project.title} project={project} index={i} />)}
        </div>
      </div>
    </section>
  );
}
