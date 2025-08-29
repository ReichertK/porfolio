import { GithubRepo, SkillStat } from '../types';

// Language mappings and categories
const LANGUAGE_CATEGORIES = {
  language: [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'C', 'Go', 'Rust', 'Ruby', 'PHP', 'Swift', 'Kotlin', 'Dart'
  ],
  framework: [
    'React', 'Vue', 'Angular', 'Next.js', 'Nuxt.js', 'Express', 'Django', 'Flask', 'Spring', 'Laravel', 'Rails', 'ASP.NET'
  ],
  tool: [
    'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Jenkins', 'Git', 'Webpack', 'Vite', 'Babel', 'ESLint', 'Prettier'
  ]
};

const SKILL_KEYWORDS = {
  'React': ['react', 'jsx', 'tsx', 'react-dom', 'nextjs', 'next.js'],
  'Vue': ['vue', 'vuejs', 'nuxt', 'nuxtjs'],
  'Angular': ['angular', 'ng', 'typescript'],
  'Node.js': ['node', 'nodejs', 'express', 'npm'],
  'Python': ['python', 'django', 'flask', 'fastapi', 'py'],
  'Docker': ['docker', 'dockerfile', 'container'],
  'TypeScript': ['typescript', 'ts', 'tsx'],
  'JavaScript': ['javascript', 'js', 'jsx'],
  'CSS': ['css', 'scss', 'sass', 'styled-components', 'tailwind'],
  'HTML': ['html', 'html5'],
  'MongoDB': ['mongo', 'mongodb', 'mongoose'],
  'PostgreSQL': ['postgres', 'postgresql', 'pg'],
  'MySQL': ['mysql'],
  'Redis': ['redis'],
  'GraphQL': ['graphql', 'apollo'],
  'REST API': ['api', 'rest', 'restful'],
  'AWS': ['aws', 'amazon', 'lambda', 's3', 'ec2'],
  'Azure': ['azure', 'microsoft'],
  'GCP': ['gcp', 'google-cloud'],
  'Git': ['git', 'github', 'gitlab'],
  'CI/CD': ['ci', 'cd', 'jenkins', 'github-actions', 'gitlab-ci'],
  'Testing': ['test', 'jest', 'mocha', 'cypress', 'selenium', 'pytest'],
  'Webpack': ['webpack', 'bundler'],
  'Vite': ['vite'],
  'Tailwind CSS': ['tailwind', 'tailwindcss'],
  'Material-UI': ['material-ui', 'mui'],
  'Bootstrap': ['bootstrap'],
  'Framer Motion': ['framer-motion', 'framer'],
  'Prisma': ['prisma'],
  'Firebase': ['firebase', 'firestore'],
  'Vercel': ['vercel'],
  'Netlify': ['netlify']
};

export function detectSkillsFromRepos(repos: GithubRepo[]): SkillStat[] {
  const skillScores = new Map<string, number>();
  const skillCategories = new Map<string, string>();

  repos.forEach(repo => {
    // Analyze primary language
    if (repo.language) {
      const currentScore = skillScores.get(repo.language) || 0;
      skillScores.set(repo.language, currentScore + 3);
      skillCategories.set(repo.language, getSkillCategory(repo.language));
    }

    // Analyze languages breakdown
    if (repo.languages) {
      const totalBytes = Object.values(repo.languages).reduce((sum, bytes) => sum + bytes, 0);
      Object.entries(repo.languages).forEach(([language, bytes]) => {
        const percentage = bytes / totalBytes;
        const score = percentage * 2; // Weight by percentage
        const currentScore = skillScores.get(language) || 0;
        skillScores.set(language, currentScore + score);
        skillCategories.set(language, getSkillCategory(language));
      });
    }

    // Analyze topics
    repo.topics.forEach(topic => {
      const skill = findSkillFromKeyword(topic);
      if (skill) {
        const currentScore = skillScores.get(skill) || 0;
        skillScores.set(skill, currentScore + 2);
        skillCategories.set(skill, getSkillCategory(skill));
      }
    });

    // Analyze description and repository name
    const textToAnalyze = `${repo.name} ${repo.description || ''}`.toLowerCase();
    Object.entries(SKILL_KEYWORDS).forEach(([skill, keywords]) => {
      const matches = keywords.filter(keyword => textToAnalyze.includes(keyword)).length;
      if (matches > 0) {
        const currentScore = skillScores.get(skill) || 0;
        skillScores.set(skill, currentScore + matches * 1.5);
        skillCategories.set(skill, getSkillCategory(skill));
      }
    });

    // Bonus for recent activity and popularity
    const lastUpdate = new Date(repo.updated_at);
    const monthsAgo = (Date.now() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24 * 30);
    const recencyBonus = Math.max(0, 2 - monthsAgo / 6); // More recent = higher bonus

    const popularityBonus = Math.log(repo.stargazers_count + 1) * 0.5;

    if (repo.language) {
      const currentScore = skillScores.get(repo.language) || 0;
      skillScores.set(repo.language, currentScore + recencyBonus + popularityBonus);
    }
  });

  // Convert to SkillStat array and sort by score
  const skills: SkillStat[] = Array.from(skillScores.entries())
    .map(([name, score]) => ({
      name,
      score: Math.round(score * 10) / 10,
      category: (skillCategories.get(name) || 'other') as SkillStat['category']
    }))
    .filter(skill => skill.score >= 1) // Filter out very low scores
    .sort((a, b) => b.score - a.score);

  return skills;
}

function getSkillCategory(skill: string): string {
  for (const [category, skills] of Object.entries(LANGUAGE_CATEGORIES)) {
    if (skills.some(s => s.toLowerCase() === skill.toLowerCase())) {
      return category;
    }
  }
  
  // Check if it's a known framework or tool from keywords
  const skillLower = skill.toLowerCase();
  if (skillLower.includes('react') || skillLower.includes('vue') || skillLower.includes('angular')) {
    return 'framework';
  }
  if (skillLower.includes('docker') || skillLower.includes('aws') || skillLower.includes('git')) {
    return 'tool';
  }
  
  return 'other';
}

function findSkillFromKeyword(keyword: string): string | null {
  const keywordLower = keyword.toLowerCase();
  
  for (const [skill, keywords] of Object.entries(SKILL_KEYWORDS)) {
    if (keywords.includes(keywordLower)) {
      return skill;
    }
  }
  
  return null;
}

export function getUniqueLanguages(repos: GithubRepo[]): string[] {
  const languages = new Set<string>();
  
  repos.forEach(repo => {
    if (repo.language) {
      languages.add(repo.language);
    }
  });
  
  return Array.from(languages).sort();
}