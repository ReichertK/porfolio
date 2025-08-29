export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  languages_url: string;
  topics: string[];
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  created_at: string;
  homepage: string | null;
  fork: boolean;
  archived: boolean;
  disabled: boolean;
  languages?: Record<string, number>;
}

export interface SkillStat {
  name: string;
  score: number;
  category: 'language' | 'framework' | 'tool' | 'other';
}

export interface Config {
  name: string;
  role: string;
  bio: string;
  location: string;
  avatar: string;
  email: string;
  social: {
    github: string;
    linkedin: string;
    twitter: string;
    website: string;
  };
  ctaText: string;
  sectionOrder: string[];
  primaryColor: string;
  accentColor: string;
  seo: {
    title: string;
    description: string;
    keywords: string;
    ogImage: string;
  };
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormStatus {
  status: 'idle' | 'sending' | 'sent' | 'error';
  message?: string;
}