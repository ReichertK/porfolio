import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiGithub, FiLinkedin } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { config } from '../config';

export function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex items-center justify-center py-20"
    >
      <div className="text-center max-w-4xl mx-auto">
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
          className="mb-8"
        >
          <img
            src={config.avatar}
            alt={config.name}
            className="w-32 h-32 rounded-full mx-auto border-4 border-blue-500/20 shadow-2xl"
            onError={(e) => {
              e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(config.name)}&size=128&background=3b82f6&color=ffffff`;
            }}
          />
        </motion.div>

        {/* Name and Role */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-6"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            {config.name}
          </h1>
          <h2 className="text-2xl md:text-3xl text-blue-400 font-medium">
            {config.role}
          </h2>
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          {config.bio}
        </motion.p>

        {/* Location */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-gray-400 mb-10"
        >
          📍 {config.location}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <Link
            to="/projects"
            className="btn-primary flex items-center space-x-2 group"
          >
            <span>{config.ctaText}</span>
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <a
            href={`mailto:${config.email}`}
            className="btn-secondary"
          >
            Contáctame
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex justify-center space-x-6"
        >
          {config.social.github && (
            <a
              href={config.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors p-3 rounded-lg hover:bg-gray-800"
              aria-label="GitHub"
            >
              <FiGithub size={24} />
            </a>
          )}
          
          {config.social.linkedin && (
            <a
              href={config.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors p-3 rounded-lg hover:bg-gray-800"
              aria-label="LinkedIn"
            >
              <FiLinkedin size={24} />
            </a>
          )}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}