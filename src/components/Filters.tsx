import React from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiX } from 'react-icons/fi';

interface FiltersProps {
  searchTerm: string;
  selectedLanguage: string;
  languages: string[];
  onSearchChange: (value: string) => void;
  onLanguageChange: (value: string) => void;
  onClear: () => void;
}

export function Filters({
  searchTerm,
  selectedLanguage,
  languages,
  onSearchChange,
  onLanguageChange,
  onClear
}: FiltersProps) {
  const hasActiveFilters = searchTerm || selectedLanguage;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8 space-y-4"
    >
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar proyectos..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="input pl-10 pr-4"
          />
        </div>

        {/* Language Filter */}
        <div className="sm:w-64">
          <select
            value={selectedLanguage}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="input"
          >
            <option value="">Todos los lenguajes</option>
            {languages.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Button */}
        {hasActiveFilters && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={onClear}
            className="btn-secondary flex items-center space-x-2 px-4 py-2 whitespace-nowrap"
          >
            <FiX size={16} />
            <span>Limpiar</span>
          </motion.button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="flex flex-wrap gap-2"
        >
          {searchTerm && (
            <span className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm flex items-center space-x-2">
              <span>Búsqueda: "{searchTerm}"</span>
              <button
                onClick={() => onSearchChange('')}
                className="hover:text-white transition-colors"
              >
                <FiX size={14} />
              </button>
            </span>
          )}
          
          {selectedLanguage && (
            <span className="px-3 py-1 bg-emerald-600/20 text-emerald-300 rounded-full text-sm flex items-center space-x-2">
              <span>Lenguaje: {selectedLanguage}</span>
              <button
                onClick={() => onLanguageChange('')}
                className="hover:text-white transition-colors"
              >
                <FiX size={14} />
              </button>
            </span>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}