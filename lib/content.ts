import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Profile, Project, Skills, Experience, BlogPost } from './types';

const contentDir = path.join(process.cwd(), 'content');

export function getProfile(): Profile {
  return JSON.parse(fs.readFileSync(path.join(contentDir, 'profile.json'), 'utf-8'));
}

export function getProjects(): Project[] {
  return JSON.parse(fs.readFileSync(path.join(contentDir, 'projects.json'), 'utf-8'));
}

export function getSkills(): Skills {
  return JSON.parse(fs.readFileSync(path.join(contentDir, 'skills.json'), 'utf-8'));
}

export function getExperience(): Experience[] {
  return JSON.parse(fs.readFileSync(path.join(contentDir, 'experience.json'), 'utf-8'));
}

export function getChatbotContext(): string {
  return fs.readFileSync(path.join(contentDir, 'chatbot-context.md'), 'utf-8');
}

export function getBlogPosts(): BlogPost[] {
  const blogDir = path.join(contentDir, 'blog');
  if (!fs.existsSync(blogDir)) return [];
  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx'));
  return files.map(filename => {
    const slug = filename.replace('.mdx', '');
    const raw = fs.readFileSync(path.join(blogDir, filename), 'utf-8');
    const { data, content } = matter(raw);
    return { slug, title: data.title || '', date: data.date || '', excerpt: data.excerpt || '', tags: data.tags || [], content };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(slug: string): BlogPost | null {
  const filePath = path.join(contentDir, 'blog', `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  return { slug, title: data.title || '', date: data.date || '', excerpt: data.excerpt || '', tags: data.tags || [], content };
}
