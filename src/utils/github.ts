import axios from 'axios';
import { GithubRepo } from '../types';

const GITHUB_API_BASE = 'https://api.github.com';

export class GitHubAPI {
  private baseURL: string;
  private headers: Record<string, string>;

  constructor() {
    this.baseURL = GITHUB_API_BASE;
    this.headers = {
      'Accept': 'application/vnd.github.v3+json',
    };

    // Add auth token if available
    const token = import.meta.env.VITE_GITHUB_TOKEN;
    if (token) {
      this.headers['Authorization'] = `token ${token}`;
    }
  }

  async getUser(username: string) {
    const response = await axios.get(`${this.baseURL}/users/${username}`, {
      headers: this.headers
    });
    return response.data;
  }

  async getRepositories(username: string, limit = 100): Promise<GithubRepo[]> {
    const response = await axios.get(`${this.baseURL}/users/${username}/repos`, {
      headers: this.headers,
      params: {
        sort: 'updated',
        direction: 'desc',
        per_page: limit,
        type: 'public'
      }
    });
    
    return response.data.filter((repo: GithubRepo) => !repo.fork && !repo.archived && !repo.disabled);
  }

  async getRepositoryLanguages(languagesUrl: string): Promise<Record<string, number>> {
    try {
      const response = await axios.get(languagesUrl, {
        headers: this.headers
      });
      return response.data;
    } catch (error) {
      console.warn('Failed to fetch repository languages:', error);
      return {};
    }
  }

  async getRepositoriesWithLanguages(username: string, limit = 40): Promise<(GithubRepo & { languages: Record<string, number> })[]> {
    const repos = await this.getRepositories(username, 100);
    const limitedRepos = repos.slice(0, limit);

    // Fetch languages for each repository
    const reposWithLanguages = await Promise.allSettled(
      limitedRepos.map(async (repo) => {
        const languages = await this.getRepositoryLanguages(repo.languages_url);
        return {
          ...repo,
          languages
        };
      })
    );

    return reposWithLanguages
      .filter((result): result is PromiseFulfilledResult<GithubRepo & { languages: Record<string, number> }> => result.status === 'fulfilled')
      .map(result => result.value);
  }
}

export const githubAPI = new GitHubAPI();