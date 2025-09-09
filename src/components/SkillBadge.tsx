import React from 'react';
import { motion } from 'framer-motion';
import { SkillStat } from '../types';

interface SkillBadgeProps {
  skill: SkillStat;
  index: number;
}

const categoryColors = {
  language: 'bg-blue-600 text-blue-100',
  framework: 'bg-emerald-600 text-emerald-100',
  tool: 'bg-purple-600 text-purple-100',
  other: 'bg-gray-600 text-gray-100'
};

const categoryLabels = {
  language: 'Lenguaje',
  framework: 'Framework',
  tool: 'Herramienta',
  other: 'Otro'
};

export function SkillBadge({ skill, index }: SkillBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ scale: 1.05 }}
      className="group"
    >
      <div className={`
        px-4 py-2 rounded-lg border
        ${categoryColors[skill.category]}
        border-current/20
        transition-all duration-200
        group-hover:shadow-lg
        group-hover:border-current/40
      `}>
        <div className="flex items-center justify-between">
          <span className="font-medium text-sm">
            {skill.name}
          </span>
          <span className="text-xs ml-2 opacity-75">
            {skill.score}
          </span>
        </div>
        <div className="text-xs opacity-60 mt-1">
          {categoryLabels[skill.category]}
        </div>
      </div>
    </motion.div>
  );
}