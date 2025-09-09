import React from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub, FiStar, FiGitBranch } from 'react-icons/fi';
import { GithubRepo } from '../types';
import { timeAgo, formatNumber } from '../utils/format';

interface ProjectCardProps {
  repo: GithubRepo;
  index: number;
}

export function ProjectCard({ repo, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ y: -5 }}
      className="card p-6 h-full flex flex-col"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-semibold text-white mb-2 flex-1">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            {repo.name}
          </a>
        </h3>
        <div className="flex space-x-2 ml-4">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Ver en GitHub"
          >
            <FiGithub size={20} />
          </a>
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Ver sitio web"
            >
              <FiExternalLink size={20} />
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-300 mb-4 flex-1">
        {repo.description || 'Sin descripción'}
      </p>

      {/* Topics */}
      {repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {repo.topics.slice(0, 6).map((topic) => (
            <span
              key={topic}
              className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded-md"
            >
              {topic}
            </span>
          ))}
          {repo.topics.length > 6 && (
            <span className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded-md">
              +{repo.topics.length - 6} más
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-gray-400 mt-auto pt-4 border-t border-gray-700">
        <div className="flex items-center space-x-4">
          {repo.language && (
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>{repo.language}</span>
            </div>
          )}
          <div className="flex items-center space-x-1">
            <FiStar size={14} />
            <span>{formatNumber(repo.stargazers_count)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <FiGitBranch size={14} />
            <span>{formatNumber(repo.forks_count)}</span>
          </div>
        </div>
        <span className="text-xs">
          {timeAgo(repo.updated_at)}
        </span>
      </div>
    </motion.div>
  );
}