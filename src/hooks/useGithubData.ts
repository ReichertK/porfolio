import { useState, useEffect } from 'react';
import { GithubRepo, SkillStat } from '../types';
import { githubAPI } from '../utils/github';
import { detectSkillsFromRepos, getUniqueLanguages } from '../utils/skillDetection';

interface UseGithubDataResult {
  repos: GithubRepo[];
  skills: SkillStat[];
  languages: string[];
  loading: boolean;
  error: string | null;
}

export function useGithubData(): UseGithubDataResult {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [skills, setSkills] = useState<SkillStat[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        setLoading(true);
        setError(null);

        const username = import.meta.env.VITE_GITHUB_USERNAME;
        if (!username) {
          throw new Error('VITE_GITHUB_USERNAME no está configurado en las variables de entorno');
        }

        // Fetch repositories with languages
        const repositoriesWithLanguages = await githubAPI.getRepositoriesWithLanguages(username, 40);
        
        // Detect skills from repositories
        const detectedSkills = detectSkillsFromRepos(repositoriesWithLanguages);
        
        // Get unique languages for filters
        const uniqueLanguages = getUniqueLanguages(repositoriesWithLanguages);

        setRepos(repositoriesWithLanguages);
        setSkills(detectedSkills);
        setLanguages(uniqueLanguages);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error desconocido al cargar datos de GitHub';
        setError(errorMessage);
        console.error('Error fetching GitHub data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGithubData();
  }, []);

  return {
    repos,
    skills,
    languages,
    loading,
    error
  };
}