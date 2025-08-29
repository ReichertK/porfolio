import React from 'react';
import { FiGithub, FiLinkedin, FiTwitter, FiGlobe, FiMail } from 'react-icons/fi';
import { Container } from './Layout/Container';
import { config } from '../config';

const socialIcons = {
  github: FiGithub,
  linkedin: FiLinkedin,
  twitter: FiTwitter,
  website: FiGlobe
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12">
      <Container>
        <div className="flex flex-col items-center space-y-6">
          {/* Social Links */}
          <div className="flex space-x-6">
            {Object.entries(config.social).map(([platform, url]) => {
              if (!url || typeof url !== 'string') return null;
              
              const Icon = socialIcons[platform as keyof typeof socialIcons];
              if (!Icon) return null;

              return (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800"
                  aria-label={`${platform} profile`}
                >
                  <Icon size={20} />
                </a>
              );
            })}
            
            {/* Email */}
            <a
              href={`mailto:${config.email}`}
              className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800"
              aria-label="Send email"
            >
              <FiMail size={20} />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-400">
            <p className="text-sm">
              © {currentYear} {config.name}. Todos los derechos reservados.
            </p>
            <p className="text-xs mt-1">
              Construido con React, TypeScript y ❤️
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}