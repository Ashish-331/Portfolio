import {
  getProfile,
  getProjects,
  getSkills,
  getExperience,
  getBlogPosts,
} from '@/lib/content';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Blog from '@/components/sections/Blog';
import Contact from '@/components/sections/Contact';

export default function Home() {
  const profile = getProfile();
  const projects = getProjects();
  const skills = getSkills();
  const experience = getExperience();
  const blogPosts = getBlogPosts();

  return (
    <main className="flex flex-col">
      <Hero profile={profile} />
      <About profile={profile} />
      <Projects projects={projects} />
      <Skills skills={skills} />
      <Experience experience={experience} />
      <Blog posts={blogPosts} />
      <Contact profile={profile} />
    </main>
  );
}
