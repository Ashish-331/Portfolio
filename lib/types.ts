export interface Profile {
  name: string;
  tagline: string;
  bio: string;
  photo: string;
  email: string;
  phone: string;
  location: string;
  education: {
    degree: string;
    institution: string;
    period: string;
    cgpa: string;
  };
  socials: {
    github: string;
    linkedin: string;
    leetcode: string;
    codechef: string;
  };
  resumePath: string;
  stats: { label: string; value: string }[];
  achievements: { title: string; detail: string; year?: string }[];
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  image: string;
  featured: boolean;
  metrics?: string;
  badge?: string;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface Skills {
  categories: SkillCategory[];
}

export interface Experience {
  role: string;
  organization: string;
  period: string;
  location: string;
  highlights: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  content: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}